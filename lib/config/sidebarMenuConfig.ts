import { LayoutDashboard, Users, Building2, MessageSquare, Settings, Heart } from "lucide-react";

export const adminRoutes = [
  { label: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { label: "Users", url: "/dashboard/admin/users", icon: Users },
  { label: "My Properties", url: "/dashboard/properties", icon: Building2 },
  { label: "Inquiries", url: "/dashboard/inquiries", icon: MessageSquare },
];

export const ownerRoutes = [
  { label: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { label: "My Properties", url: "/dashboard/properties", icon: Building2 },
  { label: "Inquiries", url: "/dashboard/inquiries", icon: MessageSquare },
  { label: "Settings", url: "/dashboard/settings", icon: Settings },
];

export const userRoutes = [
  { label: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { label: "Browse Properties", url: "/property", icon: Building2 },
  { label: "Favorites", url: "/favorites", icon: Heart },
  { label: "Settings", url: "/dashboard/settings", icon: Settings },
];
