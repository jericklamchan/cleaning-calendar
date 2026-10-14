import { DaySchedule, Cleaner } from "@/types/planner";
import DayRow from "./DayRow";

interface WeekViewProps {
  scheduleData: DaySchedule[];
  cleaners: Cleaner[];
  expandedDays: Record<string, boolean>;
  onToggleDay: (date: string) => void;
  onReassignCleaner: (
    date: string,
    taskId: string,
    sourceCleanerId: string,
    targetCleanerId: string
  ) => void;
}

export default function WeekView({
  scheduleData,
  cleaners,
  expandedDays,
  onToggleDay,
  onReassignCleaner,
}: WeekViewProps) {
  return (
    <div className="flex flex-col gap-2.5">
      {scheduleData.map((day, idx) => (
        <DayRow
          key={day.date}
          day={day}
          cleaners={cleaners}
          isHighlighted={idx === 2}
          isExpanded={!!expandedDays[day.date]}
          onToggle={() => onToggleDay(day.date)}
          onReassignCleaner={onReassignCleaner}
        />
      ))}
    </div>
  );
}