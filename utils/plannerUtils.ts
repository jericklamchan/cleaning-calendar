import { CleaningAssignment } from "@/types/planner";

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