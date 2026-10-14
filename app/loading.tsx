export default function PlannerLoading() {
  return (
    <div className="min-h-screen bg-[#f8f7f4]">
      <div className="max-w-5xl mx-auto px-4 md:px-6 py-8 animate-pulse">
        {/* Header Skeleton */}
        <div className="mb-6">
          <div className="flex justify-between items-center">
            <div className="h-8 w-48 bg-gray-200 rounded-md"></div>
          </div>

          <div className="flex gap-4 border-b border-gray-200 mt-4 pb-2">
            <div className="h-5 w-16 bg-gray-200 rounded"></div>
            <div className="h-5 w-20 bg-gray-200 rounded"></div>
            <div className="h-5 w-20 bg-gray-200 rounded"></div>
          </div>

          <div className="h-9 w-24 bg-gray-200 rounded-xl mt-3"></div>
        </div>

        {/* Day Rows Skeleton */}
        <div className="flex flex-col gap-2.5">
          {[...Array(7)].map((_, i) => (
            <div key={i} className="h-20 bg-white border border-[#e8e4dc] rounded-xl flex items-center px-4">
              <div className="w-12 h-10 bg-gray-100 rounded mr-4"></div>
              <div className="h-4 bg-gray-100 rounded w-1/3"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}