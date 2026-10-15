import { TrendingUp, CalendarDays } from "lucide-react";

interface TrendDay {
  day: string;
  total: number;
  sameDay: number;
}

interface CleaningTrendChartProps {
  trendData: TrendDay[];
}

const SVG_WIDTH = 500;
const SVG_HEIGHT = 150;

export default function CleaningTrendChart({ trendData }: CleaningTrendChartProps) {
  const maxVal = Math.max(...trendData.map((d) => d.total)) + 2;

  const pointsArray = trendData.map((d, i) => {
    const x = (i / (trendData.length - 1)) * (SVG_WIDTH - 40) + 20;
    const y = SVG_HEIGHT - 25 - (d.total / maxVal) * (SVG_HEIGHT - 45);
    return { x, y, day: d.day, total: d.total, sameDay: d.sameDay };
  });

  const pointsString = pointsArray.map((p) => `${p.x},${p.y}`).join(" ");
  const areaString = `${pointsArray[0] ? `20,\${SVG_HEIGHT - 25}` : ""} ${pointsString} ${SVG_WIDTH - 20},${SVG_HEIGHT - 25}`;

  return (
    <div className="rounded-xl border border-[#e8e4dc] bg-white overflow-hidden shadow-2xs flex flex-col justify-between p-4 gap-4">
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-emerald-600" />
            <h2 className="font-bold text-sm text-gray-900">
              Cleaning Assignment Trend (Weekly)
            </h2>
          </div>
          <span className="text-xs text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
            Peak: Fri (14)
          </span>
        </div>

        {/* SVG Line Chart */}
        <div className="w-full relative pt-2">
          <svg viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`} className="w-full h-auto overflow-visible">
            <defs>
              <linearGradient id="trendGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10b981" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {[0.25, 0.5, 0.75].map((ratio, idx) => (
              <line
                key={idx}
                x1="20"
                y1={(SVG_HEIGHT - 25) * ratio}
                x2={SVG_WIDTH - 20}
                y2={(SVG_HEIGHT - 25) * ratio}
                stroke="#f3f4f6"
                strokeDasharray="4 4"
                strokeWidth="1"
              />
            ))}

            <polygon points={areaString} fill="url(#trendGradient)" />

            <polyline
              fill="none"
              stroke="#059669"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              points={pointsString}
            />

            {pointsArray.map((pt) => (
              <g key={pt.day} className="group cursor-pointer">
                <circle cx={pt.x} cy={pt.y} r="14" fill="transparent" />
                <circle
                  cx={pt.x}
                  cy={pt.y}
                  r="4.5"
                  className="fill-white stroke-emerald-600 stroke-[2.5] transition-all duration-200 group-hover:r-6 group-hover:fill-emerald-600 group-hover:stroke-white group-hover:stroke-[3]"
                />

                {/* Tooltip */}
                <g className="opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none">
                  <rect
                    x={pt.x - 38}
                    y={pt.y - 34}
                    width="76"
                    height="22"
                    rx="5"
                    className="fill-gray-900"
                  />
                  <text
                    x={pt.x}
                    y={pt.y - 19}
                    textAnchor="middle"
                    className="text-[10px] font-bold fill-white tabular-nums"
                  >
                    {pt.total} tasks ({pt.sameDay} SD)
                  </text>
                </g>

                <text
                  x={pt.x}
                  y={pt.y - 8}
                  textAnchor="middle"
                  className="text-[10px] font-bold fill-gray-700 tabular-nums group-hover:opacity-0 transition-opacity"
                >
                  {pt.total}
                </text>

                <text
                  x={pt.x}
                  y={SVG_HEIGHT - 5}
                  textAnchor="middle"
                  className="text-[11px] font-medium fill-gray-400 group-hover:fill-emerald-700 group-hover:font-bold transition-colors"
                >
                  {pt.day}
                </text>
              </g>
            ))}
          </svg>
        </div>
      </div>

      <hr className="border-gray-100" />

      {/* Daily Turnover Stacked Bars */}
      <div className="flex flex-col gap-2.5">
        <div className="flex items-center justify-between text-xs">
          <span className="font-bold text-gray-800 flex items-center gap-1.5">
            <CalendarDays className="w-3.5 h-3.5 text-amber-600" /> Daily Same-Day Turnovers
          </span>
          <span className="text-gray-400 text-[11px]">Hover bar for breakdown</span>
        </div>

        <div className="grid grid-cols-7 gap-1.5 items-end h-20 pt-2 border-b border-gray-100 pb-1">
          {trendData.map((d) => {
            const sameDayHeight = Math.round((d.sameDay / 14) * 100);
            const standardHeight = Math.round(((d.total - d.sameDay) / 14) * 100);

            return (
              <div key={d.day} className="flex flex-col items-center gap-1 h-full justify-end group cursor-pointer relative">
                <div className="absolute -top-9 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[10px] font-semibold px-2 py-1 rounded shadow-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                  {d.sameDay} Same-Day / {d.total - d.sameDay} Standard
                </div>

                <div className="w-full flex flex-col justify-end gap-0.5 h-full rounded overflow-hidden transition-transform group-hover:scale-105">
                  <div
                    className="w-full bg-emerald-500 rounded-t-xs transition-colors group-hover:bg-emerald-600"
                    style={{ height: `${standardHeight}%` }}
                  />
                  <div
                    className="w-full bg-amber-500 rounded-b-xs transition-colors group-hover:bg-amber-600"
                    style={{ height: `${sameDayHeight}%` }}
                  />
                </div>
                <span className="text-[10px] text-gray-500 font-medium group-hover:text-amber-800 group-hover:font-bold transition-colors">
                  {d.day}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}