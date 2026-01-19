import { Card, CardContent } from "../ui/card";

export function StatCardSkeleton() {
  return (
    <Card className="border-0 bg-gradient-to-br from-gray-400 to-gray-500 animate-pulse">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <div className="h-3 w-24 bg-white/30 rounded" />
            <div className="h-8 w-16 bg-white/30 rounded" />
          </div>
          <div className="h-10 w-10 rounded-full bg-white/20" />
        </div>
      </CardContent>
    </Card>
  );
}

export function PropertyItemSkeleton() {
  return (
    <div className="flex items-center gap-3 p-2 rounded-lg animate-pulse">
      <div className="h-12 w-12 rounded bg-gray-200 dark:bg-gray-800 shrink-0" />
      <div className="flex-1 space-y-2">
        <div className="h-4 w-32 bg-gray-200 dark:bg-gray-800 rounded" />
        <div className="h-3 w-20 bg-gray-200 dark:bg-gray-800 rounded" />
      </div>
      <div className="h-3 w-16 bg-gray-200 dark:bg-gray-800 rounded" />
    </div>
  );
}

export function InquiryItemSkeleton() {
  return (
    <div className="flex items-start gap-3 p-2 rounded-lg animate-pulse">
      <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-800 shrink-0" />
      <div className="flex-1 space-y-2">
        <div className="h-4 w-24 bg-gray-200 dark:bg-gray-800 rounded" />
        <div className="h-3 w-40 bg-gray-200 dark:bg-gray-800 rounded" />
      </div>
      <div className="h-3 w-12 bg-gray-200 dark:bg-gray-800 rounded" />
    </div>
  );
}
