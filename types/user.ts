export interface User {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'Operations Manager' | 'Viewer';
  active: boolean;
  lastLogin?: string;
}