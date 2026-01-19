"use server";

import { connectDB } from "../db/mongodb";
import { User } from "../db/models";
import bcrypt from "bcryptjs";
import { auth } from "../auth";

export async function verifyUserAndResetPassword(
  email: string,
  mobile: string,
  newPassword: string
) {
  await connectDB();

  const user = await User.findOne({ email, mobile });

  if (!user) {
    return { error: "Email and mobile do not match our records" };
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  user.password = hashedPassword;
  await user.save();

  return { success: true };
}

export async function setPassword(newPassword: string) {
  const session = await auth();

  if (!session?.user?.id) {
    return { error: "Unauthorized" };
  }

  await connectDB();

  const user = await User.findById(session.user.id);

  if (!user) {
    return { error: "User not found" };
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  user.password = hashedPassword;
  await user.save();

  return { success: true };
}
