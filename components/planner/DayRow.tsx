"use client";

import React, { useState } from "react";
import { DaySchedule, Cleaner } from "@/types/planner";
import {
  ChevronDown,
  Sparkles,
  RefreshCw,
  Moon,
  Home,
  Gem,
  AlertTriangle,
} from "lucide-react";
import {
  isHighValueAssignment,
  isSameDayTurnover,
  isCleanerOverloaded,
} from "@/utils/plannerUtils";

interface DayRowProps {
  day: DaySchedule;
  cleaners: Cleaner[];
  isHighlighted: boolean;
  isExpanded: boolean;
  onToggle: () => void;
  onReassignCleaner?: (
    date: string,
    taskId: string, // Updated parameter name to reflect taskId
    sourceCleanerId: string,
    targetCleanerId: string
  ) => void;
}

export default function DayRow({
  day,
  cleaners,
  isHighlighted,
  isExpanded,
  onToggle,
  onReassignCleaner,
}: DayRowProps) {
  const [dragOverCleanerId, setDragOverCleanerId] = useState<string | null>(null);

  const activeCleanings = day.cleanings.filter((c) => !c.dayOff);
  const totalCleanings = activeCleanings.length;

  const sameDayTurnoversCount = activeCleanings.filter(isSameDayTurnover).length;
  const highValueCount = activeCleanings.filter(isHighValueAssignment).length;

  const handleDragStart = (
    e: React.DragEvent,
    taskId: string,
    cleanerId: string
  ) => {
    e.stopPropagation();
    const payload = {
      date: day.date,
      taskId, // Pass unique task id
      sourceCleanerId: cleanerId,
    };
    e.dataTransfer.setData("application/json", JSON.stringify(payload));
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent, cleanerId: string) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    if (dragOverCleanerId !== cleanerId) {
      setDragOverCleanerId(cleanerId);
    }
  };

  const handleDragLeave = (e: React.DragEvent, cleanerId: string) => {
    e.preventDefault();
    if (dragOverCleanerId === cleanerId) {
      setDragOverCleanerId(null);
    }
  };

  const handleDrop = (e: React.DragEvent, targetCleanerId: string) => {
    e.preventDefault();
    setDragOverCleanerId(null);

    try {
      const raw = e.dataTransfer.getData("application/json");
      if (!raw) return;

      const payload = JSON.parse(raw);
      // Check for taskId instead of propertyId
      if (
        payload &&
        payload.taskId &&
        payload.date === day.date &&
        payload.sourceCleanerId &&
        payload.sourceCleanerId !== targetCleanerId
      ) {
        onReassignCleaner?.(
          day.date,
          payload.taskId, // Pass taskId to handler
          payload.sourceCleanerId,
          targetCleanerId
        );
      }
    } catch (err) {
      console.error("Failed to reassign cleaner on drop:", err);
    }
  };

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

          {/* Cleaners Summary with Overload Indicator */}
          <div className="flex items-center gap-1.5 text-sm text-gray-400 tabular-nums min-w-0 overflow-hidden">
            {cleaners.map((cleaner, cIdx) => {
              const cleanerCleanings = activeCleanings.filter(
                (c) => c.cleaner.id === cleaner.id
              ).length;
              const hasOff = day.cleanings.some(
                (c) => c.cleaner.id === cleaner.id && c.dayOff
              );
              const isOverloaded = isCleanerOverloaded(cleaner.id, day.cleanings);

              return (
                <span
                  key={cleaner.id}
                  className="flex items-center gap-1 shrink-0"
                >
                  {cIdx > 0 && <span className="text-gray-300">·</span>}
                  {hasOff && (
                    <span title={`${cleaner.name} · tentative day off`}>
                      <Moon className="w-3.5 h-3.5 text-purple-500" />
                    </span>
                  )}
                  {isOverloaded && !hasOff && (
                    <span title={`${cleaner.name} is overloaded (4+ cleanings)`}>
                      <AlertTriangle className="w-3.5 h-3.5 text-rose-500" />
                    </span>
                  )}
                  <span
                    className={
                      isOverloaded && !hasOff ? "text-rose-700 font-medium" : ""
                    }
                  >
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
          {day.cleanings.some((c) => c.dayOff) && (
            <div className="flex flex-col gap-2 p-3 border-b border-gray-100 bg-purple-50/20">
              {day.cleanings.map(
                (c) =>
                  c.dayOff && (
                    <div
                      key={c.id || `${c.cleaner.id}-dayoff`} // 👈 Fixed: Using c.id instead of index
                      className="flex items-center gap-2 px-3 py-1.5 rounded-r-lg border-l-2 text-xs font-normal border-purple-400 text-purple-800"
                    >
                      <Moon className="w-3.5 h-3.5 text-purple-600" />
                      <span>{c.cleaner.name} · tentative day off</span>
                    </div>
                  )
              )}
            </div>
          )}

          {cleaners.map((cleaner) => {
            const assignedCleanings = day.cleanings.filter(
              (c) => c.cleaner.id === cleaner.id && !c.dayOff
            );
            const isOverloaded = isCleanerOverloaded(cleaner.id, day.cleanings);
            const isTargeted = dragOverCleanerId === cleaner.id;

            return (
              <div
                key={cleaner.id}
                onDragOver={(e) => handleDragOver(e, cleaner.id)}
                onDragLeave={(e) => handleDragLeave(e, cleaner.id)}
                onDrop={(e) => handleDrop(e, cleaner.id)}
                className={`flex gap-3 px-4 py-3 border-t border-gray-100 first:border-t-0 transition-colors ${
                  isTargeted
                    ? "bg-blue-50/80 border-blue-300 ring-1 ring-blue-300 ring-inset"
                    : isOverloaded
                    ? "bg-rose-50/30"
                    : "bg-white"
                }`}
              >
                <div className="flex items-center gap-1.5 w-24 shrink-0 pt-0.5 select-none">
                  <span className="text-sm font-semibold text-gray-900">
                    {cleaner.name}
                  </span>
                  {isOverloaded && (
                    <span title="Overloaded (4+ cleanings)">
                      <AlertTriangle className="w-3.5 h-3.5 text-rose-500" />
                    </span>
                  )}
                </div>
                <div className="flex flex-wrap gap-1.5 items-center flex-1 min-w-0 min-h-[32px]">
                  {assignedCleanings.length === 0 ? (
                    <span className="text-xs text-gray-300 italic select-none">
                      {isTargeted ? "Drop task here to assign" : "No assignments"}
                    </span>
                  ) : (
                    assignedCleanings.map((assignment) => {
                      const isSameDay = isSameDayTurnover(assignment);
                      const isHighVal = isHighValueAssignment(assignment);

                      return (
                        <span
                          key={assignment.id} // 👈 Fixed: Using unique task id as key to prevent duplication/crashes
                          draggable
                          onDragStart={(e) =>
                            handleDragStart(
                              e,
                              assignment.id!, // 👈 Pass unique task id to drag payload
                              cleaner.id
                            )
                          }
                          className={`text-xs px-2.5 py-1 rounded font-medium flex items-center gap-1.5 transition-all cursor-grab active:cursor-grabbing hover:shadow-xs select-none ${
                            isHighVal
                              ? "bg-emerald-50 text-emerald-900 border border-emerald-300 shadow-2xs"
                              : isSameDay
                              ? "bg-amber-100 text-amber-800 border border-amber-200"
                              : "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200"
                          }`}
                          title={`Drag to reassign · ${
                            assignment.property?.name
                          }${
                            assignment.checkOut
                              ? ` · Out: ${assignment.checkOut.time}`
                              : ""
                          }${
                            assignment.checkIn
                              ? ` · In: ${assignment.checkIn.time}`
                              : ""
                          }`}
                        >
                          {isHighVal ? (
                            <Gem className="w-3.5 h-3.5 text-emerald-600 shrink-0 pointer-events-none" />
                          ) : isSameDay ? (
                            <RefreshCw className="w-3.5 h-3.5 text-amber-600 shrink-0 pointer-events-none" />
                          ) : (
                            <Home className="w-3.5 h-3.5 text-gray-500 shrink-0 pointer-events-none" />
                          )}
                          <span className="pointer-events-none">
                            {assignment.property?.name || "Property"}
                          </span>
                        </span>
                      );
                    })
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}