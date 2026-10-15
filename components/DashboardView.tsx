import { getCleaners } from "@/stores/cleanerStore";
import { getSettings } from "@/lib/cache";

import PageHeader from "@/components/PageHeader";
import DashboardKPIs from "@/components/dashboard/DashboardKPIs";
import CleaningTrendChart from "@/components/dashboard/CleaningTrendChart";
import CleanerWorkload from "@/components/dashboard/CleanerWorkload";
import OperationalMixCards from "@/components/dashboard/OperationalMixCards";

export default async function DashboardView() {
  const [cleaners, settings] = await Promise.all([
    getCleaners(),
    getSettings(),
  ]);

  const trendData = [
    { day: "Mon", total: 6, sameDay: 2 },
    { day: "Tue", total: 9, sameDay: 4 },
    { day: "Wed", total: 5, sameDay: 2 },
    { day: "Thu", total: 11, sameDay: 5 },
    { day: "Fri", total: 14, sameDay: 8 },
    { day: "Sat", total: 12, sameDay: 5 },
    { day: "Sun", total: 8, sameDay: 3 },
  ];
  const heavyloadThreshold = settings.heavyLoadThreshold ?? 4;
  const totalCleaningsWeekly = trendData.reduce((acc, d) => acc + d.total, 0);
  const sameDayTurnoversWeekly = trendData.reduce((acc, d) => acc + d.sameDay, 0);
  const standardCleaningsWeekly = totalCleaningsWeekly - sameDayTurnoversWeekly;
  const highValueAssignmentsWeekly = 18;

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Operations Dashboard & Analytics"
        description="Comprehensive report on cleaning assignments, cleaner stats, and turnover velocity."
        size="md"
      />

      {/* Top Metric Cards */}
      <DashboardKPIs
        totalCleanings={totalCleaningsWeekly}
        sameDayCount={sameDayTurnoversWeekly}
        highValueCount={highValueAssignmentsWeekly}
        cleanersCount={cleaners.length}
        overloadThreshold={heavyloadThreshold}
      />

      {/* Row 1 Analytics: Trend Chart & Workload */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 items-stretch">
        <CleaningTrendChart trendData={trendData} />
        <CleanerWorkload cleaners={cleaners} />
      </div>

      {/* Row 2 Analytics: Operational Mix Ratio Cards */}
      <OperationalMixCards
        totalCleaningsWeekly={totalCleaningsWeekly}
        sameDayTurnoversWeekly={sameDayTurnoversWeekly}
        standardCleaningsWeekly={standardCleaningsWeekly}
        highValueAssignmentsWeekly={highValueAssignmentsWeekly}
      />
    </div>
  );
}