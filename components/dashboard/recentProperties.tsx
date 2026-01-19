import { getProperties } from "@/lib/actions";
import { Property } from "@/lib/types/data";
import { Home } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import Image from "next/image";
import { useEffect, useState } from "react";
import { PropertyItemSkeleton } from "@/components/skeletons/DashboardSkeleton";
import Link from "next/link";

export default function RecentProperties() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    getProperties().then((result) => {
      if (isMounted && result) {
        setProperties(result);
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
          <h3 className="text-lg font-semibold">Recent Properties</h3>
          <Button asChild variant="ghost" size="sm">
            <Link href="/dashboard/listings">View All</Link>
          </Button>
        </div>
        {loading ? (
          <div className="space-y-3">
            {Array(3)
              .fill(0)
              .map((_, i) => (
                <PropertyItemSkeleton key={i} />
              ))}
          </div>
        ) : properties.length === 0 ? (
          <div className="text-center py-8">
            <Home className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
            <p className="text-sm text-muted-foreground">No properties yet</p>
          </div>
        ) : (
          <div className="space-y-3">
            {properties.slice(0, 3).map((property: Property) => (
              <div
                key={property.id}
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                {property.images?.[0] ? (
                  <div className="relative h-12 w-12 rounded overflow-hidden shrink-0">
                    <Image
                      src={property.images[0]}
                      alt={property.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="h-12 w-12 rounded bg-gray-200 dark:bg-gray-800 shrink-0 flex items-center justify-center">
                    <Home className="h-6 w-6 text-gray-400" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm line-clamp-1">{property.title}</p>
                  <p className="text-xs text-muted-foreground">
                    NPR {property.price.toLocaleString()}
                  </p>
                </div>
                <span className="text-xs text-green-600">{property.availability}</span>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
