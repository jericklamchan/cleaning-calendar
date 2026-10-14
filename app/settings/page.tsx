// app/settings/page.tsx (Server Component)
import { Suspense } from 'react';
import { getSettings } from '@/utils/settingsCache';
import SettingsForm from '@/components/SettingsForm';
import Link from 'next/link';

const settingsTabs = [
  { name: 'Company Operations', href: '/settings' },
  { name: 'Property Policies', href: '/settings/policies' },
  { name: 'Integrations', href: '/settings/integrations' },
  { name: 'Team & Access', href: '/settings/team' },
];

// Async component that fetches data
async function SettingsContent() {
  const initialSettings = await getSettings();

  return (
    <div className="bg-white shadow-sm ring-1 ring-gray-950/5 rounded-xl p-6 sm:p-8">
      <SettingsForm initialSettings={initialSettings} />
    </div>
  );
}

export default function SettingsPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Settings</h1>
        <p className="text-sm text-gray-500 mt-1">Manage global system configurations and operational preferences.</p>
      </div>

      {/* Sub-page Navigation Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          {settingsTabs.map((tab) => (
            <Link
              key={tab.name}
              href={tab.href}
              className={`whitespace-nowrap pb-3 px-1 border-b-2 font-medium text-sm ${
                tab.name === 'Company Operations'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.name}
            </Link>
          ))}
        </nav>
      </div>

      {/* Suspense triggers your app/settings/loading.tsx automatically */}
      <Suspense>
        <SettingsContent />
      </Suspense>
    </div>
  );
}