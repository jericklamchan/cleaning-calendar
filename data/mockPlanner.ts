import { Cleaner, DaySchedule } from "@/types/planner";

export const mockCleaners: Cleaner[] = [
  { id: "cleaner-1", name: "Alice" },
  { id: "cleaner-2", name: "Bob" },
  { id: "cleaner-3", name: "Charlie" },
  { id: "cleaner-4", name: "Diana" },
  { id: "cleaner-5", name: "Evan" },
];

export const mockSchedule: DaySchedule[] = [
  { date: "2026-10-11", dow: "Sun", cleanings: [{ cleaner: mockCleaners[0], dayOff: true }] },
  { date: "2026-10-12", dow: "Mon", cleanings: [{ cleaner: mockCleaners[1], dayOff: true }] },
  { date: "2026-10-13", dow: "Tue", cleanings: [{ cleaner: mockCleaners[2], dayOff: true }] },
  { date: "2026-10-14", dow: "Wed", cleanings: [{ cleaner: mockCleaners[3], dayOff: true }] },
  { date: "2026-10-15", dow: "Thu", cleanings: [{ cleaner: mockCleaners[4], dayOff: true }] },
  { date: "2026-10-16", dow: "Fri", cleanings: [] },
  { date: "2026-10-17", dow: "Sat", cleanings: [] },
];