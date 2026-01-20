"use client";

import UserDropdown from "@/components/UserDropdown";
import Link from "next/link";
import Logo from "../../Logo";
import { Button } from "../../ui/button";
import { useUser } from "@/hooks/useUser";
import { usePathname } from "next/navigation";

const NavBar = () => {
  const { user, isAuthenticated } = useUser();
  const pathname = usePathname();

  const publicRoutes = [{ href: "/property", label: "Properties" }];

  const getAuthenticatedRoutes = () => {
    if (!user) return publicRoutes;

    const baseRoutes = [{ href: "/property", label: "Properties" }];

    if (user.role === "user") {
      return [
        ...baseRoutes,
        { href: "/favorites", label: "Favorites" },
        { href: "/my-inquiries", label: "Inquiries" },
        { href: "/add-property", label: "List Property" },
      ];
    }

    if (user.role === "owner" || user.role === "admin") {
      return [...baseRoutes, { href: "/dashboard", label: "Dashboard" }];
    }

    return baseRoutes;
  };

  const routes = isAuthenticated ? getAuthenticatedRoutes() : publicRoutes;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 shadow-sm">
      <nav className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <Logo size={50} href="" />
          <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            RoomFinder
          </span>
        </Link>
        <div className="flex items-center gap-6">
          {routes.map((route) => {
            const isActive = pathname === route.href || pathname.startsWith(route.href + "/");
            return (
              <Link
                key={route.href}
                href={route.href}
                className={`text-sm font-medium transition-all duration-200 px-3 py-1.5 rounded-lg ${
                  isActive
                    ? "text-white bg-gradient-to-r from-indigo-600 to-indigo-700 shadow-lg shadow-indigo-500/30"
                    : "text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
              >
                {route.label}
              </Link>
            );
          })}
          {isAuthenticated ? (
            <UserDropdown />
          ) : (
            <>
              <Link
                href="/add-property"
                className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                List Property
              </Link>
              <Button
                asChild
                className="rounded px-5 h-9 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white font-medium shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/40 transition-all"
              >
                <Link href="/login">Sign In</Link>
              </Button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
