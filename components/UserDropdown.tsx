"use client";

import { LogOut, LayoutDashboard, Heart, Calendar, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useUser } from "@/hooks/useUser";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { useState } from "react";

export default function UserDropdown() {
  const { user } = useUser();
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    await signOut({ callbackUrl: "/" });
  };

  const userImage = user?.avatar;
  const isOwnerOrAdmin = user?.role === "owner" || user?.role === "admin";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="rounded-full p-0 h-8 w-8 overflow-hidden"
        >
          {userImage ? (
            <img
              src={userImage}
              alt={user.name || "User"}
              className="h-full w-full object-cover"
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="h-full w-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-white font-semibold text-xs">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64">
        <DropdownMenuLabel>
          <div className="flex items-center gap-3 py-2">
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-white font-semibold overflow-hidden">
              {userImage ? (
                <img
                  src={userImage}
                  alt={user.name || "User"}
                  className="h-full w-full rounded-full object-cover"
                  referrerPolicy="no-referrer"
                />
              ) : (
                user?.name?.charAt(0).toUpperCase()
              )}
            </div>
            <div className="flex flex-col">
              <p className="text-sm font-semibold">{user?.name}</p>
              <p className="text-xs text-muted-foreground truncate">
                {user?.email}
              </p>
              {process.env.NODE_ENV === "development" && (
                <p className="text-xs font-medium text-blue-600 mt-1">
                  Role: {user?.role}
                </p>
              )}
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        {isOwnerOrAdmin ? (
          // Owner/Admin - Show Dashboard
          <DropdownMenuItem asChild className="py-2.5">
            <Link href={user?.role === "admin" ? "/dashboard/admin" : "/dashboard"} className="cursor-pointer">
              <LayoutDashboard className="mr-3 h-4 w-4" />
              Dashboard
            </Link>
          </DropdownMenuItem>
        ) : (
          // Regular User - Show user-specific links
          <>
            <DropdownMenuItem asChild className="py-2.5">
              <Link href="/favorites" className="cursor-pointer">
                <Heart className="mr-3 h-4 w-4" />
                Favorites
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild className="py-2.5">
              <Link href="/my-bookings" className="cursor-pointer">
                <Calendar className="mr-3 h-4 w-4" />
                My Bookings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild className="py-2.5">
              <Link href="/profile" className="cursor-pointer">
                <User className="mr-3 h-4 w-4" />
                Profile
              </Link>
            </DropdownMenuItem>
          </>
        )}
        
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => setShowLogoutDialog(true)}
          className="cursor-pointer text-red-600 py-2.5"
          disabled={isLoggingOut}
        >
          <LogOut className="mr-3 h-4 w-4" />
          {isLoggingOut ? "Signing out..." : "Sign Out"}
        </DropdownMenuItem>
      </DropdownMenuContent>

      <ConfirmDialog
        open={showLogoutDialog}
        onOpenChange={setShowLogoutDialog}
        title="Sign Out"
        description="Are you sure you want to sign out?"
        onConfirm={handleLogout}
        confirmText="Sign Out"
        variant="destructive"
      />
    </DropdownMenu>
  );
}
