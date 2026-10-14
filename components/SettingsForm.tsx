'use client';

import { useState } from 'react';
import { CompanySettings } from '@/types/settings';
import { updateSettingsAction } from '@/app/actions/settingsActions';
import { Card } from '@/components/ui/Card';
import { Save } from 'lucide-react';

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
    <Card>
      <form action={handleSubmit} className="w-full space-y-6">
        {/* Form Fields Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
          {/* Heavy Load Threshold */}
          <div className="space-y-1">
            <label className="block text-xs font-semibold text-gray-800">
              Heavy Load Threshold
            </label>
            <p className="text-[11px] text-gray-500">
              Maximum assigned turn count per cleaner per day.
            </p>
            <input
              type="number"
              name="heavyLoadThreshold"
              value={settings.heavyLoadThreshold}
              onChange={(e) => handleChange('heavyLoadThreshold', Number(e.target.value))}
              className="w-full rounded-md border border-gray-200 bg-white px-3 py-1.5 text-xs text-gray-900 transition-colors focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* Overflow Threshold */}
          <div className="space-y-1">
            <label className="block text-xs font-semibold text-gray-800">
              Overflow Threshold
            </label>
            <p className="text-[11px] text-gray-500">
              Cap before triggering external backup cleaner dispatch.
            </p>
            <input
              type="number"
              name="overflowThreshold"
              value={settings.overflowThreshold}
              onChange={(e) => handleChange('overflowThreshold', Number(e.target.value))}
              className="w-full rounded-md border border-gray-200 bg-white px-3 py-1.5 text-xs text-gray-900 transition-colors focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* High Value Cutoff ($) */}
          <div className="space-y-1">
            <label className="block text-xs font-semibold text-gray-800">
              High Value Cutoff ($)
            </label>
            <p className="text-[11px] text-gray-500">
              Minimum payout amount required for high-value badge flagging.
            </p>
            <input
              type="number"
              name="highValueCutoff"
              value={settings.highValueCutoff}
              onChange={(e) => handleChange('highValueCutoff', Number(e.target.value))}
              className="w-full rounded-md border border-gray-200 bg-white px-3 py-1.5 text-xs text-gray-900 transition-colors focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* Deep Clean Nights */}
          <div className="space-y-1">
            <label className="block text-xs font-semibold text-gray-800">
              Deep Clean Nights
            </label>
            <p className="text-[11px] text-gray-500">
              Threshold reservation duration (nights) before triggering deep clean.
            </p>
            <input
              type="number"
              name="deepCleanNights"
              value={settings.deepCleanNights}
              onChange={(e) => handleChange('deepCleanNights', Number(e.target.value))}
              className="w-full rounded-md border border-gray-200 bg-white px-3 py-1.5 text-xs text-gray-900 transition-colors focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* Reschedule Window (Days) - Full-Width Span */}
          <div className="sm:col-span-2 space-y-1">
            <label className="block text-xs font-semibold text-gray-800">
              Reschedule Window (Days)
            </label>
            <p className="text-[11px] text-gray-500">
              Buffer window in days allowed for auto-reassigning unconfirmed tasks.
            </p>
            <input
              type="number"
              name="rescheduleWindowDays"
              value={settings.rescheduleWindowDays}
              onChange={(e) => handleChange('rescheduleWindowDays', Number(e.target.value))}
              className="w-full rounded-md border border-gray-200 bg-white px-3 py-1.5 text-xs text-gray-900 transition-colors focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Action Footer */}
        <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
          <span className="text-[11px] text-gray-400">
            {isDirty ? 'You have unsaved changes.' : 'All settings up to date.'}
          </span>
          <button
            type="submit"
            disabled={!isDirty || isSaving}
            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
              !isDirty || isSaving
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200'
                : 'bg-blue-600 text-white hover:bg-blue-700 shadow-xs cursor-pointer'
            }`}
          >
            <Save className="w-3.5 h-3.5" />
            <span>{isSaving ? 'Saving...' : 'Save Changes'}</span>
          </button>
        </div>
      </form>
    </Card>
  );
}