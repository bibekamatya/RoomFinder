"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useUser } from "@/hooks/useUser";
import Navbar from "@/components/layout/dashboard/navbar";
import Sidebar from "@/components/layout/dashboard/sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useUser();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, isLoading, router]);

  return (
    <div className="flex h-screen">
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      <Sidebar sidebarOpen={sidebarOpen} />

      <div className="flex-1 flex flex-col overflow-hidden bg-gray-50 dark:bg-gray-950">
        <Navbar setSidebarOpen={setSidebarOpen} />
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </div>
  );
}
