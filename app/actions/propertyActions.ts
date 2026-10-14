'use server';

import { revalidatePath } from 'next/cache';
import { getProperties, saveProperties } from '@/utils/propertiesStore';
import { Property } from '@/types/property';

export async function addPropertyAction(formData: FormData) {
  const properties = await getProperties();
  const newProperty: Property = {
    id: 'p_' + Date.now(),
    name: formData.get('name') as string,
    code: (formData.get('code') as string) || undefined,
    city: formData.get('city') as string,
    bedrooms: Number(formData.get('bedrooms')) || 1,
    defaultPayout: Number(formData.get('defaultPayout')) || 150,
    active: formData.get('active') === 'true',
  };

  properties.push(newProperty);
  await saveProperties(properties);
  revalidatePath('/settings/properties');
}

export async function updatePropertyAction(id: string, formData: FormData) {
  const properties = await getProperties();
  const index = properties.findIndex((p) => p.id === id);

  if (index !== -1) {
    properties[index] = {
      ...properties[index],
      name: formData.get('name') as string,
      code: (formData.get('code') as string) || undefined,
      city: formData.get('city') as string,
      bedrooms: Number(formData.get('bedrooms')) || 1,
      defaultPayout: Number(formData.get('defaultPayout')) || 150,
      active: formData.get('active') === 'true',
    };
    await saveProperties(properties);
    revalidatePath('/settings/properties');
  }
}

export async function deletePropertyAction(id: string) {
  let properties = await getProperties();
  properties = properties.filter((p) => p.id !== id);
  await saveProperties(properties);
  revalidatePath('/settings/properties');
}