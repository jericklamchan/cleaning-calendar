import Link from "next/link";
import { Settings } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 md:px-6 h-12 flex items-center">
        <div className="flex items-center gap-6">
          <span className="font-semibold text-sm text-gray-900">
            Cleaning Calendar
          </span>
          <div className="flex items-center gap-4">
            <Link
              className="text-sm font-medium text-gray-900"
              href="/"
            >
              Planner
            </Link>
            <Link
              className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
              href="/dashboard"
            >
              Dashboard
            </Link>
          </div>
        </div>
        <div className="ml-auto flex items-center gap-4">
          <Link 
            href="/settings" 
            aria-label="Settings"
            className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-md hover:bg-gray-100 inline-flex items-center"
          >
            <Settings className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </nav>
  );
}