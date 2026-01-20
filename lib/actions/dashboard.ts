"use server";

import { connectDB } from "../db/mongodb";
import { Property, Inquiry } from "../db/models";
import { auth } from "../auth";
import { toPlainObject } from "../utils";

export async function getDashboardStats() {
  const session = await auth();
  if (!session?.user?.id) return null;

  await connectDB();

  // Admin sees all stats
  if (session.user.role === "admin") {
    const properties = await Property.find({}).lean();
    const inquiries = await Inquiry.find({}).lean();
    const totalViews = properties.reduce((sum, p: { views?: number }) => sum + (p.views || 0), 0);

    return {
      totalProperties: properties.length,
      totalViews,
      totalInquiries: inquiries.length,
      availableProperties: properties.filter(
        (p: { availability?: string }) => p.availability === "available"
      ).length,
    };
  }

  // Owner sees only their stats
  const properties = await Property.find({ ownerId: session.user.id }).lean();
  const propertyIds = properties.map((p) => p._id.toString());

  const inquiries = await Inquiry.find({
    propertyId: { $in: propertyIds },
  }).lean();

  const totalViews = properties.reduce((sum, p: { views?: number }) => sum + (p.views || 0), 0);

  return {
    totalProperties: properties.length,
    totalViews,
    totalInquiries: inquiries.length,
    availableProperties: properties.filter(
      (p: { availability?: string }) => p.availability === "available"
    ).length,
  };
}

export async function getRecentInquiries(limit = 3) {
  const session = await auth();
  if (!session?.user?.id) return [];

  await connectDB();

  if (session.user.role === "admin") {
    const inquiries = await Inquiry.find({}).sort({ createdAt: -1 }).limit(limit).lean();
    return inquiries.map((inq) =>
      toPlainObject({
        ...inq,
        id: inq._id.toString(),
        createdAt: inq.createdAt?.toISOString(),
      })
    );
  }

  const properties = await Property.find({ ownerId: session.user.id }).lean();
  const propertyIds = properties.map((p) => p._id.toString());

  const inquiries = await Inquiry.find({ propertyId: { $in: propertyIds } })
    .sort({ createdAt: -1 })
    .limit(limit)
    .lean();

  return inquiries.map((inq) =>
    toPlainObject({
      ...inq,
      id: inq._id.toString(),
      createdAt: inq.createdAt?.toISOString(),
    })
  );
}
