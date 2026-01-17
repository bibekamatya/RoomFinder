'use server';

import { connectDB } from '../db/mongodb';
import { User, Room, Inquiry } from '../db/models';
import { auth } from '../auth';

export async function getAdminStats() {
  const session = await auth();
  if (session?.user?.role !== 'admin') throw new Error('Unauthorized');

  await connectDB();
  
  const totalUsers = await User.countDocuments();
  const totalOwners = await User.countDocuments({ role: 'owner' });
  const totalRooms = await Room.countDocuments();
  const availableRooms = await Room.countDocuments({ availability: 'available' });
  const rentedRooms = await Room.countDocuments({ availability: 'rented' });
  const totalInquiries = await Inquiry.countDocuments();
  const pendingInquiries = await Inquiry.countDocuments({ status: 'pending' });
  
  return {
    totalUsers,
    totalOwners,
    totalRooms,
    availableRooms,
    rentedRooms,
    totalInquiries,
    pendingInquiries,
  };
}

export async function getRecentActivity() {
  const session = await auth();
  if (session?.user?.role !== 'admin') throw new Error('Unauthorized');

  await connectDB();
  
  const recentUsers = await User.find({})
    .select('-password')
    .sort({ createdAt: -1 })
    .limit(5)
    .lean();
  
  const recentRooms = await Room.find({})
    .sort({ createdAt: -1 })
    .limit(5)
    .lean();
  
  const recentInquiries = await Inquiry.find({})
    .sort({ createdAt: -1 })
    .limit(5)
    .lean();
  
  return {
    recentUsers: recentUsers.map(u => ({ ...u, id: u._id.toString() })),
    recentRooms: recentRooms.map(r => ({ ...r, id: r._id.toString() })),
    recentInquiries: recentInquiries.map(i => ({ ...i, id: i._id.toString() })),
  };
}

export async function getRoomsByStatus() {
  const session = await auth();
  if (session?.user?.role !== 'admin') throw new Error('Unauthorized');

  await connectDB();
  
  const available = await Room.countDocuments({ availability: 'available' });
  const rented = await Room.countDocuments({ availability: 'rented' });
  const pending = await Room.countDocuments({ availability: 'pending' });
  
  return { available, rented, pending };
}

export async function getInquiriesByStatus() {
  const session = await auth();
  if (session?.user?.role !== 'admin') throw new Error('Unauthorized');

  await connectDB();
  
  const pending = await Inquiry.countDocuments({ status: 'pending' });
  const approved = await Inquiry.countDocuments({ status: 'approved' });
  const rejected = await Inquiry.countDocuments({ status: 'rejected' });
  
  return { pending, approved, rejected };
}

export async function getUsersByRole() {
  const session = await auth();
  if (session?.user?.role !== 'admin') throw new Error('Unauthorized');

  await connectDB();
  
  const users = await User.countDocuments({ role: 'user' });
  const owners = await User.countDocuments({ role: 'owner' });
  const admins = await User.countDocuments({ role: 'admin' });
  
  return { users, owners, admins };
}
