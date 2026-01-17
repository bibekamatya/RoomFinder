'use server';

import { connectDB } from '../db/mongodb';
import { User } from '../db/models';
import bcrypt from 'bcryptjs';

export async function registerUser(name: string, email: string, mobile: string, password: string) {
  await connectDB();
  
  const existingUser = await User.findOne({ $or: [{ email }, { mobile }] });
  if (existingUser) {
    return { error: 'Email or mobile already exists' };
  }

  const userCount = await User.countDocuments();
  const hashedPassword = await bcrypt.hash(password, 10);
  
  const user = await User.create({
    name,
    email,
    mobile,
    password: hashedPassword,
    role: userCount === 0 ? 'admin' : 'user',
  });

  return { success: true, userId: user._id.toString() };
}
