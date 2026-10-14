import { Suspense } from 'react';
import { getUsers } from '@/utils/usersStore';
import UsersTable from '@/components/UsersTable';

async function UsersContent() {
  const users = await getUsers();

  return (
    <div className="bg-white border border-gray-200/80 shadow-xs rounded-xl p-5 sm:p-6">
      <UsersTable initialUsers={users} />
    </div>
  );
}

export default function UsersSettingsPage() {
  return (
    <Suspense>
      <UsersContent />
    </Suspense>
  );
}