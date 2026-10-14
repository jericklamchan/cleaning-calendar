"use client";

import { useState } from "react";
import { DaySchedule, Cleaner } from "@/types/planner";
import DayRow from "@/components/DayRow";

interface PlannerClientProps {
  schedule: DaySchedule[];
  cleaners: Cleaner[];
  weekLabel: string;
  prevHref: string;
  nextHref: string;
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

  // Compute total weekly cleanings dynamically
  const totalWeekCleanings = schedule.reduce(
    (acc, day) => acc + day.cleanings.filter((c) => !c.dayOff).length,
    0
  );

  return (
    <div className="min-h-screen bg-[#f8f7f4]">
      <div className="max-w-5xl mx-auto px-4 md:px-6 py-8">
        
        {/* Header Section */}
        <div className="mb-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <a href={prevHref} className="text-xl font-light text-gray-300 hover:text-gray-600 transition-colors">
                ←
              </a>
              <h1 className="text-3xl font-bold text-gray-900 mx-4">{weekLabel}</h1>
              <a href={nextHref} className="text-xl font-light text-gray-300 hover:text-gray-600 transition-colors">
                →
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
          <div className="flex items-center gap-6 bg-white border border-[#e8e4dc] rounded-xl px-5 py-2.5 w-fit mt-3">
            <span>🧹 <strong>{totalWeekCleanings}</strong></span>
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