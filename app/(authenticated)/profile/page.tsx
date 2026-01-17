import { auth } from '@/lib/auth';
import { getUserById } from '@/lib/actions';

export default async function ProfilePage() {
  const session = await auth();
  const user = session?.user?.id ? await getUserById(session.user.id) : null;

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">My Profile</h1>
      
      <div className="bg-white rounded-lg border p-6 space-y-4">
        <div>
          <label className="text-sm font-medium text-gray-600">Name</label>
          <p className="text-lg">{user.name}</p>
        </div>
        
        <div>
          <label className="text-sm font-medium text-gray-600">Email</label>
          <p className="text-lg">{user.email}</p>
        </div>
        
        {user.mobile && (
          <div>
            <label className="text-sm font-medium text-gray-600">Mobile</label>
            <p className="text-lg">{user.mobile}</p>
          </div>
        )}
        
        <div>
          <label className="text-sm font-medium text-gray-600">Role</label>
          <p className="text-lg capitalize">{user.role}</p>
        </div>
        
        <div className="pt-4">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
}
