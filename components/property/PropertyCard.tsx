"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Property } from "@/lib/types/data";
import Image from "next/image";
import Link from "next/link";
import { Eye, MapPin, Home, Edit, Trash2, Bed, Bath } from "lucide-react";
import { FavoriteButton } from "./FavoriteButton";

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
    <Card className="group relative overflow-hidden rounded-xl border-0 bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl shadow-md hover:shadow-xl transition-all duration-300">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <Link href={`/property/${property.id}`} className="block">
        <div className="relative h-44 w-full overflow-hidden bg-gray-100 dark:bg-gray-800">
          {property.images?.[0] ? (
            <Image
              src={property.images[0]}
              alt={property.title}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
            />
          ) : (
            <div className="h-full flex items-center justify-center">
              <Home className="h-10 w-10 text-gray-300 dark:text-gray-600" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute top-2.5 right-2.5">
            <Badge
              className={
                property.availability === "available"
                  ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white border-0 text-xs shadow-lg shadow-emerald-500/30"
                  : property.availability === "rented"
                    ? "bg-gradient-to-r from-rose-500 to-red-500 text-white border-0 text-xs shadow-lg shadow-rose-500/30"
                    : "bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0 text-xs shadow-lg shadow-amber-500/30"
              }
            >
              {property.availability}
            </Badge>
          </div>
          {!showActions && (
            <div className="absolute top-2.5 left-2.5">
              <FavoriteButton roomId={property.id} />
            </div>
          )}
        </div>
        <div className="p-3 relative">
          <h3 className="font-semibold text-base mb-1 line-clamp-1 text-gray-900 dark:text-gray-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
            {property.title}
          </h3>
          <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 mb-2">
            <MapPin className="h-3 w-3" />
            <span className="truncate">{property.location.city}</span>
          </div>
          <div className="flex items-center gap-3 mb-2 text-xs text-gray-600 dark:text-gray-400">
            {property.specifications.rooms && (
              <div className="flex items-center gap-1">
                <Bed className="h-3.5 w-3.5" />
                <span>{property.specifications.rooms}</span>
              </div>
            )}
            {property.specifications.bathrooms && (
              <div className="flex items-center gap-1">
                <Bath className="h-3.5 w-3.5" />
                <span>{property.specifications.bathrooms}</span>
              </div>
            )}
            {property.views !== undefined && (
              <div className="flex items-center gap-1 ml-auto">
                <Eye className="h-3 w-3" />
                <span>{property.views}</span>
              </div>
            )}
          </div>
          <div className="text-lg font-bold text-gray-900 dark:text-gray-100">
            NPR {property.price.toLocaleString()}
            <span className="text-xs font-normal text-gray-500 dark:text-gray-400">/mo</span>
          </div>
        </div>
      </Link>
      {showActions && (
        <div className="px-3 pb-3 flex gap-2">
          <button
            onClick={() => onEdit?.(property.id)}
            className="flex-1 h-8 px-3 text-xs font-medium border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors flex items-center justify-center gap-1.5"
          >
            <Edit className="h-3.5 w-3.5" />
            Edit
          </button>
          <button
            onClick={() => onDelete?.(property.id)}
            className="h-8 px-3 text-xs font-medium border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors flex items-center justify-center"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        </div>
      )}
    </Card>
  );
}
