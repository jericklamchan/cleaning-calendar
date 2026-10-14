// utils/usersStore.ts
import fs from 'fs/promises';
import path from 'path';
import { User } from '@/types/user';

const FILE_PATH = path.join(process.cwd(), 'data', 'users.json');

const INITIAL_USERS: User[] = [
  { id: 'u1', name: 'Jerick Chan', email: 'jerick@example.com', role: 'Admin', active: true, lastLogin: '2026-10-14' },
  { id: 'u2', name: 'Steph Chan', email: 'steph@example.com', role: 'Operations Manager', active: true, lastLogin: '2026-10-13' },
  { id: 'u3', name: 'David Miller', email: 'david@example.com', role: 'Viewer', active: true, lastLogin: '2026-10-10' },
];

export async function getUsers(): Promise<User[]> {
  try {
    const data = await fs.readFile(FILE_PATH, 'utf8');
    return JSON.parse(data);
  } catch {
    await fs.mkdir(path.dirname(FILE_PATH), { recursive: true });
    await fs.writeFile(FILE_PATH, JSON.stringify(INITIAL_USERS, null, 2));
    return INITIAL_USERS;
  }
}

export async function saveUsers(users: User[]): Promise<void> {
  await fs.mkdir(path.dirname(FILE_PATH), { recursive: true });
  await fs.writeFile(FILE_PATH, JSON.stringify(users, null, 2));
}