"use client";

import { DaySchedule, Cleaner } from "@/types/planner";
import {
  Sparkles,
  RefreshCw,
  Gem,
  AlertTriangle,
  Moon,
} from "lucide-react";
import {
  getCleanerWeeklyCapacity,
  isHighValueAssignment,
  isSameDayTurnover,
} from "@/utils/plannerUtils";

interface CapacityViewProps {
  schedule: DaySchedule[];
  cleaners: Cleaner[];
}

export default function CapacityView({ schedule, cleaners }: CapacityViewProps) {
  return (
    <div className="bg-white rounded-xl border border-[#e8e4dc] overflow-hidden shadow-2xs">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[700px]">
          {/* Calendar Header Row */}
          <thead>
            <tr className="bg-gray-50/80 border-b border-gray-200 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              <th className="py-3.5 px-4 w-44 bg-gray-50/90 border-r border-gray-200">
                Cleaner
              </th>
              {schedule.map((day, idx) => (
                <th
                  key={day.date}
                  className={`py-3 px-3 text-center border-r border-gray-200/80 last:border-r-0 ${
                    idx === 2 ? "bg-emerald-50/60 text-emerald-900 font-bold" : ""
                  }`}
                >
                  <div className="text-[10px] uppercase text-gray-400">{day.dow}</div>
                  <div className="text-sm font-bold text-gray-900 tabular-nums">
                    {day.date.split("-")[2]}
                  </div>
                </th>
              ))}
              <th className="py-3.5 px-4 text-center bg-gray-50/90 border-l border-gray-200 w-32">
                Weekly Total
              </th>
            </tr>
          </thead>

          {/* Cleaner Capacity Matrix Body */}
          <tbody className="divide-y divide-gray-100 text-sm">
            {cleaners.map((cleaner) => {
              const capacity = getCleanerWeeklyCapacity(cleaner.id, schedule);

              return (
                <tr
                  key={cleaner.id}
                  className="hover:bg-gray-50/50 transition-colors"
                >
                  {/* Cleaner Info Column */}
                  <td className="py-3 px-4 border-r border-gray-200 bg-white font-medium text-gray-900">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-emerald-100 border border-emerald-200 flex items-center justify-center text-emerald-800 font-bold text-xs shrink-0">
                        {cleaner.name.substring(0, 2).toUpperCase()}
                      </div>
                      <span className="font-semibold text-gray-900 truncate">
                        {cleaner.name}
                      </span>
                    </div>
                  </td>

                  {/* 7-Day Grid Cells */}
                  {schedule.map((day) => {
                    const dayCleanings = day.cleanings.filter(
                      (c) => c.cleaner.id === cleaner.id && !c.dayOff
                    );
                    const hasOff = day.cleanings.some(
                      (c) => c.cleaner.id === cleaner.id && c.dayOff
                    );
                    const isOverloaded = dayCleanings.length >= 4;
                    const sameDayCount = dayCleanings.filter(isSameDayTurnover).length;
                    const highValCount = dayCleanings.filter(isHighValueAssignment).length;

                    return (
                      <td
                        key={day.date}
                        className={`p-2 text-center border-r border-gray-100 align-middle ${
                          hasOff
                            ? "bg-purple-50/40"
                            : isOverloaded
                            ? "bg-rose-50/50"
                            : dayCleanings.length > 0
                            ? "bg-white"
                            : "bg-gray-50/30"
                        }`}
                      >
                        {hasOff ? (
                          <div className="flex items-center justify-center gap-1 text-xs text-purple-700 font-medium py-1">
                            <Moon className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                            <span className="text-[11px]">Off</span>
                          </div>
                        ) : dayCleanings.length === 0 ? (
                          <span className="text-xs text-gray-300 italic">—</span>
                        ) : (
                          <div className="flex flex-col items-center justify-center gap-1 py-1">
                            <div className="flex items-center gap-1">
                              <span
                                className={`text-sm font-bold tabular-nums ${
                                  isOverloaded ? "text-rose-700" : "text-gray-900"
                                }`}
                              >
                                {dayCleanings.length}
                              </span>
                              {isOverloaded && (
                                <AlertTriangle className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                              )}
                            </div>

                            {/* Sub-Badges */}
                            <div className="flex items-center gap-1">
                              {sameDayCount > 0 && (
                                <span
                                  className="text-[10px] px-1 py-0.2 rounded bg-amber-100 text-amber-800 font-medium flex items-center gap-0.5"
                                  title={`${sameDayCount} same-day turnover(s)`}
                                >
                                  <RefreshCw className="w-2.5 h-2.5 text-amber-600" />
                                  {sameDayCount}
                                </span>
                              )}
                              {highValCount > 0 && (
                                <span
                                  className="text-[10px] px-1 py-0.2 rounded bg-emerald-100 text-emerald-800 font-medium flex items-center gap-0.5"
                                  title={`${highValCount} high-value property`}
                                >
                                  <Gem className="w-2.5 h-2.5 text-emerald-600" />
                                  {highValCount}
                                </span>
                              )}
                            </div>
                          </div>
                        )}
                      </td>
                    );
                  })}

                  {/* Single Source of Truth Weekly Capacity Status Column */}
                    <td className="py-3 px-4 border-l border-gray-200 text-center bg-gray-50/30">
                    <div className="flex flex-col items-center gap-1">
                        <span className="text-sm font-bold text-gray-900 tabular-nums flex items-center gap-1">
                        <Sparkles
                            className={`w-3.5 h-3.5 ${
                            capacity.capacityStatus === "Overloaded"
                                ? "text-rose-600"
                                : capacity.capacityStatus === "High Load"
                                ? "text-amber-500"
                                : "text-emerald-600"
                            }`}
                        />
                        {capacity.totalCleanings}
                        </span>
                        {capacity.capacityStatus === "Overloaded" && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full font-medium bg-rose-100 text-rose-800 border border-rose-200">
                            Overloaded
                        </span>
                        )}
                        {capacity.capacityStatus === "High Load" && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full font-medium bg-amber-100 text-amber-800 border border-amber-200">
                            High Load
                        </span>
                        )}
                        {capacity.capacityStatus === "Optimal" && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full font-medium bg-emerald-100 text-emerald-800 border border-emerald-200">
                            Optimal
                        </span>
                        )}
                    </div>
                    </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}