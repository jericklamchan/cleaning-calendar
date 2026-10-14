import { Cleaner } from '@/types/cleaner';
import { getJsonData, saveJsonData } from '@/utils/jsonStore';

const FILE_NAME = 'cleaners.json';

export const INITIAL_CLEANERS: Cleaner[] = [
  { id: 'cleaner-1', name: 'Alice' },
  { id: 'cleaner-2', name: 'Bob' },
  { id: 'cleaner-3', name: 'Charlie' },
  { id: 'cleaner-4', name: 'Diana' },
  { id: 'cleaner-5', name: 'Evan' },
];

export async function getCleaners(): Promise<Cleaner[]> {
  return getJsonData<Cleaner[]>(FILE_NAME, INITIAL_CLEANERS);
}

export async function saveCleaners(cleaners: Cleaner[]): Promise<void> {
  return saveJsonData(FILE_NAME, cleaners);
}