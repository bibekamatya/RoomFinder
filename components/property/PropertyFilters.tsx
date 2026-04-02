"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog } from "@/components/ui/dialog";
import { SlidersHorizontal } from "lucide-react";
import {
  PROPERTY_TYPES,
  ROOM_TYPES,
  AMENITIES_LIST,
  PRICE_RANGE,
} from "@/lib/config/propertyFilters";
import { getProperties } from "@/lib/actions";
import { Property } from "@/lib/types/data";

interface FilterProps {
  setProperties: Dispatch<SetStateAction<Property[]>>;
  startTransition: (callback: () => void) => void;
}

export default function PropertyFilters({ setProperties, startTransition }: FilterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [priceRange, setPriceRange] = useState<number[]>([PRICE_RANGE.MIN, PRICE_RANGE.MAX]);
  const [selectedPropertyTypes, setSelectedPropertyTypes] = useState<string[]>([]);
  const [selectedRoomType, setSelectedRoomType] = useState<string>("");
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [furnished, setFurnished] = useState<boolean | undefined>(undefined);
  const [rooms, setRooms] = useState<string>("");
  const [bathrooms, setBathrooms] = useState<string>("");

  const togglePropertyType = (type: string) => {
    setSelectedPropertyTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const toggleAmenity = (amenity: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity) ? prev.filter((a) => a !== amenity) : [...prev, amenity]
    );
  };

  const clearFilters = () => {
    setPriceRange([PRICE_RANGE.MIN, PRICE_RANGE.MAX]);
    setSelectedPropertyTypes([]);
    setSelectedRoomType("");
    setSelectedAmenities([]);
    setFurnished(undefined);
    setRooms("");
    setBathrooms("");
  };

  const activeFiltersCount =
    selectedPropertyTypes.length +
    selectedAmenities.length +
    (selectedRoomType ? 1 : 0) +
    (furnished !== undefined ? 1 : 0) +
    (rooms ? 1 : 0) +
    (bathrooms ? 1 : 0) +
    (priceRange[0] !== PRICE_RANGE.MIN || priceRange[1] !== PRICE_RANGE.MAX ? 1 : 0);

  const applyFilter = () => {
    startTransition(async () => {
      const filters = {
        minPrice: priceRange[0],
        maxPrice: priceRange[1],
        propertyType: selectedPropertyTypes.length > 0 ? selectedPropertyTypes : undefined,
        roomType: selectedRoomType || undefined,
        amenities: selectedAmenities.length > 0 ? selectedAmenities : undefined,
        furnished: furnished !== undefined ? furnished : undefined,
        rooms: rooms ? (rooms === "3+" ? 3 : Number(rooms)) : undefined,
        bathrooms: bathrooms ? (bathrooms === "3+" ? 3 : Number(bathrooms)) : undefined,
        availability: "available",
      };
      const response = await getProperties(filters);
      if (response) {
        setProperties(response.properties);
      }
      setIsOpen(false);
    });
  };

  return (
    <>
      {/* Filter Toggle Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="gap-2 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 shadow-sm h-auto px-4 py-3 rounded-lg"
      >
        <SlidersHorizontal className="h-4 w-4" />
        <span className="font-medium text-sm">Filters</span>
        {activeFiltersCount > 0 && (
          <Badge className="ml-1 h-4 w-4 rounded-full p-0 flex items-center justify-center bg-indigo-600 text-white text-[10px]">
            {activeFiltersCount}
          </Badge>
        )}
      </Button>

      {/* Filter Panel */}
      <Dialog
        open={isOpen}
        onOpenChange={setIsOpen}
        title="Filters"
        maxWidth="max-w-md"
        variant="bottom-sheet"
      >
        <div className="space-y-4">
          {/* Price Range */}
          <div>
            <label className="text-xs font-medium mb-2 block">Price Range (NPR/month)</label>
            <div className="space-y-2">
              <input
                type="range"
                min={PRICE_RANGE.MIN}
                max={PRICE_RANGE.MAX}
                step={PRICE_RANGE.STEP}
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-600">NPR {PRICE_RANGE.MIN.toLocaleString()}</span>
                <span className="font-semibold text-indigo-600">
                  NPR {priceRange[1].toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* Property Type */}
          <div>
            <label className="text-xs font-medium mb-2 block">Property Type</label>
            <div className="grid grid-cols-5 gap-1.5">
              {PROPERTY_TYPES.map((type) => (
                <button
                  key={type.value}
                  onClick={() => togglePropertyType(type.value)}
                  className={`flex flex-col items-center gap-1 p-2 rounded-lg border-2 transition-all ${
                    selectedPropertyTypes.includes(type.value)
                      ? "border-indigo-600 bg-indigo-50 dark:bg-indigo-950/30"
                      : "border-gray-200 dark:border-gray-700 hover:border-gray-300"
                  }`}
                >
                  <type.icon className="h-4 w-4" />
                  <span className="text-[10px] font-medium">{type.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Room Type */}
          <div>
            <label className="text-xs font-medium mb-2 block">Room Type</label>
            <div className="grid grid-cols-2 gap-1.5">
              {ROOM_TYPES.map((type) => (
                <button
                  key={type.value}
                  onClick={() =>
                    setSelectedRoomType(selectedRoomType === type.value ? "" : type.value)
                  }
                  className={`p-2 rounded-lg border-2 text-xs font-medium transition-all ${
                    selectedRoomType === type.value
                      ? "border-indigo-600 bg-indigo-50 dark:bg-indigo-950/30"
                      : "border-gray-200 dark:border-gray-700 hover:border-gray-300"
                  }`}
                >
                  {type.label}
                </button>
              ))}
            </div>
          </div>

          {/* Amenities */}
          <div>
            <label className="text-xs font-medium mb-2 block">Amenities</label>
            <div className="grid grid-cols-2 gap-1.5">
              {AMENITIES_LIST.map((amenity) => (
                <button
                  key={amenity.value}
                  onClick={() => toggleAmenity(amenity.value)}
                  className={`flex items-center gap-1.5 p-2 rounded-lg border-2 transition-all ${
                    selectedAmenities.includes(amenity.value)
                      ? "border-indigo-600 bg-indigo-50 dark:bg-indigo-950/30"
                      : "border-gray-200 dark:border-gray-700 hover:border-gray-300"
                  }`}
                >
                  <amenity.icon className="h-3.5 w-3.5 shrink-0" />
                  <span className="text-[11px] font-medium truncate">{amenity.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Furnished */}
          <div>
            <label className="text-xs font-medium mb-2 block">Furnished</label>
            <div className="grid grid-cols-2 gap-1.5">
              {[
                { value: true, label: "Yes" },
                { value: false, label: "No" },
              ].map((option) => (
                <button
                  key={option.label}
                  onClick={() => setFurnished(option.value)}
                  className={`p-2 rounded-lg border-2 text-xs font-medium transition-all ${
                    furnished === option.value
                      ? "border-indigo-600 bg-indigo-50 dark:bg-indigo-950/30"
                      : "border-gray-200 dark:border-gray-700 hover:border-gray-300"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Rooms & Bathrooms */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium mb-2 block">Rooms</label>
              <div className="grid grid-cols-3 gap-1.5">
                {["1", "2", "3+"].map((num) => (
                  <button
                    key={num}
                    onClick={() => setRooms(rooms === num ? "" : num)}
                    className={`p-2 rounded-lg border-2 text-xs font-medium transition-all ${
                      rooms === num
                        ? "border-indigo-600 bg-indigo-50 dark:bg-indigo-950/30"
                        : "border-gray-200 dark:border-gray-700 hover:border-gray-300"
                    }`}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-xs font-medium mb-2 block">Bathrooms</label>
              <div className="grid grid-cols-3 gap-1.5">
                {["1", "2", "3+"].map((num) => (
                  <button
                    key={num}
                    onClick={() => setBathrooms(bathrooms === num ? "" : num)}
                    className={`p-2 rounded-lg border-2 text-xs font-medium transition-all ${
                      bathrooms === num
                        ? "border-indigo-600 bg-indigo-50 dark:bg-indigo-950/30"
                        : "border-gray-200 dark:border-gray-700 hover:border-gray-300"
                    }`}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 mt-6 pt-4 border-t dark:border-gray-800">
          <Button onClick={clearFilters} variant="outline" className="flex-1 h-10">
            Clear All
          </Button>
          <Button
            onClick={() => applyFilter()}
            className="flex-1 h-10 bg-indigo-600 hover:bg-indigo-700"
          >
            Apply Filters
          </Button>
        </div>
      </Dialog>
    </>
  );
}
