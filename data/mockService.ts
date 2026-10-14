import { Cleaner, Property, DaySchedule } from "@/types/planner";

export function getMockScheduleForWeek(
  weekStartDate: string,
  cleaners: Cleaner[],
  properties: Property[]
): DaySchedule[] {
  const start = new Date(weekStartDate);
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // Fallback helpers to safely access dynamic cleaners/properties
  const getC = (index: number): Cleaner => cleaners[index % cleaners.length] || { id: `cleaner-${index}`, name: `Cleaner ${index + 1}` };
  const getP = (index: number): Property => properties[index % properties.length] || { id: `prop-${index}`, name: `Property ${index + 1}`, code: `P${index + 1}` };

  return Array.from({ length: 7 }, (_, i) => {
    const current = new Date(start);
    current.setDate(start.getDate() + i);
    const dateStr = current.toISOString().split("T")[0];
    const dow = daysOfWeek[current.getDay()];

    const cleanings = [];

    if (i === 0) {
      // Sunday Turnover
      cleanings.push(
        { cleaner: getC(0), property: getP(0), checkOut: { guestName: "Smith", time: "10:00 AM", totalPrice: 2200 }, checkIn: { guestName: "Johnson", time: "4:00 PM", totalPrice: 1500 } },
        { cleaner: getC(0), property: getP(1), checkOut: { guestName: "Davis", time: "11:00 AM", totalPrice: 950 } },
        { cleaner: getC(1), property: getP(2), checkOut: { guestName: "Miller", time: "10:00 AM", totalPrice: 1200 }, checkIn: { guestName: "Garcia", time: "3:00 PM", totalPrice: 2400 } },
        { cleaner: getC(1), property: getP(3), checkOut: { guestName: "Wilson", time: "11:00 AM", totalPrice: 800 } },
        { cleaner: getC(2), property: getP(4), checkOut: { guestName: "Taylor", time: "10:00 AM", totalPrice: 1400 }, checkIn: { guestName: "Anderson", time: "4:00 PM", totalPrice: 1900 } },
        { cleaner: getC(2), property: getP(5), checkOut: { guestName: "Thomas", time: "11:00 AM", totalPrice: 650 } },
        { cleaner: getC(3), property: getP(6), checkOut: { guestName: "Jackson", time: "10:00 AM", totalPrice: 1100 } },
        { cleaner: getC(4), property: getP(7), checkOut: { guestName: "White", time: "11:00 AM", totalPrice: 1300 }, checkIn: { guestName: "Harris", time: "3:00 PM", totalPrice: 2100 } }
      );
    } else if (i === 1) {
      // Monday Peak
      cleanings.push(
        { cleaner: getC(1), property: getP(8), dayOff: true },
        { cleaner: getC(0), property: getP(0), checkOut: { guestName: "Martin", time: "10:00 AM", totalPrice: 1250 }, checkIn: { guestName: "Clark", time: "4:00 PM", totalPrice: 1400 } },
        { cleaner: getC(0), property: getP(2), checkOut: { guestName: "Lee", time: "11:00 AM", totalPrice: 900 } },
        { cleaner: getC(0), property: getP(9), checkOut: { guestName: "Lewis", time: "10:00 AM", totalPrice: 2500 } },
        { cleaner: getC(0), property: getP(3), checkOut: { guestName: "Young", time: "11:00 AM", totalPrice: 750 } },
        { cleaner: getC(2), property: getP(1), checkOut: { guestName: "Walker", time: "10:00 AM", totalPrice: 1100 }, checkIn: { guestName: "Hall", time: "3:00 PM", totalPrice: 1200 } },
        { cleaner: getC(3), property: getP(4), checkOut: { guestName: "King", time: "10:00 AM", totalPrice: 1450 }, checkIn: { guestName: "Wright", time: "4:00 PM", totalPrice: 2800 } },
        { cleaner: getC(3), property: getP(5), checkOut: { guestName: "Scott", time: "11:00 AM", totalPrice: 850 } },
        { cleaner: getC(4), property: getP(6), checkOut: { guestName: "Green", time: "10:00 AM", totalPrice: 1600 }, checkIn: { guestName: "Baker", time: "3:00 PM", totalPrice: 1700 } },
        { cleaner: getC(4), property: getP(7), checkOut: { guestName: "Adams", time: "11:00 AM", totalPrice: 950 } }
      );
    } else if (i === 2) {
      // Tuesday Mid-Week
      cleanings.push(
        { cleaner: getC(0), property: getP(3), checkOut: { guestName: "Nelson", time: "10:00 AM", totalPrice: 1100 }, checkIn: { guestName: "Carter", time: "4:00 PM", totalPrice: 2250 } },
        { cleaner: getC(0), property: getP(4), checkOut: { guestName: "Mitchell", time: "11:00 AM", totalPrice: 800 } },
        { cleaner: getC(1), property: getP(5), checkOut: { guestName: "Perez", time: "10:00 AM", totalPrice: 1300 }, checkIn: { guestName: "Roberts", time: "3:00 PM", totalPrice: 1450 } },
        { cleaner: getC(1), property: getP(6), checkOut: { guestName: "Turner", time: "11:00 AM", totalPrice: 950 } },
        { cleaner: getC(2), property: getP(7), checkOut: { guestName: "Phillips", time: "10:00 AM", totalPrice: 1200 }, checkIn: { guestName: "Campbell", time: "4:00 PM", totalPrice: 2600 } },
        { cleaner: getC(2), property: getP(8), checkOut: { guestName: "Parker", time: "11:00 AM", totalPrice: 880 } },
        { cleaner: getC(3), property: getP(9), checkOut: { guestName: "Evans", time: "10:00 AM", totalPrice: 1500 }, checkIn: { guestName: "Edwards", time: "3:00 PM", totalPrice: 1600 } },
        { cleaner: getC(4), property: getP(0), checkOut: { guestName: "Collins", time: "11:00 AM", totalPrice: 920 } }
      );
    } else if (i === 3) {
      // Wednesday
      cleanings.push(
        { cleaner: getC(3), property: getP(1), dayOff: true },
        { cleaner: getC(0), property: getP(1), checkOut: { guestName: "Stewart", time: "10:00 AM", totalPrice: 1050 } },
        { cleaner: getC(1), property: getP(2), checkOut: { guestName: "Sanchez", time: "11:00 AM", totalPrice: 890 }, checkIn: { guestName: "Morris", time: "4:00 PM", totalPrice: 2300 } },
        { cleaner: getC(1), property: getP(3), checkOut: { guestName: "Rogers", time: "10:00 AM", totalPrice: 1150 } },
        { cleaner: getC(2), property: getP(4), checkOut: { guestName: "Reed", time: "11:00 AM", totalPrice: 940 }, checkIn: { guestName: "Cook", time: "3:00 PM", totalPrice: 1200 } },
        { cleaner: getC(2), property: getP(5), checkOut: { guestName: "Morgan", time: "10:00 AM", totalPrice: 810 } },
        { cleaner: getC(4), property: getP(6), checkOut: { guestName: "Bell", time: "11:00 AM", totalPrice: 1250 }, checkIn: { guestName: "Murphy", time: "4:00 PM", totalPrice: 2100 } },
        { cleaner: getC(4), property: getP(7), checkOut: { guestName: "Bailey", time: "10:00 AM", totalPrice: 990 } }
      );
    } else if (i === 4) {
      // Thursday
      cleanings.push(
        { cleaner: getC(0), property: getP(8), checkOut: { guestName: "Rivera", time: "10:00 AM", totalPrice: 1400 }, checkIn: { guestName: "Cooper", time: "3:00 PM", totalPrice: 1550 } },
        { cleaner: getC(0), property: getP(9), checkOut: { guestName: "Richardson", time: "11:00 AM", totalPrice: 2400 } },
        { cleaner: getC(1), property: getP(0), checkOut: { guestName: "Cox", time: "10:00 AM", totalPrice: 1100 }, checkIn: { guestName: "Howard", time: "4:00 PM", totalPrice: 2750 } },
        { cleaner: getC(1), property: getP(1), checkOut: { guestName: "Ward", time: "11:00 AM", totalPrice: 850 } },
        { cleaner: getC(2), property: getP(2), checkOut: { guestName: "Torres", time: "10:00 AM", totalPrice: 1250 }, checkIn: { guestName: "Peterson", time: "3:00 PM", totalPrice: 1350 } },
        { cleaner: getC(3), property: getP(3), checkOut: { guestName: "Gray", time: "11:00 AM", totalPrice: 920 } },
        { cleaner: getC(3), property: getP(4), checkOut: { guestName: "Ramirez", time: "10:00 AM", totalPrice: 1300 }, checkIn: { guestName: "James", time: "4:00 PM", totalPrice: 2100 } },
        { cleaner: getC(4), property: getP(5), checkOut: { guestName: "Watson", time: "11:00 AM", totalPrice: 980 } }
      );
    } else if (i === 5) {
      // Friday
      cleanings.push(
        { cleaner: getC(0), property: getP(6), checkOut: { guestName: "Brooks", time: "10:00 AM", totalPrice: 1350 }, checkIn: { guestName: "Kelly", time: "4:00 PM", totalPrice: 2900 } },
        { cleaner: getC(0), property: getP(7), checkOut: { guestName: "Sanders", time: "11:00 AM", totalPrice: 1020 } },
        { cleaner: getC(1), property: getP(8), checkOut: { guestName: "Price", time: "10:00 AM", totalPrice: 1450 }, checkIn: { guestName: "Bennett", time: "3:00 PM", totalPrice: 1600 } },
        { cleaner: getC(1), property: getP(9), checkOut: { guestName: "Wood", time: "11:00 AM", totalPrice: 880 } },
        { cleaner: getC(2), property: getP(0), checkOut: { guestName: "Barnes", time: "10:00 AM", totalPrice: 1550 }, checkIn: { guestName: "Ross", time: "4:00 PM", totalPrice: 3100 } },
        { cleaner: getC(2), property: getP(1), checkOut: { guestName: "Henderson", time: "11:00 AM", totalPrice: 1100 } },
        { cleaner: getC(3), property: getP(2), checkOut: { guestName: "Coleman", time: "10:00 AM", totalPrice: 1250 }, checkIn: { guestName: "Jenkins", time: "3:00 PM", totalPrice: 1400 } },
        { cleaner: getC(4), property: getP(4), checkOut: { guestName: "Powell", time: "10:00 AM", totalPrice: 1400 }, checkIn: { guestName: "Long", time: "4:00 PM", totalPrice: 2500 } },
        { cleaner: getC(4), property: getP(5), checkOut: { guestName: "Patterson", time: "11:00 AM", totalPrice: 970 } },
        { cleaner: getC(4), property: getP(6), checkOut: { guestName: "Gomez", time: "10:00 AM", totalPrice: 1150 } },
        { cleaner: getC(4), property: getP(2), checkOut: { guestName: "Perry", time: "11:00 AM", totalPrice: 930 } }
      );
    } else if (i === 6) {
      // Saturday
      cleanings.push(
        { cleaner: getC(0), property: getP(5), checkOut: { guestName: "Hughes", time: "10:00 AM", totalPrice: 2300 }, checkIn: { guestName: "Flores", time: "4:00 PM", totalPrice: 2450 } },
        { cleaner: getC(0), property: getP(6), checkOut: { guestName: "Washington", time: "11:00 AM", totalPrice: 1150 } },
        { cleaner: getC(1), property: getP(7), checkOut: { guestName: "Butler", time: "10:00 AM", totalPrice: 1300 }, checkIn: { guestName: "Simmons", time: "3:00 PM", totalPrice: 1450 } },
        { cleaner: getC(1), property: getP(8), checkOut: { guestName: "Foster", time: "11:00 AM", totalPrice: 980 } },
        { cleaner: getC(2), property: getP(9), checkOut: { guestName: "Gonzales", time: "10:00 AM", totalPrice: 2100 }, checkIn: { guestName: "Bryant", time: "4:00 PM", totalPrice: 3500 } },
        { cleaner: getC(2), property: getP(0), checkOut: { guestName: "Alexander", time: "11:00 AM", totalPrice: 1250 } },
        { cleaner: getC(3), property: getP(1), checkOut: { guestName: "Russell", time: "10:00 AM", totalPrice: 1400 }, checkIn: { guestName: "Griffin", time: "3:00 PM", totalPrice: 1550 } },
        { cleaner: getC(4), property: getP(2), checkOut: { guestName: "Diaz", time: "10:00 AM", totalPrice: 1350 }, checkIn: { guestName: "Hayes", time: "4:00 PM", totalPrice: 2800 } }
      );
    }

    return {
      date: dateStr,
      dow,
      cleanings,
    };
  });
}