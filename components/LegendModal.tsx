// components/LegendModal.tsx
"use client";

import { X, Sparkles, RefreshCw, Gem, AlertTriangle, Moon } from "lucide-react";

interface LegendModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LegendModal({ isOpen, onClose }: LegendModalProps) {
  if (!isOpen) return null;

  const legends = [
    {
      icon: <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />,
      label: "Active Cleanings",
      description: "Total number of scheduled property cleanings for the day.",
      badge: "Emerald Badge",
    },
    {
      icon: <RefreshCw className="w-4 h-4 text-amber-600 shrink-0" />,
      label: "Same-Day Turnover",
      description: "Property with both check-out and check-in events on the same day.",
      badge: "Amber Chip",
    },
    {
      icon: <Gem className="w-4 h-4 text-emerald-600 shrink-0" />,
      label: "High-Value Reservation",
      description: "Reservation with check-in or check-out total price ≥ $2,000.",
      badge: "High-Value Chip",
    },
    {
      icon: <AlertTriangle className="w-4 h-4 text-rose-500 shrink-0" />,
      label: "Overloaded Cleaner",
      description: "Cleaner assigned to 4 or more tasks on a single day.",
      badge: "Rose Indicator",
    },
    {
      icon: <Moon className="w-4 h-4 text-purple-600 shrink-0" />,
      label: "Tentative Day Off",
      description: "Cleaner scheduled for a day off or unavailable.",
      badge: "Purple Bar",
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
      <div
        className="bg-white rounded-2xl max-w-md w-full border border-[#e8e4dc] shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100 bg-gray-50/50">
          <h3 className="text-base font-semibold text-gray-900">Calendar Legend</h3>
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
          {legends.map((item, idx) => (
            <div key={idx} className="flex gap-3.5 items-start">
              <div className="p-2 bg-gray-100 rounded-lg mt-0.5">{item.icon}</div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-gray-900">{item.label}</span>
                </div>
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