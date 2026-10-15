import { BarChart3 } from "lucide-react";

interface Cleaner {
  id: string;
  name: string;
}

interface CleanerWorkloadProps {
  cleaners: Cleaner[];
}

export default function CleanerWorkload({ cleaners }: CleanerWorkloadProps) {
  return (
    <div className="rounded-xl border border-[#e8e4dc] bg-white overflow-hidden shadow-2xs flex flex-col justify-between p-4">
      <div className="flex items-center justify-between pb-2 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <BarChart3 className="w-4 h-4 text-gray-600" />
          <h2 className="font-bold text-sm text-gray-900">
            Cleaner Workload Distribution
          </h2>
        </div>
        <span className="text-xs text-gray-400">Max Threshold: 4+ Overload</span>
      </div>

      <div className="flex flex-col gap-4 py-2">
        {cleaners.map((cleaner: any, index: number) => {
          const mockAssignedTasks = [14, 12, 11, 10, 9][index % 5];
          const percentage = Math.min(100, (mockAssignedTasks / 16) * 100);
          const isOverloaded = mockAssignedTasks >= 12;

          return (
            <div
              key={cleaner.id}
              className="flex flex-col gap-1.5 group cursor-pointer p-1 rounded-md hover:bg-gray-50/80 transition-colors"
            >
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-gray-900 flex items-center gap-2 group-hover:text-emerald-800 transition-colors">
                  <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-[10px] group-hover:scale-110 transition-transform">
                    {cleaner.name.substring(0, 2).toUpperCase()}
                  </span>
                  {cleaner.name}
                </span>
                <span className="font-medium text-gray-600 tabular-nums group-hover:font-bold transition-all">
                  {mockAssignedTasks} cleanings / week
                </span>
              </div>

              <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden flex">
                <div
                  className={`h-full rounded-full transition-all duration-300 ${
                    isOverloaded
                      ? "bg-amber-500 group-hover:bg-amber-600"
                      : "bg-emerald-600 group-hover:bg-emerald-500"
                  }`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}