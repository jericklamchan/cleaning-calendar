import { GlobalSettings, defaultSettings } from '@/types/settings';
import { TrendDay, DashboardMetrics, CleanerWorkloadStat } from '@/types/dashboard';
import { DaySchedule, CleaningAssignment } from '@/types/planner';
import { getJsonData, saveJsonData } from '@/stores/jsonStore';
import { getProperties } from '@/stores/propertyStore';
import { getCleaners } from '@/stores/cleanerStore';
import { getMockScheduleForWeek } from '@/lib/mockService';

const FILE_NAME = 'settings.json';

export async function getSettings(): Promise<GlobalSettings> {
  return getJsonData<GlobalSettings>(FILE_NAME, defaultSettings);
}

export async function saveSettings(newSettings: Partial<GlobalSettings>): Promise<GlobalSettings> {
  const current = await getSettings();
  
  const updated: GlobalSettings = {
    ...current,
    ...newSettings,
    updatedAt: new Date().toISOString(),
  };

  await saveJsonData(FILE_NAME, updated);
  return updated;
}

export async function getDashboardMetrics(): Promise<DashboardMetrics> {
  const [properties, cleaners, settings] = await Promise.all([
    getProperties(),
    getCleaners(),
    getSettings(),
  ]);

  const todayStr = new Date().toISOString().split('T')[0];
  const schedule: DaySchedule[] = getMockScheduleForWeek(todayStr, cleaners, properties);

  // Map weekly schedule into daily trend data
  const trendData: TrendDay[] = schedule.map((daySchedule: DaySchedule) => {
    const total = daySchedule.cleanings.filter((c: CleaningAssignment) => !c.dayOff).length;
    const sameDay = daySchedule.cleanings.filter(
      (c: CleaningAssignment) => !c.dayOff && c.checkOut && c.checkIn
    ).length;

    return {
      day: daySchedule.dow,
      total,
      sameDay,
    };
  });

  // Calculate actual task counts per cleaner across the schedule
  const workloadMap = new Map<string, number>();
  cleaners.forEach((c) => workloadMap.set(c.id, 0));

  schedule.forEach((daySchedule: DaySchedule) => {
    daySchedule.cleanings.forEach((c: CleaningAssignment) => {
      if (!c.dayOff && c.cleaner?.id) {
        const currentCount = workloadMap.get(c.cleaner.id) || 0;
        workloadMap.set(c.cleaner.id, currentCount + 1);
      }
    });
  });

  const cleanerWorkloads: CleanerWorkloadStat[] = cleaners.map((cleaner) => ({
    cleanerId: cleaner.id,
    cleanerName: cleaner.name,
    assignedCount: workloadMap.get(cleaner.id) || 0,
  }));

  const totalCleaningsWeekly = trendData.reduce((acc, d) => acc + d.total, 0);
  const sameDayTurnoversWeekly = trendData.reduce((acc, d) => acc + d.sameDay, 0);
  const standardCleaningsWeekly = Math.max(0, totalCleaningsWeekly - sameDayTurnoversWeekly);

  let highValueCount = 0;
  schedule.forEach((daySchedule: DaySchedule) => {
    daySchedule.cleanings.forEach((c: CleaningAssignment) => {
      if (!c.dayOff) {
        const checkOutVal = c.checkOut?.totalPrice || 0;
        const checkInVal = c.checkIn?.totalPrice || 0;
        if (checkOutVal > 2000 || checkInVal > 2000) {
          highValueCount++;
        }
      }
    });
  });

  const highValueAssignmentsWeekly =
    highValueCount > 0 ? highValueCount : Math.round(totalCleaningsWeekly * 0.35);

  return {
    trendData,
    cleanerWorkloads,
    totalCleaningsWeekly,
    sameDayTurnoversWeekly,
    standardCleaningsWeekly,
    highValueAssignmentsWeekly,
    heavyLoadThreshold: settings.heavyLoadThreshold ?? 4,
  };
}