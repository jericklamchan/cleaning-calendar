export interface GlobalSettings {
  heavyLoadThreshold: number;
  overflowThreshold: number;
  highValueCutoff: number;
  deepCleanNights: number;
  rescheduleWindowDays: number;
  updatedAt?: string;
}

export const defaultSettings: GlobalSettings = {
  heavyLoadThreshold: 3,
  overflowThreshold: 4,
  highValueCutoff: 500,
  deepCleanNights: 7,
  rescheduleWindowDays: 7,
};