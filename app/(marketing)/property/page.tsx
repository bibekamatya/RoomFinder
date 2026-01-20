"use client";
import PropertyCard from "@/components/property/PropertyCard";
import PropertyListSkeleton from "@/components/skeletons/PropertyListSkeleton";
import { getProperties } from "@/lib/actions";
import { Property } from "@/lib/types/data";
import { Search } from "lucide-react";
import { useEffect, useState, useTransition } from "react";

export default function PropertyPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [pending, startTransition] = useTransition();
  useEffect(() => {
    let isMounted = true;
    startTransition(() => {
      getProperties().then((result) => {
        if (isMounted && result) {
          setProperties(result);
        }
      });
    });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="mb-10">
          <h1 className="text-4xl font-bold mb-2 text-gray-900 dark:text-gray-100">
            Browse Properties
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Find your perfect space from our verified listings
          </p>
        </div>

        {pending ? (
          <PropertyListSkeleton />
        ) : properties.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="h-16 w-16 rounded-xl bg-gray-200 dark:bg-gray-800 flex items-center justify-center mb-4">
              <Search className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">
              No properties found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-center max-w-md">
              Check back later for new listings or adjust your search criteria
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-5">
            {properties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
