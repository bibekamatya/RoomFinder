'use server';

import { connectDB } from '../db/mongodb';
import { Room } from '../db/models';

export async function searchRooms(query: string) {
  await connectDB();
  
  const rooms = await Room.find({
    $or: [
      { title: new RegExp(query, 'i') },
      { description: new RegExp(query, 'i') },
      { 'location.city': new RegExp(query, 'i') },
      { 'location.area': new RegExp(query, 'i') },
    ]
  }).lean();
  
  return rooms.map(room => ({ ...room, id: room._id.toString() }));
}

export async function getCities() {
  await connectDB();
  
  const cities = await Room.distinct('location.city');
  return cities.filter(Boolean);
}

export async function getAreas(city?: string) {
  await connectDB();
  
  const query = city ? { 'location.city': city } : {};
  const areas = await Room.distinct('location.area', query);
  return areas.filter(Boolean);
}

export async function getPriceRange() {
  await connectDB();
  
  const rooms = await Room.find({}).select('price').lean();
  if (rooms.length === 0) return { min: 0, max: 0 };
  
  const prices = rooms.map(r => r.price);
  return {
    min: Math.min(...prices),
    max: Math.max(...prices),
  };
}
