"use server";

import { connectDB } from "../db/mongodb";
import { Property } from "../db/models";

export async function searchProperties(query: string) {
  await connectDB();

  if (!query || query.trim() === "") {
    return [];
  }

  const properties = await Property.find({
    $or: [
      { title: new RegExp(query, "i") },
      { description: new RegExp(query, "i") },
      { "location.city": new RegExp(query, "i") },
      { "location.area": new RegExp(query, "i") },
    ],
  }).lean();

  return JSON.parse(JSON.stringify(properties.map((property) => ({ ...property, _id: undefined, id: property._id.toString() }))));
}

export async function getCities() {
  await connectDB();

  const cities = await Property.distinct("location.city");
  return cities.filter(Boolean);
}

export async function getAreas(city?: string) {
  await connectDB();

  const query = city ? { "location.city": city } : {};
  const areas = await Property.distinct("location.area", query);
  return areas.filter(Boolean);
}

export async function getPriceRange() {
  await connectDB();

  const properties = await Property.find({}).select("price").lean();
  if (properties.length === 0) return { min: 0, max: 0 };

  const prices = properties.map((r) => r.price);
  return {
    min: Math.min(...prices),
    max: Math.max(...prices),
  };
}
