import PropertyForm from "@/components/property/propertyForm";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function AddPropertyPage() {
  const session = await auth();

  if (!session) {
    redirect("/login?redirect=/add-property");
  }

  // If already owner/admin, redirect to dashboard
  if (session.user.role === "owner" || session.user.role === "admin") {
    redirect("/dashboard/add");
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="mb-10">
          <h1 className="text-4xl font-bold mb-2 text-gray-900 dark:text-gray-100">
            List Your Property
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Add your first property and start earning. You&apos;ll be upgraded to an owner account
            automatically.
          </p>
        </div>

        {/* Add property form here */}
        <div className="bg-white dark:bg-gray-900 rounded-xl p-8 border border-gray-200 dark:border-gray-800">
          <PropertyForm />
        </div>
      </div>
    </div>
  );
}
