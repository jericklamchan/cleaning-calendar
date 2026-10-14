'use server';

import { revalidatePath } from 'next/cache';
import { getUsers, saveUsers } from '@/utils/userStore';
import { User } from '@/types/user';

export async function addUserAction(formData: FormData) {
  const users = await getUsers();

  const newUser: User = {
    id: crypto.randomUUID(),
    name: (formData.get('name') as string)?.trim() || 'New User',
    email: (formData.get('email') as string)?.trim() || '',
    role: (formData.get('role') as User['role']) || 'manager',
    active: formData.get('active') === 'true',
  };

  await saveUsers([...users, newUser]);
  revalidatePath('/settings');
}

export async function updateUserAction(id: string, formData: FormData) {
  const users = await getUsers();

  const updatedUsers = users.map((user) => {
    if (user.id !== id) return user;

    return {
      ...user,
      name: (formData.get('name') as string)?.trim() || user.name,
      email: (formData.get('email') as string)?.trim() || user.email,
      role: (formData.get('role') as User['role']) || user.role,
      active: formData.get('active') === 'true',
    };
  });

  await saveUsers(updatedUsers);
  revalidatePath('/settings');
}

export async function deleteUserAction(id: string) {
  const users = await getUsers();
  const filteredUsers = users.filter((user) => user.id !== id);

  await saveUsers(filteredUsers);
  revalidatePath('/settings');
}