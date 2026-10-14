import { Property } from '@/types/property';
import { getJsonData, saveJsonData } from '@/utils/jsonStore';

const INITIAL_PROPERTIES: Property[] = [
  { id: 'p1', name: 'Downtown Loft 409', code: 'DT-409', city: 'Los Angeles', bedrooms: 2, defaultPayout: 180, active: true },
  { id: 'p2', name: 'Manhattan Skyline Suite', code: 'MHT-12', city: 'New York City', bedrooms: 3, defaultPayout: 250, active: true },
  { id: 'p3', name: 'Nordic Fjord Cabin', code: 'OSL-01', city: 'Oslo', bedrooms: 1, defaultPayout: 200, active: true },
];

export async function getProperties(): Promise<Property[]> {
  // Pass INITIAL_PROPERTIES as the fallback default (2 arguments total)
  return getJsonData<Property[]>('properties.json', INITIAL_PROPERTIES);
}

export async function saveProperties(properties: Property[]): Promise<void> {
  await saveJsonData('properties.json', properties);
}