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

  return (
    <header className="h-16 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between px-6">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={() => setSidebarOpen(true)}
        >
          <Menu className="h-5 w-5" />
        </Button>
        <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
          {pathname === "/admin"
            ? "Dashboard"
            : pathname
                .split("/")
                .pop()
                ?.replace("-", " ")
                .replace(/\b\w/g, (l) => l.toUpperCase())}
        </h1>
      </div>
      <div className="flex items-center gap-3">
        <NotificationBell />
        <UserDropdown />
      </div>
    </header>
  );
};

export default Navbar;
