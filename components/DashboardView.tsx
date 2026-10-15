import { getCleaners } from "@/stores/cleanerStore";
import { getDashboardMetrics } from "@/lib/cache";

import PageHeader from "@/components/PageHeader";
import DashboardKPIs from "@/components/dashboard/DashboardKPIs";
import CleaningTrendChart from "@/components/dashboard/CleaningTrendChart";
import CleanerWorkload from "@/components/dashboard/CleanerWorkload";
import OperationalMixCards from "@/components/dashboard/OperationalMixCards";

export default async function DashboardView() {
  const [cleaners, metrics] = await Promise.all([
    getCleaners(),
    getDashboardMetrics(),
  ]);

  const {
    trendData,
    cleanerWorkloads,
    totalCleaningsWeekly,
    sameDayTurnoversWeekly,
    standardCleaningsWeekly,
    highValueAssignmentsWeekly,
    heavyLoadThreshold,
  } = metrics;

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
        overloadThreshold={heavyLoadThreshold}
      />

      {/* Row 1 Analytics: Trend Chart & Workload */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 items-stretch">
        <CleaningTrendChart trendData={trendData} />
        <CleanerWorkload
          cleanerWorkloads={cleanerWorkloads}
          heavyLoadThreshold={heavyLoadThreshold}
        />
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