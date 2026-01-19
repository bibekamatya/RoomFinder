"use server";

import { connectDB } from "../db/mongodb";
import { Inquiry, Property } from "../db/models";
import { auth } from "../auth";

export async function getInquiries() {
  await connectDB();
  const inquiries = await Inquiry.find({}).lean();
  return inquiries.map((inq) => ({ ...inq, id: inq._id.toString() }));
}

export async function getMyInquiries() {
  const session = await auth();
  if (!session?.user?.id) return [];

  await connectDB();
  const inquiries = await Inquiry.find({ userId: session.user.id }).lean();
  return inquiries.map((inq) => ({ ...inq, id: inq._id.toString() }));
}

export async function getInquiriesByProperty(propertyId: string) {
  await connectDB();
  const inquiries = await Inquiry.find({ propertyId }).lean();
  return inquiries.map((inq) => ({ ...inq, id: inq._id.toString() }));
}

export async function getReceivedInquiries() {
  const session = await auth();
  if (!session?.user?.id) return [];

  await connectDB();
  const properties = await Property.find({ ownerId: session.user.id }).lean();
  const propertyIds = properties.map((r) => r._id.toString());

  const inquiries = await Inquiry.find({
    propertyId: { $in: propertyIds },
  }).lean();
  return inquiries.map((inq) => ({ ...inq, id: inq._id.toString() }));
}

export async function createInquiry(data: {
  propertyId: string;
  tenantName: string;
  tenantEmail: string;
  tenantPhone: string;
  message: string;
  moveInDate: string;
}) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  await connectDB();

  const property = await Property.findById(data.propertyId).lean();
  if (property?.ownerId === session.user.id) {
    throw new Error("Cannot book your own property");
  }

  const inquiry = await Inquiry.create({ ...data, userId: session.user.id });
  
  // Create notification for property owner
  if (property) {
    const { Notification } = await import("../db/models");
    await Notification.create({
      userId: property.ownerId,
      title: "New Inquiry",
      message: `${data.tenantName} interested in "${property.title}"`,
      type: "new_inquiry",
      relatedId: inquiry._id.toString(),
    });
  }
  
  return { ...inquiry.toObject(), id: inquiry._id.toString() };
}

export async function updateInquiryStatus(id: string, status: "pending" | "approved" | "rejected") {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  await connectDB();

  // Verify ownership
  const inquiry = await Inquiry.findById(id).lean();
  if (!inquiry) throw new Error("Inquiry not found");

  const property = await Property.findById(inquiry.propertyId).lean();
  if (property?.ownerId !== session.user.id && session.user.role !== "admin") {
    throw new Error("Unauthorized");
  }

  const updated = await Inquiry.findByIdAndUpdate(id, { status }, { new: true }).lean();
  
  // Create notification for tenant
  if (updated) {
    const { Notification } = await import("../db/models");
    await Notification.create({
      userId: inquiry.userId,
      title: `Inquiry ${status}`,
      message: `Inquiry ${status} for "${property?.title}"`,
      type: "inquiry_status",
      relatedId: id,
    });
  }
  
  return updated ? { ...updated, id: updated._id.toString() } : null;
}

export async function deleteInquiry(id: string) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  await connectDB();
  const result = await Inquiry.findOneAndDelete({
    _id: id,
    userId: session.user.id,
  });
  return !!result;
}
