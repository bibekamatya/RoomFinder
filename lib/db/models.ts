import mongoose from "mongoose";

const PropertySchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    propertyType: { type: String, enum: ["room", "flat", "house", "hostel", "pg"], required: true },
    roomType: { type: String, enum: ["single", "shared"], required: true },
    price: { type: Number, required: true },
    securityDeposit: { type: Number },
    availableFrom: { type: String, required: true },
    minimumStay: { type: String },
    location: {
      address: { type: String, required: true },
      city: { type: String, required: true },
      area: { type: String, required: true },
    },
    specifications: {
      size: Number,
      rooms: Number,
      bathrooms: Number,
      furnished: { type: Boolean, default: false },
    },
    amenities: [String],
    suitableFor: String,
    houseRules: {
      smoking: { type: Boolean, default: false },
      pets: { type: Boolean, default: false },
    },
    contact: {
      name: { type: String, required: true },
      phone: { type: String, required: true },
    },
    availability: { type: String, enum: ["available", "rented", "pending"], default: "available" },
    ownerId: { type: String, required: true },
    images: [String],
    views: { type: Number, default: 0 },
    lastUpdated: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const InquirySchema = new mongoose.Schema(
  {
    propertyId: { type: String, required: true },
    userId: { type: String, required: true },
    tenantName: { type: String, required: true },
    tenantEmail: { type: String, required: true },
    tenantPhone: { type: String, required: true },
    message: { type: String, required: true },
    moveInDate: { type: String, required: true },
    status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" },
  },
  { timestamps: true }
);

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    mobile: { type: String, unique: true, sparse: true },
    password: { type: String },
    role: { type: String, enum: ["user", "owner", "admin"], default: "user" },
    avatar: String,
    favorites: [{ type: String }],
  },
  { timestamps: true }
);

const NotificationSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    title: { type: String, required: true },
    message: { type: String, required: true },
    type: { type: String, enum: ["inquiry_status", "new_inquiry", "general", "stale_property"], default: "general" },
    read: { type: Boolean, default: false },
    relatedId: { type: String },
  },
  { timestamps: true }
);

// Auto-delete notifications older than 7 days
NotificationSchema.index({ createdAt: 1 }, { expireAfterSeconds: 604800 });

export const Property = mongoose.models.Property || mongoose.model("Property", PropertySchema);
export const Inquiry = mongoose.models.Inquiry || mongoose.model("Inquiry", InquirySchema);
export const User = mongoose.models.User || mongoose.model("User", UserSchema);
export const Notification = mongoose.models.Notification || mongoose.model("Notification", NotificationSchema);
