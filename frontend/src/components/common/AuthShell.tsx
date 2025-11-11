'use client';

import React from 'react';

interface AuthShellProps {
  title: string;
  description: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  linkSlot?: React.ReactNode;
}

export default function AuthShell({
  title,
  description,
  children,
  footer,
  linkSlot,
}: AuthShellProps) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-zinc-50 to-white px-4 dark:from-black dark:to-zinc-950">
      <section className="w-full max-w-md rounded-3xl border border-zinc-100 bg-white/90 p-8 shadow-2xl shadow-indigo-500/10 backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/80">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">{title}</h1>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">{description}</p>
        </div>

        {children}

        {linkSlot && (
          <div className="mt-4 text-right text-sm text-indigo-600 dark:text-indigo-400">
            {linkSlot}
          </div>
        )}
        {footer && (
          <div className="mt-6 text-center text-sm text-zinc-600 dark:text-zinc-400">{footer}</div>
        )}
      </section>
    </main>
  );
}
