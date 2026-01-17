"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, MapPin, Edit, Trash2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getMyRooms } from "@/lib/actions/rooms";

export default function OwnerDashboard() {
  const [rooms, setRooms] = useState<any[]>([]);

  useEffect(() => {
    getMyRooms().then(setRooms);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">My Properties</h2>
          <p className="text-sm text-muted-foreground mt-1">Manage your room listings</p>
        </div>
        <Button asChild>
          <Link href="/dashboard/add">
            <Plus className="h-4 w-4 mr-2" />
            Add Property
          </Link>
        </Button>
      </div>

      {rooms.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <p className="text-muted-foreground">No properties yet. Add your first property!</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {rooms.map((room: any) => (
            <Card key={room.id}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex gap-4 flex-1">
                    <div className="w-24 h-24 bg-gray-200 dark:bg-gray-800 rounded-lg flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold mb-1">{room.title}</h3>
                      <p className="text-sm text-muted-foreground flex items-center gap-1 mb-2">
                        <MapPin className="h-3 w-3" />
                        {room.location.area}, {room.location.city}
                      </p>
                      <div className="flex items-center gap-3">
                        <span className="text-xl font-bold">NPR {room.price.toLocaleString()}</span>
                        <span className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 text-xs rounded-full">
                          {room.availability}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Trash2 className="h-4 w-4" />
                    </Button>
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
