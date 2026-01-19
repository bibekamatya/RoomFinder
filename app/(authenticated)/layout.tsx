import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Navbar from "@/components/layout/landingPage/navbar";

export default async function AuthenticatedLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  // Allow guests to view favorites page (localStorage)
  // Other routes require login

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto px-4 py-8">{children}</main>
    </div>
  );
}
