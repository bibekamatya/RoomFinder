"use server";

import { connectDB } from "../db/mongodb";
import { Notification } from "../db/models";
import { auth } from "../auth";

export async function getNotifications() {
  const session = await auth();
  if (!session?.user?.id) return [];

  await connectDB();

  // Admin sees all notifications
  if (session.user.role === "admin") {
    const notifications = await Notification.find({}).sort({ createdAt: -1 }).limit(50).lean();
    return JSON.parse(
      JSON.stringify(notifications.map((n) => ({ ...n, _id: undefined, id: n._id.toString() })))
    );
  }

  // Others see only their notifications
  const notifications = await Notification.find({ userId: session.user.id })
    .sort({ createdAt: -1 })
    .limit(50)
    .lean();
  return JSON.parse(
    JSON.stringify(notifications.map((n) => ({ ...n, _id: undefined, id: n._id.toString() })))
  );
}

export async function getUnreadCount() {
  const session = await auth();
  if (!session?.user?.id) return 0;

  await connectDB();

  // Admin sees all unread
  if (session.user.role === "admin") {
    return await Notification.countDocuments({ read: false });
  }

  return await Notification.countDocuments({ userId: session.user.id, read: false });
}

export async function markAsRead(id: string) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  await connectDB();

  // Admin can mark any notification
  if (session.user.role === "admin") {
    await Notification.findByIdAndUpdate(id, { read: true });
    return;
  }

  await Notification.findOneAndUpdate({ _id: id, userId: session.user.id }, { read: true });
}

export async function markAllAsRead() {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  await connectDB();

  // Admin marks all notifications
  if (session.user.role === "admin") {
    await Notification.updateMany({ read: false }, { read: true });
    return;
  }

  await Notification.updateMany({ userId: session.user.id, read: false }, { read: true });
}

export async function deleteNotification(id: string) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  await connectDB();

  // Admin can delete any notification
  if (session.user.role === "admin") {
    await Notification.findByIdAndDelete(id);
    return;
  }

  await Notification.findOneAndDelete({ _id: id, userId: session.user.id });
}

export async function deleteAllNotifications() {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  await connectDB();

  // Admin deletes all notifications
  if (session.user.role === "admin") {
    await Notification.deleteMany({});
    return;
  }

  await Notification.deleteMany({ userId: session.user.id });
}

export async function clearOldNotifications() {
  await connectDB();
  await Notification.deleteMany({});
}

export async function createNotification(data: {
  userId: string;
  title: string;
  message: string;
  type?: string;
  relatedId?: string;
}) {
  await connectDB();
  await Notification.create(data);
}
