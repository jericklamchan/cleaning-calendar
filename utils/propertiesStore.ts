// utils/propertiesStore.ts
import fs from 'fs/promises';
import path from 'path';
import { Property } from '@/types/property';

const FILE_PATH = path.join(process.cwd(), 'data', 'properties.json');

const INITIAL_PROPERTIES: Property[] = [
  { id: 'p1', name: 'Downtown Loft 409', code: 'DT-409', city: 'Los Angeles', bedrooms: 2, defaultPayout: 180, active: true },
  { id: 'p2', name: 'Manhattan Skyline Suite', code: 'MHT-12', city: 'New York City', bedrooms: 3, defaultPayout: 250, active: true },
  { id: 'p3', name: 'Nordic Fjord Cabin', code: 'OSL-01', city: 'Oslo', bedrooms: 1, defaultPayout: 200, active: true },
];

export async function getProperties(): Promise<Property[]> {
  try {
    const data = await fs.readFile(FILE_PATH, 'utf8');
    return JSON.parse(data);
  } catch {
    await fs.mkdir(path.dirname(FILE_PATH), { recursive: true });
    await fs.writeFile(FILE_PATH, JSON.stringify(INITIAL_PROPERTIES, null, 2));
    return INITIAL_PROPERTIES;
  }
}

export async function saveProperties(properties: Property[]): Promise<void> {
  await fs.mkdir(path.dirname(FILE_PATH), { recursive: true });
  await fs.writeFile(FILE_PATH, JSON.stringify(properties, null, 2));
}