export interface Cleaner {
  id: string;
  name: string;
  phone: string;
  email: string;
  active: boolean;
  assignedProperties?: string[]; // e.g. Property IDs or names
  notes?: string;
}