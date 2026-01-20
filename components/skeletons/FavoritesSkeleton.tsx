export default function FavoritesSkeleton() {
  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 via-white to-gray-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="mb-10 text-center">
          <div className="h-12 w-64 bg-gray-200 dark:bg-gray-800 rounded-lg mx-auto mb-4 animate-pulse" />
          <div className="h-6 w-80 bg-gray-200 dark:bg-gray-800 rounded mx-auto animate-pulse" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="border rounded-2xl p-6 bg-white dark:bg-gray-900">
              <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded mb-2 animate-pulse" />
              <div className="h-4 w-32 bg-gray-200 dark:bg-gray-800 rounded mb-3 animate-pulse" />
              <div className="h-6 w-40 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
