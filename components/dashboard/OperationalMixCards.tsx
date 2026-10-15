import { PieChart, Gem } from "lucide-react";

interface OperationalMixCardsProps {
  totalCleaningsWeekly: number;
  sameDayTurnoversWeekly: number;
  standardCleaningsWeekly: number;
  highValueAssignmentsWeekly: number;
}

function OperationalRatioCard({
  title,
  badgeText,
  badgeBg,
  icon: Icon,
  primaryPct,
  primaryBg,
  primaryTitle,
  primaryCount,
  secondaryBg,
  secondaryTitle,
  secondaryCount,
}: {
  title: string;
  badgeText: string;
  badgeBg: string;
  icon: any;
  primaryPct: number;
  primaryBg: string;
  primaryTitle: string;
  primaryCount: number;
  secondaryBg: string;
  secondaryTitle: string;
  secondaryCount: number;
}) {
  return (
    <div className="rounded-xl border border-[#e8e4dc] bg-white p-4 shadow-2xs flex flex-col gap-3 group">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon className="w-4 h-4 text-gray-700" />
          <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider">
            {title}
          </h3>
        </div>
        <span className={`text-[11px] font-semibold px-2 py-0.5 rounded border ${badgeBg}`}>
          {badgeText}
        </span>
      </div>

      <div className="w-full bg-gray-100 rounded-lg h-4 overflow-hidden flex cursor-pointer transition-transform group-hover:scale-[1.01]">
        <div
          className={`${primaryBg} h-full transition-all hover:brightness-110`}
          style={{ width: `${primaryPct}%` }}
          title={`${primaryTitle}: ${primaryCount}`}
        />
        <div
          className={`${secondaryBg} h-full transition-all hover:brightness-110`}
          style={{ width: `${100 - primaryPct}%` }}
          title={`${secondaryTitle}: ${secondaryCount}`}
        />
      </div>

      <div className="flex items-center justify-between text-xs text-gray-600 pt-1">
        <div className="flex items-center gap-1.5">
          <span className={`w-2.5 h-2.5 rounded-full ${primaryBg}`} />
          <span>
            {primaryTitle} ({primaryCount})
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className={`w-2.5 h-2.5 rounded-full ${secondaryBg}`} />
          <span>
            {secondaryTitle} ({secondaryCount})
          </span>
        </div>
      </div>
    </div>
  );
}

export default function OperationalMixCards({
  totalCleaningsWeekly,
  sameDayTurnoversWeekly,
  standardCleaningsWeekly,
  highValueAssignmentsWeekly,
}: OperationalMixCardsProps) {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <OperationalRatioCard
        title="Turnover Complexity Mix"
        badgeText="45% High Pressure"
        badgeBg="bg-amber-50 border-amber-200 text-amber-800"
        icon={PieChart}
        primaryPct={(sameDayTurnoversWeekly / totalCleaningsWeekly) * 100}
        primaryBg="bg-amber-500"
        primaryTitle="Same-Day Turnovers"
        primaryCount={sameDayTurnoversWeekly}
        secondaryBg="bg-emerald-600"
        secondaryTitle="Standard Cleanings"
        secondaryCount={standardCleaningsWeekly}
      />

      <OperationalRatioCard
        title="High-Value (\$2K+) Concentration"
        badgeText="28% Priority Tier"
        badgeBg="bg-emerald-50 border-emerald-200 text-emerald-800"
        icon={Gem}
        primaryPct={28}
        primaryBg="bg-emerald-600"
        primaryTitle="\$2,000+ Tier"
        primaryCount={highValueAssignmentsWeekly}
        secondaryBg="bg-gray-300"
        secondaryTitle="Standard Tier"
        secondaryCount={totalCleaningsWeekly - highValueAssignmentsWeekly}
      />
    </div>
  );
}