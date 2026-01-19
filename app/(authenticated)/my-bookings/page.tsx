import { getMyInquiries } from "@/lib/actions";
import { Badge } from "@/components/ui/badge";

export default async function MyBookingsPage() {
  const inquiries = await getMyInquiries();

  if (inquiries.length === 0) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold mb-4">No Bookings Yet</h1>
        <p className="text-gray-600">Browse rooms and send inquiries to get started!</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">My Bookings</h1>
      <div className="space-y-4">
        {inquiries.map((inquiry: any) => (
          <div key={inquiry.id} className="border rounded-lg p-6 bg-white">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-semibold text-lg">Room ID: {inquiry.roomId}</h3>
                <p className="text-sm text-gray-600">Move-in: {inquiry.moveInDate}</p>
              </div>
              <Badge
                variant={
                  inquiry.status === "approved"
                    ? "default"
                    : inquiry.status === "rejected"
                      ? "destructive"
                      : "secondary"
                }
              >
                {inquiry.status}
              </Badge>
            </div>
            <p className="text-gray-700">{inquiry.message}</p>
            <div className="mt-4 text-sm text-gray-500">
              Submitted: {new Date(inquiry.createdAt).toLocaleDateString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
