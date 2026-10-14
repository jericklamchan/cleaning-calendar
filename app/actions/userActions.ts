'use server';

import { revalidatePath } from 'next/cache';
import { getUsers, saveUsers } from '@/utils/usersStore';
import { User } from '@/types/user';

export async function addUserAction(formData: FormData) {
  const users = await getUsers();
  const newUser: User = {
    id: 'u_' + Date.now(),
    name: formData.get('name') as string,
    email: formData.get('email') as string,
    role: (formData.get('role') as User['role']) || 'Viewer',
    active: formData.get('active') === 'true',
    lastLogin: 'Never',
  };

  users.push(newUser);
  await saveUsers(users);
  revalidatePath('/settings/users');
}

export async function updateUserAction(id: string, formData: FormData) {
  const users = await getUsers();
  const index = users.findIndex((u) => u.id === id);

  if (index !== -1) {
    users[index] = {
      ...users[index],
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      role: (formData.get('role') as User['role']) || 'Viewer',
      active: formData.get('active') === 'true',
    };
    await saveUsers(users);
    revalidatePath('/settings/users');
  }
}

export async function deleteUserAction(id: string) {
  let users = await getUsers();
  users = users.filter((u) => u.id !== id);
  await saveUsers(users);
  revalidatePath('/settings/users');
}