import { Link, MessageSquare } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { getRecentInquiries } from "@/lib/actions";
import { Inquiry } from "@/lib/types";
import { InquiryItemSkeleton } from "@/components/skeletons/DashboardSkeleton";
import { useEffect, useState } from "react";

export default function Inquiries() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let isMounted = true;

    getRecentInquiries().then((result) => {
      if (isMounted && result) {
        setInquiries(result);
        setLoading(false);
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Recent Inquiries</h3>
          <Button asChild variant="ghost" size="sm">
            <Link href="/dashboard/inquiries">View All</Link>
          </Button>
        </div>
        <div className="space-y-3">
          {loading ? (
            Array(3)
              .fill(0)
              .map((_, i) => <InquiryItemSkeleton key={i} />)
          ) : inquiries.length === 0 ? (
            <div className="text-center py-8">
              <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
              <p className="text-sm text-muted-foreground">No inquiries yet</p>
            </div>
          ) : (
            inquiries.map((inq) => {
              const initials = inq.tenantName
                .split(" ")
                .map((n: string) => n[0])
                .join("")
                .toUpperCase()
                .slice(0, 2);
              const timeAgo = new Date(inq.createdAt).toLocaleDateString();
              return (
                <div
                  key={inq.id}
                  className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <div className="h-10 w-10 rounded-full bg-linear-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-semibold text-xs shrink-0">
                    {initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm">{inq.tenantName}</p>
                    <p className="text-xs text-muted-foreground line-clamp-1">{inq.message}</p>
                  </div>
                  <span className="text-xs text-muted-foreground">{timeAgo}</span>
                </div>
              );
            })
          )}
        </div>
      </CardContent>
    </Card>
  );
}
