"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Toaster } from "react-hot-toast";

export default function AddPropertyPage() {
  return (
    <>
      <Toaster position="top-right" />
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="max-w-3xl mx-auto px-6 py-8">
        <Button variant="ghost" asChild className="mb-6">
          <Link href="/owner">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Properties
          </Link>
        </Button>

        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Add New Property</h1>

        <Card className="border border-gray-200 dark:border-gray-800">
          <CardContent className="p-6">
            <form className="space-y-6">
              <div>
                <label className="text-sm font-medium text-gray-900 dark:text-white mb-2 block">Title</label>
                <Input placeholder="Modern Room in Thamel" />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-900 dark:text-white mb-2 block">Description</label>
                <Textarea placeholder="Describe your property..." rows={4} />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-900 dark:text-white mb-2 block">Price (NPR/month)</label>
                  <Input type="number" placeholder="15000" />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-900 dark:text-white mb-2 block">City</label>
                  <Input placeholder="Kathmandu" />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-900 dark:text-white mb-2 block">Address</label>
                <Input placeholder="Thamel, Ward 26" />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-900 dark:text-white mb-2 block">Amenities (comma separated)</label>
                <Input placeholder="WiFi, Parking, Attached Bath" />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-900 dark:text-white mb-2 block">Images</label>
                <Input type="file" multiple accept="image/*" />
              </div>

              <div className="flex gap-4 pt-4">
                <Button type="submit" className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white">
                  Publish Property
                </Button>
                <Button type="button" variant="outline" asChild>
                  <Link href="/owner">Cancel</Link>
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
    </>
  );
}
