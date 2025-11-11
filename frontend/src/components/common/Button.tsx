'use client';
import React from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  loading?: boolean;
}

export default function Button({
  children,
  variant = 'primary',
  loading,
  className,
  ...props
}: ButtonProps) {
  const base =
    'inline-flex items-center justify-center rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50';
  const variants = {
    primary: 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:opacity-90',
    secondary: 'bg-zinc-800 text-white hover:bg-zinc-700 dark:bg-zinc-200 dark:text-black',
    outline:
      'border border-zinc-300 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800',
  };

  return (
    <button className={cn(base, variants[variant], className)} disabled={loading} {...props}>
      {loading ? (
        <span className="rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2" />
      ) : null}
      {children}
    </button>
  );
}
