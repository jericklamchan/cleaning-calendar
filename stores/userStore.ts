import { User } from '@/types/user';
import { getJsonData, saveJsonData } from '@/stores/jsonStore';

const INITIAL_USERS: User[] = [
  { id: 'u1', name: 'Jerick Chan', email: 'jerick@example.com', role: 'Admin', active: true, lastLogin: '2026-10-14' },
];

export async function getUsers(): Promise<User[]> {
  return getJsonData<User[]>('users.json', INITIAL_USERS);
}

export async function saveUsers(users: User[]): Promise<void> {
  await saveJsonData('users.json', users);
}