'use client';

import type React from 'react';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
}

export default function Layout({ children, title }: LayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { name: 'Dashboard', href: '/dashboard', icon: '📊' },
    { name: 'My Lessons', href: '/lessons', icon: '📚' },
    { name: 'Flashcards', href: '/flashcards', icon: '🎴' },
    { name: 'AI Chat', href: '/chat', icon: '💬' },
    { name: 'Profile', href: '/profile', icon: '👤' },
    { name: 'Settings', href: '/settings', icon: '⚙️' },
  ];

  const isActive = (href: string) => {
    if (href === '/dashboard') return pathname === href;
    return pathname.startsWith(href);
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      {/* Mobile sidebar overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-800 z-50 transform transition-transform duration-300 lg:translate-x-0 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-6">
          <Link href="/dashboard">
            <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 cursor-pointer hover:text-indigo-600 dark:hover:text-indigo-400 transition">
              Learnify
            </h2>
          </Link>
        </div>

        <nav className="px-4 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setIsSidebarOpen(false)}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition ${
                isActive(item.href)
                  ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md'
                  : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800'
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-zinc-200 dark:border-zinc-800">
          <button
            className="w-full px-4 py-2.5 rounded-lg text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            aria-label="Logout"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="lg:ml-64">
        {/* Topbar */}
        <header className="sticky top-0 z-30 bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 px-4 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* Mobile menu button */}
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="lg:hidden p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                aria-label="Toggle sidebar"
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
                <h1 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
                  {title || 'Learnify Dashboard'}
                </h1>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Light/Dark mode toggle */}
              <button
                className="p-2 rounded-lg border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                aria-label="Toggle theme"
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
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  />
                </svg>
              </button>

              {/* User avatar */}
              <Link
                href="/profile"
                className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white font-semibold text-sm shadow-md hover:opacity-90 transition focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                aria-label="User profile"
              >
                Z
              </Link>
            </div>
          </div>
        </header>

        {/* Main content area */}
        <main className="p-4 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
