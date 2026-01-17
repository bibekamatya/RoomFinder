import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function AddPropertyPage() {
  const session = await auth();
  
  if (!session) {
    redirect('/login?redirect=/add-property');
  }

  // If already owner/admin, redirect to dashboard
  if (session.user.role === 'owner' || session.user.role === 'admin') {
    redirect('/dashboard/add');
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">List Your Property</h1>
      <p className="text-gray-600 mb-8">
        Add your first property and start earning. You'll be upgraded to an owner account automatically.
      </p>
      
      {/* Add property form here */}
      <div className="bg-white rounded-lg border p-6">
        <p className="text-gray-500">Property form will go here...</p>
      </div>
    </div>
  );
}
