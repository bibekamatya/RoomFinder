"use client";

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
          <h2 className="text-3xl font-bold bg-linear-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Dashboard
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Overview of your properties and activity
          </p>
        </div>
        <Button
          asChild
          className="bg-linear-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
        >
          <Link href="/dashboard/add">
            <Plus className="h-4 w-4 mr-2" />
            Add Property
          </Link>
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-4 gap-4">
        {loading ? (
          Array(4)
            .fill(0)
            .map((_, i) => <StatCardSkeleton key={i} />)
        ) : (
          <>
            <Card className="border-0 bg-linear-to-br from-blue-500 to-blue-600 text-white">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-100 text-xs font-medium">Total Properties</p>
                    <p className="text-2xl font-bold mt-1">{stats.totalProperties}</p>
                  </div>
                  <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center">
                    <Home className="h-5 w-5" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-0 bg-linear-to-br from-green-500 to-green-600 text-white">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-100 text-xs font-medium">Total Views</p>
                    <p className="text-2xl font-bold mt-1">{stats.totalViews}</p>
                  </div>
                  <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center">
                    <Eye className="h-5 w-5" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-0 bg-linear-to-br from-purple-500 to-purple-600 text-white">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-100 text-xs font-medium">Inquiries</p>
                    <p className="text-2xl font-bold mt-1">{stats.totalInquiries}</p>
                  </div>
                  <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center">
                    <MessageSquare className="h-5 w-5" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-0 bg-linear-to-br from-orange-500 to-orange-600 text-white">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-orange-100 text-xs font-medium">Available</p>
                    <p className="text-2xl font-bold mt-1">{stats.availableProperties}</p>
                  </div>
                  <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center">
                    <TrendingUp className="h-5 w-5" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>

      {/* Recent Properties */}
      <div className="grid lg:grid-cols-2 gap-6">
        <RecentProperties />
        <Inquiries />
      </div>
    </div>
  );
}
