'use client';

import Layout from '@/components/layout/Layout';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useState } from 'react';

export default function LessonDetailsPage() {
  const { lessonId } = useParams();
  const [summaryVisible, setSummaryVisible] = useState(false);

  // Mock data (لاحقًا تستبدل ببيانات فعلية من الـ backend)
  const lesson = {
    id: lessonId,
    title: 'Biology – Photosynthesis',
    uploadDate: 'October 20, 2025',
    fileType: 'PDF',
    fileSize: '2.4 MB',
    description:
      'An overview of the photosynthesis process, including light-dependent reactions, chlorophyll function, and energy conversion.',
    aiSummary:
      'Photosynthesis is a process by which green plants convert light energy into chemical energy stored in glucose. It occurs mainly in chloroplasts, involving two major phases: light reactions and the Calvin cycle.',
  };

  return (
    <Layout title={`Lesson Details – ${lesson.title}`}>
      <main className="max-w-5xl mx-auto py-10 px-6">
        {/* Header */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50 mb-2">
              {lesson.title}
            </h1>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Uploaded on {lesson.uploadDate} · {lesson.fileType} · {lesson.fileSize}
            </p>
          </div>

          <Link
            href="/lessons"
            className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            ← Back to My Lessons
          </Link>
        </div>

        {/* Description */}
        <div className="rounded-2xl bg-white dark:bg-zinc-900 p-6 shadow-lg border border-zinc-100 dark:border-zinc-800 mb-8">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 mb-2">
            Lesson Overview
          </h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
            {lesson.description}
          </p>
        </div>

        {/* AI Summary */}
        <div className="rounded-2xl bg-white dark:bg-zinc-900 p-6 shadow-lg border border-zinc-100 dark:border-zinc-800 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">AI Summary</h2>
            <button
              onClick={() => setSummaryVisible(!summaryVisible)}
              className="text-sm px-4 py-1.5 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium shadow hover:opacity-90 transition"
            >
              {summaryVisible ? 'Hide Summary' : 'Generate Summary'}
            </button>
          </div>

          {summaryVisible ? (
            <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
              {lesson.aiSummary}
            </p>
          ) : (
            <p className="text-sm text-zinc-500 italic dark:text-zinc-500">
              Click "Generate Summary" to view AI insights for this lesson.
            </p>
          )}
        </div>

        {/* Actions */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <Link
            href={`/chat/${lesson.id}`}
            className="rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 p-6 text-white shadow-lg hover:opacity-90 transition text-center"
          >
            <h3 className="text-lg font-semibold mb-2">Ask AI</h3>
            <p className="text-sm opacity-80">Chat with AI about this lesson’s content.</p>
          </Link>

          <Link
            href={`/flashcards/${lesson.id}`}
            className="rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-600 p-6 text-white shadow-lg hover:opacity-90 transition text-center"
          >
            <h3 className="text-lg font-semibold mb-2">Flashcards</h3>
            <p className="text-sm opacity-80">
              Review interactive flashcards generated from this lesson.
            </p>
          </Link>

          <button
            onClick={() => alert('📄 Download started!')}
            className="rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 p-6 text-white shadow-lg hover:opacity-90 transition text-center"
          >
            <h3 className="text-lg font-semibold mb-2">Download File</h3>
            <p className="text-sm opacity-80">Get your uploaded lesson file.</p>
          </button>
        </section>
      </main>
    </Layout>
  );
}
