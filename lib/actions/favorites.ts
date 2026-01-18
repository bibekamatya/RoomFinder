"use server";

import { connectDB } from "../db/mongodb";
import { User, Property } from "../db/models";
import { auth } from "../auth";

export async function getFavorites() {
  const session = await auth();
  if (!session?.user?.id) return [];

  await connectDB();
  const user = await User.findById(session.user.id).lean();
  if (!user?.favorites?.length) return [];

  const properties = await Property.find({ _id: { $in: user.favorites } }).lean();
  return properties.map((property) => ({
    ...property,
    id: property._id.toString(),
  }));
}

export async function addFavorite(propertyId: string) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  await connectDB();
  await User.findByIdAndUpdate(session.user.id, {
    $addToSet: { favorites: propertyId },
  });
  return { success: true };
}

export async function removeFavorite(propertyId: string) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  await connectDB();
  await User.findByIdAndUpdate(session.user.id, {
    $pull: { favorites: propertyId },
  });
  return { success: true };
}

export async function isFavorite(propertyId: string) {
  const session = await auth();
  if (!session?.user?.id) return false;

  await connectDB();
  const user = await User.findById(session.user.id).lean();
  return user?.favorites?.includes(propertyId) || false;
}
