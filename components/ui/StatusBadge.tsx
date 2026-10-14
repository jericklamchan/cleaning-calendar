import { CheckCircle2, XCircle } from 'lucide-react';

interface StatusBadgeProps {
  active: boolean;
  activeText?: string;
  inactiveText?: string;
}

export function StatusBadge({
  active,
  activeText = 'Active',
  inactiveText = 'Inactive',
}: StatusBadgeProps) {
  return active ? (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
      <CheckCircle2 className="w-3 h-3 text-emerald-600" /> {activeText}
    </span>
  ) : (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium bg-gray-100 text-gray-600 border border-gray-200">
      <XCircle className="w-3 h-3 text-gray-400" /> {inactiveText}
    </span>
  );
}