import { useUser } from "@/hooks/useUser";
import {
  Link,
  LayoutDashboard,
  Building2,
  MessageSquare,
  Settings,
  Users,
  PlusCircle,
} from "lucide-react";
import NextLink from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const { user } = useUser();
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="p-2 space-y-0.5">
      {user?.role === "admin" ? (
        // Admin navigation
        <>
          <NextLink
            href="/dashboard/admin"
            className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm ${
              isActive("/dashboard/admin")
                ? "bg-blue-50 text-blue-700 font-medium"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <LayoutDashboard className="h-4 w-4" />
            Admin Dashboard
          </NextLink>
          <NextLink
            href="/dashboard/admin/users"
            className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm ${
              isActive("/dashboard/admin/users")
                ? "bg-blue-50 text-blue-700 font-medium"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <Users className="h-4 w-4" />
            Manage Users
          </NextLink>
          <NextLink
            href="/dashboard/settings"
            className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm ${
              isActive("/dashboard/settings")
                ? "bg-blue-50 text-blue-700 font-medium"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <Settings className="h-4 w-4" />
            Settings
          </NextLink>
        </>
      ) : (
        // Owner navigation
        <>
          <NextLink
            href="/dashboard"
            className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm ${
              isActive("/dashboard")
                ? "bg-blue-50 text-blue-700 font-medium"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <LayoutDashboard className="h-4 w-4" />
            Dashboard
          </NextLink>
          <NextLink
            href="/dashboard/listings"
            className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm ${
              isActive("/dashboard/listings")
                ? "bg-blue-50 text-blue-700 font-medium"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <Building2 className="h-4 w-4" />
            My Listings
          </NextLink>
          <NextLink
            href="/dashboard/add"
            className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm ${
              isActive("/dashboard/add")
                ? "bg-blue-50 text-blue-700 font-medium"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <PlusCircle className="h-4 w-4" />
            Add Property
          </NextLink>
          <NextLink
            href="/dashboard/inquiries"
            className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm ${
              isActive("/dashboard/inquiries")
                ? "bg-blue-50 text-blue-700 font-medium"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <MessageSquare className="h-4 w-4" />
            Inquiries
          </NextLink>
          <NextLink
            href="/dashboard/settings"
            className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm ${
              isActive("/dashboard/settings")
                ? "bg-blue-50 text-blue-700 font-medium"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <Settings className="h-4 w-4" />
            Settings
          </NextLink>
        </>
      )}
    </nav>
  );
};

export default Navbar;
