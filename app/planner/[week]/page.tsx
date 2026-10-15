import { Suspense } from "react";
import Planner from "@/components/planner/Planner";
import { getCleaners } from "@/stores/cleanerStore";
import { getProperties } from "@/stores/propertyStore";
import { getMockScheduleForWeek } from "@/lib/mockService";

interface PageProps {
  params: Promise<{
    week: string;
  }>;
}

async function PlannerLoader({ params }: PageProps) {
  const { week } = await params;

  const [cleaners, properties] = await Promise.all([
    getCleaners(),
    getProperties(),
  ]);

  // Generate week schedule dynamically based on saved stores
  const schedule = getMockScheduleForWeek(week, cleaners, properties);

  const startDate = new Date(week);
  const endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + 6);

  const options: Intl.DateTimeFormatOptions = { month: "short", day: "numeric" };
  const weekLabel = `${startDate.toLocaleDateString("en-US", options)} – ${endDate.toLocaleDateString("en-US", options)}`;

  const prevDate = new Date(startDate);
  prevDate.setDate(startDate.getDate() - 7);
  const nextDate = new Date(startDate);
  nextDate.setDate(startDate.getDate() + 7);

  const prevHref = `/planner/${prevDate.toISOString().split("T")[0]}`;
  const nextHref = `/planner/${nextDate.toISOString().split("T")[0]}`;

  return (
    <Planner 
      schedule={schedule} 
      cleaners={cleaners} 
      weekLabel={weekLabel}
      prevHref={prevHref}
      nextHref={nextHref}
    />
  );
}

export default function PlannerPage(props: PageProps) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#f8f7f4] flex items-center justify-center text-gray-400">Loading schedule...</div>}>
      <PlannerLoader {...props} />
    </Suspense>
  );
}