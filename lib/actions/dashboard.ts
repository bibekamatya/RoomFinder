"use server";

import { connectDB } from "../db/mongodb";
import { Property, Inquiry } from "../db/models";
import { auth } from "../auth";

export async function getDashboardStats() {
  const session = await auth();
  if (!session?.user?.id) return null;

  await connectDB();

  const properties = await Property.find({ ownerId: session.user.id }).lean();
  const propertyIds = properties.map((p) => p._id.toString());

  const inquiries = await Inquiry.find({
    propertyId: { $in: propertyIds },
  }).lean();

  const totalViews = properties.reduce((sum, p: any) => sum + (p.views || 0), 0);

  return {
    totalProperties: properties.length,
    totalViews,
    totalInquiries: inquiries.length,
    availableProperties: properties.filter((p: any) => p.availability === "available").length,
  };
}

export async function getRecentInquiries(limit = 3) {
  const session = await auth();
  if (!session?.user?.id) return [];

  await connectDB();

  const properties = await Property.find({ ownerId: session.user.id }).lean();
  const propertyIds = properties.map((p) => p._id.toString());

  const inquiries = await Inquiry.find({
    propertyId: { $in: propertyIds },
  })
    .sort({ createdAt: -1 })
    .limit(limit)
    .lean();

  return inquiries.map((inq) => ({
    ...inq,
    id: inq._id.toString(),
    createdAt: inq.createdAt?.toISOString(),
  }));
}
