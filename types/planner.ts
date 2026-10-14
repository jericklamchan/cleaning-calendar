// types/planner.ts
export interface Cleaner {
  id: string;
  name: string;
}

export interface Property {
  id: string;
  name: string;
  code?: string;
}

export interface CleaningAssignment {
  cleaner: Cleaner;
  property: Property;
  dayOff?: boolean;
  checkOut?: { guestName: string; time: string };
  checkIn?: { guestName: string; time: string };
}

export interface DaySchedule {
  date: string; // "YYYY-MM-DD"
  dow: string;  // "Mon", "Tue", etc.
  cleanings: CleaningAssignment[];
}