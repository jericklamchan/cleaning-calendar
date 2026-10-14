// data/mockPlanner.ts
import { Cleaner, Property, DaySchedule } from "@/types/planner";

export const mockCleaners: Cleaner[] = [
  { id: "cleaner-1", name: "Alice" },
  { id: "cleaner-2", name: "Bob" },
  { id: "cleaner-3", name: "Charlie" },
  { id: "cleaner-4", name: "Diana" },
  { id: "cleaner-5", name: "Evan" },
];

export const mockProperties: Property[] = [
  { id: "prop-1", name: "Sunset Beach Villa", code: "SBV" },
  { id: "prop-2", name: "Downtown Luxury Loft", code: "DLL" },
  { id: "prop-3", name: "Pine Tree Cabin", code: "PTC" },
  { id: "prop-4", name: "Harbor View Apartment", code: "HVA" },
  { id: "prop-5", name: "Mountain Ridge Chalet", code: "MRC" },
  { id: "prop-6", name: "Coastal Breeze Cottage", code: "CBC" },
  { id: "prop-7", name: "Marina Bay Suite", code: "MBS" },
  { id: "prop-8", name: "Alpine Escape Lodge", code: "AEL" },
  { id: "prop-9", name: "Orchard Garden Bungalow", code: "OGB" },
  { id: "prop-10", name: "Skyline Penthouse", code: "SLP" },
];

