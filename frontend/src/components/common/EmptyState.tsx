'use client';

import ActionButton from './ActionButton';

interface EmptyStateProps {
  title: string;
  message: string;
  actionLabel?: string;
  actionHref?: string;
  onAction?: () => void;
}

export default function EmptyState({
  title,
  message,
  actionLabel,
  actionHref,
  onAction,
}: EmptyStateProps) {
  return (
    <div className="rounded-2xl border border-dashed border-zinc-300 bg-white/60 px-10 py-16 text-center shadow-inner dark:border-zinc-700 dark:bg-zinc-900/60">
      <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">{title}</h2>
      <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">{message}</p>

      {actionLabel && (
        <div className="mt-8 flex justify-center">
          {actionHref ? (
            <ActionButton href={{ pathname: actionHref }}>{actionLabel}</ActionButton>
          ) : (
            <ActionButton onClick={onAction}>{actionLabel}</ActionButton>
          )}
        </div>
      )}
    </div>
  );
}
