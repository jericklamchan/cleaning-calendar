'use server';

import { revalidatePath } from 'next/cache';
import { getCleaners, saveCleaners } from '@/utils/cleanersStore'; // or your JSON store helper
import { Cleaner } from '@/types/cleaner';

export async function addCleanerAction(formData: FormData) {
  const cleaners = await getCleaners();

  const newCleaner: Cleaner = {
    id: crypto.randomUUID(),
    name: (formData.get('name') as string)?.trim() || 'Unnamed Cleaner',
    phone: (formData.get('phone') as string)?.trim() || '',
    email: (formData.get('email') as string)?.trim() || '',
    notes: (formData.get('notes') as string)?.trim() || '',
    active: formData.get('active') === 'true',
  };

  await saveCleaners([...cleaners, newCleaner]);
  revalidatePath('/settings');
}

export async function updateCleanerAction(id: string, formData: FormData) {
  const cleaners = await getCleaners();

  const updatedCleaners = cleaners.map((cleaner) => {
    if (cleaner.id !== id) return cleaner;

    return {
      ...cleaner,
      name: (formData.get('name') as string)?.trim() || cleaner.name,
      phone: (formData.get('phone') as string)?.trim() ?? cleaner.phone,
      email: (formData.get('email') as string)?.trim() ?? cleaner.email,
      notes: (formData.get('notes') as string)?.trim() ?? cleaner.notes,
      active: formData.get('active') === 'true',
    };
  });

  await saveCleaners(updatedCleaners);
  revalidatePath('/settings');
}

export async function deleteCleanerAction(id: string) {
  const cleaners = await getCleaners();
  const filteredCleaners = cleaners.filter((cleaner) => cleaner.id !== id);

  await saveCleaners(filteredCleaners);
  revalidatePath('/settings');
}