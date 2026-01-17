import { getReceivedInquiries } from '@/lib/actions';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export default async function InquiriesPage() {
  const inquiries = await getReceivedInquiries();

  if (inquiries.length === 0) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold mb-4">No Inquiries Yet</h1>
        <p className="text-gray-600">You'll see inquiries here when people are interested in your properties</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Received Inquiries</h1>
      <div className="space-y-4">
        {inquiries.map((inquiry: any) => (
          <div key={inquiry.id} className="border rounded-lg p-6 bg-white">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-semibold text-lg">{inquiry.tenantName}</h3>
                <p className="text-sm text-gray-600">{inquiry.tenantEmail} • {inquiry.tenantPhone}</p>
                <p className="text-sm text-gray-600 mt-1">Move-in: {inquiry.moveInDate}</p>
              </div>
              <Badge variant={
                inquiry.status === 'approved' ? 'default' :
                inquiry.status === 'rejected' ? 'destructive' : 'secondary'
              }>
                {inquiry.status}
              </Badge>
            </div>
            <p className="text-gray-700 mb-4">{inquiry.message}</p>
            {inquiry.status === 'pending' && (
              <div className="flex gap-2">
                <Button size="sm">Approve</Button>
                <Button size="sm" variant="destructive">Reject</Button>
              </div>
            )}
            <div className="mt-4 text-sm text-gray-500">
              Received: {new Date(inquiry.createdAt).toLocaleDateString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
