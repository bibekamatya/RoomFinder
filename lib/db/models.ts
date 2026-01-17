import mongoose from 'mongoose';

const RoomSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  priceType: { type: String, enum: ['monthly', 'daily'], required: true },
  propertyType: { type: String, enum: ['apartment', 'room', 'house'], required: true },
  location: {
    address: String,
    city: String,
    area: String,
  },
  amenities: [String],
  images: [String],
  specifications: {
    size: Number,
    rooms: Number,
    bathrooms: Number,
    furnished: Boolean,
  },
  availability: { type: String, enum: ['available', 'rented', 'pending'], default: 'available' },
  ownerId: { type: String, required: true },
}, { timestamps: true });

const InquirySchema = new mongoose.Schema({
  roomId: { type: String, required: true },
  userId: { type: String, required: true },
  tenantName: { type: String, required: true },
  tenantEmail: { type: String, required: true },
  tenantPhone: { type: String, required: true },
  message: { type: String, required: true },
  moveInDate: { type: String, required: true },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
}, { timestamps: true });

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  mobile: { type: String, unique: true, sparse: true },
  password: { type: String },
  role: { type: String, enum: ['user', 'owner', 'admin'], default: 'user' },
  avatar: String,
  favorites: [{ type: String }],
}, { timestamps: true });

export const Room = mongoose.models.Room || mongoose.model('Room', RoomSchema);
export const Inquiry = mongoose.models.Inquiry || mongoose.model('Inquiry', InquirySchema);
export const User = mongoose.models.User || mongoose.model('User', UserSchema);
