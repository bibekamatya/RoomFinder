"use server";

import { connectDB } from "../db/mongodb";
import { Property, User, Inquiry } from "../db/models";
import { PropertyFormData } from "../types/data";
import { auth } from "../auth";
import { uploadImage } from "../cloudinary";

export async function getProperties(filters?: {
  city?: string;
  propertyType?: string | string[];
  roomType?: string;
  minPrice?: number;
  maxPrice?: number;
  amenities?: string[];
  furnished?: boolean;
  rooms?: number;
  bathrooms?: number;
  availability?: string;
  page?: number;
  limit?: number;
}) {
  await connectDB();
  const query: Record<string, unknown> = {};

  if (filters?.city) query["location.city"] = new RegExp(filters.city, "i");

  if (filters?.propertyType) {
    query.propertyType = Array.isArray(filters.propertyType)
      ? { $in: filters.propertyType }
      : filters.propertyType;
  }

  if (filters?.roomType) query.roomType = filters.roomType;

  if (filters?.availability) query.availability = filters.availability;

  if (filters?.minPrice || filters?.maxPrice) {
    query.price = {
      ...(filters.minPrice && { $gte: filters.minPrice }),
      ...(filters.maxPrice && { $lte: filters.maxPrice }),
    };
  }

  if (filters?.amenities && filters.amenities.length > 0) {
    query.amenities = { $all: filters.amenities };
  }

  if (filters?.furnished !== undefined) {
    query["specifications.furnished"] = filters.furnished;
  }

  if (filters?.rooms) {
    query["specifications.rooms"] = filters.rooms >= 3 ? { $gte: 3 } : filters.rooms;
  }

  if (filters?.bathrooms) {
    query["specifications.bathrooms"] = filters.bathrooms >= 3 ? { $gte: 3 } : filters.bathrooms;
  }

  const page = filters?.page || 1;
  const limit = filters?.limit || 20;
  const skip = (page - 1) * limit;

  const [properties, total] = await Promise.all([
    Property.find(query).skip(skip).limit(limit).lean(),
    Property.countDocuments(query),
  ]);

  return JSON.parse(
    JSON.stringify({
      properties: properties.map((property) => ({
        ...property,
        _id: undefined,
        id: property._id.toString(),
      })),
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    })
  );
}

export async function getPropertyById(id: string) {
  await connectDB();

  try {
    const property = await Property.findById(id).lean();
    if (!property) return null;

    const owner = await User.findById(property.ownerId).select("name email").lean();
    return JSON.parse(
      JSON.stringify({
        ...property,
        id: property._id.toString(),
        owner: owner ? { name: owner.name, email: owner.email } : null,
      })
    );
  } catch {
    return null;
  }
}

export async function incrementPropertyViews(id: string) {
  const session = await auth();

  await connectDB();
  try {
    const property = await Property.findById(id).lean();

    // Don't increment views or notify if owner is viewing their own property
    if (property && session?.user?.id === property.ownerId) {
      return;
    }

    await Property.findByIdAndUpdate(id, { $inc: { views: 1 } });

    // Create notification for property owner
    if (property) {
      const { Notification } = await import("../db/models");
      const viewCount = (property.views || 0) + 1;

      // Only notify on milestones: 1, 5, 10, 25, 50, 100, etc.
      const milestones = [1, 5, 10, 25, 50, 100, 250, 500, 1000];
      if (milestones.includes(viewCount)) {
        await Notification.create({
          userId: property.ownerId,
          title: "Property View Milestone",
          message: `${viewCount} views on "${property.title}"`,
          type: "general",
          relatedId: id,
        });
      }
    }
  } catch {
    // Silently fail - view tracking is not critical
  }
}

export async function getPropertiesByCity(city: string) {
  await connectDB();
  const properties = await Property.find({
    "location.city": new RegExp(city, "i"),
  }).lean();
  return JSON.parse(
    JSON.stringify(
      properties.map((property) => ({
        ...property,
        _id: undefined,
        id: property._id.toString(),
      }))
    )
  );
}

export async function getPropertiesByOwner(ownerId: string) {
  await connectDB();
  const properties = await Property.find({ ownerId }).lean();
  return JSON.parse(
    JSON.stringify(
      properties.map((property) => ({
        ...property,
        _id: undefined,
        id: property._id.toString(),
      }))
    )
  );
}

export async function getMyProperties() {
  const session = await auth();
  if (!session?.user?.id) return [];

  await connectDB();

  // Admin sees all properties
  if (session.user.role === "admin") {
    const properties = await Property.find({}).lean();
    return JSON.parse(
      JSON.stringify(
        properties.map((property) => ({
          ...property,
          _id: undefined,
          id: property._id.toString(),
        }))
      )
    );
  }

  // Owner sees only their properties
  const properties = await Property.find({ ownerId: session.user.id }).lean();
  return JSON.parse(
    JSON.stringify(
      properties.map((property) => ({
        ...property,
        _id: undefined,
        id: property._id.toString(),
      }))
    )
  );
}

export async function getAllProperties() {
  const session = await auth();
  if (session?.user?.role !== "admin") throw new Error("Unauthorized");

  await connectDB();
  const properties = await Property.find({}).lean();
  return JSON.parse(
    JSON.stringify(
      properties.map((property) => ({
        ...property,
        _id: undefined,
        id: property._id.toString(),
      }))
    )
  );
}

export async function createProperty(data: PropertyFormData, imageFiles: File[]) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  await connectDB();

  let uploadedImages: string[] = [];

  try {
    // Upload images
    const uploadPromises = imageFiles.map((file) => uploadImage(file));
    uploadedImages = (await Promise.all(uploadPromises)) as string[];

    // Create property with image URLs
    const property = await Property.create({
      ...data,
      images: uploadedImages,
      ownerId: session.user.id,
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
      const { deleteImages } = await import("../cloudinary");
      await deleteImages(uploadedImages);
    }
    throw error;
  }
}

export async function updateProperty(id: string, data: PropertyFormData, imageFiles?: File[]) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  await connectDB();

  const query = session.user.role === "admin" ? { _id: id } : { _id: id, ownerId: session.user.id };

  let uploadedImages: string[] = [];

  try {
    // Get existing property
    const existingProperty = await Property.findOne(query).lean();
    if (!existingProperty) throw new Error("Property not found");

    // Upload new images if provided
    if (imageFiles && imageFiles.length > 0) {
      const uploadPromises = imageFiles.map((file) => uploadImage(file));
      uploadedImages = (await Promise.all(uploadPromises)) as string[];
    }

    // Merge existing images with new ones
    const allImages = [...(existingProperty.images || []), ...uploadedImages];

    const updateData = {
      ...data,
      images: allImages,
      lastUpdated: new Date(),
    };

    const property = await Property.findOneAndUpdate(query, updateData, { new: true }).lean();
    return property
      ? JSON.parse(JSON.stringify({ ...property, id: property._id.toString() }))
      : null;
  } catch (error) {
    if (uploadedImages.length) {
      const { deleteImages } = await import("../cloudinary");
      await deleteImages(uploadedImages);
    }
    throw error;
  }
}

export async function deleteProperty(id: string) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  await connectDB();

  const query = session.user.role === "admin" ? { _id: id } : { _id: id, ownerId: session.user.id };

  // Get property to delete images
  const property = await Property.findOne(query).lean();
  if (property?.images?.length) {
    const { deleteImages } = await import("../cloudinary");
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
