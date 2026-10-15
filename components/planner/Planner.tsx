// components/Planner.tsx
"use client";

import { useState, useEffect } from "react";
import { DaySchedule, Cleaner } from "@/types/planner";
import DayRow from "@/components/planner/DayRow";
import CapacityView from "@/components/planner/CapacityView";
import LegendModal from "@/components/LegendModal";
import SchedulesView from "@/components/planner/SchedulesView";
import {
  ChevronLeft,
  ChevronRight,
  Sparkles,
  RefreshCw,
  Gem,
  HelpCircle,
} from "lucide-react";
import { isHighValueAssignment, isSameDayTurnover } from "@/lib/utils";

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

  useEffect(() => {
    setScheduleData(initialSchedule);
  }, [initialSchedule]);

  const toggleDay = (date: string) => {
    setExpandedDays((prev) => ({ ...prev, [date]: !prev[date] }));
  };

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
      {/* Reduced top padding (py-4) to eliminate gap under navbar */}
      <div className="max-w-5xl mx-auto px-4 md:px-6 py-4">
        
        {/* Header Card - Exactly matching DayRow container width and padding */}
        <div className="bg-white rounded-xl border border-[#e8e4dc] p-3.5 md:p-4 mb-2.5 shadow-2xs">
          <div className="flex flex-wrap items-center justify-between gap-3">
            
            {/* Left Controls: Week Switcher + Tabs */}
            <div className="flex items-center gap-3 flex-wrap">
              {/* Week Date Navigator */}
              <div className="flex items-center gap-1 bg-gray-50 border border-gray-200/80 rounded-lg p-1">
                <a
                  href={prevHref}
                  className="p-1 rounded-md hover:bg-white hover:shadow-2xs text-gray-500 transition-all"
                  aria-label="Previous week"
                >
                  <ChevronLeft className="w-4 h-4" />
                </a>
                <h1 className="text-sm md:text-base font-bold text-gray-900 px-2 select-none tracking-tight">
                  {weekLabel}
                </h1>
                <a
                  href={nextHref}
                  className="p-1 rounded-md hover:bg-white hover:shadow-2xs text-gray-500 transition-all"
                  aria-label="Next week"
                >
                  <ChevronRight className="w-4 h-4" />
                </a>
              </div>

              {/* View Switcher Tabs */}
              <nav className="flex items-center gap-1 bg-gray-100/70 p-1 rounded-lg">
                <button
                  onClick={() => setActiveTab("week")}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                    activeTab === "week"
                      ? "bg-white text-gray-900 shadow-2xs"
                      : "text-gray-500 hover:text-gray-900"
                  }`}
                >
                  Week
                </button>
                <button
                  onClick={() => setActiveTab("capacity")}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                    activeTab === "capacity"
                      ? "bg-white text-gray-900 shadow-2xs"
                      : "text-gray-500 hover:text-gray-900"
                  }`}
                >
                  Capacity
                </button>
                <button
                  onClick={() => setActiveTab("schedules")}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                    activeTab === "schedules"
                      ? "bg-white text-gray-900 shadow-2xs"
                      : "text-gray-500 hover:text-gray-900"
                  }`}
                >
                  Schedules
                </button>
              </nav>
            </div>

            {/* Right Controls: Stats Pill + Legend Trigger */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 bg-gray-50/80 border border-gray-200/60 rounded-lg px-3 py-1.5 text-xs text-gray-700">
                <span className="flex items-center gap-1 font-semibold" title="Total active cleanings">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{totalWeekCleanings}</span>
                </span>
                <span className="text-gray-300">·</span>
                <span className="text-amber-800 flex items-center gap-1 font-semibold" title="Same-day turnovers">
                  <RefreshCw className="w-3.5 h-3.5 text-amber-600" />
                  <span>{totalWeekSameDayTurnovers}</span>
                </span>
                {totalWeekHighValue > 0 && (
                  <>
                    <span className="text-gray-300">·</span>
                    <span className="text-emerald-800 flex items-center gap-1 font-semibold" title="High-value reservations (\$2,000+)">
                      <Gem className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{totalWeekHighValue}</span>
                    </span>
                  </>
                )}
              </div>

              <button
                onClick={() => setIsLegendOpen(true)}
                className="flex items-center gap-1 text-xs font-medium text-gray-600 hover:text-gray-900 bg-gray-50 hover:bg-gray-100 border border-gray-200/80 px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer"
              >
                <HelpCircle className="w-3.5 h-3.5 text-gray-400" />
                <span className="hidden sm:inline">Legend</span>
              </button>
            </div>
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