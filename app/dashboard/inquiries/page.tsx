"use client";

import { StatCard } from "@/components/dashboard/StatCard";
import { useEffect, useState } from "react";
import { getReceivedInquiries, updateInquiryStatus } from "@/lib/actions";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MessageSquare, Mail, Phone, Calendar, CheckCircle, XCircle, Clock } from "lucide-react";
import { toast } from "react-hot-toast";
import { Inquiry } from "@/lib/types";
import { formatDate } from "@/lib/utils";

export default function InquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "pending" | "approved" | "rejected">("all");

  useEffect(() => {
    let isMounted = true;
    getReceivedInquiries().then((result) => {
      if (isMounted) {
        setInquiries(result);
        setLoading(false);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const handleStatusUpdate = async (id: string, status: "approved" | "rejected") => {
    try {
      await updateInquiryStatus(id, status);
      setInquiries((prev) => prev.map((inq) => (inq.id === id ? { ...inq, status } : inq)));
      toast.success(`Inquiry ${status}`);
    } catch (error) {
      toast.error("Failed to update inquiry");
    }
  };

  const filteredInquiries =
    filter === "all" ? inquiries : inquiries.filter((inq) => inq.status === filter);

  const stats = {
    total: inquiries.length,
    pending: inquiries.filter((inq) => inq.status === "pending").length,
    approved: inquiries.filter((inq) => inq.status === "approved").length,
    rejected: inquiries.filter((inq) => inq.status === "rejected").length,
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Inquiries</h1>
        <div className="grid md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="h-4 bg-gray-200 rounded mb-2" />
                <div className="h-8 bg-gray-200 rounded" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Inquiries</h1>
        <p className="text-sm text-muted-foreground mt-1">Manage property inquiries</p>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-4">
        {[
          {
            label: "Total",
            value: stats.total,
            icon: MessageSquare,
            color: "from-blue-400 to-blue-500",
            filter: "all",
          },
          {
            label: "Pending",
            value: stats.pending,
            icon: Clock,
            color: "from-yellow-400 to-yellow-500",
            filter: "pending",
          },
          {
            label: "Approved",
            value: stats.approved,
            icon: CheckCircle,
            color: "from-green-400 to-green-500",
            filter: "approved",
          },
          {
            label: "Rejected",
            value: stats.rejected,
            icon: XCircle,
            color: "from-red-400 to-red-500",
            filter: "rejected",
          },
        ].map((stat) => (
          <StatCard
            key={stat.filter}
            {...stat}
            onClick={() => setFilter(stat.filter as any)}
            isActive={filter === stat.filter}
          />
        ))}
      </div>

      {/* Inquiries List */}
      {filteredInquiries.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="p-12 text-center">
            <MessageSquare className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">
              {filter === "all" ? "No inquiries yet" : `No ${filter} inquiries`}
            </h3>
            <p className="text-muted-foreground">
              {filter === "all"
                ? "You'll see inquiries here when people are interested in your properties"
                : `Switch to "All" to see other inquiries`}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {filteredInquiries.map((inquiry: Inquiry) => (
            <Card key={inquiry.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3 flex-1">
                    <div className="h-10 w-10 rounded-lg bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-700 dark:text-gray-300 font-semibold text-sm shrink-0">
                      {inquiry.tenantName
                        .split(" ")
                        .map((n: string) => n[0])
                        .join("")
                        .toUpperCase()
                        .slice(0, 2)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-base">{inquiry.tenantName}</h3>
                      <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted-foreground mt-0.5">
                        <span className="flex items-center gap-1">
                          <Mail className="h-3 w-3" />
                          {inquiry.tenantEmail}
                        </span>
                        <span className="flex items-center gap-1">
                          <Phone className="h-3 w-3" />
                          {inquiry.tenantPhone}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {formatDate(inquiry.moveInDate)}
                        </span>
                      </div>
                    </div>
                  </div>
                  <Badge
                    className={
                      inquiry.status === "approved"
                        ? "bg-green-500"
                        : inquiry.status === "rejected"
                          ? "bg-red-500"
                          : "bg-yellow-500"
                    }
                  >
                    {inquiry.status}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mt-3 mb-2 line-clamp-2">
                  {inquiry.message}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    {formatDate(inquiry.createdAt)} at{" "}
                    {new Date(inquiry.createdAt).toLocaleTimeString()}
                  </span>
                  {inquiry.status === "pending" && (
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        className="bg-indigo-600 hover:bg-indigo-700 text-white h-7 text-xs"
                        onClick={() => handleStatusUpdate(inquiry.id, "approved")}
                      >
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Approve
                      </Button>
                      <Button
                        size="sm"
                        className="bg-gray-600 hover:bg-gray-700 text-white h-7 text-xs"
                        onClick={() => handleStatusUpdate(inquiry.id, "rejected")}
                      >
                        <XCircle className="h-3 w-3 mr-1" />
                        Reject
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
