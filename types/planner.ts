export interface Cleaner {
  id: string;
  name: string;
}

export interface CleaningItem {
  cleaner: Cleaner;
  dayOff?: boolean;
}

export interface DaySchedule {
  date: string;
  dow: string;
  cleanings: CleaningItem[];
}