export function getMockScheduleForWeek(weekStartDate: string): DaySchedule[] {
  const start = new Date(weekStartDate);
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return Array.from({ length: 7 }, (_, i) => {
    const current = new Date(start);
    current.setDate(start.getDate() + i);
    const dateStr = current.toISOString().split("T")[0];
    const dow = daysOfWeek[current.getDay()];

    const cleanings = [];

    if (i === 0) {
      // Sunday Turnover
      cleanings.push(
        { cleaner: mockCleaners[0], property: mockProperties[0], checkOut: { guestName: "Smith", time: "10:00 AM", totalPrice: 2200 }, checkIn: { guestName: "Johnson", time: "4:00 PM", totalPrice: 1500 } },
        { cleaner: mockCleaners[0], property: mockProperties[1], checkOut: { guestName: "Davis", time: "11:00 AM", totalPrice: 950 } },
        { cleaner: mockCleaners[1], property: mockProperties[2], checkOut: { guestName: "Miller", time: "10:00 AM", totalPrice: 1200 }, checkIn: { guestName: "Garcia", time: "3:00 PM", totalPrice: 2400 } },
        { cleaner: mockCleaners[1], property: mockProperties[3], checkOut: { guestName: "Wilson", time: "11:00 AM", totalPrice: 800 } },
        { cleaner: mockCleaners[2], property: mockProperties[4], checkOut: { guestName: "Taylor", time: "10:00 AM", totalPrice: 1400 }, checkIn: { guestName: "Anderson", time: "4:00 PM", totalPrice: 1900 } },
        { cleaner: mockCleaners[2], property: mockProperties[5], checkOut: { guestName: "Thomas", time: "11:00 AM", totalPrice: 650 } },
        { cleaner: mockCleaners[3], property: mockProperties[6], checkOut: { guestName: "Jackson", time: "10:00 AM", totalPrice: 1100 } },
        { cleaner: mockCleaners[4], property: mockProperties[7], checkOut: { guestName: "White", time: "11:00 AM", totalPrice: 1300 }, checkIn: { guestName: "Harris", time: "3:00 PM", totalPrice: 2100 } }
      );
    } else if (i === 1) {
      // Monday Peak - Alice Overloaded (4 tasks)
      cleanings.push(
        { cleaner: mockCleaners[1], property: mockProperties[8], dayOff: true },
        { cleaner: mockCleaners[0], property: mockProperties[0], checkOut: { guestName: "Martin", time: "10:00 AM", totalPrice: 1250 }, checkIn: { guestName: "Clark", time: "4:00 PM", totalPrice: 1400 } },
        { cleaner: mockCleaners[0], property: mockProperties[2], checkOut: { guestName: "Lee", time: "11:00 AM", totalPrice: 900 } },
        { cleaner: mockCleaners[0], property: mockProperties[9], checkOut: { guestName: "Lewis", time: "10:00 AM", totalPrice: 2500 } },
        { cleaner: mockCleaners[0], property: mockProperties[3], checkOut: { guestName: "Young", time: "11:00 AM", totalPrice: 750 } }, // 4th task for Alice (Overload Demo)
        { cleaner: mockCleaners[2], property: mockProperties[1], checkOut: { guestName: "Walker", time: "10:00 AM", totalPrice: 1100 }, checkIn: { guestName: "Hall", time: "3:00 PM", totalPrice: 1200 } },
        { cleaner: mockCleaners[3], property: mockProperties[4], checkOut: { guestName: "King", time: "10:00 AM", totalPrice: 1450 }, checkIn: { guestName: "Wright", time: "4:00 PM", totalPrice: 2800 } },
        { cleaner: mockCleaners[3], property: mockProperties[5], checkOut: { guestName: "Scott", time: "11:00 AM", totalPrice: 850 } },
        { cleaner: mockCleaners[4], property: mockProperties[6], checkOut: { guestName: "Green", time: "10:00 AM", totalPrice: 1600 }, checkIn: { guestName: "Baker", time: "3:00 PM", totalPrice: 1700 } },
        { cleaner: mockCleaners[4], property: mockProperties[7], checkOut: { guestName: "Adams", time: "11:00 AM", totalPrice: 950 } }
      );
    } else if (i === 2) {
      // Tuesday Mid-Week
      cleanings.push(
        { cleaner: mockCleaners[0], property: mockProperties[3], checkOut: { guestName: "Nelson", time: "10:00 AM", totalPrice: 1100 }, checkIn: { guestName: "Carter", time: "4:00 PM", totalPrice: 2250 } },
        { cleaner: mockCleaners[0], property: mockProperties[4], checkOut: { guestName: "Mitchell", time: "11:00 AM", totalPrice: 800 } },
        { cleaner: mockCleaners[1], property: mockProperties[5], checkOut: { guestName: "Perez", time: "10:00 AM", totalPrice: 1300 }, checkIn: { guestName: "Roberts", time: "3:00 PM", totalPrice: 1450 } },
        { cleaner: mockCleaners[1], property: mockProperties[6], checkOut: { guestName: "Turner", time: "11:00 AM", totalPrice: 950 } },
        { cleaner: mockCleaners[2], property: mockProperties[7], checkOut: { guestName: "Phillips", time: "10:00 AM", totalPrice: 1200 }, checkIn: { guestName: "Campbell", time: "4:00 PM", totalPrice: 2600 } },
        { cleaner: mockCleaners[2], property: mockProperties[8], checkOut: { guestName: "Parker", time: "11:00 AM", totalPrice: 880 } },
        { cleaner: mockCleaners[3], property: mockProperties[9], checkOut: { guestName: "Evans", time: "10:00 AM", totalPrice: 1500 }, checkIn: { guestName: "Edwards", time: "3:00 PM", totalPrice: 1600 } },
        { cleaner: mockCleaners[4], property: mockProperties[0], checkOut: { guestName: "Collins", time: "11:00 AM", totalPrice: 920 } }
      );
    } else if (i === 3) {
      // Wednesday Steady
      cleanings.push(
        { cleaner: mockCleaners[3], property: mockProperties[1], dayOff: true },
        { cleaner: mockCleaners[0], property: mockProperties[1], checkOut: { guestName: "Stewart", time: "10:00 AM", totalPrice: 1050 } },
        { cleaner: mockCleaners[1], property: mockProperties[2], checkOut: { guestName: "Sanchez", time: "11:00 AM", totalPrice: 890 }, checkIn: { guestName: "Morris", time: "4:00 PM", totalPrice: 2300 } },
        { cleaner: mockCleaners[1], property: mockProperties[3], checkOut: { guestName: "Rogers", time: "10:00 AM", totalPrice: 1150 } },
        { cleaner: mockCleaners[2], property: mockProperties[4], checkOut: { guestName: "Reed", time: "11:00 AM", totalPrice: 940 }, checkIn: { guestName: "Cook", time: "3:00 PM", totalPrice: 1200 } },
        { cleaner: mockCleaners[2], property: mockProperties[5], checkOut: { guestName: "Morgan", time: "10:00 AM", totalPrice: 810 } },
        { cleaner: mockCleaners[4], property: mockProperties[6], checkOut: { guestName: "Bell", time: "11:00 AM", totalPrice: 1250 }, checkIn: { guestName: "Murphy", time: "4:00 PM", totalPrice: 2100 } },
        { cleaner: mockCleaners[4], property: mockProperties[7], checkOut: { guestName: "Bailey", time: "10:00 AM", totalPrice: 990 } }
      );
    } else if (i === 4) {
      // Thursday Pre-Weekend Prep
      cleanings.push(
        { cleaner: mockCleaners[0], property: mockProperties[8], checkOut: { guestName: "Rivera", time: "10:00 AM", totalPrice: 1400 }, checkIn: { guestName: "Cooper", time: "3:00 PM", totalPrice: 1550 } },
        { cleaner: mockCleaners[0], property: mockProperties[9], checkOut: { guestName: "Richardson", time: "11:00 AM", totalPrice: 2400 } },
        { cleaner: mockCleaners[1], property: mockProperties[0], checkOut: { guestName: "Cox", time: "10:00 AM", totalPrice: 1100 }, checkIn: { guestName: "Howard", time: "4:00 PM", totalPrice: 2750 } },
        { cleaner: mockCleaners[1], property: mockProperties[1], checkOut: { guestName: "Ward", time: "11:00 AM", totalPrice: 850 } },
        { cleaner: mockCleaners[2], property: mockProperties[2], checkOut: { guestName: "Torres", time: "10:00 AM", totalPrice: 1250 }, checkIn: { guestName: "Peterson", time: "3:00 PM", totalPrice: 1350 } },
        { cleaner: mockCleaners[3], property: mockProperties[3], checkOut: { guestName: "Gray", time: "11:00 AM", totalPrice: 920 } },
        { cleaner: mockCleaners[3], property: mockProperties[4], checkOut: { guestName: "Ramirez", time: "10:00 AM", totalPrice: 1300 }, checkIn: { guestName: "James", time: "4:00 PM", totalPrice: 2100 } },
        { cleaner: mockCleaners[4], property: mockProperties[5], checkOut: { guestName: "Watson", time: "11:00 AM", totalPrice: 980 } }
      );
    } else if (i === 5) {
      // Friday Rush - Evan Overloaded (4 tasks)
      cleanings.push(
        { cleaner: mockCleaners[0], property: mockProperties[6], checkOut: { guestName: "Brooks", time: "10:00 AM", totalPrice: 1350 }, checkIn: { guestName: "Kelly", time: "4:00 PM", totalPrice: 2900 } },
        { cleaner: mockCleaners[0], property: mockProperties[7], checkOut: { guestName: "Sanders", time: "11:00 AM", totalPrice: 1020 } },
        { cleaner: mockCleaners[1], property: mockProperties[8], checkOut: { guestName: "Price", time: "10:00 AM", totalPrice: 1450 }, checkIn: { guestName: "Bennett", time: "3:00 PM", totalPrice: 1600 } },
        { cleaner: mockCleaners[1], property: mockProperties[9], checkOut: { guestName: "Wood", time: "11:00 AM", totalPrice: 880 } },
        { cleaner: mockCleaners[2], property: mockProperties[0], checkOut: { guestName: "Barnes", time: "10:00 AM", totalPrice: 1550 }, checkIn: { guestName: "Ross", time: "4:00 PM", totalPrice: 3100 } },
        { cleaner: mockCleaners[2], property: mockProperties[1], checkOut: { guestName: "Henderson", time: "11:00 AM", totalPrice: 1100 } },
        { cleaner: mockCleaners[3], property: mockProperties[2], checkOut: { guestName: "Coleman", time: "10:00 AM", totalPrice: 1250 }, checkIn: { guestName: "Jenkins", time: "3:00 PM", totalPrice: 1400 } },
        { cleaner: mockCleaners[4], property: mockProperties[4], checkOut: { guestName: "Powell", time: "10:00 AM", totalPrice: 1400 }, checkIn: { guestName: "Long", time: "4:00 PM", totalPrice: 2500 } },
        { cleaner: mockCleaners[4], property: mockProperties[5], checkOut: { guestName: "Patterson", time: "11:00 AM", totalPrice: 970 } },
        { cleaner: mockCleaners[4], property: mockProperties[6], checkOut: { guestName: "Gomez", time: "10:00 AM", totalPrice: 1150 } }, // 3rd task for Evan
        { cleaner: mockCleaners[4], property: mockProperties[2], checkOut: { guestName: "Perry", time: "11:00 AM", totalPrice: 930 } }  // 4th task for Evan (Overload Demo)
      );
    } else if (i === 6) {
      // Saturday Peak Turnover
      cleanings.push(
        { cleaner: mockCleaners[0], property: mockProperties[5], checkOut: { guestName: "Hughes", time: "10:00 AM", totalPrice: 2300 }, checkIn: { guestName: "Flores", time: "4:00 PM", totalPrice: 2450 } },
        { cleaner: mockCleaners[0], property: mockProperties[6], checkOut: { guestName: "Washington", time: "11:00 AM", totalPrice: 1150 } },
        { cleaner: mockCleaners[1], property: mockProperties[7], checkOut: { guestName: "Butler", time: "10:00 AM", totalPrice: 1300 }, checkIn: { guestName: "Simmons", time: "3:00 PM", totalPrice: 1450 } },
        { cleaner: mockCleaners[1], property: mockProperties[8], checkOut: { guestName: "Foster", time: "11:00 AM", totalPrice: 980 } },
        { cleaner: mockCleaners[2], property: mockProperties[9], checkOut: { guestName: "Gonzales", time: "10:00 AM", totalPrice: 2100 }, checkIn: { guestName: "Bryant", time: "4:00 PM", totalPrice: 3500 } },
        { cleaner: mockCleaners[2], property: mockProperties[0], checkOut: { guestName: "Alexander", time: "11:00 AM", totalPrice: 1250 } },
        { cleaner: mockCleaners[3], property: mockProperties[1], checkOut: { guestName: "Russell", time: "10:00 AM", totalPrice: 1400 }, checkIn: { guestName: "Griffin", time: "3:00 PM", totalPrice: 1550 } },
        { cleaner: mockCleaners[4], property: mockProperties[2], checkOut: { guestName: "Diaz", time: "10:00 AM", totalPrice: 1350 }, checkIn: { guestName: "Hayes", time: "4:00 PM", totalPrice: 2800 } }
      );
    }

    return {
      date: dateStr,
      dow,
      cleanings,
    };
  });
}