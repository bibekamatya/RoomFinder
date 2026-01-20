import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Mail, Phone, Calendar, MapPin, Clock } from "lucide-react";
import { Inquiry } from "@/lib/types";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getMyInquiries } from "@/lib/actions";
import { formatDate } from "@/lib/utils";

export default async function MyInquiriesPage() {
  const inquiries = await getMyInquiries();
  const plainInquiries = JSON.parse(JSON.stringify(inquiries));

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="mb-10">
          <h1 className="text-4xl font-bold mb-2 text-gray-900 dark:text-gray-100">My Inquiries</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Track your property inquiries and responses
          </p>
        </div>

        {plainInquiries.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="h-16 w-16 rounded-xl bg-gray-200 dark:bg-gray-800 flex items-center justify-center mb-4">
              <MessageSquare className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">
              No inquiries yet
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6 text-center max-w-md">
              Start browsing properties and send inquiries to owners
            </p>
            <Button
              asChild
              className="h-10 px-6 bg-indigo-600 hover:bg-indigo-700 text-white transition-colors"
            >
              <Link href="/property">Browse Properties</Link>
            </Button>
          </div>
        ) : (
          <div className="grid gap-4">
            {plainInquiries.map((inquiry: Inquiry) => (
              <Card
                key={inquiry.id}
                className="group hover:border-gray-400 dark:hover:border-gray-600 transition-all border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900"
              >
                <div
                  className="h-1 w-full"
                  style={{
                    background:
                      inquiry.status === "approved"
                        ? "rgb(34 197 94)"
                        : inquiry.status === "rejected"
                          ? "rgb(239 68 68)"
                          : "rgb(234 179 8)",
                  }}
                />
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white text-sm font-bold">
                        {inquiry.tenantName?.charAt(0) || "T"}
                      </div>
                      <div>
                        <h3 className="font-semibold text-sm text-gray-900 dark:text-gray-100">
                          Property Title
                        </h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          Property Location
                        </p>
                      </div>
                    </div>
                    <Badge
                      className={
                        inquiry.status === "approved"
                          ? "bg-green-500 text-white text-xs"
                          : inquiry.status === "rejected"
                            ? "bg-red-500 text-white text-xs"
                            : "bg-yellow-500 text-white text-xs"
                      }
                    >
                      {inquiry.status}
                    </Badge>
                  </div>

                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-2 line-clamp-1">
                    {inquiry.message}
                  </p>

                  <div className="flex flex-wrap gap-2 text-xs text-gray-600 dark:text-gray-400">
                    <span className="flex items-center gap-1">
                      <Mail className="h-3 w-3 text-indigo-500" />
                      {inquiry.tenantEmail}
                    </span>
                    <span className="flex items-center gap-1">
                      <Phone className="h-3 w-3 text-green-500" />
                      {inquiry.tenantPhone}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3 text-indigo-500" />
                      {formatDate(inquiry.moveInDate)}
                    </span>
                    <span className="flex items-center gap-1 ml-auto text-gray-400">
                      <Clock className="h-3 w-3" />
                      {formatDate(inquiry.createdAt)}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
