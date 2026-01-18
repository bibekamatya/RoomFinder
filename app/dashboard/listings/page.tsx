import { getMyProperties } from '@/lib/actions';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ProPerty } from '@/lib/types/data';

export default async function ListingsPage() {
  const properties = await getMyProperties();

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">My Listings</h1>
        <Link href="/dashboard/add">
          <Button>Add Property</Button>
        </Link>
      </div>

      {properties.length === 0 ? (
        <div className="text-center py-12 border rounded-lg">
          <p className="text-gray-600 mb-4">No properties listed yet</p>
          <Link href="/dashboard/add">
            <Button>Add Your First Property</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((room: ProPerty) => (
            <div key={room.id} className="border rounded-lg p-4 bg-white">
              <h3 className="font-semibold text-lg mb-2">{room.title}</h3>
              <p className="text-gray-600 text-sm mb-2">{room.location?.city}</p>
              <p className="text-lg font-bold mb-4">₹{room.price}/{room.price}</p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">Edit</Button>
                <Button variant="destructive" size="sm">Delete</Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
