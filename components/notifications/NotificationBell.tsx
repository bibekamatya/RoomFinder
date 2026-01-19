"use client";

import { useEffect, useState, useTransition } from "react";
import { Bell, Check, Trash2, X } from "lucide-react";
import { getNotifications, getUnreadCount, markAsRead, markAllAsRead, deleteNotification, deleteAllNotifications } from "@/lib/actions/notifications";
import { useRouter } from "next/navigation";
import { Card } from "../ui/card";
import { Button } from "../ui/button";

import { Notification } from "@/lib/types/data";

export default function NotificationBell() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [, startTransition] = useTransition();
  const router = useRouter();

  const loadNotifications = async () => {
    const [notifications, count] = await Promise.all([getNotifications(), getUnreadCount()]);
    setNotifications(notifications);
    setUnreadCount(count);
  };

  useEffect(() => {
    startTransition(() => {
      loadNotifications();
    });
    const interval = setInterval(() => {
      startTransition(() => {
        loadNotifications();
      });
    }, 30000);
    return () => clearInterval(interval);
  }, []);


  const handleNotificationClick = (notification: Notification) => {
    if (!notification.read) {
      startTransition(async () => {
        await markAsRead(notification.id);
        loadNotifications();
      });
    }
    setIsOpen(false);

    // Redirect based on notification type
    if (notification.type === "new_inquiry" && notification.relatedId) {
      router.push("/dashboard/inquiries");
    } else if (notification.type === "inquiry_status" && notification.relatedId) {
      router.push("/my-bookings");
    } else if (notification.type === "stale_property" && notification.relatedId) {
      router.push("/dashboard/properties");
    } else if (notification.relatedId) {
      router.push(`/property/${notification.relatedId}`);
    }
  };

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    startTransition(async () => {
      await deleteNotification(id);
      loadNotifications();
    });
  };

  const handleMarkAllAsRead = () => {
    startTransition(async () => {
      await markAllAsRead();
      loadNotifications();
    });
  };

  const handleDeleteAll = () => {
    startTransition(async () => {
      await deleteAllNotifications();
      loadNotifications();
    });
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 hover:bg-accent rounded-lg transition-colors"
      >
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <Card className="absolute right-0 top-12 w-80 max-h-96 overflow-hidden z-50 p-0 shadow-xl">
            <div className="sticky top-0 bg-background border-b p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-bold">Notifications</h3>
                <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-accent rounded">
                  <X className="h-4 w-4" />
                </button>
              </div>
              {notifications.length > 0 && (
                <div className="flex gap-2">
                  {unreadCount > 0 && (
                    <Button size="sm" variant="ghost" onClick={handleMarkAllAsRead} className="text-xs h-7">
                      <Check className="h-3 w-3 mr-1" />
                      Mark all read
                    </Button>
                  )}
                  <Button size="sm" variant="ghost" onClick={handleDeleteAll} className="text-xs h-7 text-red-600 hover:text-red-700">
                    <Trash2 className="h-3 w-3 mr-1" />
                    Clear all
                  </Button>
                </div>
              )}
            </div>
            <div className="overflow-y-auto max-h-80">
              {notifications.length === 0 ? (
                <div className="p-12 text-center">
                  <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-3 opacity-50" />
                  <p className="text-muted-foreground text-sm">No notifications yet</p>
                </div>
              ) : (
                notifications.map((notification) => (
                  <div
                    key={notification.id}
                    onClick={() => handleNotificationClick(notification)}
                    className={`group relative border-b last:border-b-0 hover:bg-accent transition-colors cursor-pointer ${!notification.read ? "bg-blue-50 dark:bg-blue-950/30" : "bg-muted/50"
                      }`}
                  >
                    <div className="flex items-center gap-2 p-3 pr-12">
                      <div className="h-8 w-8 rounded-full bg-linear-to-br from-blue-500 to-purple-500 flex items-center justify-center shrink-0">
                        <Bell className="h-4 w-4 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs line-clamp-2" dangerouslySetInnerHTML={{ __html: notification.message.replace(/&quot;/g, '"').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>') }} />
                      </div>
                    </div>
                    <div className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={(e) => handleDelete(notification.id, e)}
                        className="p-1.5 hover:bg-background rounded transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="h-3.5 w-3.5 text-red-600" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </Card>
        </>
      )}
    </div>
  );
}
