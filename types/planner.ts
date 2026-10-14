import { Cleaner } from "@/types/cleaner";
import { Property } from "@/types/property";

export type { Cleaner };
export type { Property };

export interface ReservationDetails {
  guestName: string;
  time: string;
  totalPrice?: number;
}

export interface CleaningAssignment {
  cleaner: Cleaner;
  property: Property;
  dayOff?: boolean;
  checkOut?: ReservationDetails;
  checkIn?: ReservationDetails;
}

export interface DaySchedule {
  date: string; // "YYYY-MM-DD"
  dow: string;  // "Mon", "Tue", etc.
  cleanings: CleaningAssignment[];
}