import fs from 'fs/promises';
import path from 'path';
import { CompanySettings, defaultSettings } from '@/types/settings';

const DATA_DIR = path.join(process.cwd(), 'data');
const FILE_PATH = path.join(DATA_DIR, 'settings.json');

// Ensure the data directory and file exist
async function ensureFileExists() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    await fs.access(FILE_PATH);
  } catch {
    await fs.writeFile(FILE_PATH, JSON.stringify(defaultSettings, null, 2), 'utf-8');
  }
}

export async function getSettings(): Promise<CompanySettings> {
  await ensureFileExists();
  try {
    const data = await fs.readFile(FILE_PATH, 'utf-8');
    return JSON.parse(data) as CompanySettings;
  } catch (error) {
    console.error('Failed to read settings cache, falling back to defaults:', error);
    return defaultSettings;
  }
}

export async function saveSettings(newSettings: Partial<CompanySettings>): Promise<CompanySettings> {
  await ensureFileExists();
  const current = await getSettings();
  
  const updated: CompanySettings = {
    ...current,
    ...newSettings,
    updatedAt: new Date().toISOString(),
  };

  await fs.writeFile(FILE_PATH, JSON.stringify(updated, null, 2), 'utf-8');
  return updated;
}