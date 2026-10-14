// app/page.tsx (or app/dashboard/page.tsx)
import { getProperties } from '@/utils/propertyStore';
import { getCleaners } from '@/utils/cleanerStore';
import { getUsers } from '@/utils/userStore';
import { getSettings } from '@/utils/settingsCache';

export default async function DashboardPage() {
  const [properties, cleaners, users, settings] = await Promise.all([
    getProperties(),
    getCleaners(),
    getUsers(),
    getSettings(),
  ]);

  const adminCount = users.filter((u) => u.role === 'Admin').length;
  const opsManagerCount = users.filter((u) => u.role === 'Operations Manager').length;

  return (
    <div className="space-y-6 p-6 text-xs text-gray-800">
      {/* Header */}
      <div>
        <h1 className="text-lg font-semibold text-gray-900">Operations Dashboard</h1>
        <p className="text-gray-500">System overview and operational performance indicators.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
          <span className="text-gray-500 font-medium">Total Properties</span>
          <div className="mt-2 text-xl font-bold text-gray-900">{properties.length}</div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
          <span className="text-gray-500 font-medium">Total Cleaners</span>
          <div className="mt-2 text-xl font-bold text-gray-900">{cleaners.length}</div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
          <span className="text-gray-500 font-medium">Team Members</span>
          <div className="mt-2 text-xl font-bold text-gray-900">{users.length}</div>
          <span className="text-[10px] text-gray-400">{adminCount} Admins · {opsManagerCount} Ops Managers</span>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Quick Properties Overview */}
        <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
          <h2 className="font-semibold text-gray-900 mb-3">Properties</h2>
          <ul className="divide-y divide-gray-100">
            {properties.slice(0, 5).map((property: any) => (
              <li key={property.id} className="py-2 flex items-center justify-between">
                <span className="font-medium text-gray-800">{property.name || property.title || 'Untitled Property'}</span>
                <span className="text-[10px] text-gray-400 font-mono">{property.id}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Quick Cleaners Roster */}
        <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
          <h2 className="font-semibold text-gray-900 mb-3">Cleaners Roster</h2>
          <ul className="divide-y divide-gray-100">
            {cleaners.slice(0, 5).map((cleaner: any) => (
              <li key={cleaner.id} className="py-2 flex items-center justify-between">
                <div>
                  <span className="font-medium text-gray-800">{cleaner.name}</span>
                  <p className="text-[10px] text-gray-400">{cleaner.phone || cleaner.email || 'No contact info'}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}