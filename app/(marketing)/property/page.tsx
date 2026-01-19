import PropertyList from "@/components/property/PropertyList";

export default function PropertyPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="mx-auto max-w-7xl px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Browse Properties</h1>
          <p className="text-muted-foreground mt-2">Find your perfect space</p>
        </div>
        <PropertyList />
      </div>
    </div>
  );
}
