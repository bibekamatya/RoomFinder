export interface Room {
  id: string;
  title: string;
  description: string;
  price: number;
  priceType: "monthly" | "daily";
  propertyType: "apartment" | "room" | "house";
  location: {
    address: string;
    city: string;
    area: string;
  };
  amenities: string[];
  images: string[];
  specifications: {
    size?: number;
    rooms?: number;
    bathrooms?: number;
    furnished: boolean;
  };
  availability: "available" | "rented" | "pending";
  ownerId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Inquiry {
  id: string;
  roomId: string;
  userId: string;
  tenantName: string;
  tenantEmail: string;
  tenantPhone: string;
  message: string;
  moveInDate: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: "user" | "owner" | "admin";
  avatar?: string;
}

declare module "next-auth" {
  interface User {
    role?: string;
    avatar?: string;
  }
  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
      role: string;
      avatar?: string;
      password?: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: string;
    id?: string;
  }
}
