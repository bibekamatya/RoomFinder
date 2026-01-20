import { auth } from "@/lib/auth";
import { getUserById } from "@/lib/actions";

export default async function ProfilePage() {
  const session = await auth();
  const user = session?.user?.id ? await getUserById(session.user.id) : null;

  if (!user) {
    return <div>User not found</div>;
  }

  // Serialize user data
  const userData = JSON.parse(JSON.stringify(user));

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="max-w-2xl mx-auto px-6 py-12">
        <div className="mb-10">
          <h1 className="text-4xl font-bold mb-2 text-gray-900 dark:text-gray-100">My Profile</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage your account information</p>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-8 space-y-6">
          <div>
            <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Name</label>
            <p className="text-lg font-semibold mt-1 text-gray-900 dark:text-gray-100">
              {userData.name}
            </p>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Email</label>
            <p className="text-lg font-semibold mt-1 text-gray-900 dark:text-gray-100">
              {userData.email}
            </p>
          </div>

          {userData.mobile && (
            <div>
              <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Mobile</label>
              <p className="text-lg font-semibold mt-1 text-gray-900 dark:text-gray-100">
                {userData.mobile}
              </p>
            </div>
          )}

          <div className="pt-4">
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white h-10 px-6 rounded font-medium transition-colors">
              Edit Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
