'use server';

import { connectDB } from '../db/mongodb';
import { Inquiry, Room } from '../db/models';
import { auth } from '../auth';

export async function getInquiries() {
  await connectDB();
  const inquiries = await Inquiry.find({}).lean();
  return inquiries.map(inq => ({ ...inq, id: inq._id.toString() }));
}

export async function getMyInquiries() {
  const session = await auth();
  if (!session?.user?.id) return [];
  
  await connectDB();
  const inquiries = await Inquiry.find({ userId: session.user.id }).lean();
  return inquiries.map(inq => ({ ...inq, id: inq._id.toString() }));
}

export async function getInquiriesByRoom(roomId: string) {
  await connectDB();
  const inquiries = await Inquiry.find({ roomId }).lean();
  return inquiries.map(inq => ({ ...inq, id: inq._id.toString() }));
}

export async function getReceivedInquiries() {
  const session = await auth();
  if (!session?.user?.id) return [];
  
  await connectDB();
  const rooms = await Room.find({ ownerId: session.user.id }).lean();
  const roomIds = rooms.map(r => r._id.toString());
  
  const inquiries = await Inquiry.find({ roomId: { $in: roomIds } }).lean();
  return inquiries.map(inq => ({ ...inq, id: inq._id.toString() }));
}

export async function createInquiry(data: { roomId: string; tenantName: string; tenantEmail: string; tenantPhone: string; message: string; moveInDate: string }) {
  const session = await auth();
  if (!session?.user?.id) throw new Error('Unauthorized');
  
  await connectDB();
  
  // Check if user is trying to book their own room
  const room = await Room.findById(data.roomId).lean();
  if (room?.ownerId === session.user.id) {
    throw new Error('Cannot book your own property');
  }
  
  const inquiry = await Inquiry.create({ ...data, userId: session.user.id });
  return { ...inquiry.toObject(), id: inquiry._id.toString() };
}

export async function updateInquiryStatus(id: string, status: 'pending' | 'approved' | 'rejected') {
  const session = await auth();
  if (!session?.user?.id) throw new Error('Unauthorized');
  
  await connectDB();
  
  // Verify ownership
  const inquiry = await Inquiry.findById(id).lean();
  if (!inquiry) throw new Error('Inquiry not found');
  
  const room = await Room.findById(inquiry.roomId).lean();
  if (room?.ownerId !== session.user.id && session.user.role !== 'admin') {
    throw new Error('Unauthorized');
  }
  
  const updated = await Inquiry.findByIdAndUpdate(id, { status }, { new: true }).lean();
  return updated ? { ...updated, id: updated._id.toString() } : null;
}

export async function deleteInquiry(id: string) {
  const session = await auth();
  if (!session?.user?.id) throw new Error('Unauthorized');
  
  await connectDB();
  const result = await Inquiry.findOneAndDelete({ _id: id, userId: session.user.id });
  return !!result;
}
