'use server';

import { connectDB } from '../db/mongodb';
import { User, Room } from '../db/models';
import { auth } from '../auth';

export async function getFavorites() {
  const session = await auth();
  if (!session?.user?.id) return [];
  
  await connectDB();
  const user = await User.findById(session.user.id).lean();
  if (!user?.favorites?.length) return [];
  
  const rooms = await Room.find({ _id: { $in: user.favorites } }).lean();
  return rooms.map(room => ({ ...room, id: room._id.toString() }));
}

export async function addFavorite(roomId: string) {
  const session = await auth();
  if (!session?.user?.id) throw new Error('Unauthorized');
  
  await connectDB();
  await User.findByIdAndUpdate(
    session.user.id,
    { $addToSet: { favorites: roomId } }
  );
  return { success: true };
}

export async function removeFavorite(roomId: string) {
  const session = await auth();
  if (!session?.user?.id) throw new Error('Unauthorized');
  
  await connectDB();
  await User.findByIdAndUpdate(
    session.user.id,
    { $pull: { favorites: roomId } }
  );
  return { success: true };
}

export async function isFavorite(roomId: string) {
  const session = await auth();
  if (!session?.user?.id) return false;
  
  await connectDB();
  const user = await User.findById(session.user.id).lean();
  return user?.favorites?.includes(roomId) || false;
}
