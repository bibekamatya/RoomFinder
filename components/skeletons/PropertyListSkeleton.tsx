import { Card, CardContent } from "@/components/ui/card";

export default function PropertyListSkeleton() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <Card key={i} className="overflow-hidden animate-pulse">
          <div className="h-48 bg-gray-200 dark:bg-gray-800" />
          <CardContent className="p-4 space-y-3">
            <div className="flex items-start justify-between">
              <div className="h-5 bg-gray-200 dark:bg-gray-800 rounded w-2/3" />
              <div className="h-5 bg-gray-200 dark:bg-gray-800 rounded w-16" />
            </div>
            <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/2" />
            <div className="flex gap-2">
              <div className="h-5 bg-gray-200 dark:bg-gray-800 rounded w-16" />
              <div className="h-5 bg-gray-200 dark:bg-gray-800 rounded w-16" />
            </div>
            <div className="flex items-center justify-between pt-2">
              <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded w-24" />
              <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded w-16" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
