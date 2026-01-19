"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import { Badge } from "@/components/ui/badge";
import { getAllUsers } from "@/lib/actions/users";
import { useEffect, useState } from "react";

export default function UsersPage() {
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
      render: (user: any) => new Date(user.createdAt).toLocaleDateString(),
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>All Users</CardTitle>
      </CardHeader>
      <CardContent>
        <DataTable data={users} columns={userColumns} />
      </CardContent>
    </Card>
  );
}
