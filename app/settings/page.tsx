import { Suspense } from 'react';
import { getSettings } from '@/utils/settingsCache';
import SettingsForm from '@/components/SettingsForm';

async function SettingsContent() {
  const initialSettings = await getSettings();

  return (
    <div className="bg-white border border-gray-200/80 shadow-xs rounded-xl p-5 sm:p-6 space-y-5">
      <div>
        <h2 className="text-sm font-semibold text-gray-900">Operational Thresholds</h2>
        <p className="text-xs text-gray-500 mt-0.5">
          Configure baseline volume limits, financial cutoffs, and scheduling constraints.
        </p>
      </div>
      <div className="pt-4 border-t border-gray-100">
        <SettingsForm initialSettings={initialSettings} />
      </div>
    </div>
  );
}

export default function SettingsPage() {
  return (
    <Suspense>
      <SettingsContent />
    </Suspense>
  );
}