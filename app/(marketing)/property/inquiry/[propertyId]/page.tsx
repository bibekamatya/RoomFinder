import InquiryForm from "@/components/property/InquiryForm";
import { redirect } from "next/navigation";

export default async function Inquiry({ params }: { params: Promise<{ propertyId: string }> }) {
  const { propertyId } = await params;

  if (!propertyId) {
    redirect("/property");
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <InquiryForm propertyId={propertyId} />
      </div>
    </div>
  );
}
