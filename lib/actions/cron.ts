"use server";

import { connectDB } from "../db/mongodb";
import { Property, Notification } from "../db/models";
import { auth } from "../auth";

export async function checkStaleProperties() {
  const session = await auth();
  if (!session?.user?.id) return;

  await connectDB();

  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  // Find current user's properties not updated in 7 days
  const staleProperties = await Property.find({
    ownerId: session.user.id,
    lastUpdated: { $lt: sevenDaysAgo },
    availability: "available",
  }).lean();

  for (const property of staleProperties) {
    // Check if notification already sent
    const existingNotif = await Notification.findOne({
      userId: property.ownerId,
      relatedId: property._id.toString(),
      type: "stale_property",
      createdAt: { $gte: sevenDaysAgo },
    });

    if (!existingNotif) {
      await Notification.create({
        userId: property.ownerId,
        title: "Update Property",
        message: `"${property.title}" needs updating - last updated 7 days ago`,
        type: "stale_property",
        relatedId: property._id.toString(),
      });
    }
  }
}
