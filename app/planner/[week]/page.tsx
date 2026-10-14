import Planner from "@/components/Planner";
import { mockCleaners, mockSchedule } from "@/data/mockPlanner";

export default function PlannerPage({ params }: { params: { week: string } }) {

  const { week } = params;

  return (
    <Planner
      schedule={mockSchedule} 
      cleaners={mockCleaners} 
      weekLabel="Oct 11 – Oct 17"
      prevHref="/planner/2026-10-04"
      nextHref="/planner/2026-10-18"
    />
  );
}