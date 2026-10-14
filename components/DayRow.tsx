"use client";

import { DaySchedule, Cleaner } from "@/types/planner";

interface DayRowProps {
  day: DaySchedule;
  cleaners: Cleaner[];
  isHighlighted: boolean;
  isExpanded: boolean;
  onToggle: () => void;
}

export default function DayRow({
  day,
  cleaners,
  isHighlighted,
  isExpanded,
  onToggle,
}: DayRowProps) {
  return (
    <div
      className={`bg-white rounded-xl border overflow-hidden ${
        isHighlighted ? "border-green-300" : "border-[#e8e4dc]"
      }`}
    >
      {/* Day Header Row */}
      <div
        className="flex cursor-pointer hover:bg-gray-50 transition-colors duration-100"
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

        <div className={`w-1 shrink-0 ${isHighlighted ? "bg-green-500" : ""}`} />

        {/* Day Summary Content */}
        <div className="flex-1 min-w-0 px-5 py-4 flex items-center gap-3">
          <div className="flex items-center gap-4 shrink-0 text-base font-medium tabular-nums">
            <span className="text-gray-700 font-semibold">🧹 0</span>
          </div>
          <span className="text-gray-200 text-sm shrink-0">·</span>
          
          <div className="flex items-center gap-1.5 text-sm text-gray-400 tabular-nums min-w-0 overflow-hidden">
            {cleaners.map((cleaner, cIdx) => {
              const hasOff = day.cleanings.some(
                (c) => c.cleaner.id === cleaner.id && c.dayOff
              );
              return (
                <span key={cleaner.id} className="flex items-center gap-1 shrink-0">
                  {cIdx > 0 && <span className="text-gray-300">·</span>}
                  {hasOff && (
                    <span className="text-purple-500" title={`${cleaner.name} · tentative day off`}>
                      ⚠
                    </span>
                  )}
                  <span>{cleaner.name} 0</span>
                </span>
              );
            })}
          </div>

          <div className="flex-1" />
          
          <button
            title="Add manual cleaning"
            className="text-xs px-1.5 py-0.5 rounded bg-gray-100 text-gray-500 hover:bg-gray-200 shrink-0"
            onClick={(e) => {
              e.stopPropagation(); // Prevent toggling the accordion
              // Add manual cleaning handler here
            }}
          >
            +
          </button>

          {day.cleanings.length > 0 && (
            <span className="text-xs font-normal px-2.5 py-0.5 rounded-full shrink-0 bg-amber-100 text-amber-700">
              {day.cleanings.length}
            </span>
          )}
          <span className="text-base text-gray-300 hover:text-gray-500 shrink-0">▾</span>
        </div>
      </div>

      {/* Expanded Drawer Details */}
      {isExpanded && (
        <div className="border-t border-gray-100">
          <div className="flex flex-col gap-3 p-3 border-b border-gray-100">
            {day.cleanings.map(
              (c, i) =>
                c.dayOff && (
                  <div
                    key={i}
                    className="flex items-center gap-3 px-3 py-2 rounded-r-lg border-l-2 text-xs font-normal bg-purple-50/50 border-purple-400 text-purple-800"
                  >
                    <span aria-hidden="true">🌙</span>
                    <span className="flex-1">{c.cleaner.name} · tentative day off</span>
                  </div>
                )
            )}
          </div>
          
          {cleaners.map((cleaner) => (
            <div
              key={cleaner.id}
              className="flex gap-3 px-4 py-3 border-t border-gray-100 first:border-t-0"
            >
              <span className="text-sm font-semibold text-gray-900 w-24 shrink-0 pt-0.5">
                {cleaner.name}
              </span>
              <div className="flex flex-wrap gap-1.5 items-center flex-1 min-w-0"></div>
            </div>
          ))}

          <div className="px-4 py-2 border-t border-gray-100 flex gap-4 flex-wrap">
            <span className="text-xs text-gray-400 flex items-center gap-1">
              <span className="inline-block w-2 h-2 rounded-sm bg-amber-200"></span> same-day turnover
            </span>
          </div>
        </div>
      )}
    </div>
  );
}