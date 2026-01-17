'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { getFavorites, getRoomById } from '@/lib/actions';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function FavoritesPage() {
  const { data: session } = useSession();
  const [favorites, setFavorites] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFavorites() {
      if (session) {
        // Logged in - get from DB
        const rooms = await getFavorites();
        setFavorites(rooms);
      } else {
        // Guest - load from localStorage
        const localIds = JSON.parse(localStorage.getItem('favorites') || '[]');
        if (localIds.length > 0) {
          const rooms = await Promise.all(
            localIds.map((id: string) => getRoomById(id))
          );
          setFavorites(rooms.filter(Boolean));
        }
      }
      setLoading(false);
    }
    loadFavorites();
  }, [session]);

  if (loading) return <div className="text-center py-12">Loading...</div>;

  if (favorites.length === 0) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold mb-4">No Favorites Yet</h1>
        <p className="text-gray-600 mb-6">
          {session 
            ? 'Start browsing rooms and save your favorites!' 
            : 'Your temporary favorites will appear here. Login to save them permanently.'}
        </p>
        <Link href="/rooms">
          <Button>Browse Rooms</Button>
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">My Favorites</h1>
        {!session && (
          <p className="text-sm text-orange-600">
            Login to save favorites permanently
          </p>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {favorites.map((room) => (
          <Link key={room.id} href={`/rooms/${room.id}`}>
            <div className="border rounded-lg p-4 hover:shadow-lg transition-shadow bg-white">
              <h3 className="font-semibold text-lg mb-2">{room.title}</h3>
              <p className="text-gray-600 text-sm mb-2">{room.location?.city}</p>
              <p className="text-lg font-bold">₹{room.price}/{room.priceType}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
