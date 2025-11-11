'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface LessonCardProps {
  title: string;
  description: string;
  meta?: string;
  badge?: string;
  actions?: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}

export default function LessonCard({
  title,
  description,
  meta,
  badge,
  actions,
  footer,
  className,
}: LessonCardProps) {
  return (
    <article
      className={cn(
        'flex h-full flex-col rounded-2xl border border-zinc-100 bg-white p-6 shadow-lg shadow-zinc-200/60 hover:shadow-xl dark:border-zinc-800 dark:bg-zinc-900 dark:shadow-black/30',
        className
      )}
    >
      <div className="flex-1">
        <div className="mb-3 flex items-start justify-between gap-3">
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">{title}</h3>
          {badge && (
            <span className="rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-indigo-600 dark:border-indigo-800/60 dark:bg-indigo-950/40 dark:text-indigo-300">
              {badge}
            </span>
          )}
        </div>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">{description}</p>
        {meta && (
          <p className="mt-4 text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-500">
            {meta}
          </p>
        )}
      </div>

      {actions && <div className="mt-6 flex flex-col gap-3">{actions}</div>}
      {footer && <div className="mt-4 text-xs text-zinc-500 dark:text-zinc-500">{footer}</div>}
    </article>
  );
}
