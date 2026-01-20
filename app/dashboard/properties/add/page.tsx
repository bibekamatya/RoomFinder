"use client";

import PropertyForm from "@/components/property/propertyForm";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function AddPropertyContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  return (
    <div className="space-y-6">
      <Button variant="ghost" size="sm" asChild className="mb-2">
        <Link href="/dashboard/properties">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Link>
      </Button>
      <div>
        <h1 className="text-2xl font-bold">{id ? "Edit Property" : "Add New Property"}</h1>
        <p className="text-sm text-muted-foreground mt-1">
          {id ? "Update your property details" : "List your property for rent"}
        </p>
      </div>
      <PropertyForm propertyId={id} />
    </div>
  );
}

export default function AddPropertyPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AddPropertyContent />
    </Suspense>
  );
}
