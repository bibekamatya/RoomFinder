"use client";

import UserDropdown from "@/components/UserDropdown";
import Link from "next/link";
import Logo from "../../Logo";
import { Button } from "../../ui/button";
import { useUser } from "@/hooks/useUser";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const NavBar = () => {
  const { user, isAuthenticated } = useUser();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 sm:gap-3">
          <Logo size={40} href="" />
          <span className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
            RoomFinder
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          {routes.map((route) => {
            const isActive = pathname === route.href || pathname.startsWith(route.href + "/");
            return (
              <Link
                key={route.href}
                href={route.href}
                className={`text-sm font-medium transition-colors px-3 py-1.5 rounded-lg ${
                  isActive
                    ? "text-white bg-indigo-600"
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
                className="rounded-full px-6 bg-indigo-600 hover:bg-indigo-700 text-white"
              >
                <Link href="/login">Sign In</Link>
              </Button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-gray-700 dark:text-gray-300"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-950 border-b border-gray-100 dark:border-gray-900">
          <div className="px-4 py-3 space-y-2">
            {routes.map((route) => {
              const isActive = pathname === route.href || pathname.startsWith(route.href + "/");
              return (
                <Link
                  key={route.href}
                  href={route.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block text-sm font-medium transition-colors px-3 py-2 rounded-lg ${
                    isActive
                      ? "text-white bg-indigo-600"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                >
                  {route.label}
                </Link>
              );
            })}
            {isAuthenticated ? (
              <div className="pt-2">
                <UserDropdown />
              </div>
            ) : (
              <>
                <Link
                  href="/add-property"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  List Property
                </Link>
                <Button asChild className="w-full bg-indigo-600 hover:bg-indigo-700 text-white">
                  <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                    Sign In
                  </Link>
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default NavBar;
