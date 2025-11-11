'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LandingPage() {
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in
    const user = localStorage.getItem('learnify_user');
    if (user) {
      router.push('/dashboard');
    }
  }, [router]);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50 dark:from-zinc-950 dark:via-zinc-900 dark:to-black text-center px-6">
      <div className="max-w-3xl">
        <h1 className="text-5xl font-bold text-zinc-900 dark:text-zinc-50 mb-6 leading-tight">
          Welcome to{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-600 hover:to-blue-700">
            Learnify
          </span>
        </h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-10 leading-relaxed">
          Learn smarter with AI-powered flashcards, chat, and lesson summaries — all in one
          personalized learning platform.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/login"
            className="w-40 text-center rounded-lg bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-600 hover:to-blue-700 text-white py-3 font-medium shadow hover:opacity-90"
          >
            Login
          </Link>
          <Link
            href="/register"
            className="w-40 text-center rounded-lg border border-zinc-300 dark:border-zinc-700 text-zinc-800 dark:text-zinc-100 py-3 font-medium hover:bg-zinc-100 dark:hover:bg-zinc-800"
          >
            Get Started
          </Link>
        </div>

        <div className="mt-12 text-sm text-zinc-500 dark:text-zinc-400">
          Developed by{' '}
          <span className="text-indigo-600 dark:text-indigo-400 font-medium">Ziad Morjan</span> —
          2025 © Learnify
        </div>
      </div>
    </main>
  );
}
