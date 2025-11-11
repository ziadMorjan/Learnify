'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface SectionCardProps {
  title?: string;
  description?: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
}

export default function SectionCard({
  title,
  description,
  actions,
  children,
  className,
  contentClassName,
}: SectionCardProps) {
  const hasHeader = title || description || actions;

  return (
    <section
      className={cn(
        'rounded-2xl border border-zinc-100 bg-white p-6 shadow-lg shadow-zinc-200/60 hover:shadow-xl dark:border-zinc-800 dark:bg-zinc-900 dark:shadow-black/30',
        className
      )}
    >
      {hasHeader && (
        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
          <div>
            {title && (
              <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">{title}</h2>
            )}
            {description && (
              <p className="text-sm text-zinc-600 dark:text-zinc-400">{description}</p>
            )}
          </div>
          {actions && <div className="flex items-center gap-3">{actions}</div>}
        </div>
      )}

      <div className={cn(hasHeader ? 'mt-6' : undefined, contentClassName)}>{children}</div>
    </section>
  );
}
