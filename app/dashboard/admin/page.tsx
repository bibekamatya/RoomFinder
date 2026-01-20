"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Building2, MessageSquare, Activity, ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { DataTable } from "@/components/ui/data-table";
import { getAllUsers } from "@/lib/actions/users";
import { useEffect, useState } from "react";
import { formatDate } from "@/lib/utils";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getAllUsers().then(setUsers);
  }, []);

  const userColumns = [
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "mobile", label: "Mobile" },
    {
      key: "role",
      label: "Role",
      render: (user: any) => (
        <Badge variant={user.role === "admin" ? "default" : "secondary"}>{user.role}</Badge>
      ),
    },
    {
      key: "createdAt",
      label: "Joined",
      render: (user: any) => formatDate(user.createdAt),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="p-2 bg-blue-50 dark:bg-blue-950 rounded-lg">
                <Users className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
            <p className="text-2xl font-bold">{users.length}</p>
            <p className="text-xs text-muted-foreground">Total Users</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="p-2 bg-purple-50 dark:bg-purple-950 rounded-lg">
                <Building2 className="h-4 w-4 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
            <p className="text-2xl font-bold">0</p>
            <p className="text-xs text-muted-foreground">Total Listings</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="p-2 bg-orange-50 dark:bg-orange-950 rounded-lg">
                <MessageSquare className="h-4 w-4 text-orange-600 dark:text-orange-400" />
              </div>
            </div>
            <p className="text-2xl font-bold">0</p>
            <p className="text-xs text-muted-foreground">Pending Inquiries</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="p-2 bg-green-50 dark:bg-green-950 rounded-lg">
                <Activity className="h-4 w-4 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <p className="text-2xl font-bold">0</p>
            <p className="text-xs text-muted-foreground">Active Listings</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Users</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable data={users} columns={userColumns} />
        </CardContent>
      </Card>
    </div>
  );
}
