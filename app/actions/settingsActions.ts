'use server';

import { getSettings, saveSettings } from '@/lib/cache';
import { GlobalSettings } from '@/types/settings';
import { revalidatePath } from 'next/cache';

export async function loadSettingsAction(): Promise<GlobalSettings> {
  return await getSettings();
}

export async function updateSettingsAction(formData: FormData) {
  const settingsData = {
    heavyLoadThreshold: Number(formData.get('heavyLoadThreshold')),
    overflowThreshold: Number(formData.get('overflowThreshold')),
    highValueCutoff: Number(formData.get('highValueCutoff')),
    deepCleanNights: Number(formData.get('deepCleanNights')),
    rescheduleWindowDays: Number(formData.get('rescheduleWindowDays')),
  };

  await saveSettings(settingsData);
  revalidatePath('/settings');
}