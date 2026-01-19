"use server";

import { connectDB } from "../db/mongodb";
import { User, Property, Inquiry } from "../db/models";
import { auth } from "../auth";

export async function getAllUsers() {
  const session = await auth();
  if (session?.user?.role !== "admin") {
    throw new Error("Unauthorized");
  }

  await connectDB();
  const users = await User.find({}).select("-password").lean();
  return JSON.parse(
    JSON.stringify(
      users.map((user) => ({
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        mobile: user.mobile,
        role: user.role,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      }))
    )
  );
}

export async function getUserById(userId: string) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  // Users can view their own profile, admins can view any
  if (session.user.id !== userId && session.user.role !== "admin") {
    throw new Error("Unauthorized");
  }

  await connectDB();
  const user = await User.findById(userId).select("-password").lean();
  return user
    ? JSON.parse(
        JSON.stringify({
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          mobile: user.mobile,
          role: user.role,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        })
      )
    : null;
}

export async function updateUser(
  userId: string,
  data: { name?: string; mobile?: string; avatar?: string }
) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  // Users can update their own profile, admins can update any
  if (session.user.id !== userId && session.user.role !== "admin") {
    throw new Error("Unauthorized");
  }

  await connectDB();
  const user = await User.findByIdAndUpdate(userId, data, { new: true }).select("-password").lean();
  return user ? { ...user, id: user._id.toString() } : null;
}

export async function updateUserRole(userId: string, role: string) {
  const session = await auth();
  if (session?.user?.role !== "admin") {
    throw new Error("Unauthorized");
  }

  await connectDB();
  const user = await User.findByIdAndUpdate(userId, { role }, { new: true })
    .select("-password")
    .lean();
  return user ? { ...user, id: user._id.toString() } : null;
}

export async function deleteUser(userId: string) {
  const session = await auth();
  if (session?.user?.role !== "admin") {
    throw new Error("Unauthorized");
  }

  await connectDB();

  // Delete user's properties
  await Property.deleteMany({ ownerId: userId });

  // Delete user's inquiries
  await Inquiry.deleteMany({ userId: userId });

  // Delete user
  const result = await User.findByIdAndDelete(userId);
  return !!result;
}

export async function getUserStats(userId?: string) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  const targetUserId = userId || session.user.id;

  // Users can view their own stats, admins can view any
  if (session.user.id !== targetUserId && session.user.role !== "admin") {
    throw new Error("Unauthorized");
  }

  await connectDB();

  const propertyCount = await Property.countDocuments({ ownerId: targetUserId });
  const inquiryCount = await Inquiry.countDocuments({ userId: targetUserId });
  const user = await User.findById(targetUserId).lean();
  const favoriteCount = user?.favorites?.length || 0;

  return { propertyCount, inquiryCount, favoriteCount };
}
