"use client";

import { useEffect } from "react";
import { incrementPropertyViews } from "@/lib/actions";

export default function ViewTracker({ propertyId }: { propertyId: string }) {
  useEffect(() => {
    incrementPropertyViews(propertyId);
  }, [propertyId]);

  return null;
}
