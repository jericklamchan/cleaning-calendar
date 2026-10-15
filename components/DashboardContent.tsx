// app/dashboard/DashboardContent.tsx
import { getProperties } from "@/stores/propertyStore";
import { getCleaners } from "@/stores/cleanerStore";
import { getUsers } from "@/stores/userStore";
import { getSettings } from "@/lib/cache";
import {
  Building2,
  Users,
  UserCheck,
  Phone,
  Gem,
  ShieldCheck,
} from "lucide-react";

export default async function DashboardContent() {
  const [properties, cleaners, users] = await Promise.all([
    getProperties(),
    getCleaners(),
    getUsers(),
    getSettings(),
  ]);

  const adminCount = users.filter((u) => u.role === "Admin").length;
  const opsManagerCount = users.filter(
    (u) => u.role === "Operations Manager"
  ).length;

  return (
    <div className="flex flex-col gap-6">
      {/* Dashboard Title Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
          Operations Dashboard
        </h1>
        <p className="text-xs text-gray-500 mt-1">
          System overview and operational performance indicators.
        </p>
      </div>

      {/* Top KPI Metric Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {/* Total Properties */}
        <div className="rounded-xl border border-[#e8e4dc] bg-white p-4 shadow-2xs flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Total Properties
            </span>
            <div className="mt-1 text-3xl font-extrabold text-gray-900 tabular-nums">
              {properties.length}
            </div>
            <span className="text-[11px] text-emerald-700 font-medium mt-1 inline-block">
              100% Active Catalog
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-700 shrink-0">
            <Building2 className="w-6 h-6" />
          </div>
        </div>

        {/* Total Cleaners */}
        <div className="rounded-xl border border-[#e8e4dc] bg-white p-4 shadow-2xs flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Total Cleaners
            </span>
            <div className="mt-1 text-3xl font-extrabold text-gray-900 tabular-nums">
              {cleaners.length}
            </div>
            <span className="text-[11px] text-emerald-700 font-medium mt-1 inline-block">
              Full Crew Available
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700 shrink-0">
            <Users className="w-6 h-6" />
          </div>
        </div>

        {/* Team Members */}
        <div className="rounded-xl border border-[#e8e4dc] bg-white p-4 shadow-2xs flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Team Members
            </span>
            <div className="mt-1 text-3xl font-extrabold text-gray-900 tabular-nums">
              {users.length}
            </div>
            <span className="text-[11px] text-gray-400 mt-1 inline-block">
              {adminCount} Admins · {opsManagerCount} Ops Managers
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-700 shrink-0">
            <UserCheck className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Main Grid: Scrollable Lists for Properties & Cleaners */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 items-start">
        
        {/* Managed Properties Card (Fixed Height Scrollable Container) */}
        <div className="rounded-xl border border-[#e8e4dc] bg-white overflow-hidden shadow-2xs flex flex-col h-[520px]">
          <div className="p-4 bg-gray-50/60 border-b border-gray-200 flex items-center justify-between shrink-0">
            <h2 className="font-bold text-sm text-gray-900">
              Properties ({properties.length})
            </h2>
            <span className="text-xs text-gray-400 font-medium">Database Source</span>
          </div>

          <ul className="divide-y divide-gray-100 overflow-y-auto flex-1">
            {properties.map((property: any, idx: number) => {
              const val = property.value || property.revenue || 0;
              const isHighVal = val >= 2000;

              return (
                <li
                  key={property.id}
                  className="p-3.5 flex items-center justify-between hover:bg-gray-50/60 transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="text-xs font-mono font-bold text-gray-400 w-6 shrink-0 text-right">
                      p{idx + 1}
                    </span>
                    <span className="text-xs font-semibold text-gray-900 truncate">
                      {property.name || property.title || "Untitled Property"}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {isHighVal ? (
                      <span className="px-2 py-0.5 rounded bg-emerald-50 border border-emerald-200 text-emerald-800 text-[10px] font-semibold flex items-center gap-1">
                        <Gem className="w-2.5 h-2.5 text-emerald-600" />
                        High-Value
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded bg-gray-100 text-gray-600 text-[10px] font-medium">
                        Standard
                      </span>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Cleaners Roster Card (Fixed Height Scrollable Container) */}
        <div className="rounded-xl border border-[#e8e4dc] bg-white overflow-hidden shadow-2xs flex flex-col h-[520px]">
          <div className="p-4 bg-gray-50/60 border-b border-gray-200 flex items-center justify-between shrink-0">
            <h2 className="font-bold text-sm text-gray-900">
              Cleaners Roster ({cleaners.length})
            </h2>
            <span className="text-xs text-gray-400 font-medium">Active Crew</span>
          </div>

          <ul className="divide-y divide-gray-100 overflow-y-auto flex-1">
            {cleaners.map((cleaner: any) => (
              <li
                key={cleaner.id}
                className="p-3.5 flex items-center justify-between hover:bg-gray-50/60 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 border border-emerald-200 flex items-center justify-center text-emerald-800 font-bold text-xs shrink-0">
                    {cleaner.name.substring(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-gray-900">
                      {cleaner.name}
                    </h4>
                    <p className="text-[11px] text-gray-400 flex items-center gap-1 mt-0.5">
                      <Phone className="w-2.5 h-2.5 text-gray-400" />
                      {cleaner.phone || cleaner.email || "No contact info"}
                    </p>
                  </div>
                </div>

                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 text-[10px] font-semibold border border-emerald-200/60">
                  <ShieldCheck className="w-3 h-3 text-emerald-600" /> Active
                </span>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </div>
  );
}