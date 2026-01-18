import { getPropertyById } from "@/lib/actions";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { MapPin, Home, Bed, Bath, Maximize } from "lucide-react";
import PropertyImageGallery from "@/components/PropertyImageGallery";
import PriceCard from "@/components/layout/priceCard";

export default async function PropertyDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const property = await getPropertyById(id);

  if (!property) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-8">
            {/* Images Gallery */}
            <PropertyImageGallery
              images={property.images || []}
              title={property.title}
            />
            {/* Header */}
            <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm border">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h1 className="text-2xl font-bold mb-2">{property.title}</h1>
                  <p className="text-muted-foreground flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    {property.location.address}, {property.location.area},{" "}
                    {property.location.city}
                  </p>
                </div>
                <Badge className="text-sm px-3 py-1">
                  {property.availability}
                </Badge>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm border">
              <h2 className="text-xl font-semibold mb-3">Description</h2>
              <p className="text-muted-foreground leading-relaxed">
                {property.description}
              </p>
            </div>

            {/* Specifications */}
            <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm border">
              <h2 className="text-xl font-semibold mb-4">Specifications</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {property.specifications.size && (
                  <div className="flex flex-col items-center text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <Maximize className="h-8 w-8 text-blue-600 mb-2" />
                    <p className="text-xs text-muted-foreground mb-1">Size</p>
                    <p className="font-bold text-base">
                      {property.specifications.size} sq ft
                    </p>
                  </div>
                )}
                {property.specifications.rooms && (
                  <div className="flex flex-col items-center text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <Home className="h-8 w-8 text-blue-600 mb-2" />
                    <p className="text-xs text-muted-foreground mb-1">Rooms</p>
                    <p className="font-bold text-base">
                      {property.specifications.rooms}
                    </p>
                  </div>
                )}
                {property.specifications.bathrooms && (
                  <div className="flex flex-col items-center text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <Bath className="h-8 w-8 text-blue-600 mb-2" />
                    <p className="text-xs text-muted-foreground mb-1">
                      Bathrooms
                    </p>
                    <p className="font-bold text-base">
                      {property.specifications.bathrooms}
                    </p>
                  </div>
                )}
                <div className="flex flex-col items-center text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <Bed className="h-8 w-8 text-blue-600 mb-2" />
                  <p className="text-xs text-muted-foreground mb-1">
                    Furnished
                  </p>
                  <p className="font-bold text-base">
                    {property.specifications.furnished ? "Yes" : "No"}
                  </p>
                </div>
              </div>
            </div>

            {/* Amenities */}
            <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm border">
              <h2 className="text-xl font-semibold mb-4">Amenities</h2>
              <div className="flex flex-wrap gap-2">
                {property.amenities.map((amenity: string) => (
                  <Badge
                    key={amenity}
                    variant="secondary"
                    className="px-4 py-2 text-sm capitalize"
                  >
                    {amenity}
                  </Badge>
                ))}
              </div>
            </div>

            {/* House Rules */}
            <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm border">
              <h2 className="text-xl font-semibold mb-4">House Rules</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div
                    className={`w-3 h-3 rounded-full ${
                      property.houseRules.smoking
                        ? "bg-green-500"
                        : "bg-red-500"
                    }`}
                  />
                  <span className="text-sm">
                    Smoking{" "}
                    {property.houseRules.smoking ? "Allowed" : "Not Allowed"}
                  </span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div
                    className={`w-3 h-3 rounded-full ${
                      property.houseRules.pets ? "bg-green-500" : "bg-red-500"
                    }`}
                  />
                  <span className="text-sm">
                    Pets {property.houseRules.pets ? "Allowed" : "Not Allowed"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Price Card */}
            <PriceCard property={property} />
          </div>
        </div>
      </div>
    </div>
  );
}
