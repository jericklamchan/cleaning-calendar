import { CompanySettings, defaultSettings } from '@/types/settings';
import { getJsonData, saveJsonData } from '@/utils/jsonStore';

const FILE_NAME = 'settings.json';

export async function getSettings(): Promise<CompanySettings> {
  // Leverages jsonStore to fetch the object or fall back to defaultSettings
  return getJsonData<CompanySettings>(FILE_NAME, defaultSettings);
}

export async function saveSettings(newSettings: Partial<CompanySettings>): Promise<CompanySettings> {
  const current = await getSettings();
  
  const updated: CompanySettings = {
    ...current,
    ...newSettings,
    updatedAt: new Date().toISOString(),
  };

  // Leverages jsonStore to persist the updated object safely
  await saveJsonData(FILE_NAME, updated);
  return updated;
}