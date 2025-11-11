'use client';

import Link from 'next/link';
import Layout from '@/components/layout/Layout';
import LessonCard from '@/components/common/LessonCard';

interface DashboardStat {
  label: string;
  value: string;
  description: string;
}

interface DashboardLesson {
  id: number;
  title: string;
  uploadDate: string;
}

const stats: DashboardStat[] = [
  { label: 'Total Lessons', value: '12', description: 'Lessons organized and summarized' },
  { label: 'Total Flashcards', value: '146', description: 'Generated for spaced review' },
  { label: 'AI Chats', value: '58', description: 'Smart explanations requested' },
];

const recentLessons: DashboardLesson[] = [
  { id: 1, title: 'Biology - Chapter 3', uploadDate: 'Nov 5, 2025' },
  { id: 2, title: 'History - World War II', uploadDate: 'Nov 3, 2025' },
  { id: 3, title: 'Chemistry - Organic Compounds', uploadDate: 'Oct 29, 2025' },
];

export default function DashboardPage() {
  return (
    <Layout title="Dashboard">
      <div className="space-y-10">
        <section className="rounded-3xl border border-zinc-200 bg-white p-8 dark:border-zinc-800 dark:bg-zinc-900">
          <p className="text-sm font-semibold uppercase tracking-wide text-indigo-600 dark:text-indigo-400">
            Learnify overview
          </p>
          <h1 className="mt-3 text-3xl font-bold text-zinc-900 dark:text-zinc-50">
            Welcome back, Ziad 👋
          </h1>
          <p className="mt-4 max-w-2xl text-base text-zinc-600 dark:text-zinc-400">
            Here’s a quick snapshot of how your study sessions are progressing. Continue a lesson,
            review flashcards, or ask the AI tutor to clarify anything you’re stuck on.
          </p>
        </section>

        <section className="grid gap-6 md:grid-cols-3">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-3xl bg-gradient-to-r from-blue-500 to-indigo-600 p-6 text-white shadow-lg shadow-blue-500/30"
            >
              <p className="text-sm font-semibold uppercase tracking-wide opacity-80">{stat.label}</p>
              <p className="mt-4 text-4xl font-bold">{stat.value}</p>
              <p className="mt-3 text-sm opacity-80">{stat.description}</p>
            </div>
          ))}
        </section>

        <section className="space-y-6">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">Recent Lessons</h2>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Pick up the most recent uploads or jump into a different chapter.
              </p>
            </div>
            <Link href="/lessons" className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">
              View all →
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {recentLessons.map((lesson) => (
              <LessonCard
                key={lesson.id}
                title={lesson.title}
                description="AI notes, flashcards, and chat history are ready to continue."
                meta={`Uploaded • ${lesson.uploadDate}`}
                badge="Recent"
              />
            ))}
          </div>
        </section>
      </div>
    </Layout>
  );
}
