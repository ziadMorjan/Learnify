'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/components/theme/ThemeProvider';

const lessonNames: Record<string, string> = {
  '1': 'Biology - Chapter 3',
  '2': 'History - World War II',
  '3': 'Mathematics - Calculus Notes',
  '4': 'Chemistry - Organic Compounds',
};

interface LayoutProps {
  title: string;
  children: React.ReactNode;
}

export default function Layout({ title, children }: LayoutProps) {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const user = {
    name: 'Ziad Morjan',
    image: '',
  };

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    document.documentElement.style.colorScheme = theme;
  }, [theme]);

  const pathSegments = useMemo(() => pathname.split('/').filter(Boolean), [pathname]);

  const breadcrumbs = useMemo(
    () =>
      pathSegments.map((segment, index) => {
        const href = '/' + pathSegments.slice(0, index + 1).join('/');
        const isLast = index === pathSegments.length - 1;
        const displayName =
          lessonNames[segment] ||
          segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ');

        return isLast ? (
          <span key={href} className="font-medium text-indigo-600 dark:text-indigo-400">
            {displayName}
          </span>
        ) : (
          <Link
            key={href}
            href={{ pathname: href }}
            className="text-zinc-500 dark:text-zinc-400 hover:text-indigo-500"
          >
            {displayName}
          </Link>
        );
      }),
    [pathSegments]
  );

  const navItems = [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'My Lessons', href: '/lessons' },
    { name: 'Flashcards', href: '/flashcards' },
    { name: 'AI Chat', href: '/chat' },
    { name: 'Profile', href: '/profile' },
    { name: 'Settings', href: '/settings' },
  ];

  return (
    <div className="flex min-h-screen bg-zinc-50 text-zinc-900 dark:bg-black dark:text-zinc-50">
      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-800 z-50 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
      >
        <div className="p-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-indigo-600">Learnify</h1>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden p-2 rounded-lg"
            aria-label="Close sidebar"
          >
            <svg
              className="w-5 h-5 text-zinc-700 dark:text-zinc-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <nav className="px-4 space-y-2">
          {navItems.map((item) => {
            const isActive = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={{ pathname: item.href }}
                onClick={() => setIsSidebarOpen(false)}
                className={`block px-4 py-2.5 rounded-lg text-sm font-medium ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white'
                    : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col lg:ml-64">
        {/* Topbar */}
        <header className="sticky top-0 z-30 bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Mobile sidebar toggle */}
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg"
              aria-label="Open sidebar"
            >
              <svg
                className="w-6 h-6 text-zinc-700 dark:text-zinc-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>

            <div>
              <h1 className="text-xl font-semibold tracking-tight">{title}</h1>
              <nav className="text-sm mt-1 text-zinc-500 dark:text-zinc-400 flex flex-wrap items-center gap-1">
                <Link href={{ pathname: '/dashboard' }}>Home</Link>
                {breadcrumbs.length > 0 && <span className="mx-1 text-zinc-400">/</span>}
                {breadcrumbs.map((crumb, index) => (
                  <span key={index} className="flex items-center gap-1">
                    {crumb}
                    {index < breadcrumbs.length - 1 && (
                      <span className="mx-1 text-zinc-400">/</span>
                    )}
                  </span>
                ))}
              </nav>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-200 bg-white text-zinc-700 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200"
              aria-label="Toggle theme"
              aria-pressed={theme === 'dark'}
            >
              <span className="sr-only">Switch color theme</span>
              {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            </button>

            {user.image ? (
              <img
                src={user.image}
                alt={user.name}
                className="w-9 h-9 rounded-full border border-zinc-300 dark:border-zinc-700 object-cover"
              />
            ) : (
              <div className="w-9 h-9 flex items-center justify-center rounded-full bg-indigo-600 text-white font-semibold">
                {user.name.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 p-6 lg:p-10">{children}</div>
      </main>
    </div>
  );
}
