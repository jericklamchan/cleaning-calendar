export interface Property {
  id: string;
  name: string;
  code?: string;
  city?: string; // e.g. "Los Angeles", "New York City", "Oslo"
  bedrooms?: number;
  defaultPayout?: number;
  active: boolean;
}