"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { getUserById } from "@/lib/actions";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { User, Lock, Trash2 } from "lucide-react";
import { User as UserType } from "@/lib/types";

export default function SettingsPage() {
  const { data: session } = useSession();
  const [user, setUser] = useState<UserType>({ email: "", mobile: "", id: "", name: "", role: "user" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session?.user?.id) {
      getUserById(session.user.id).then((result) => {
        setUser(result);
        setLoading(false);
      });
    }
  }, [session]);

  if (loading) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Settings</h1>
        <Card className="animate-pulse">
          <CardContent className="p-6 space-y-4">
            <div className="h-4 bg-gray-200 rounded" />
            <div className="h-4 bg-gray-200 rounded w-2/3" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-sm md:text-base text-muted-foreground">Manage your account preferences and security</p>
      </div>

      <div className="grid gap-4 md:gap-6 sm:grid-cols-2">
        {/* Profile Card */}
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-6 space-y-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-linear-to-br from-purple-500 to-blue-500 flex items-center justify-center shadow-lg">
                <User className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-semibold">Profile</h2>
                <p className="text-sm text-muted-foreground">Your personal information</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-xs font-medium text-muted-foreground" label="Name" />
                <p className="text-sm font-medium">{user.name}</p>
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-medium text-muted-foreground" label="Email" />
                <p className="text-sm font-medium">{user.email}</p>
              </div>
              {user.mobile && (
                <div className="space-y-2">
                  <Label className="text-xs font-medium text-muted-foreground" label="Mobile" />
                  <p className="text-sm font-medium">{user.mobile}</p>
                </div>
              )}
            </div>
            <Button variant="outline" className="w-full">Edit Profile</Button>
          </CardContent>
        </Card>

        {/* Security Card */}
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-6 space-y-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-linear-to-br from-orange-500 to-red-500 flex items-center justify-center shadow-lg">
                <Lock className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-semibold">Security</h2>
                <p className="text-sm text-muted-foreground">Password and account</p>
              </div>
            </div>
            <div className="space-y-3">
              <button className="w-full flex items-center gap-3 p-3 rounded-lg border hover:bg-accent transition-colors text-left">
                <Lock className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Change Password</p>
                  <p className="text-xs text-muted-foreground">Update your password</p>
                </div>
              </button>
              <button className="w-full flex items-center gap-3 p-3 rounded-lg border border-red-200 hover:bg-red-50 transition-colors text-left">
                <Trash2 className="h-4 w-4 text-red-600" />
                <div>
                  <p className="text-sm font-medium text-red-600">Delete Account</p>
                  <p className="text-xs text-red-600/70">Permanently remove your account</p>
                </div>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
