"use client";

import React, { useState } from "react";
import { DaySchedule, Cleaner } from "@/types/planner";
import {
  ChevronDown,
  ChevronUp,
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
} from "@/lib/utils";

interface DayRowProps {
  day: DaySchedule;
  cleaners: Cleaner[];
  isHighlighted: boolean;
  isExpanded: boolean;
  onToggle: () => void;
  onReassignCleaner?: (
    date: string,
    taskId: string,
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
      taskId,
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
      if (
        payload &&
        payload.taskId &&
        payload.date === day.date &&
        payload.sourceCleanerId &&
        payload.sourceCleanerId !== targetCleanerId
      ) {
        onReassignCleaner?.(
          day.date,
          payload.taskId,
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
      className={`bg-white rounded-xl border transition-all overflow-hidden ${
        isHighlighted
          ? "border-emerald-500 shadow-xs ring-1 ring-emerald-500/20"
          : "border-[#e8e4dc] hover:border-gray-300"
      }`}
    >
      {/* Day Header Row */}
      <div
        className="flex cursor-pointer hover:bg-gray-50/70 transition-colors duration-100 items-center justify-between p-3.5 md:p-4 gap-3"
        onClick={onToggle}
      >
        {/* Left: Date Badge */}
        <div
          className={`w-14 py-2 rounded-lg text-center shrink-0 border transition-colors ${
            isHighlighted
              ? "bg-emerald-600 text-white border-emerald-600"
              : "bg-gray-100/80 text-gray-800 border-gray-200/60"
          }`}
        >
          <div
            className={`text-[10px] uppercase font-bold tracking-wider ${
              isHighlighted ? "text-emerald-100" : "text-gray-400"
            }`}
          >
            {day.dow}
          </div>
          <div className="text-base font-extrabold tabular-nums leading-none mt-0.5">
            {day.date.split("-")[2]}
          </div>
        </div>

        {/* Center: Metric Pills + Cleaner Summary Chips */}
        <div className="flex-1 flex flex-wrap items-center gap-2 md:gap-3 min-w-0">
          {/* Daily Metric Pills */}
          <div className="flex items-center gap-1.5 shrink-0">
            {/* Total Active Cleanings */}
            <span
              className="px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-200/60 flex items-center gap-1.5"
              title={`${totalCleanings} active cleanings`}
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>{totalCleanings}</span>
            </span>

            {/* Same Day Turnovers */}
            {sameDayTurnoversCount > 0 && (
              <span
                className="px-2.5 py-1 rounded-md bg-amber-50 text-amber-800 text-xs font-semibold border border-amber-200/60 flex items-center gap-1.5"
                title={`${sameDayTurnoversCount} same-day turnover(s)`}
              >
                <RefreshCw className="w-3.5 h-3.5 text-amber-600" />
                <span>{sameDayTurnoversCount}</span>
              </span>
            )}

            {/* High Value Properties */}
            {highValueCount > 0 && (
              <span
                className="px-2.5 py-1 rounded-md bg-emerald-50/80 text-emerald-800 text-xs font-semibold border border-emerald-200/60 flex items-center gap-1.5"
                title={`${highValueCount} high-value property(s)`}
              >
                <Gem className="w-3.5 h-3.5 text-emerald-600" />
                <span>{highValueCount}</span>
              </span>
            )}
          </div>

          <span className="text-gray-300 hidden sm:inline">·</span>

          {/* Cleaner Summary Chips */}
          <div className="flex items-center gap-1.5 flex-wrap overflow-hidden">
            {cleaners.map((cleaner) => {
              const cleanerCleanings = activeCleanings.filter(
                (c) => c.cleaner.id === cleaner.id
              ).length;
              const hasOff = day.cleanings.some(
                (c) => c.cleaner.id === cleaner.id && c.dayOff
              );
              const isOverloaded = isCleanerOverloaded(cleaner.id, day.cleanings);

              if (hasOff) {
                return (
                  <span
                    key={cleaner.id}
                    className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-md bg-purple-50 text-purple-700 font-medium border border-purple-200/60"
                    title={`${cleaner.name} · tentative day off`}
                  >
                    <Moon className="w-3 h-3 text-purple-600" />
                    <span>{cleaner.name.split(" ")[0]}</span>
                  </span>
                );
              }

              return (
                <span
                  key={cleaner.id}
                  className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-md font-medium border ${
                    isOverloaded
                      ? "bg-rose-50 text-rose-800 border-rose-200"
                      : "bg-gray-50 text-gray-700 border-gray-200/60"
                  }`}
                  title={
                    isOverloaded
                      ? `${cleaner.name} is overloaded (4+ cleanings)`
                      : `${cleaner.name}: ${cleanerCleanings} cleanings`
                  }
                >
                  <span>{cleaner.name.split(" ")[0]}</span>
                  <span className="font-bold tabular-nums">
                    {cleanerCleanings}
                  </span>
                  {isOverloaded && (
                    <AlertTriangle className="w-3 h-3 text-rose-500 shrink-0" />
                  )}
                </span>
              );
            })}
          </div>
        </div>

        {/* Right: Expand / Collapse Toggle Arrow */}
        <div className="p-1 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors shrink-0">
          {isExpanded ? (
            <ChevronUp className="w-5 h-5" />
          ) : (
            <ChevronDown className="w-5 h-5" />
          )}
        </div>
      </div>

      {/* Expanded Drawer Details (Drag and Drop Grid) */}
      {isExpanded && (
        <div className="border-t border-gray-100 bg-gray-50/40 divide-y divide-gray-100">
          {/* Days Off Info Strip */}
          {day.cleanings.some((c) => c.dayOff) && (
            <div className="flex flex-wrap gap-2 p-3 bg-purple-50/30 border-b border-gray-100">
              {day.cleanings.map(
                (c) =>
                  c.dayOff && (
                    <div
                      key={c.id || `${c.cleaner.id}-dayoff`}
                      className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-purple-50 border border-purple-200 text-xs font-medium text-purple-800"
                    >
                      <Moon className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                      <span>{c.cleaner.name} · tentative day off</span>
                    </div>
                  )
              )}
            </div>
          )}

          {/* Cleaner Drop Zones */}
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
                className={`flex gap-3 px-4 py-3 items-center transition-colors ${
                  isTargeted
                    ? "bg-blue-50/80 border-blue-300 ring-1 ring-blue-300 ring-inset"
                    : isOverloaded
                    ? "bg-rose-50/30"
                    : "bg-white hover:bg-gray-50/50"
                }`}
              >
                {/* Cleaner Name Column */}
                <div className="flex items-center gap-1.5 w-28 shrink-0 select-none">
                  <span className="text-sm font-semibold text-gray-900">
                    {cleaner.name}
                  </span>
                  {isOverloaded && (
                    <span title="Overloaded (4+ cleanings)">
                      <AlertTriangle className="w-3.5 h-3.5 text-rose-500" />
                    </span>
                  )}
                </div>

                {/* Draggable Property Chips Container */}
                <div className="flex flex-wrap gap-2 items-center flex-1 min-w-0 min-h-[32px]">
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
                          key={assignment.id}
                          draggable
                          onDragStart={(e) =>
                            handleDragStart(
                              e,
                              assignment.id!,
                              cleaner.id
                            )
                          }
                          className={`text-xs px-2.5 py-1 rounded-lg font-medium flex items-center gap-1.5 transition-all cursor-grab active:cursor-grabbing hover:shadow-xs select-none ${
                            isHighVal
                              ? "bg-emerald-50 text-emerald-900 border border-emerald-300 shadow-2xs"
                              : isSameDay
                              ? "bg-amber-50 text-amber-900 border border-amber-200"
                              : "bg-gray-50 text-gray-800 hover:bg-gray-100 border border-gray-200"
                          }`}
                          title={`Drag to reassign · ${
                            assignment.property?.name
                          }${
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