import { Suspense } from "react";
import Planner from "@/components/Planner";
import { mockCleaners, getMockScheduleForWeek } from "@/data/mockPlanner";

interface PageProps {
  params: Promise<{
    week: string;
  }>;
}

// Inner component that safely consumes the async params Promise
async function PlannerLoader({ params }: PageProps) {
  const { week } = await params;
  
  const schedule = getMockScheduleForWeek(week);

  // Format week range label (e.g., "Oct 11 – Oct 17")
  const startDate = new Date(week);
  const endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + 6);

  const options: Intl.DateTimeFormatOptions = { month: "short", day: "numeric" };
  const weekLabel = `${startDate.toLocaleDateString("en-US", options)} – ${endDate.toLocaleDateString("en-US", options)}`;

  // Compute prev/next week string links easily
  const prevDate = new Date(startDate);
  prevDate.setDate(startDate.getDate() - 7);
  const nextDate = new Date(startDate);
  nextDate.setDate(startDate.getDate() + 7);

  const prevHref = `/planner/${prevDate.toISOString().split("T")[0]}`;
  const nextHref = `/planner/${nextDate.toISOString().split("T")[0]}`;

  return (
    <Planner 
      schedule={schedule} 
      cleaners={mockCleaners} 
      weekLabel={weekLabel}
      prevHref={prevHref}
      nextHref={nextHref}
    />
  );
}

// Page wrapper with explicit Suspense boundary to satisfy instant navigation rules
export default function PlannerPage(props: PageProps) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#f8f7f4] flex items-center justify-center text-gray-400">Loading schedule...</div>}>
      <PlannerLoader {...props} />
    </Suspense>
  );
}