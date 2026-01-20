import { Card, CardContent } from "../ui/card";

export function StatCardSkeleton() {
  return (
    <Card className="border-0 bg-gradient-to-br from-indigo-100 to-indigo-200 dark:from-indigo-500/90 dark:to-indigo-600/90 animate-pulse">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <div className="h-3 w-24 bg-indigo-300/50 dark:bg-white/30 rounded" />
            <div className="h-8 w-16 bg-indigo-300/50 dark:bg-white/30 rounded" />
          </div>
          <div className="h-10 w-10 rounded-full bg-indigo-300/30 dark:bg-white/20" />
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
    <Card className="border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 animate-pulse">
      <div className="h-1 w-full bg-gray-300 dark:bg-gray-700" />
      <CardContent className="p-5">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gray-200 dark:bg-gray-800" />
            <div className="space-y-2">
              <div className="h-4 w-32 bg-gray-200 dark:bg-gray-800 rounded" />
              <div className="h-3 w-24 bg-gray-200 dark:bg-gray-800 rounded" />
            </div>
          </div>
          <div className="h-5 w-16 bg-gray-200 dark:bg-gray-800 rounded-full" />
        </div>
        <div className="h-3 w-full bg-gray-200 dark:bg-gray-800 rounded mb-3" />
        <div className="flex flex-wrap gap-3">
          <div className="h-3 w-32 bg-gray-200 dark:bg-gray-800 rounded" />
          <div className="h-3 w-28 bg-gray-200 dark:bg-gray-800 rounded" />
          <div className="h-3 w-24 bg-gray-200 dark:bg-gray-800 rounded" />
        </div>
      </CardContent>
    </Card>
  );
}
