import { Sparkles, RefreshCw, Gem, Users } from "lucide-react";

interface DashboardKPIsProps {
  totalCleanings: number;
  sameDayCount: number;
  highValueCount: number;
  cleanersCount: number;
  overloadThreshold: number;
}

function KpiCard({
  title,
  value,
  subtitle,
  icon: Icon,
  colorScheme,
}: {
  title: string;
  value: number | string;
  subtitle: React.ReactNode;
  icon: any;
  colorScheme: "emerald" | "amber" | "blue";
}) {
  const schemes = {
    emerald: "bg-emerald-50 border-emerald-200 text-emerald-700",
    amber: "bg-amber-50 border-amber-200 text-amber-700",
    blue: "bg-blue-50 border-blue-200 text-blue-700",
  };

  return (
    <div className="rounded-xl border border-[#e8e4dc] bg-white p-4 shadow-2xs flex items-center justify-between">
      <div>
        <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
          {title}
        </span>
        <div className="mt-1 text-3xl font-extrabold text-gray-900 tabular-nums">
          {value}
        </div>
        <div className="text-[11px] mt-1 inline-block">{subtitle}</div>
      </div>
      <div
        className={`w-12 h-12 rounded-xl border flex items-center justify-center shrink-0 ${schemes[colorScheme]}`}
      >
        <Icon className="w-6 h-6" />
      </div>
    </div>
  );
}

export default function DashboardKPIs({
  totalCleanings,
  sameDayCount,
  highValueCount,
  cleanersCount,
  overloadThreshold,
}: DashboardKPIsProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <KpiCard
        title="Weekly Cleanings"
        value={totalCleanings}
        subtitle={
          <span className="text-emerald-700 font-medium flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-emerald-600" /> Active Schedule
          </span>
        }
        icon={Sparkles}
        colorScheme="emerald"
      />

      <KpiCard
        title="Same-Day Turnovers"
        value={sameDayCount}
        subtitle={
          <span className="text-amber-700 font-medium">
            {Math.round((sameDayCount / totalCleanings) * 100)}% of total load
          </span>
        }
        icon={RefreshCw}
        colorScheme="amber"
      />

      <KpiCard
        title="High-Value (\$2K+)"
        value={highValueCount}
        subtitle={<span className="text-emerald-700 font-medium">Premium tier reservations</span>}
        icon={Gem}
        colorScheme="emerald"
      />

      <KpiCard
        title="Active Cleaners"
        value={cleanersCount}
        subtitle={<span className="text-gray-500">Limit: {overloadThreshold} tasks/day</span>}
        icon={Users}
        colorScheme="blue"
      />
    </div>
  );
}