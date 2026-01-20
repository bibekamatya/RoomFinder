import { MapPin, Star, Bed, Bath } from "lucide-react";
import { useEffect, useState } from "react";
import { getProperties } from "@/lib/actions";
import { Property } from "@/lib/types/data";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { Card } from "../ui/card";

const FeaturedRooms = () => {
  const [properties, setProperties] = useState<Property[]>([]);

  useEffect(() => {
    let isMounted = true;
    getProperties({ availability: "available" }).then((result) => {
      if (isMounted && result) {
        // Get top 4 available properties by views
        const featured = result
          .sort((a: Property, b: Property) => (b.views || 0) - (a.views || 0))
          .slice(0, 4);
        setProperties(featured);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  if (properties.length < 4) return null;

  return (
    <section className="py-20 px-6 bg-gray-50 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-indigo-50 dark:bg-indigo-950/30 text-indigo-600 dark:text-indigo-400 px-4 py-2 rounded-full text-sm font-medium mb-4 border border-indigo-200 dark:border-indigo-900">
            <Star className="h-4 w-4 fill-current" />
            Featured Properties
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Most Viewed Properties
          </h2>
          <p className="text-gray-600 dark:text-gray-400">Discover our most popular listings</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {properties.map((property) => (
            <Link key={property.id} href={`/property/${property.id}`}>
              <Card className="group overflow-hidden border border-gray-200 dark:border-gray-800 hover:shadow-md transition-all bg-white dark:bg-gray-900">
                <div className="relative h-56 overflow-hidden">
                  {property.images?.[0] ? (
                    <Image
                      src={property.images[0]}
                      alt={property.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  ) : (
                    <div className="h-full bg-indigo-600 flex items-center justify-center">
                      <Star className="h-16 w-16 text-white opacity-50" />
                    </div>
                  )}
                  <div className="absolute top-3 right-3 bg-white dark:bg-gray-900 px-3 py-1 rounded-full border border-gray-200 dark:border-gray-800">
                    <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                      {property.views || 0} views
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-1">
                    {property.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 flex items-center gap-1">
                    <MapPin className="h-4 w-4 shrink-0" />
                    <span className="line-clamp-1">
                      {property.location.city}, {property.location.area}
                    </span>
                  </p>
                  <div className="flex items-center gap-3 mb-4 text-xs text-gray-600 dark:text-gray-400">
                    {property.specifications.rooms && (
                      <span className="flex items-center gap-1">
                        <Bed className="h-3.5 w-3.5" />
                        {property.specifications.rooms}
                      </span>
                    )}
                    {property.specifications.bathrooms && (
                      <span className="flex items-center gap-1">
                        <Bath className="h-3.5 w-3.5" />
                        {property.specifications.bathrooms}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Starting from</p>
                      <span className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                        NPR {property.price.toLocaleString()}
                      </span>
                    </div>
                    <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700 text-white">
                      View
                    </Button>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedRooms;
