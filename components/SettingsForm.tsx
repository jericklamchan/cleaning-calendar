'use client';

import { useState } from 'react';
import { CompanySettings } from '@/types/settings';
import { updateSettingsAction } from '@/app/actions/settingsActions';

interface Props {
  initialSettings: CompanySettings;
}

export default function SettingsForm({ initialSettings }: Props) {
  const [settings, setSettings] = useState<CompanySettings>(initialSettings);
  const [isDirty, setIsDirty] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleChange = (field: keyof CompanySettings, value: number) => {
    setSettings((prev) => ({ ...prev, [field]: value }));
    setIsDirty(true);
  };

  const handleSubmit = async (formData: FormData) => {
    setIsSaving(true);
    try {
      await updateSettingsAction(formData);
      setIsDirty(false);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form action={handleSubmit} className="space-y-6 max-w-xl">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium">Heavy Load Threshold</label>
          <input
            type="number"
            name="heavyLoadThreshold"
            value={settings.heavyLoadThreshold}
            onChange={(e) => handleChange('heavyLoadThreshold', Number(e.target.value))}
            className="mt-1 block w-full rounded-md border p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Overflow Threshold</label>
          <input
            type="number"
            name="overflowThreshold"
            value={settings.overflowThreshold}
            onChange={(e) => handleChange('overflowThreshold', Number(e.target.value))}
            className="mt-1 block w-full rounded-md border p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">High Value Cutoff ($)</label>
          <input
            type="number"
            name="highValueCutoff"
            value={settings.highValueCutoff}
            onChange={(e) => handleChange('highValueCutoff', Number(e.target.value))}
            className="mt-1 block w-full rounded-md border p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Deep Clean Nights</label>
          <input
            type="number"
            name="deepCleanNights"
            value={settings.deepCleanNights}
            onChange={(e) => handleChange('deepCleanNights', Number(e.target.value))}
            className="mt-1 block w-full rounded-md border p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Reschedule Window (Days)</label>
          <input
            type="number"
            name="rescheduleWindowDays"
            value={settings.rescheduleWindowDays}
            onChange={(e) => handleChange('rescheduleWindowDays', Number(e.target.value))}
            className="mt-1 block w-full rounded-md border p-2"
          />
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={!isDirty || isSaving}
          className={`px-4 py-2 rounded-md text-white font-medium ${
            !isDirty || isSaving
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {isSaving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </form>
  );
}