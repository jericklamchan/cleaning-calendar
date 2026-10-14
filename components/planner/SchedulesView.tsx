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
  ChevronDown,
} from "lucide-react";
import { isHighValueAssignment, isSameDayTurnover } from "@/lib/utils";

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
  // Tracks expanded cleaners; empty set = everything collapsed (default)
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

  const allCollapsed = expandedIds.size === 0;

  const toggleCleaner = (id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
    setActiveShareMenu(null);
  };

  const toggleAll = () => {
    setExpandedIds(
      allCollapsed ? new Set(cleaners.map((c) => c.id)) : new Set()
    );
    setActiveShareMenu(null);
  };

  // Plain-text schedule for messaging or clipboard copy
  const generateCleanerTextSchedule = (cleaner: Cleaner) => {
    let text = `Cleaning Schedule for ${cleaner.name} (${weekLabel})\n`;
    text += `=====================================\n\n`;

    schedule.forEach((day) => {
      const assignments = day.cleanings.filter(
        (c) => c.cleaner.id === cleaner.id && !c.dayOff
      );
      const hasOff = day.cleanings.some(
        (c) => c.cleaner.id === cleaner.id && c.dayOff
      );

      text += `[${day.dow.toUpperCase()} - ${day.date}]\n`;
      if (hasOff) {
        text += `  • Day Off\n`;
      } else if (assignments.length === 0) {
        text += `  • No cleanings scheduled\n`;
      } else {
        assignments.forEach((c) => {
          text += `  • ${c.property.name}`;
          if (isSameDayTurnover(c)) text += ` (🔄 Same-day turnover)`;
          if (isHighValueAssignment(c)) text += ` (💎 High-Value)`;
          text += `\n`;
        });
      }
      text += `\n`;
    });

    return text;
  };

  const handleCopy = (cleaner: Cleaner) => {
    navigator.clipboard.writeText(generateCleanerTextSchedule(cleaner));
    setCopiedCleanerId(cleaner.id);
    setTimeout(() => setCopiedCleanerId(null), 2000);
  };

  const handleShare = (cleanerName: string, channel: string) => {
    alert(`[Demo] Opening ${channel} to send schedule to ${cleanerName}!`);
    setActiveShareMenu(null);
  };

  return (
    <div className="flex flex-col gap-3">
      {/* Week label + legend + expand/collapse all */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-sm font-semibold text-gray-900">{weekLabel}</h2>
        <div className="flex items-center gap-3 text-[11px] text-gray-500">
          <span className="flex items-center gap-1">
            <RefreshCw className="w-3 h-3 text-amber-600" />
            Same-day turnover
          </span>
          <span className="flex items-center gap-1">
            <Gem className="w-3 h-3 text-emerald-600" />
            High-value
          </span>
          <button
            onClick={toggleAll}
            className="px-2 py-1 text-[11px] font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors cursor-pointer"
          >
            {allCollapsed ? "Expand all" : "Collapse all"}
          </button>
        </div>
      </div>

      {/* Cleaner cards (single column) */}
      {cleaners.map((cleaner) => {
        const isCollapsed = !expandedIds.has(cleaner.id);

        const weekData = schedule.map((day) => ({
          day,
          assignments: day.cleanings.filter(
            (c) => c.cleaner.id === cleaner.id && !c.dayOff
          ),
          hasOff: day.cleanings.some(
            (c) => c.cleaner.id === cleaner.id && c.dayOff
          ),
        }));

        const totalTasks = weekData.reduce(
          (sum, d) => sum + d.assignments.length,
          0
        );

        return (
          <div
            key={cleaner.id}
            className="bg-white rounded-xl border border-[#e8e4dc] shadow-2xs"
          >
            {/* Header */}
            <div
              className={`flex items-center justify-between gap-3 px-4 py-2.5 bg-gray-50/70 rounded-t-xl ${
                isCollapsed ? "rounded-b-xl" : "border-b border-gray-100"
              }`}
            >
              {/* Clickable toggle area */}
              <button
                type="button"
                onClick={() => toggleCleaner(cleaner.id)}
                aria-expanded={!isCollapsed}
                aria-label={`${isCollapsed ? "Expand" : "Collapse"} ${cleaner.name}'s schedule`}
                className="flex items-center gap-2.5 min-w-0 flex-1 text-left cursor-pointer"
              >
                <div className="w-8 h-8 rounded-full bg-emerald-100 border border-emerald-200 flex items-center justify-center text-emerald-800 font-bold text-xs shrink-0">
                  {cleaner.name.substring(0, 2).toUpperCase()}
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm font-semibold text-gray-900 truncate leading-tight">
                    {cleaner.name}
                  </h3>
                  <p className="text-[11px] text-gray-400 leading-tight">
                    {totalTasks} cleaning{totalTasks !== 1 ? "s" : ""} this week
                  </p>
                </div>
              </button>

              {/* Actions */}
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => handleCopy(cleaner)}
                  className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-gray-700 bg-white hover:bg-gray-50 border border-gray-200 rounded-lg transition-colors cursor-pointer"
                >
                  {copiedCleanerId === cleaner.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-700 font-semibold">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-gray-500" />
                      <span>Copy</span>
                    </>
                  )}
                </button>

                <div className="relative">
                  <button
                    onClick={() =>
                      setActiveShareMenu(
                        activeShareMenu === cleaner.id ? null : cleaner.id
                      )
                    }
                    className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-white bg-gray-900 hover:bg-gray-800 rounded-lg transition-colors cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send To...</span>
                  </button>

                  {activeShareMenu === cleaner.id && (
                    <div className="absolute right-0 mt-1.5 w-44 bg-white border border-gray-200 rounded-xl shadow-lg py-1 z-20 animate-in fade-in zoom-in-95 duration-100">
                      <button
                        onClick={() => handleShare(cleaner.name, "WhatsApp")}
                        className="w-full text-left px-3.5 py-1.5 text-xs text-gray-700 hover:bg-gray-50 flex items-center gap-2 cursor-pointer font-medium"
                      >
                        <span className="w-2 h-2 rounded-full bg-emerald-500" />
                        WhatsApp
                      </button>
                      <button
                        onClick={() => handleShare(cleaner.name, "Slack")}
                        className="w-full text-left px-3.5 py-1.5 text-xs text-gray-700 hover:bg-gray-50 flex items-center gap-2 cursor-pointer font-medium"
                      >
                        <span className="w-2 h-2 rounded-full bg-purple-500" />
                        Slack DM
                      </button>
                      <button
                        onClick={() => handleShare(cleaner.name, "Microsoft Teams")}
                        className="w-full text-left px-3.5 py-1.5 text-xs text-gray-700 hover:bg-gray-50 flex items-center gap-2 cursor-pointer font-medium"
                      >
                        <span className="w-2 h-2 rounded-full bg-blue-500" />
                        Microsoft Teams
                      </button>
                    </div>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => toggleCleaner(cleaner.id)}
                  aria-expanded={!isCollapsed}
                  aria-label={`${isCollapsed ? "Expand" : "Collapse"} ${cleaner.name}'s schedule`}
                  className="p-1.5 ml-0.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-colors cursor-pointer"
                >
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-150 ${
                      isCollapsed ? "rotate-180" : ""
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Days (hidden when collapsed) */}
            {!isCollapsed && (
              <ul className="divide-y divide-gray-100">
                {weekData.map(({ day, assignments, hasOff }) => (
                  <li
                    key={day.date}
                    className={`flex items-center gap-3 px-4 py-1.5 ${
                      hasOff ? "bg-purple-50/30" : ""
                    }`}
                  >
                    {/* Day label */}
                    <div className="w-14 shrink-0 flex items-baseline gap-1.5">
                      <span className="text-[11px] font-bold uppercase tracking-wide text-gray-500">
                        {day.dow}
                      </span>
                      <span className="text-[11px] text-gray-300 tabular-nums">
                        {day.date.split("-")[2]}
                      </span>
                    </div>

                    {/* Properties */}
                    <div className="flex flex-wrap items-center gap-1 flex-1">
                      {hasOff ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-medium text-purple-700 bg-purple-50 border border-purple-200 px-2 py-0.5 rounded-full">
                          <Moon className="w-3 h-3" />
                          Day off
                        </span>
                      ) : assignments.length === 0 ? (
                        <span className="text-xs text-gray-300">—</span>
                      ) : (
                        assignments.map((a, i) => (
                          <span
                            key={i}
                            className="inline-flex items-center gap-1 text-[11px] font-medium text-gray-800 bg-gray-50 border border-gray-200 px-2 py-0.5 rounded-full"
                          >
                            {a.property.name}
                            {isSameDayTurnover(a) && (
                              <RefreshCw
                                className="w-3 h-3 text-amber-600"
                                aria-label="Same-day turnover"
                              />
                            )}
                            {isHighValueAssignment(a) && (
                              <Gem
                                className="w-3 h-3 text-emerald-600"
                                aria-label="High-value property"
                              />
                            )}
                          </span>
                        ))
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        );
      })}
    </div>
  );
}
