'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const settingsTabs = [
  { name: 'Global', href: '/settings' },
  { name: 'Cleaners', href: '/settings/cleaners' },
  { name: 'Properties', href: '/settings/properties' },
  { name: 'Users', href: '/settings/users' },
];

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="space-y-5">
      {/* Page Header */}
      <div>
        <h1 className="text-xl font-semibold tracking-tight text-gray-900">Settings</h1>
        <p className="text-xs text-gray-500 mt-0.5">
          Manage global configurations, operational preferences, and system access.
        </p>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-6">
          {settingsTabs.map((tab) => {
            const isActive = pathname === tab.href;
            return (
              <Link
                key={tab.name}
                href={tab.href}
                className={`whitespace-nowrap pb-2.5 px-0.5 border-b-2 text-xs font-medium transition-colors ${
                  isActive
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.name}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Child Tab Content */}
      <div>{children}</div>
    </div>
  );
}