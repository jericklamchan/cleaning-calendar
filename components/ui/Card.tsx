import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export function Card({ children, className = '' }: CardProps) {
  return (
    <div className={`border border-gray-200/80 rounded-xl bg-white p-5 shadow-xs ${className}`}>
      {children}
    </div>
  );
}