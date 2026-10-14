import { Property } from '@/types/property';
import { getJsonData, saveJsonData } from '@/utils/jsonStore';

const FILE_NAME = 'properties.json';

export const INITIAL_PROPERTIES: Property[] = [
  { id: "prop-1", name: "Sunset Beach Villa", code: "SBV", city: "Los Angeles", bedrooms: 3, defaultPayout: 150, active: true },
  { id: "prop-2", name: "Downtown Luxury Loft", code: "DLL", city: "New York", bedrooms: 1, defaultPayout: 100, active: true },
  { id: "prop-3", name: "Pine Tree Cabin", code: "PTC", city: "Oslo", bedrooms: 2, defaultPayout: 120, active: true },
  { id: "prop-4", name: "Harbor View Apartment", code: "HVA", city: "Los Angeles", bedrooms: 2, defaultPayout: 130, active: true },
  { id: "prop-5", name: "Mountain Ridge Chalet", code: "MRC", city: "Oslo", bedrooms: 4, defaultPayout: 180, active: true },
  { id: "prop-6", name: "Coastal Breeze Cottage", code: "CBC", city: "Los Angeles", bedrooms: 2, defaultPayout: 110, active: true },
  { id: "prop-7", name: "Marina Bay Suite", code: "MBS", city: "New York", bedrooms: 1, defaultPayout: 105, active: true },
  { id: "prop-8", name: "Alpine Escape Lodge", code: "AEL", city: "Oslo", bedrooms: 3, defaultPayout: 160, active: true },
  { id: "prop-9", name: "Orchard Garden Bungalow", code: "OGB", city: "Los Angeles", bedrooms: 2, defaultPayout: 125, active: true },
  { id: "prop-10", name: "Skyline Penthouse", code: "SLP", city: "New York", bedrooms: 3, defaultPayout: 200, active: true },
];

export async function getProperties(): Promise<Property[]> {
  return getJsonData<Property[]>(FILE_NAME, INITIAL_PROPERTIES);
}

export async function saveProperties(properties: Property[]): Promise<void> {
  return saveJsonData(FILE_NAME, properties);
}