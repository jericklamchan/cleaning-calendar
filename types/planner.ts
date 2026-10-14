export interface Cleaner {
  id: string;
  name: string;
}

export interface Property {
  id: string;
  name: string;
  code?: string;
}

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