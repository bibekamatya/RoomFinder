'use server';

import { connectDB } from '../db/mongodb';
import { Room, User, Inquiry } from '../db/models';
import { Room as RoomType } from '../types';
import { auth } from '../auth';

export async function getRooms(filters?: { city?: string; propertyType?: string; priceType?: string; minPrice?: number; maxPrice?: number; availability?: string }) {
  await connectDB();
  const query: any = {};
  
  if (filters?.city) query['location.city'] = new RegExp(filters.city, 'i');
  if (filters?.propertyType) query.propertyType = filters.propertyType;
  if (filters?.priceType) query.priceType = filters.priceType;
  if (filters?.availability) query.availability = filters.availability;
  if (filters?.minPrice) query.price = { ...query.price, $gte: filters.minPrice };
  if (filters?.maxPrice) query.price = { ...query.price, $lte: filters.maxPrice };
  
  const rooms = await Room.find(query).lean();
  return rooms.map(room => ({ ...room, id: room._id.toString() }));
}

export async function getRoomById(id: string) {
  await connectDB();
  const room = await Room.findById(id).lean();
  if (!room) return null;
  
  const owner = await User.findById(room.ownerId).select('name email').lean();
  return { 
    ...room, 
    id: room._id.toString(),
    owner: owner ? { name: owner.name, email: owner.email } : null
  };
}

export async function getRoomsByCity(city: string) {
  await connectDB();
  const rooms = await Room.find({ 'location.city': new RegExp(city, 'i') }).lean();
  return rooms.map(room => ({ ...room, id: room._id.toString() }));
}

export async function getRoomsByOwner(ownerId: string) {
  await connectDB();
  const rooms = await Room.find({ ownerId }).lean();
  return rooms.map(room => ({ ...room, id: room._id.toString() }));
}

export async function getMyRooms() {
  const session = await auth();
  if (!session?.user?.id) return [];
  
  await connectDB();
  const rooms = await Room.find({ ownerId: session.user.id }).lean();
  return rooms.map(room => ({ ...room, id: room._id.toString() }));
}

export async function getAllRooms() {
  const session = await auth();
  if (session?.user?.role !== 'admin') throw new Error('Unauthorized');
  
  await connectDB();
  const rooms = await Room.find({}).lean();
  return rooms.map(room => ({ ...room, id: room._id.toString() }));
}

export async function createRoom(data: Omit<RoomType, 'id' | 'createdAt' | 'updatedAt' | 'ownerId'>) {
  const session = await auth();
  if (!session?.user?.id) throw new Error('Unauthorized');
  
  await connectDB();
  
  // Create room
  const room = await Room.create({ ...data, ownerId: session.user.id });
  
  // Auto-upgrade user to owner if first property
  const user = await User.findById(session.user.id);
  if (user && user.role === 'user') {
    user.role = 'owner';
    await user.save();
  }
  
  return { ...room.toObject(), id: room._id.toString() };
}

export async function updateRoom(id: string, data: Partial<RoomType>) {
  const session = await auth();
  if (!session?.user?.id) throw new Error('Unauthorized');
  
  await connectDB();
  
  // Allow admin to update any room
  const query = session.user.role === 'admin' 
    ? { _id: id } 
    : { _id: id, ownerId: session.user.id };
  
  const room = await Room.findOneAndUpdate(query, data, { new: true }).lean();
  return room ? { ...room, id: room._id.toString() } : null;
}

export async function deleteRoom(id: string) {
  const session = await auth();
  if (!session?.user?.id) throw new Error('Unauthorized');
  
  await connectDB();
  
  // Allow admin to delete any room
  const query = session.user.role === 'admin' 
    ? { _id: id } 
    : { _id: id, ownerId: session.user.id };
  
  // Delete associated inquiries
  await Inquiry.deleteMany({ roomId: id });
  
  const result = await Room.findOneAndDelete(query);
  return !!result;
}

export async function updateRoomAvailability(id: string, availability: 'available' | 'rented' | 'pending') {
  const session = await auth();
  if (!session?.user?.id) throw new Error('Unauthorized');
  
  await connectDB();
  const room = await Room.findOneAndUpdate(
    { _id: id, ownerId: session.user.id },
    { availability },
    { new: true }
  ).lean();
  return room ? { ...room, id: room._id.toString() } : null;
}
