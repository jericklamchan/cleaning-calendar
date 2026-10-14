"use client";

import { useState, useEffect } from "react";
import { DaySchedule, Cleaner } from "@/types/planner";
import DayRow from "@/components/planner/DayRow";
import CapacityView from "@/components/planner/CapacityView";
import LegendModal from "@/components/LegendModal";
import SchedulesView from "@/components/planner/SchedulesView";
import { ChevronLeft, ChevronRight, Sparkles, RefreshCw, Gem, HelpCircle } from "lucide-react";
import { isHighValueAssignment, isSameDayTurnover } from "@/utils/plannerUtils";

interface PlannerClientProps {
  schedule: DaySchedule[];
  cleaners: Cleaner[];
  weekLabel: string;
  prevHref: string;
  nextHref: string;
}

export default function Planner({
  schedule: initialSchedule,
  cleaners,
  weekLabel,
  prevHref,
  nextHref,
}: PlannerClientProps) {
  const [scheduleData, setScheduleData] = useState<DaySchedule[]>(initialSchedule);
  const [activeTab, setActiveTab] = useState<"week" | "capacity" | "schedules">("week");
  const [expandedDays, setExpandedDays] = useState<Record<string, boolean>>({});
  const [isLegendOpen, setIsLegendOpen] = useState(false);

  // Keep state in sync if props change (e.g., changing weeks via navigation)
  useEffect(() => {
    setScheduleData(initialSchedule);
  }, [initialSchedule]);

  const toggleDay = (date: string) => {
    setExpandedDays((prev) => ({ ...prev, [date]: !prev[date] }));
  };

  // Reassignment Handler: Target specific task by unique taskId (fallback to property.id if missing)
  const handleReassignCleaner = (
    date: string,
    taskId: string,
    sourceCleanerId: string,
    targetCleanerId: string
  ) => {
    if (sourceCleanerId === targetCleanerId) return;

    const targetCleaner = cleaners.find((c) => c.id === targetCleanerId);
    if (!targetCleaner) return;

    setScheduleData((prevSchedule) =>
      prevSchedule.map((day) => {
        if (day.date !== date) return day;

        // Map through cleanings and reassign only the exact task instance matching taskId
        const updatedCleanings = day.cleanings.map((task) => {
          const currentTaskId = task.id || task.property?.id;
          if (
            currentTaskId === taskId &&
            task.cleaner?.id === sourceCleanerId
          ) {
            return {
              ...task,
              cleaner: targetCleaner,
            };
          }
          return task;
        });

        return {
          ...day,
          cleanings: updatedCleanings,
        };
      })
    );
  };

  const totalWeekCleanings = scheduleData.reduce(
    (acc, day) => acc + day.cleanings.filter((c) => !c.dayOff).length,
    0
  );

  const totalWeekSameDayTurnovers = scheduleData.reduce(
    (acc, day) =>
      acc + day.cleanings.filter((c) => !c.dayOff && isSameDayTurnover(c)).length,
    0
  );

  const totalWeekHighValue = scheduleData.reduce(
    (acc, day) =>
      acc + day.cleanings.filter((c) => !c.dayOff && isHighValueAssignment(c)).length,
    0
  );

  return (
    <div className="min-h-screen bg-[#f8f7f4]">
      <div className="max-w-5xl mx-auto px-4 md:px-6 py-8">
        
        {/* Header Section */}
        <div className="mb-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <a
                href={prevHref}
                className="p-1.5 rounded-lg border border-[#e8e4dc] bg-white text-gray-500 hover:bg-gray-50 transition-colors"
                aria-label="Previous week"
              >
                <ChevronLeft className="w-5 h-5" />
              </a>
              <h1 className="text-3xl font-bold text-gray-900 mx-4">{weekLabel}</h1>
              <a
                href={nextHref}
                className="p-1.5 rounded-lg border border-[#e8e4dc] bg-white text-gray-500 hover:bg-gray-50 transition-colors"
                aria-label="Next week"
              >
                <ChevronRight className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Sub-tabs */}
          <div className="flex items-center gap-0 border-b border-gray-200 mt-3">
            <button
              onClick={() => setActiveTab("week")}
              className={`px-4 py-2.5 text-sm cursor-pointer relative font-medium transition-colors ${
                activeTab === "week"
                  ? "text-gray-900 after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-gray-900"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              Week
            </button>
            <button
              onClick={() => setActiveTab("capacity")}
              className={`px-4 py-2.5 text-sm cursor-pointer relative font-medium transition-colors ${
                activeTab === "capacity"
                  ? "text-gray-900 after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-gray-900"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              Capacity
            </button>
            <button
              onClick={() => setActiveTab("schedules")}
              className={`px-4 py-2.5 text-sm cursor-pointer relative font-medium transition-colors ${
                activeTab === "schedules"
                  ? "text-gray-900 after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-gray-900"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              Schedules
            </button>
          </div>

          {/* Quick Counter Badge with Legend Trigger */}
          <div className="flex items-center justify-between mt-3 flex-wrap gap-3">
            <div className="flex items-center gap-3 bg-white border border-[#e8e4dc] rounded-xl px-5 py-2.5 text-sm text-gray-700">
              <span className="flex items-center gap-1.5 font-medium">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <strong>{totalWeekCleanings}</strong>
              </span>
              <span className="text-gray-300">·</span>
              <span className="text-amber-800 flex items-center gap-1.5 font-medium">
                <RefreshCw className="w-3.5 h-3.5 text-amber-500" />
                <strong>{totalWeekSameDayTurnovers}</strong>
              </span>
              {totalWeekHighValue > 0 && (
                <>
                  <span className="text-gray-300">·</span>
                  <span className="text-emerald-800 flex items-center gap-1.5 font-medium">
                    <Gem className="w-3.5 h-3.5 text-emerald-600" />
                    <strong>{totalWeekHighValue}</strong>
                  </span>
                </>
              )}
            </div>

            <button
              onClick={() => setIsLegendOpen(true)}
              className="flex items-center gap-1.5 text-xs font-medium text-gray-500 hover:text-gray-800 bg-white hover:bg-gray-50 border border-[#e8e4dc] px-3 py-2 rounded-xl transition-colors cursor-pointer"
            >
              <HelpCircle className="w-3.5 h-3.5 text-gray-400" />
              <span>Legend</span>
            </button>
          </div>
        </div>

        {/* Tab Views */}
        {activeTab === "week" && (
          <div className="flex flex-col gap-2.5">
            {scheduleData.map((day, idx) => (
              <DayRow
                key={day.date}
                day={day}
                cleaners={cleaners}
                isHighlighted={idx === 2}
                isExpanded={!!expandedDays[day.date]}
                onToggle={() => toggleDay(day.date)}
                onReassignCleaner={handleReassignCleaner}
              />
            ))}
          </div>
        )}

        {activeTab === "capacity" && (
          <CapacityView schedule={scheduleData} cleaners={cleaners} />
        )}

        {activeTab === "schedules" && (
          <SchedulesView schedule={scheduleData} cleaners={cleaners} weekLabel={weekLabel} />
        )}

      </div>

      <LegendModal
        isOpen={isLegendOpen}
        onClose={() => setIsLegendOpen(false)}
        activeTab={activeTab}
      />
    </div>
  );
}