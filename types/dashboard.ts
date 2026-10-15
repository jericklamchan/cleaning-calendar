export interface TrendDay {
  day: string;
  total: number;
  sameDay: number;
}

export interface CleanerWorkloadStat {
  cleanerId: string;
  cleanerName: string;
  assignedCount: number;
}

export interface DashboardMetrics {
  trendData: TrendDay[];
  totalCleaningsWeekly: number;
  sameDayTurnoversWeekly: number;
  standardCleaningsWeekly: number;
  highValueAssignmentsWeekly: number;
  heavyLoadThreshold: number;
  cleanerWorkloads: CleanerWorkloadStat[];
}