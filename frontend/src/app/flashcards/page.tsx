'use client';

import Layout from '@/components/layout/Layout';
import Link from 'next/link';

const lessons = [
  { id: 1, title: 'Biology – Chapter 3', count: 12 },
  { id: 2, title: 'History – World War II', count: 8 },
  { id: 3, title: 'Mathematics – Calculus', count: 10 },
];

export default function FlashcardsListPage() {
  return (
    <Layout title="Flashcards">
      <main className="max-w-5xl mx-auto py-10 px-6">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50 mb-6">
          Flashcards by Lesson
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {lessons.map((lesson) => (
            <div
              key={lesson.id}
              className="rounded-2xl bg-white dark:bg-zinc-900 p-6 shadow-lg border border-zinc-100 dark:border-zinc-800 hover:shadow-xl transition"
            >
              <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 mb-2">
                {lesson.title}
              </h2>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
                {lesson.count} flashcards available
              </p>
              <Link
                href={`/flashcards/${lesson.id}`}
                className="inline-block w-full rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-center py-2.5 text-sm font-medium hover:opacity-90 transition"
              >
                View Flashcards
              </Link>
            </div>
          ))}
        </div>
      </main>
    </Layout>
  );
}
