'use client';

import Link from 'next/link';
import React from 'react';
import { cn } from '@/lib/utils';

type ButtonElementProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

interface BaseProps {
  children: React.ReactNode;
  className?: string;
  fullWidth?: boolean;
  icon?: React.ReactNode;
  layout?: 'inline' | 'tile';
}

type LinkLikeProps = BaseProps & Omit<React.ComponentProps<typeof Link>, 'children'>;
type ButtonLikeProps = BaseProps & ButtonElementProps & { href?: undefined };

type ActionButtonProps = LinkLikeProps | ButtonLikeProps;

const baseStyles =
  'inline-flex gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/30 hover:translate-y-0.5 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-zinc-900 disabled:cursor-not-allowed disabled:opacity-60';

const layoutStyles: Record<NonNullable<BaseProps['layout']>, string> = {
  inline: 'items-center justify-center',
  tile: 'w-full min-h-[140px] flex-col items-start justify-between text-left leading-snug rounded-2xl px-6 py-5',
};

const renderContent = (
  icon: React.ReactNode,
  layout: NonNullable<BaseProps['layout']>,
  children: React.ReactNode,
) => (
  <>
    {icon && <span className="text-lg">{icon}</span>}
    <span className={layout === 'tile' ? 'text-base font-semibold' : undefined}>{children}</span>
  </>
);

export default function ActionButton(props: ActionButtonProps) {
  if ('href' in props && props.href) {
    const { href, className, fullWidth, icon, layout = 'inline', children, ...linkProps } = props as LinkLikeProps;
    const classes = cn(baseStyles, layoutStyles[layout], fullWidth && 'w-full', className);
    return (
      <Link href={href} {...linkProps} className={classes}>
        {renderContent(icon, layout, children)}
      </Link>
    );
  }

  const { className, fullWidth, icon, layout = 'inline', children, type, ...buttonProps } = props as ButtonLikeProps;
  const classes = cn(baseStyles, layoutStyles[layout], fullWidth && 'w-full', className);

  return (
    <button type={type ?? 'button'} {...buttonProps} className={classes}>
      {renderContent(icon, layout, children)}
    </button>
  );
}
