import React from 'react';

export function TableContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="border border-gray-200/80 rounded-xl bg-white overflow-hidden shadow-xs">
      <table className="w-full text-left text-xs">
        {children}
      </table>
    </div>
  );
}

export function THead({ children }: { children: React.ReactNode }) {
  return (
    <thead className="bg-gray-50/70 border-b border-gray-200/80 text-gray-600 font-medium">
      {children}
    </thead>
  );
}

export function TBody({ children }: { children: React.ReactNode }) {
  return (
    <tbody className="divide-y divide-gray-100 text-gray-800">
      {children}
    </tbody>
  );
}