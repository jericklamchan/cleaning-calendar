import { Suspense } from 'react';
import { getCleaners } from '@/utils/cleanersStore';
import CleanersTable from '@/components/CleanersTable';

async function CleanersContent() {
  const cleaners = await getCleaners();

  return (
    <div className="bg-white border border-gray-200/80 shadow-xs rounded-xl p-5 sm:p-6">
      <CleanersTable initialCleaners={cleaners} />
    </div>
  );
}

export default function CleanersSettingsPage() {
  return (
    <Suspense>
      <CleanersContent />
    </Suspense>
  );
}