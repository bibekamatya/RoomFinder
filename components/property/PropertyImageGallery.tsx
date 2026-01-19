"use client";

import { useState } from "react";
import Image from "next/image";

export default function PropertyImageGallery({
  images,
  title,
}: {
  images: string[];
  title: string;
}) {
  const [selectedImage, setSelectedImage] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className="w-full h-[500px] bg-linear-to-br from-blue-100 to-blue-200 dark:from-blue-900 dark:to-blue-800 rounded-2xl" />
    );
  }

  return (
    <div className="flex gap-4">
      {/* Thumbnail Sidebar */}
      {images.length > 1 &&
        <div className="flex flex-col gap-3 w-20">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`relative h-20 rounded-lg overflow-hidden border-2 transition ${selectedImage === index
                ? "border-blue-600"
                : "border-transparent hover:border-gray-300"
                }`}
            >
              <Image src={image} alt={`${title} - ${index + 1}`} fill className="object-cover" />
            </button>
          ))}
        </div>
      }

      {/* Main Image */}
      <div className="flex-1 relative h-[500px] rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-800">
        <Image src={images[selectedImage]} alt={title} fill className="object-contain" priority />
      </div>
    </div>
  );
}
