"use client";

import { StatCard } from "@/components/dashboard/StatCard";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Home, Eye, MessageSquare, TrendingUp } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getDashboardStats } from "@/lib/actions";
import { checkStaleProperties } from "@/lib/actions/cron";
import { StatCardSkeleton } from "@/components/skeletons/DashboardSkeleton";
import Inquiries from "@/components/dashboard/inquiries";
import RecentProperties from "@/components/dashboard/recentProperties";

export default function OwnerDashboard() {
  const [stats, setStats] = useState({
    totalProperties: 0,
    totalViews: 0,
    totalInquiries: 0,
    availableProperties: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    getDashboardStats().then((result) => {
      if (isMounted && result) {
        setStats(result);
        setLoading(false);
      }
    });

    // Check for stale properties
    checkStaleProperties();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Dashboard</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Overview of your properties and activity
          </p>
        </div>
        <Button
          asChild
          className="h-10 px-6 bg-indigo-600 hover:bg-indigo-700 text-white font-medium transition-colors"
        >
          <Link href="/dashboard/add">
            <Plus className="h-4 w-4 mr-2" />
            Add Property
          </Link>
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-4 gap-4">
        {loading
          ? Array(4)
              .fill(0)
              .map((_, i) => <StatCardSkeleton key={i} />)
          : [
              {
                label: "Total Properties",
                value: stats.totalProperties,
                icon: Home,
                color: "from-indigo-400 to-indigo-500",
              },
              {
                label: "Total Views",
                value: stats.totalViews,
                icon: Eye,
                color: "from-emerald-400 to-teal-500",
              },
              {
                label: "Inquiries",
                value: stats.totalInquiries,
                icon: MessageSquare,
                color: "from-purple-400 to-pink-500",
              },
              {
                label: "Available",
                value: stats.availableProperties,
                icon: TrendingUp,
                color: "from-orange-400 to-red-500",
              },
            ].map((stat, i) => <StatCard key={i} {...stat} />)}
      </div>

      {/* Recent Properties */}
      <div className="grid lg:grid-cols-2 gap-6">
        <RecentProperties />
        <Inquiries />
      </div>
    </div>
  );
}
