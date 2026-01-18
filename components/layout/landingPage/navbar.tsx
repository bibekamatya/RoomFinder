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
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-950/80 backdrop-blur-lg border-b border-gray-100 dark:border-gray-900">
      <nav className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <Logo size={50} href="" />
          <span className="text-xl font-bold text-gray-900 dark:text-white">
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
                className={`text-sm font-medium transition-colors px-3 py-1.5 rounded-lg ${
                  isActive
                    ? "text-white bg-gradient-to-r from-purple-600 to-blue-600"
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
                className="rounded-full px-6 bg-linear-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
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
