"use client";

import { useEffect, useState } from "react";
import { getMyProperties } from "@/lib/actions";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Property } from "@/lib/types/data";
import { Plus, Home } from "lucide-react";
import PropertyCard from "@/components/property/PropertyCard";

export default function PropertiesPage() {
  const router = useRouter();
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    getMyProperties().then((result) => {
      if (isMounted && result) {
        setProperties(result);
        setLoading(false);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const handleEdit = (id: string) => {
    router.push(`/dashboard/properties/add?id=${id}`);
  };

  const handleDelete = (id: string) => {
    // TODO: Show confirmation dialog
    console.log("Delete:", id);
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">My Properties</h1>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="animate-pulse">
              <div className="h-48 bg-gray-200" />
              <CardContent className="p-4 space-y-3">
                <div className="h-4 bg-gray-200 rounded" />
                <div className="h-3 bg-gray-200 rounded w-2/3" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">My Properties</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {properties.length} {properties.length === 1 ? "property" : "properties"} listed
          </p>
        </div>
        <Button
          asChild
          className="h-10 px-6 bg-indigo-600 hover:bg-indigo-700 text-white font-medium transition-colors"
        >
          <Link href="/dashboard/properties/add">
            <Plus className="h-4 w-4 mr-2" />
            Add Property
          </Link>
        </Button>
      </div>

      {properties.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="p-12 text-center">
            <div className="h-16 w-16 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mx-auto mb-4">
              <Home className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No properties yet</h3>
            <p className="text-muted-foreground mb-4">Start by adding your first property</p>
            <Button
              asChild
              className="h-10 px-6 bg-indigo-600 hover:bg-indigo-700 text-white font-medium transition-colors"
            >
              <Link href="/dashboard/add">
                <Plus className="h-4 w-4 mr-2" />
                Add Property
              </Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              showActions
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}
