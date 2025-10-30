'use client';

import Layout from '@/components/layout/Layout';
import Link from 'next/link';
import { useState } from 'react';

export default function DashboardPage() {
  const [stats] = useState({
    lessons: 8,
    flashcards: 42,
    chats: 12,
  });

  const recentLessons = [
    { id: 1, title: 'Biology - Photosynthesis', date: 'Oct 12, 2025' },
    { id: 2, title: 'Mathematics - Integrals', date: 'Oct 10, 2025' },
    { id: 3, title: 'History - WW2 Overview', date: 'Oct 9, 2025' },
  ];

  return (
    <Layout title="Dashboard">
      <main className="max-w-6xl mx-auto py-10 px-6">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50 mb-2">
            Welcome back 👋
          </h1>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Here’s an overview of your learning activity.
          </p>
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          <div className="rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-600 p-6 text-white shadow-lg">
            <h2 className="text-sm opacity-80 mb-1">Lessons</h2>
            <p className="text-3xl font-bold">{stats.lessons}</p>
          </div>
          <div className="rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 p-6 text-white shadow-lg">
            <h2 className="text-sm opacity-80 mb-1">Flashcards</h2>
            <p className="text-3xl font-bold">{stats.flashcards}</p>
          </div>
          <div className="rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 p-6 text-white shadow-lg">
            <h2 className="text-sm opacity-80 mb-1">AI Chats</h2>
            <p className="text-3xl font-bold">{stats.chats}</p>
          </div>
        </div>

        {/* Quick Actions */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 mb-4">
            Quick Actions
          </h2>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/lessons"
              className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-sm font-medium shadow hover:opacity-90 transition"
            >
              View Lessons
            </Link>
            <Link
              href="/flashcards"
              className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-medium shadow hover:opacity-90 transition"
            >
              Study Flashcards
            </Link>
            <Link
              href="/chat"
              className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 text-white text-sm font-medium shadow hover:opacity-90 transition"
            >
              Open AI Chat
            </Link>
          </div>
        </section>

        {/* Recent Lessons */}
        <section>
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 mb-4">
            Recent Lessons
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recentLessons.map((lesson) => (
              <div
                key={lesson.id}
                className="rounded-2xl bg-white dark:bg-zinc-900 p-6 shadow-lg border border-zinc-100 dark:border-zinc-800 hover:shadow-xl transition"
              >
                <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-50 mb-1">
                  {lesson.title}
                </h3>
                <p className="text-xs text-zinc-500 mb-3">{lesson.date}</p>
                <Link
                  href={`/lessons/${lesson.id}`}
                  className="inline-block w-full rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 py-2 text-sm text-white font-medium text-center hover:opacity-90 transition"
                >
                  Open Lesson
                </Link>
              </div>
            ))}
          </div>
        </section>
      </main>
    </Layout>
  );
}
