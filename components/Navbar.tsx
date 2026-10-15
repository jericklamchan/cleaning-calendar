"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Settings } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();

  // Explicit route matcher
  const isPlannerActive =
    pathname === "/" || pathname === "/planner" || pathname?.startsWith("/planner/");

  const isDashboardActive =
    pathname === "/dashboard" || pathname?.startsWith("/dashboard/");

  const isSettingsActive =
    pathname === "/settings" || pathname?.startsWith("/settings/");

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 md:px-6 h-12 flex items-center">
        <div className="flex items-center gap-6">
          <span className="font-semibold text-sm text-gray-900">
            Cleaning Calendar
          </span>
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className={`text-sm transition-colors ${
                isPlannerActive
                  ? "font-semibold text-gray-900"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Planner
            </Link>
            <Link
              href="/dashboard"
              className={`text-sm transition-colors ${
                isDashboardActive
                  ? "font-semibold text-gray-900"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Dashboard
            </Link>
          </div>
        </div>
        <div className="ml-auto flex items-center gap-4">
          <Link
            href="/settings"
            aria-label="Settings"
            className={`transition-colors p-1 rounded-md hover:bg-gray-100 inline-flex items-center ${
              isSettingsActive
                ? "text-gray-900"
                : "text-gray-400 hover:text-gray-600"
            }`}
          >
            <Settings className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </nav>
  );
}