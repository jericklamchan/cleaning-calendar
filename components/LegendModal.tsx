// components/LegendModal.tsx
"use client";

import { useEffect } from "react";
import {
  X,
  Sparkles,
  RefreshCw,
  Gem,
  AlertTriangle,
  Moon
} from "lucide-react";

interface LegendModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab?: "week" | "capacity" | "schedules";
}

export default function LegendModal({
  isOpen,
  onClose,
  activeTab = "week",
}: LegendModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const weekLegends = [
    {
      icon: <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />,
      label: "Active Cleanings",
      description: "Total number of scheduled property cleanings for the day.",
    },
    {
      icon: <RefreshCw className="w-4 h-4 text-amber-600 shrink-0" />,
      label: "Same-Day Turnover",
      description: "Property with both check-out and check-in events on the same day.",
    },
    {
      icon: <Gem className="w-4 h-4 text-emerald-600 shrink-0" />,
      label: "High-Value Reservation",
      description: "Reservation with check-in or check-out total price ≥ $2,000.",
    },
    {
      icon: <AlertTriangle className="w-4 h-4 text-rose-500 shrink-0" />,
      label: "Overloaded Cleaner",
      description: "Cleaner assigned to 4 or more tasks on a single day.",
    },
    {
      icon: <Moon className="w-4 h-4 text-purple-600 shrink-0" />,
      label: "Tentative Day Off",
      description: "Cleaner scheduled for a day off or marked unavailable.",
    },
  ];

  const capacityLegends = [
    {
      icon: <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />,
      label: "Optimal (Weekly)",
      description: "Balanced weekly workload with under 12 total cleanings assigned across the week.",
    },
    {
      icon: <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />,
      label: "High Load (Weekly)",
      description: "Heavy weekly volume between 12 and 14 total cleanings across the week.",
    },
    {
      icon: <Sparkles className="w-4 h-4 text-rose-600 shrink-0" />,
      label: "Overloaded (Weekly)",
      description: "Excessive weekly volume with 15 or more total cleanings across the week.",
    },
    {
      icon: <AlertTriangle className="w-4 h-4 text-rose-500 shrink-0" />,
      label: "Daily Overload Flag",
      description: "Highlighted cell indicating a cleaner has 4 or more tasks on that specific day.",
    },
    {
      icon: <RefreshCw className="w-4 h-4 text-amber-600 shrink-0" />,
      label: "Same-Day Turnover Count",
      description: "Number of same-day turnovers assigned on that day.",
    },
    {
      icon: <Gem className="w-4 h-4 text-emerald-600 shrink-0" />,
      label: "High-Value Property Count",
      description: "Number of high-value reservations ($2,000+) assigned on that day.",
    },
    {
      icon: <Moon className="w-4 h-4 text-purple-600 shrink-0" />,
      label: "Tentative Day Off",
      description: "Cleaner scheduled for a day off.",
    },
  ];

  const currentLegends = activeTab === "capacity" ? capacityLegends : weekLegends;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
      <div
        className="bg-white rounded-2xl max-w-md w-full border border-[#e8e4dc] shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100 bg-gray-50/50">
          <div>
            <h3 className="text-base font-semibold text-gray-900">
              {activeTab === "capacity" ? "Capacity Legend" : "Calendar Legend"}
            </h3>
            <p className="text-xs text-gray-400">
              {activeTab === "capacity"
                ? "Key indicators for team workload health and distribution"
                : "Key indicators for daily cleaning schedules"}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-gray-200/60 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
            aria-label="Close legend"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Legend List */}
        <div className="p-6 flex flex-col gap-4 max-h-[70vh] overflow-y-auto">
          {currentLegends.map((item, idx) => (
            <div key={idx} className="flex gap-3.5 items-start">
              <div className="p-2 bg-gray-100 rounded-lg mt-0.5">{item.icon}</div>
              <div className="flex-1">
                <span className="text-sm font-semibold text-gray-900">{item.label}</span>
                <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-gray-50 border-t border-gray-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-900 hover:bg-gray-800 text-white text-xs font-medium rounded-lg transition-colors cursor-pointer"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
}