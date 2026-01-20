"use client";

import { MapPin, Search, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { usePropertySearch } from "@/hooks/usePropertySearch";

export default function PropertySearchBar() {
  const [isOpen, setIsOpen] = useState(false);
  const { query, setQuery, properties, isPending } = usePropertySearch();

  return (
    <div className="max-w-3xl mx-auto mb-16 relative">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-800 p-3">
        <div className="flex items-center gap-3 px-4 py-2">
          <Search className="h-5 w-5 text-gray-400" />
          <Input
            placeholder="Search by city, area, or property name..."
            className="border-0 shadow-none focus-visible:ring-0 bg-transparent"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setIsOpen(true);
            }}
            onFocus={() => setIsOpen(true)}
          />
          {isPending && <Loader2 className="h-5 w-5 text-gray-400 animate-spin" />}
        </div>
      </div>

      {/* Search Results Dropdown */}
      {isOpen && query.trim() && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
          <Card className="absolute top-full mt-2 w-full max-h-96 overflow-y-auto z-20 p-0 shadow-2xl">
            {isPending ? (
              <div className="p-8 text-center text-muted-foreground">
                <Loader2 className="h-8 w-8 animate-spin mx-auto mb-2" />
                <p className="text-sm">Searching...</p>
              </div>
            ) : properties.length === 0 ? (
              <div className="p-8 text-center text-muted-foreground">
                <Search className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p className="text-sm">No properties found for &quot;{query}&quot;</p>
              </div>
            ) : (
              <>
                <div className="px-4 py-2 bg-gray-50 dark:bg-gray-800 border-b">
                  <p className="text-xs text-muted-foreground">
                    Found {properties.length} {properties.length === 1 ? "property" : "properties"}
                  </p>
                </div>
                <div className="divide-y">
                  {properties.slice(0, 5).map((property) => (
                    <Link
                      key={property.id}
                      href={`/property/${property.id}`}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-3 p-3 hover:bg-accent transition-colors"
                    >
                      <div className="relative h-16 w-16 rounded-lg overflow-hidden bg-gray-200 shrink-0">
                        {property.images?.[0] ? (
                          <Image
                            src={property.images[0]}
                            alt={property.title}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="h-full flex items-center justify-center">
                            <MapPin className="h-6 w-6 text-gray-400" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm line-clamp-1">{property.title}</p>
                        <p className="text-xs text-muted-foreground line-clamp-1">
                          <MapPin className="h-3 w-3 inline mr-1" />
                          {property.location.city}, {property.location.area}
                        </p>
                        <p className="text-sm font-bold text-blue-600 mt-1">
                          NPR {property.price.toLocaleString()}
                        </p>
                      </div>
                    </Link>
                  ))}
                  {properties.length > 5 && (
                    <Link
                      href={`/property?search=${query}`}
                      onClick={() => setIsOpen(false)}
                      className="block p-3 text-center text-sm text-blue-600 hover:bg-accent transition-colors font-medium"
                    >
                      View all {properties.length} results
                    </Link>
                  )}
                </div>
              </>
            )}
          </Card>
        </>
      )}
    </div>
  );
}
