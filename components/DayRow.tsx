// components/DayRow.tsx
"use client";

import { DaySchedule, Cleaner, CleaningAssignment } from "@/types/planner";
import {
  ChevronDown,
  Sparkles,
  RefreshCw,
  AlertCircle,
  Moon,
  Home,
  Gem,
} from "lucide-react";

interface DayRowProps {
  day: DaySchedule;
  cleaners: Cleaner[];
  isHighlighted: boolean;
  isExpanded: boolean;
  onToggle: () => void;
}

// Helper function to identify high-value assignments (\$2000+)
function isHighValue(c: CleaningAssignment): boolean {
  const checkOutPrice = c.checkOut?.totalPrice ?? 0;
  const checkInPrice = c.checkIn?.totalPrice ?? 0;
  return checkOutPrice >= 2000 || checkInPrice >= 2000;
}

export default function DayRow({
  day,
  cleaners,
  isHighlighted,
  isExpanded,
  onToggle,
}: DayRowProps) {
  const activeCleanings = day.cleanings.filter((c) => !c.dayOff);
  const totalCleanings = activeCleanings.length;
  
  const sameDayTurnoversCount = activeCleanings.filter(
    (c) => c.checkOut && c.checkIn
  ).length;

  const highValueCount = activeCleanings.filter(isHighValue).length;

  return (
    <div
      className={`bg-white rounded-xl border overflow-hidden transition-all ${
        isHighlighted ? "border-green-300" : "border-[#e8e4dc]"
      }`}
    >
      {/* Day Header Row */}
      <div
        className="flex cursor-pointer hover:bg-gray-50 transition-colors duration-100 items-center"
        onClick={onToggle}
      >
        {/* Date Block */}
        <div
          className={`w-20 shrink-0 flex flex-col items-center justify-center py-4 border-r transition-colors ${
            isHighlighted
              ? "bg-green-600 border-green-300 text-white"
              : "bg-gray-50 border-[#e8e4dc]"
          }`}
        >
          <span
            className={`text-xs font-semibold uppercase tracking-wider ${
              isHighlighted ? "text-green-200" : "text-gray-400"
            }`}
          >
            {day.dow}
          </span>
          <span
            className={`text-2xl font-bold tabular-nums leading-tight ${
              isHighlighted ? "text-white" : "text-gray-900"
            }`}
          >
            {day.date.split("-")[2]}
          </span>
        </div>

        <div
          className={`w-1 shrink-0 self-stretch ${
            isHighlighted ? "bg-green-500" : ""
          }`}
        />

        {/* Day Summary Content */}
        <div className="flex-1 min-w-0 px-5 py-4 flex items-center gap-3">
          {/* Cleaning Stats, Same-Day & High-Value Badges */}
          <div className="flex items-center gap-2 shrink-0 text-sm font-medium tabular-nums">
            <span className="text-gray-800 font-semibold flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              {totalCleanings}
            </span>

            {sameDayTurnoversCount > 0 && (
              <span
                className="text-amber-800 bg-amber-100/80 border border-amber-200/80 px-2 py-0.5 rounded-full text-xs font-medium flex items-center gap-1"
                title={`${sameDayTurnoversCount} same-day turnover(s)`}
              >
                <RefreshCw className="w-3 h-3 text-amber-600" />
                {sameDayTurnoversCount}
              </span>
            )}

            {highValueCount > 0 && (
              <span
                className="text-emerald-800 bg-emerald-100/80 border border-emerald-200/80 px-2 py-0.5 rounded-full text-xs font-medium flex items-center gap-1"
                title={`${highValueCount} high-value reservation(s) ($2,000+)`}
              >
                <Gem className="w-3 h-3 text-emerald-600" />
                {highValueCount}
              </span>
            )}
          </div>

          <span className="text-gray-200 text-sm shrink-0">·</span>

          {/* Cleaners Summary */}
          <div className="flex items-center gap-1.5 text-sm text-gray-400 tabular-nums min-w-0 overflow-hidden">
            {cleaners.map((cleaner, cIdx) => {
              const cleanerCleanings = activeCleanings.filter(
                (c) => c.cleaner.id === cleaner.id
              ).length;
              const hasOff = day.cleanings.some(
                (c) => c.cleaner.id === cleaner.id && c.dayOff
              );

              return (
                <span
                  key={cleaner.id}
                  className="flex items-center gap-1 shrink-0"
                >
                  {cIdx > 0 && <span className="text-gray-300">·</span>}
                  {hasOff && (
                    <span title={`${cleaner.name} · tentative day off`}>
                      <AlertCircle className="w-3.5 h-3.5 text-purple-500" />
                    </span>
                  )}
                  <span>
                    {cleaner.name} {cleanerCleanings}
                  </span>
                </span>
              );
            })}
          </div>

          <div className="flex-1" />

          <ChevronDown
            className={`w-5 h-5 text-gray-400 transition-transform duration-200 shrink-0 ${
              isExpanded ? "rotate-180 text-gray-600" : ""
            }`}
          />
        </div>
      </div>

      {/* Expanded Drawer Details */}
      {isExpanded && (
        <div className="border-t border-gray-100 bg-gray-50/30">
          {/* Day off notices */}
          {day.cleanings.some((c) => c.dayOff) && (
            <div className="flex flex-col gap-2 p-3 border-b border-gray-100 bg-purple-50/20">
              {day.cleanings.map(
                (c, i) =>
                  c.dayOff && (
                    <div
                      key={i}
                      className="flex items-center gap-2 px-3 py-1.5 rounded-r-lg border-l-2 text-xs font-normal border-purple-400 text-purple-800"
                    >
                      <Moon className="w-3.5 h-3.5 text-purple-600" />
                      <span>{c.cleaner.name} · tentative day off</span>
                    </div>
                  )
              )}
            </div>
          )}

          {/* Cleaner assignment breakdown */}
          {cleaners.map((cleaner) => {
            const assignedCleanings = day.cleanings.filter(
              (c) => c.cleaner.id === cleaner.id && !c.dayOff
            );
            return (
              <div
                key={cleaner.id}
                className="flex gap-3 px-4 py-3 border-t border-gray-100 first:border-t-0 bg-white"
              >
                <span className="text-sm font-semibold text-gray-900 w-24 shrink-0 pt-0.5">
                  {cleaner.name}
                </span>
                <div className="flex flex-wrap gap-1.5 items-center flex-1 min-w-0">
                  {assignedCleanings.length === 0 ? (
                    <span className="text-xs text-gray-300 italic">
                      No assignments
                    </span>
                  ) : (
                    assignedCleanings.map((assignment, idx) => {
                      const isSameDay = Boolean(
                        assignment.checkOut && assignment.checkIn
                      );
                      const isHighVal = isHighValue(assignment);

                      return (
                        <span
                          key={idx}
                          className={`text-xs px-2.5 py-1 rounded font-medium flex items-center gap-1.5 transition-colors ${
                            isHighVal
                              ? "bg-emerald-50 text-emerald-900 border border-emerald-300 shadow-2xs"
                              : isSameDay
                              ? "bg-amber-100 text-amber-800 border border-amber-200"
                              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                          }`}
                          title={`${assignment.property?.name}${
                            assignment.checkOut
                              ? ` · Out: \${assignment.checkOut.time}`
                              : ""
                          }${
                            assignment.checkIn
                              ? ` · In: \${assignment.checkIn.time}`
                              : ""
                          }`}
                        >
                          {isHighVal ? (
                            <Gem className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          ) : isSameDay ? (
                            <RefreshCw className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                          ) : (
                            <Home className="w-3.5 h-3.5 text-gray-500 shrink-0" />
                          )}
                          <span>
                            {assignment.property?.name ||
                              `Property #${idx + 1}`}
                          </span>
                        </span>
                      );
                    })
                  )}
                </div>
              </div>
            );
          })}

          {/* Drawer Legend */}
          <div className="px-4 py-2.5 border-t border-gray-100 flex gap-4 flex-wrap bg-gray-50 text-xs text-gray-500">
            <span className="flex items-center gap-1.5">
              <RefreshCw className="w-3 h-3 text-amber-500" />
              same-day turnover
            </span>
            <span className="flex items-center gap-1.5">
              <Gem className="w-3 h-3 text-emerald-600" />
              high-value (\$2,000+)
            </span>
          </div>
        </div>
      )}
    </div>
  );
}