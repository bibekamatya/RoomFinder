"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { addFavorite, removeFavorite } from "@/lib/actions";
import { Heart } from "lucide-react";

export function FavoriteButton({
  roomId,
  initialFavorited = false,
}: {
  roomId: string;
  initialFavorited?: boolean;
}) {
  const { data: session } = useSession();
  const router = useRouter();
  const [isFavorited, setIsFavorited] = useState(initialFavorited);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!session) {
      const local = JSON.parse(localStorage.getItem("favorites") || "[]");
      setIsFavorited(local.includes(roomId));
    }
  }, [session, roomId]);

  const toggle = async () => {
    if (!session) {
      // Guest - save to localStorage
      const local = JSON.parse(localStorage.getItem("favorites") || "[]");
      if (isFavorited) {
        localStorage.setItem(
          "favorites",
          JSON.stringify(local.filter((id: string) => id !== roomId))
        );
      } else {
        localStorage.setItem("favorites", JSON.stringify([...local, roomId]));
      }
      setIsFavorited(!isFavorited);
      return;
    }

    // Logged in - save to DB
    setLoading(true);
    try {
      if (isFavorited) {
        await removeFavorite(roomId);
      } else {
        await addFavorite(roomId);
      }
      setIsFavorited(!isFavorited);
    } catch (error) {
      console.error("Failed to update favorite");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={toggle}
      disabled={loading}
      className="p-2 hover:bg-gray-100 rounded-full transition-colors"
      title={session ? "Save to favorites" : "Save temporarily (login to persist)"}
    >
      <Heart className={`h-5 w-5 ${isFavorited ? "fill-red-500 text-red-500" : "text-gray-400"}`} />
    </button>
  );
}
