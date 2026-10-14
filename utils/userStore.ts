import { User } from '@/types/user';
import { getJsonData, saveJsonData } from '@/utils/jsonStore';

const INITIAL_USERS: User[] = [
  { id: 'u1', name: 'Jerick Chan', email: 'jerick@example.com', role: 'Admin', active: true, lastLogin: '2026-10-14' },
  { id: 'u2', name: 'Steph Chan', email: 'steph@example.com', role: 'Operations Manager', active: true, lastLogin: '2026-10-13' },
  { id: 'u3', name: 'David Miller', email: 'david@example.com', role: 'Viewer', active: true, lastLogin: '2026-10-10' },
];

export async function getUsers(): Promise<User[]> {
  return getJsonData<User[]>('users.json', INITIAL_USERS);
}

export async function saveUsers(users: User[]): Promise<void> {
  await saveJsonData('users.json', users);
}