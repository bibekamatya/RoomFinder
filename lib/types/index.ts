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
