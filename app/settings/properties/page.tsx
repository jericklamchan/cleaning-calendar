import { Suspense } from 'react';
import { getProperties } from '@/utils/propertyStore';
import PropertiesTable from '@/components/PropertiesTable';

async function PropertiesContent() {
  const properties = await getProperties();

  return (
    <div className="bg-white border border-gray-200/80 shadow-xs rounded-xl p-5 sm:p-6">
      <PropertiesTable initialProperties={properties} />
    </div>
  );
}

export default function PropertiesSettingsPage() {
  return (
    <Suspense>
      <PropertiesContent />
    </Suspense>
  );
}