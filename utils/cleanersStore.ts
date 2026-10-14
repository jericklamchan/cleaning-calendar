// utils/cleanersStore.ts
import fs from 'fs/promises';
import path from 'path';
import { Cleaner } from '@/types/cleaner';

const FILE_PATH = path.join(process.cwd(), 'data', 'cleaners.json');

const INITIAL_CLEANERS: Cleaner[] = [
  {
    id: 'c1',
    name: 'Maria Santos',
    phone: '+1 (555) 234-5678',
    email: 'maria.santos@cleaning.com',
    active: true,
    notes: 'Primary cleaner for downtown units.',
  },
  {
    id: 'c2',
    name: 'Elena Rostova',
    phone: '+1 (555) 876-5432',
    email: 'elena.r@cleaning.com',
    active: true,
    notes: 'Available on weekends and holiday turns.',
  },
  {
    id: 'c3',
    name: 'Carlos Mendez',
    phone: '+1 (555) 345-6789',
    email: 'carlos.m@cleaning.com',
    active: false,
    notes: 'On temporary leave.',
  },
];

export async function getCleaners(): Promise<Cleaner[]> {
  try {
    const data = await fs.readFile(FILE_PATH, 'utf8');
    return JSON.parse(data);
  } catch {
    await fs.mkdir(path.dirname(FILE_PATH), { recursive: true });
    await fs.writeFile(FILE_PATH, JSON.stringify(INITIAL_CLEANERS, null, 2));
    return INITIAL_CLEANERS;
  }
}

export async function saveCleaners(cleaners: Cleaner[]): Promise<void> {
  await fs.mkdir(path.dirname(FILE_PATH), { recursive: true });
  await fs.writeFile(FILE_PATH, JSON.stringify(cleaners, null, 2));
}