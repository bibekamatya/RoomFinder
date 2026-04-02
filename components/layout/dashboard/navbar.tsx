"use client";

import { Button } from "@/components/ui/button";
import UserDropdown from "@/components/UserDropdown";
import NotificationBell from "@/components/notifications/NotificationBell";
import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";

interface NavbarProps {
  setSidebarOpen: (open: boolean) => void;
}

const Navbar = ({ setSidebarOpen }: NavbarProps) => {
  const pathname = usePathname();

  const getPageTitle = () => {
    if (pathname === "/dashboard") return "Dashboard";
    const segments = pathname.split("/").filter(Boolean);
    const lastSegment = segments[segments.length - 1];
    return lastSegment.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase());
  };

  return (
    <header className="h-16 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between px-6">
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={() => setSidebarOpen(true)}
        >
          <Menu className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">{getPageTitle()}</h1>
          <p className="text-xs text-gray-500 dark:text-gray-400 hidden sm:block">
            {pathname
              .split("/")
              .slice(1, -1)
              .join(" / ")
              .replace(/\b\w/g, (l) => l.toUpperCase())}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <NotificationBell />
        <UserDropdown />
      </div>
    </header>
  );
};

export default Navbar;
