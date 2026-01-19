"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Property } from "@/lib/types/data";
import Image from "next/image";
import Link from "next/link";
import { Eye, MapPin, Home, Edit, Trash2, Heart } from "lucide-react";

interface PropertyCardProps {
  property: Property;
  showActions?: boolean;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export default function PropertyCard({
  property,
  showActions = false,
  onEdit,
  onDelete,
}: PropertyCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow group">
      <Link href={`/property/${property.id}`}>
        <div className="relative h-48 w-full bg-gray-200">
          {property.images?.[0] ? (
            <Image src={property.images[0]} alt={property.title} fill className="object-cover" />
          ) : (
            <div className="h-full flex items-center justify-center">
              <Home className="h-12 w-12 text-gray-400" />
            </div>
          )}
          <div className="absolute top-3 right-3">
            <Badge
              className={
                property.availability === "available"
                  ? "bg-green-500"
                  : property.availability === "rented"
                    ? "bg-red-500"
                    : "bg-yellow-500"
              }
            >
              {property.availability}
            </Badge>
          </div>
        </div>
      </Link>
      <CardContent className="p-4">
        <Link href={`/property/${property.id}`}>
          <h3 className="font-semibold text-lg mb-2 line-clamp-1 hover:text-blue-600">
            {property.title}
          </h3>
        </Link>
        <p className="text-sm text-muted-foreground flex items-center gap-1 mb-3">
          <MapPin className="h-4 w-4" />
          {property.location.area}, {property.location.city}
        </p>
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-2xl font-bold">NPR {property.price.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground">per month</p>
          </div>
          {property.views !== undefined && (
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Eye className="h-4 w-4" />
              <span>{property.views}</span>
            </div>
          )}
        </div>
        {showActions ? (
          <div className="flex gap-2">
            <Button asChild variant="outline" size="sm" className="flex-1">
              <Link href={`/property/${property.id}`}>
                <Eye className="h-4 w-4 mr-1" />
                View
              </Link>
            </Button>
            {onEdit && (
              <Button variant="outline" size="sm" onClick={() => onEdit(property.id)}>
                <Edit className="h-4 w-4" />
              </Button>
            )}
            {onDelete && (
              <Button
                variant="outline"
                size="sm"
                className="text-red-600 hover:text-red-700"
                onClick={() => onDelete(property.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>
        ) : (
          <div className="flex gap-2">
            <Button asChild className="flex-1">
              <Link href={`/property/${property.id}`}>View Details</Link>
            </Button>
            <Button variant="outline" size="sm">
              <Heart className="h-4 w-4" />
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
