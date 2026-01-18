import { Search, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getProperties } from "@/lib/actions";
import Link from "next/link";
import Image from "next/image";
import { ProPerty } from "@/lib/types/data";

export default async function PropertyPage() {
  const properties = await getProperties();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="mx-auto max-w-7xl px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Browse Rooms</h1>
          <p className="text-muted-foreground mt-2">Find your perfect space</p>
        </div>

        {/* Search & Filters */}
        <div className="mb-8 flex gap-4">
          <div className="flex-1">
            <Input placeholder="Search location..." className="w-full" />
          </div>
          <Button>
            <Search className="h-4 w-4" />
            Search
          </Button>
        </div>

        {/* Room Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {properties.map((property:ProPerty) => (
            <Card
              key={property.id}
              className="overflow-hidden hover:shadow-lg transition-shadow"
            >
              <Image
                src={property.images?.[0] || "/placeholder.png"}
                alt={property.title}
                width={500}
                height={300}
                className="h-48 bg-linear-to-br from-blue-100 to-blue-200 dark:from-blue-900 dark:to-blue-800"
              />
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <h3 className="font-semibold">{property.title}</h3>
                  <Badge>{property.availability}</Badge>
                </div>
                <p className="text-sm text-muted-foreground mt-2 flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  {property.location.area}, {property.location.city}
                </p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {property.amenities.slice(0, 3).map((amenity: string) => (
                    <Badge
                      key={amenity}
                      variant="secondary"
                      className="text-xs"
                    >
                      {amenity}
                    </Badge>
                  ))}
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-2xl font-bold">
                    NPR {property.price.toLocaleString()}
                  </span>
                  <Button size="sm" asChild>
                    <Link href={`/property/${property.id}`}>View</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
