"use client";

import { useEffect, useState } from "react";
import { getReceivedInquiries, updateInquiryStatus } from "@/lib/actions";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MessageSquare, Mail, Phone, Calendar, CheckCircle, XCircle, Clock } from "lucide-react";
import { toast } from "react-hot-toast";

export default function InquiriesPage() {
  const [inquiries, setInquiries] = useState<any[]>([]);
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
      setInquiries((prev) =>
        prev.map((inq) => (inq.id === id ? { ...inq, status } : inq))
      );
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
        <Card
          className={`cursor-pointer transition-all border-0 ${
            filter === "all"
              ? "bg-gradient-to-br from-blue-500 to-blue-600 text-white"
              : "bg-gradient-to-br from-blue-400/20 to-blue-500/20 hover:from-blue-400/30 hover:to-blue-500/30"
          }`}
          onClick={() => setFilter("all")}
        >
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium ${filter === "all" ? "text-blue-100" : "text-muted-foreground"}`}>
                  Total
                </p>
                <p className="text-3xl font-bold mt-1">{stats.total}</p>
              </div>
              <div className={`h-12 w-12 rounded-full flex items-center justify-center ${
                filter === "all" ? "bg-white/20" : "bg-blue-500/20"
              }`}>
                <MessageSquare className={`h-6 w-6 ${filter === "all" ? "text-white" : "text-blue-600"}`} />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card
          className={`cursor-pointer transition-all border-0 ${
            filter === "pending"
              ? "bg-gradient-to-br from-yellow-500 to-yellow-600 text-white"
              : "bg-gradient-to-br from-yellow-400/20 to-yellow-500/20 hover:from-yellow-400/30 hover:to-yellow-500/30"
          }`}
          onClick={() => setFilter("pending")}
        >
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium ${filter === "pending" ? "text-yellow-100" : "text-muted-foreground"}`}>
                  Pending
                </p>
                <p className="text-3xl font-bold mt-1">{stats.pending}</p>
              </div>
              <div className={`h-12 w-12 rounded-full flex items-center justify-center ${
                filter === "pending" ? "bg-white/20" : "bg-yellow-500/20"
              }`}>
                <Clock className={`h-6 w-6 ${filter === "pending" ? "text-white" : "text-yellow-600"}`} />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card
          className={`cursor-pointer transition-all border-0 ${
            filter === "approved"
              ? "bg-gradient-to-br from-green-500 to-green-600 text-white"
              : "bg-gradient-to-br from-green-400/20 to-green-500/20 hover:from-green-400/30 hover:to-green-500/30"
          }`}
          onClick={() => setFilter("approved")}
        >
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium ${filter === "approved" ? "text-green-100" : "text-muted-foreground"}`}>
                  Approved
                </p>
                <p className="text-3xl font-bold mt-1">{stats.approved}</p>
              </div>
              <div className={`h-12 w-12 rounded-full flex items-center justify-center ${
                filter === "approved" ? "bg-white/20" : "bg-green-500/20"
              }`}>
                <CheckCircle className={`h-6 w-6 ${filter === "approved" ? "text-white" : "text-green-600"}`} />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card
          className={`cursor-pointer transition-all border-0 ${
            filter === "rejected"
              ? "bg-gradient-to-br from-red-500 to-red-600 text-white"
              : "bg-gradient-to-br from-red-400/20 to-red-500/20 hover:from-red-400/30 hover:to-red-500/30"
          }`}
          onClick={() => setFilter("rejected")}
        >
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium ${filter === "rejected" ? "text-red-100" : "text-muted-foreground"}`}>
                  Rejected
                </p>
                <p className="text-3xl font-bold mt-1">{stats.rejected}</p>
              </div>
              <div className={`h-12 w-12 rounded-full flex items-center justify-center ${
                filter === "rejected" ? "bg-white/20" : "bg-red-500/20"
              }`}>
                <XCircle className={`h-6 w-6 ${filter === "rejected" ? "text-white" : "text-red-600"}`} />
              </div>
            </div>
          </CardContent>
        </Card>
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
        <div className="space-y-4">
          {filteredInquiries.map((inquiry: any) => (
            <Card key={inquiry.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-semibold text-sm">
                        {inquiry.tenantName
                          .split(" ")
                          .map((n: string) => n[0])
                          .join("")
                          .toUpperCase()
                          .slice(0, 2)}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{inquiry.tenantName}</h3>
                        <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground mt-1">
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
                            {new Date(inquiry.moveInDate).toLocaleDateString()}
                          </span>
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
                    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg mb-3">
                      <p className="text-sm leading-relaxed">{inquiry.message}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">
                        Received {new Date(inquiry.createdAt).toLocaleDateString()} at{" "}
                        {new Date(inquiry.createdAt).toLocaleTimeString()}
                      </span>
                      {inquiry.status === "pending" && (
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            className="bg-green-600 hover:bg-green-700"
                            onClick={() => handleStatusUpdate(inquiry.id, "approved")}
                          >
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleStatusUpdate(inquiry.id, "rejected")}
                          >
                            <XCircle className="h-4 w-4 mr-1" />
                            Reject
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
