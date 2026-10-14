'use server';

import { revalidatePath } from 'next/cache';
import { getProperties, saveProperties } from '@/utils/propertiesStore';
import { Property } from '@/types/property';

export async function addPropertyAction(formData: FormData) {
  const properties = await getProperties();

  const newProperty: Property = {
    id: crypto.randomUUID(),
    name: (formData.get('name') as string)?.trim() || 'New Property',
    code: (formData.get('code') as string)?.trim() || '',
    city: (formData.get('city') as string)?.trim() || 'N/A',
    bedrooms: Number(formData.get('bedrooms')) || 1,
    defaultPayout: Number(formData.get('defaultPayout')) || 0,
    active: formData.get('active') === 'true',
  };

  await saveProperties([...properties, newProperty]);
  revalidatePath('/settings');
}

export async function updatePropertyAction(id: string, formData: FormData) {
  const properties = await getProperties();

  const updatedProperties = properties.map((property) => {
    if (property.id !== id) return property;

    return {
      ...property,
      name: (formData.get('name') as string)?.trim() || property.name,
      code: (formData.get('code') as string)?.trim() ?? property.code,
      city: (formData.get('city') as string)?.trim() || property.city,
      bedrooms: Number(formData.get('bedrooms')) || property.bedrooms,
      defaultPayout: Number(formData.get('defaultPayout')) || property.defaultPayout,
      active: formData.get('active') === 'true',
    };
  });

  await saveProperties(updatedProperties);
  revalidatePath('/settings');
}

export async function deletePropertyAction(id: string) {
  const properties = await getProperties();
  const filteredProperties = properties.filter((property) => property.id !== id);

  await saveProperties(filteredProperties);
  revalidatePath('/settings');
}