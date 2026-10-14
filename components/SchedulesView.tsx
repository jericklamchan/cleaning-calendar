"use client";

import { useState } from "react";
import { DaySchedule, Cleaner } from "@/types/planner";
import {
  Copy,
  Check,
  Send,
  Moon,
  RefreshCw,
  Gem,
} from "lucide-react";
import { isHighValueAssignment, isSameDayTurnover } from "@/utils/plannerUtils";

interface SchedulesViewProps {
  schedule: DaySchedule[];
  cleaners: Cleaner[];
  weekLabel: string;
}

export default function SchedulesView({
  schedule,
  cleaners,
  weekLabel,
}: SchedulesViewProps) {
  const [copiedCleanerId, setCopiedCleanerId] = useState<string | null>(null);
  const [activeShareMenu, setActiveShareMenu] = useState<string | null>(null);

  // Helper to format plain-text schedules for messaging or clipboard copy
  const generateCleanerTextSchedule = (cleaner: Cleaner) => {
    let text = `Cleaning Schedule for ${cleaner.name} (${weekLabel})\n`;
    text += `=====================================\n\n`;

    schedule.forEach((day) => {
      const cleanerAssignments = day.cleanings.filter(
        (c) => c.cleaner.id === cleaner.id && !c.dayOff
      );
      const hasOff = day.cleanings.some(
        (c) => c.cleaner.id === cleaner.id && c.dayOff
      );

      text += `[${day.dow.toUpperCase()} - ${day.date}]\n`;
      if (hasOff) {
        text += `  • Day Off\n`;
      } else if (cleanerAssignments.length === 0) {
        text += `  • No cleanings scheduled\n`;
      } else {
        cleanerAssignments.forEach((c) => {
          const isTurnover = isSameDayTurnover(c);
          const isHighVal = isHighValueAssignment(c);
          text += `  • ${c.property.name}`;
          if (isTurnover) text += ` (🔄 Same-day turnover)`;
          if (isHighVal) text += ` (💎 High-Value)`;
          text += `\n`;
        });
      }
      text += `\n`;
    });

    return text;
  };

  const handleCopy = (cleaner: Cleaner) => {
    const scheduleText = generateCleanerTextSchedule(cleaner);
    navigator.clipboard.writeText(scheduleText);
    setCopiedCleanerId(cleaner.id);
    setTimeout(() => setCopiedCleanerId(null), 2000);
  };

  const handleShare = (cleanerName: string, channel: string) => {
    alert(`[Demo] Opening ${channel} to send schedule to ${cleanerName}!`);
    setActiveShareMenu(null);
  };

  return (
    <div className="flex flex-col gap-6">
      {cleaners.map((cleaner) => {
        // Collect weekly assignments for cleaner
        const cleanerWeekData = schedule.map((day) => {
          const assignments = day.cleanings.filter(
            (c) => c.cleaner.id === cleaner.id && !c.dayOff
          );
          const hasOff = day.cleanings.some(
            (c) => c.cleaner.id === cleaner.id && c.dayOff
          );
          return { day, assignments, hasOff };
        });

        const totalTasks = cleanerWeekData.reduce(
          (acc, d) => acc + d.assignments.length,
          0
        );

        return (
          <div
            key={cleaner.id}
            className="bg-white rounded-xl border border-[#e8e4dc] overflow-hidden shadow-2xs transition-all hover:border-gray-300"
          >
            {/* Cleaner Header Row */}
            <div className="flex flex-wrap items-center justify-between gap-4 p-5 bg-gray-50/60 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-100 border border-emerald-200 flex items-center justify-center text-emerald-800 font-bold text-sm shrink-0">
                  {cleaner.name.substring(0, 2).toUpperCase()}
                </div>
                <div>
                  <h3 className="text-base font-semibold text-gray-900">
                    {cleaner.name}&apos;s Weekly Schedule
                  </h3>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {weekLabel} · {totalTasks} total cleaning task{totalTasks !== 1 ? "s" : ""}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 relative">
                {/* Copy Button */}
                <button
                  onClick={() => handleCopy(cleaner)}
                  className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-gray-700 bg-white hover:bg-gray-50 border border-gray-200 rounded-lg transition-colors cursor-pointer"
                >
                  {copiedCleanerId === cleaner.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-700 font-semibold">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-gray-500" />
                      <span>Copy Schedule</span>
                    </>
                  )}
                </button>

                {/* Send To Dropdown */}
                <div className="relative">
                  <button
                    onClick={() =>
                      setActiveShareMenu(
                        activeShareMenu === cleaner.id ? null : cleaner.id
                      )
                    }
                    className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-white bg-gray-900 hover:bg-gray-800 rounded-lg transition-colors cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send To...</span>
                  </button>

                  {/* Share Menu */}
                  {activeShareMenu === cleaner.id && (
                    <div className="absolute right-0 mt-1.5 w-48 bg-white border border-gray-200 rounded-xl shadow-lg py-1.5 z-20 animate-in fade-in zoom-in-95 duration-100">
                      <button
                        onClick={() => handleShare(cleaner.name, "WhatsApp")}
                        className="w-full text-left px-4 py-2 text-xs text-gray-700 hover:bg-gray-50 flex items-center gap-2 cursor-pointer font-medium"
                      >
                        <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                        WhatsApp
                      </button>
                      <button
                        onClick={() => handleShare(cleaner.name, "Slack")}
                        className="w-full text-left px-4 py-2 text-xs text-gray-700 hover:bg-gray-50 flex items-center gap-2 cursor-pointer font-medium"
                      >
                        <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                        Slack DM
                      </button>
                      <button
                        onClick={() => handleShare(cleaner.name, "Microsoft Teams")}
                        className="w-full text-left px-4 py-2 text-xs text-gray-700 hover:bg-gray-50 flex items-center gap-2 cursor-pointer font-medium"
                      >
                        <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                        Microsoft Teams
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Daily Rows */}
            <div className="divide-y divide-gray-100">
              {cleanerWeekData.map(({ day, assignments, hasOff }, idx) => (
                <div
                  key={day.date}
                  className={`p-4 flex items-center gap-4 transition-colors ${
                    hasOff
                      ? "bg-purple-50/20"
                      : idx === 2
                      ? "bg-emerald-50/20"
                      : "hover:bg-gray-50/30"
                  }`}
                >
                  {/* Date Badge */}
                  <div className="w-14 py-1.5 bg-gray-100/90 rounded-lg text-center shrink-0 border border-gray-200/50">
                    <div className="text-[10px] uppercase font-bold text-gray-400">
                      {day.dow}
                    </div>
                    <div className="text-sm font-bold text-gray-900 tabular-nums">
                      {day.date.split("-")[2]}
                    </div>
                  </div>

                  {/* Assignments Chips Container */}
                  <div className="flex-1 flex items-center gap-2 flex-wrap">
                    {hasOff ? (
                      <div className="flex items-center gap-1.5 text-xs text-purple-700 font-medium bg-purple-50 border border-purple-200 px-3 py-1.5 rounded-lg">
                        <Moon className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                        <span>Day Off</span>
                      </div>
                    ) : assignments.length === 0 ? (
                      <span className="text-xs text-gray-300 italic px-1">
                        No cleanings assigned
                      </span>
                    ) : (
                      assignments.map((assignment, aIdx) => {
                        const isTurnover = isSameDayTurnover(assignment);
                        const isHighVal = isHighValueAssignment(assignment);

                        return (
                          <div
                            key={aIdx}
                            className="flex items-center gap-2 bg-white border border-gray-200/80 hover:border-gray-300 rounded-lg px-3 py-1.5 text-xs shadow-2xs transition-colors"
                          >
                            <span className="font-semibold text-gray-800">
                              {assignment.property.name}
                            </span>
                            <div className="flex items-center gap-1">
                              {isTurnover && (
                                <span
                                  className="px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 text-[10px] font-medium flex items-center gap-0.5"
                                  title="Same-day turnover"
                                >
                                  <RefreshCw className="w-2.5 h-2.5 text-amber-600" />
                                  Turnover
                                </span>
                              )}
                              {isHighVal && (
                                <span
                                  className="px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-medium flex items-center gap-0.5"
                                  title="High-value property (\$2,000+)"
                                >
                                  <Gem className="w-2.5 h-2.5 text-emerald-600" />
                                  High-Value
                                </span>
                              )}
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}