import { GlobalSettings, defaultSettings } from '@/types/settings';
import { getJsonData, saveJsonData } from '@/stores/jsonStore';

const FILE_NAME = 'settings.json';

export async function getSettings(): Promise<GlobalSettings> {
  // Leverages jsonStore to fetch the object or fall back to defaultSettings
  return getJsonData<GlobalSettings>(FILE_NAME, defaultSettings);
}

export async function saveSettings(newSettings: Partial<GlobalSettings>): Promise<GlobalSettings> {
  const current = await getSettings();
  
  const updated: GlobalSettings = {
    ...current,
    ...newSettings,
    updatedAt: new Date().toISOString(),
  };

  // Leverages jsonStore to persist the updated object safely
  await saveJsonData(FILE_NAME, updated);
  return updated;
}