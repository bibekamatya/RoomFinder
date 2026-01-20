"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { getFavorites, getPropertyById } from "@/lib/actions";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { Property } from "@/lib/types/data";
import FavoritesSkeleton from "@/components/skeletons/FavoritesSkeleton";

export default function FavoritesPage() {
  const { data: session } = useSession();
  const [favorites, setFavorites] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFavorites() {
      if (session) {
        const rooms = await getFavorites();
        setFavorites(rooms);
      } else {
        const localIds = JSON.parse(localStorage.getItem("favorites") || "[]");
        if (localIds.length > 0) {
          const rooms = await Promise.all(localIds.map((id: string) => getPropertyById(id)));
          setFavorites(rooms.filter(Boolean));
        }
      }
      setLoading(false);
    }
    loadFavorites();
  }, [session]);

  if (loading) return <FavoritesSkeleton />;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="mb-10">
          <h1 className="text-4xl font-bold mb-2 text-gray-900 dark:text-gray-100">My Favorites</h1>
          <p className="text-gray-600 dark:text-gray-400">
            {session ? "Properties you've saved for later" : "Login to save favorites permanently"}
          </p>
        </div>

        {favorites.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="h-16 w-16 rounded-xl bg-gray-200 dark:bg-gray-800 flex items-center justify-center mb-4">
              <Heart className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">
              No favorites yet
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6 text-center max-w-md">
              Start browsing properties and save your favorites
            </p>
            <Button
              asChild
              className="h-10 px-6 bg-indigo-600 hover:bg-indigo-700 text-white transition-colors"
            >
              <Link href="/property">Browse Properties</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {favorites.map((room) => (
              <Link key={room.id} href={`/property/${room.id}`}>
                <div className="border border-gray-200 dark:border-gray-800 rounded-xl p-5 hover:border-gray-400 dark:hover:border-gray-600 transition-all bg-white dark:bg-gray-900">
                  <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-gray-100">
                    {room.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                    {room.location?.city}
                  </p>
                  <p className="text-xl font-bold text-gray-900 dark:text-gray-100">
                    NPR {room.price.toLocaleString()}
                    <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                      /month
                    </span>
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
