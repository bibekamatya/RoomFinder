"use client";

import { Search, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import PropertyListSkeleton from "@/components/skeletons/PropertyListSkeleton";
import Link from "next/link";
import Image from "next/image";
import { Property } from "@/lib/types/data";
import { usePropertySearch } from "@/hooks/usePropertySearch";


export default function PropertyList() {
  const { query, setQuery, properties, isPending } = usePropertySearch()

  return (
    <>
      <div className="mb-8 w-full flex justify-center mx-auto">
        <Input
          placeholder="Search by city, area, or property name..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="md:max-w-xl w-full flex mx-auto"
        />
      </div>

      {isPending ? (
        <PropertyListSkeleton />
      ) : properties.length === 0 ? (
        <div className="text-center py-12">
          <Search className="h-12 w-12 mx-auto mb-3 text-muted-foreground opacity-50" />
          <p className="text-muted-foreground">No properties found</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {properties.map((property: Property) => (
            <Card key={property.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-48 bg-gray-200">
                {property.images?.[0] && (
                  <Image
                    src={property.images[0]}
                    alt={property.title}
                    fill
                    className="object-cover"
                  />
                )}
              </div>
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
                  {property.amenities.slice(0, 3).map((amenity) => (
                    <Badge key={amenity} variant="secondary" className="text-xs">
                      {amenity}
                    </Badge>
                  ))}
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-2xl font-bold">NPR {property.price.toLocaleString()}</span>
                  <Button size="sm" asChild>
                    <Link href={`/property/${property.id}`}>View</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </>
  );
}
