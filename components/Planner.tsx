// components/Planner.tsx
"use client";

import { useState } from "react";
import { DaySchedule, Cleaner, CleaningAssignment } from "@/types/planner";
import DayRow from "@/components/DayRow";
import { ChevronLeft, ChevronRight, Sparkles, RefreshCw, Gem } from "lucide-react";

interface PlannerClientProps {
  schedule: DaySchedule[];
  cleaners: Cleaner[];
  weekLabel: string;
  prevHref: string;
  nextHref: string;
}

// Helper function to evaluate high-value assignments ($2,000+)
function isHighValue(c: CleaningAssignment): boolean {
  const checkOutPrice = c.checkOut?.totalPrice ?? 0;
  const checkInPrice = c.checkIn?.totalPrice ?? 0;
  return checkOutPrice >= 2000 || checkInPrice >= 2000;
}

export default function Planner({
  schedule,
  cleaners,
  weekLabel,
  prevHref,
  nextHref,
}: PlannerClientProps) {
  const [expandedDays, setExpandedDays] = useState<Record<string, boolean>>({});

  const toggleDay = (date: string) => {
    setExpandedDays((prev) => ({ ...prev, [date]: !prev[date] }));
  };

  // Compute total weekly cleanings, same-day turnovers, and high-value reservations
  const totalWeekCleanings = schedule.reduce(
    (acc, day) => acc + day.cleanings.filter((c) => !c.dayOff).length,
    0
  );

  const totalWeekSameDayTurnovers = schedule.reduce(
    (acc, day) =>
      acc + day.cleanings.filter((c) => !c.dayOff && c.checkOut && c.checkIn).length,
    0
  );

  const totalWeekHighValue = schedule.reduce(
    (acc, day) =>
      acc + day.cleanings.filter((c) => !c.dayOff && isHighValue(c)).length,
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
            <button className="px-4 py-2.5 text-sm cursor-pointer relative text-gray-900 font-medium after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-gray-900">
              Week
            </button>
            <button className="px-4 py-2.5 text-sm cursor-pointer relative text-gray-400 hover:text-gray-600">
              Capacity
            </button>
            <button className="px-4 py-2.5 text-sm cursor-pointer relative text-gray-400 hover:text-gray-600">
              Schedules
            </button>
          </div>

          {/* Quick Counter Badge */}
          <div className="flex items-center gap-3 bg-white border border-[#e8e4dc] rounded-xl px-5 py-2.5 w-fit mt-3 text-sm text-gray-700">
            <span className="flex items-center gap-1.5 font-medium">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <strong>{totalWeekCleanings}</strong> cleanings
            </span>
            <span className="text-gray-300">·</span>
            <span className="text-amber-800 flex items-center gap-1.5 font-medium">
              <RefreshCw className="w-3.5 h-3.5 text-amber-500" />
              <strong>{totalWeekSameDayTurnovers}</strong> same-day turnovers
            </span>
            {totalWeekHighValue > 0 && (
              <>
                <span className="text-gray-300">·</span>
                <span className="text-emerald-800 flex items-center gap-1.5 font-medium">
                  <Gem className="w-3.5 h-3.5 text-emerald-600" />
                  <strong>{totalWeekHighValue}</strong> high-value
                </span>
              </>
            )}
          </div>
        </div>

        {/* Day Rows List */}
        <div className="flex flex-col gap-2.5">
          {schedule.map((day, idx) => (
            <DayRow
              key={day.date}
              day={day}
              cleaners={cleaners}
              isHighlighted={idx === 2}
              isExpanded={!!expandedDays[day.date]}
              onToggle={() => toggleDay(day.date)}
            />
          ))}
        </div>

      </div>
    </div>
  );
}