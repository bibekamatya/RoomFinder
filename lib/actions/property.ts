"use server";

import { connectDB } from "../db/mongodb";
import { Property, User, Inquiry } from "../db/models";
import { ProPerty } from "../types/data";
import { auth } from "../auth";
import { uploadImage, deleteImages } from "../cloudinary";

export async function getProperties(filters?: {
  city?: string;
  propertyType?: string;
  priceType?: string;
  minPrice?: number;
  maxPrice?: number;
  availability?: string;
}) {
  await connectDB();
  const query: Record<string, unknown> = {};

  if (filters?.city) query["location.city"] = new RegExp(filters.city, "i");
  if (filters?.propertyType) query.propertyType = filters.propertyType;
  if (filters?.priceType) query.priceType = filters.priceType;
  if (filters?.availability) query.availability = filters.availability;
  if (filters?.minPrice || filters?.maxPrice) {
    query.price = {
      ...(filters.minPrice && { $gte: filters.minPrice }),
      ...(filters.maxPrice && { $lte: filters.maxPrice }),
    };
  }

  const properties = await Property.find(query).lean();
  return JSON.parse(JSON.stringify(
    properties.map((property) => ({ 
      ...property, 
      _id: undefined,
      id: property._id.toString() 
    }))
  ));
}

export async function getPropertyById(id: string) {
  await connectDB();
  
  try {
    const property = await Property.findById(id).lean();
    if (!property) return null;

    const owner = await User.findById(property.ownerId).select("name email").lean();
    return JSON.parse(JSON.stringify({
      ...property,
      id: property._id.toString(),
      owner: owner ? { name: owner.name, email: owner.email } : null,
    }));
  } catch (error) {
    return null;
  }
}

export async function getPropertiesByCity(city: string) {
  await connectDB();
  const properties = await Property.find({
    "location.city": new RegExp(city, "i"),
  }).lean();
  return JSON.parse(JSON.stringify(
    properties.map((property) => ({ 
      ...property,
      _id: undefined, 
      id: property._id.toString() 
    }))
  ));
}

export async function getPropertiesByOwner(ownerId: string) {
  await connectDB();
  const properties = await Property.find({ ownerId }).lean();
  return JSON.parse(JSON.stringify(
    properties.map((property) => ({ 
      ...property,
      _id: undefined, 
      id: property._id.toString() 
    }))
  ));
}

export async function getMyProperties() {
  const session = await auth();
  if (!session?.user?.id) return [];

  await connectDB();
  const properties = await Property.find({ ownerId: session.user.id }).lean();
  return JSON.parse(JSON.stringify(
    properties.map((property) => ({ 
      ...property,
      _id: undefined, 
      id: property._id.toString() 
    }))
  ));
}

export async function getAllProperties() {
  const session = await auth();
  if (session?.user?.role !== "admin") throw new Error("Unauthorized");

  await connectDB();
  const properties = await Property.find({}).lean();
  return JSON.parse(JSON.stringify(
    properties.map((property) => ({ 
      ...property,
      _id: undefined, 
      id: property._id.toString() 
    }))
  ));
}

export async function createProperty(
  data: Omit<ProPerty, "id" | "createdAt" | "updatedAt" | "ownerId" | "images">,
  imageFiles: File[]
) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  await connectDB();

  let uploadedImages: string[] = [];
  
  try {
    // Upload images
    const uploadPromises = imageFiles.map(file => uploadImage(file));
    uploadedImages = await Promise.all(uploadPromises) as string[];

    // Create property with image URLs
    const property = await Property.create({ 
      ...data, 
      images: uploadedImages,
      ownerId: session.user.id 
    });

    const user = await User.findById(session.user.id);
    if (user && user.role === "user") {
      user.role = "owner";
      await user.save();
    }

    return JSON.parse(JSON.stringify({ ...property.toObject(), id: property._id.toString() }));
  } catch (error) {
    // If anything fails, delete uploaded images
    if (uploadedImages.length) {
      const { deleteImages } = await import('../cloudinary');
      await deleteImages(uploadedImages);
    }
    throw error;
  }
}

export async function updateProperty(id: string, data: Partial<ProPerty>) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  await connectDB();

  const query =
    session.user.role === "admin"
      ? { _id: id }
      : { _id: id, ownerId: session.user.id };

  const property = await Property.findOneAndUpdate(query, data, { new: true }).lean();
  return property ? { ...property, id: property._id.toString() } : null;
}

export async function deleteProperty(id: string) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  await connectDB();

  const query =
    session.user.role === "admin"
      ? { _id: id }
      : { _id: id, ownerId: session.user.id };

  // Get property to delete images
  const property = await Property.findOne(query).lean();
  if (property?.images?.length) {
    const { deleteImages } = await import('../cloudinary');
    await deleteImages(property.images);
  }

  await Inquiry.deleteMany({ propertyId: id });

  const result = await Property.findOneAndDelete(query);
  return !!result;
}

export async function updatePropertyAvailability(
  id: string,
  availability: "available" | "rented" | "pending"
) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  await connectDB();
  const property = await Property.findOneAndUpdate(
    { _id: id, ownerId: session.user.id },
    { availability },
    { new: true }
  ).lean();
  return property ? { ...property, id: property._id.toString() } : null;
}
