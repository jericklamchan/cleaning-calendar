import { CleaningAssignment, DaySchedule } from "@/types/planner";

export interface CleanerWeeklyCapacity {
  totalCleanings: number;
  sameDayTurnovers: number;
  highValueCleanings: number;
  overloadedDays: number;
  daysOff: number;
  capacityStatus: "Overloaded" | "High Load" | "Optimal";
}

export function isHighValueAssignment(assignment: CleaningAssignment): boolean {
  const checkOutPrice = assignment.checkOut?.totalPrice ?? 0;
  const checkInPrice = assignment.checkIn?.totalPrice ?? 0;
  return checkOutPrice >= 2000 || checkInPrice >= 2000;
}

export function isSameDayTurnover(assignment: CleaningAssignment): boolean {
  return Boolean(assignment.checkOut && assignment.checkIn);
}

export function isCleanerOverloaded(
  cleanerId: string,
  dayCleanings: CleaningAssignment[]
): boolean {
  const cleanerCleanings = dayCleanings.filter(
    (c) => !c.dayOff && c.cleaner.id === cleanerId
  );
  return cleanerCleanings.length >= 4;
}

export function getCleanerCapacityStatus(
  totalCleanings: number
): "Overloaded" | "High Load" | "Optimal" {
  if (totalCleanings >= 15) return "Overloaded";
  if (totalCleanings >= 12) return "High Load";
  return "Optimal";
}

export function getCleanerWeeklyCapacity(
  cleanerId: string,
  schedule: DaySchedule[]
): CleanerWeeklyCapacity {
  let totalCleanings = 0;
  let sameDayTurnovers = 0;
  let highValueCleanings = 0;
  let overloadedDays = 0;
  let daysOff = 0;

  schedule.forEach((day) => {
    const activeCleanings = day.cleanings.filter(
      (c) => c.cleaner.id === cleanerId && !c.dayOff
    );
    const hasDayOff = day.cleanings.some(
      (c) => c.cleaner.id === cleanerId && c.dayOff
    );

    if (hasDayOff) daysOff++;

    totalCleanings += activeCleanings.length;
    sameDayTurnovers += activeCleanings.filter(isSameDayTurnover).length;
    highValueCleanings += activeCleanings.filter(isHighValueAssignment).length;

    if (activeCleanings.length >= 4) {
      overloadedDays++;
    }
  });

  return {
    totalCleanings,
    sameDayTurnovers,
    highValueCleanings,
    overloadedDays,
    daysOff,
    capacityStatus: getCleanerCapacityStatus(totalCleanings),
  };
}