'use server';

import { revalidatePath } from 'next/cache';
import { getCleaners, saveCleaners } from '@/utils/cleanersStore';
import { Cleaner } from '@/types/cleaner';

export async function addCleanerAction(formData: FormData) {
  const cleaners = await getCleaners();
  const newCleaner: Cleaner = {
    id: 'c_' + Date.now(),
    name: formData.get('name') as string,
    phone: formData.get('phone') as string,
    email: formData.get('email') as string,
    active: formData.get('active') === 'true',
    notes: (formData.get('notes') as string) || '',
  };

  cleaners.push(newCleaner);
  await saveCleaners(cleaners);
  revalidatePath('/settings/cleaners');
}

export async function updateCleanerAction(id: string, formData: FormData) {
  const cleaners = await getCleaners();
  const index = cleaners.findIndex((c) => c.id === id);

  if (index !== -1) {
    cleaners[index] = {
      ...cleaners[index],
      name: formData.get('name') as string,
      phone: formData.get('phone') as string,
      email: formData.get('email') as string,
      active: formData.get('active') === 'true',
      notes: (formData.get('notes') as string) || '',
    };
    await saveCleaners(cleaners);
    revalidatePath('/settings/cleaners');
  }
}

export async function deleteCleanerAction(id: string) {
  let cleaners = await getCleaners();
  cleaners = cleaners.filter((c) => c.id !== id);
  await saveCleaners(cleaners);
  revalidatePath('/settings/cleaners');
}