import { CleaningAssignment } from "@/types/planner";

export function isHighValueAssignment(assignment: CleaningAssignment): boolean {
  const checkOutPrice = assignment.checkOut?.totalPrice ?? 0;
  const checkInPrice = assignment.checkIn?.totalPrice ?? 0;
  return checkOutPrice >= 2000 || checkInPrice >= 2000;
}