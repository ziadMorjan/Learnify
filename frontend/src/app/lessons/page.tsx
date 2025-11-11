'use client';

import { useState } from 'react';
import Layout from '@/components/layout/Layout';
import SectionCard from '@/components/common/SectionCard';
import ActionButton from '@/components/common/ActionButton';
import LessonCard from '@/components/common/LessonCard';
import EmptyState from '@/components/common/EmptyState';

export default function LessonsPage() {
  const [isDragging, setIsDragging] = useState(false);

  const uploadedLessons = [
    {
      id: 1,
      title: 'Biology - Chapter 3',
      description: 'Light-dependent reactions, chlorophyll, and ATP synthesis.',
      uploadDate: 'March 15, 2024',
    },
    {
      id: 2,
      title: 'History - World War II',
      description: 'Causes of the war, key battles, and post-war reconstruction.',
      uploadDate: 'March 14, 2024',
    },
    {
      id: 3,
      title: 'Mathematics - Calculus Notes',
      description: 'Chain rule, derivatives, and optimization problems.',
      uploadDate: 'March 12, 2024',
    },
    {
      id: 4,
      title: 'Chemistry - Organic Compounds',
      description: 'Functional groups, reactions, and laboratory notes.',
      uploadDate: 'March 10, 2024',
    },
  ];

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);
  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    setIsDragging(false);
  };

  const handleFileSelect = () => {
    // TODO: upload logic
  };

  return (
    <Layout title="My Lessons">
      <div className="space-y-10">
        <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
              My Lessons
            </h1>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Upload your study materials and let Learnify summarize, quiz, and chat through them.
            </p>
          </div>
          <ActionButton onClick={() => alert('Upload flow coming soon!')}>
            + Upload Lesson
          </ActionButton>
        </header>

        <SectionCard
          title="Upload new lesson"
          description="Drop files into the zone or browse to import from your computer. PDF, DOCX, or TXT supported."
        >
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`relative flex flex-col items-center justify-center rounded-2xl border-2 border-dashed px-8 py-14 text-center ${
              isDragging
                ? 'border-indigo-500 bg-indigo-50 dark:border-indigo-300 dark:bg-indigo-950/30'
                : 'border-zinc-300 dark:border-zinc-700 hover:border-indigo-400 dark:hover:border-indigo-500'
            }`}
          >
            <input
              type="file"
              className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
              accept=".pdf,.docx,.txt"
              onChange={handleFileSelect}
              aria-label="Upload a lesson"
            />

            <svg
              className="mb-6 h-16 w-16 text-indigo-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M3 15a4 4 0 01.88-7.903 5 5 0 119.097-1.664A4 4 0 1115 15m-3-3l-3 3m3-3l3 3m-3-3v9"
              />
            </svg>
            <p className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
              Drop your lesson here
            </p>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              or click to browse from your device
            </p>
          </div>
        </SectionCard>

        {uploadedLessons.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {uploadedLessons.map((lesson) => (
              <LessonCard
                key={lesson.id}
                title={lesson.title}
                description={lesson.description}
                meta={`Uploaded ${lesson.uploadDate}`}
                actions={
                  <>
                    <ActionButton
                      href={{
                        pathname: `/lessons/${lesson.id}`,
                      }}
                      fullWidth
                    >
                      View Lesson
                    </ActionButton>
                    <div className="grid grid-cols-3 gap-2">
                      <button className="rounded-xl border border-zinc-200 px-3 py-2 text-xs font-semibold text-zinc-800 hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-100 dark:hover:bg-zinc-800">
                        Summaries
                      </button>
                      <button className="rounded-xl border border-zinc-200 px-3 py-2 text-xs font-semibold text-zinc-800 hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-100 dark:hover:bg-zinc-800">
                        Download
                      </button>
                      <button className="rounded-xl border border-zinc-200 px-3 py-2 text-xs font-semibold text-zinc-800 hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-100 dark:hover:bg-zinc-800">
                        Share
                      </button>
                    </div>
                  </>
                }
                footer={
                  <div className="flex justify-between">
                    <span>Flashcards ready</span>
                    <span className="text-indigo-500">AI chat enabled</span>
                  </div>
                }
              />
            ))}
          </div>
        ) : (
          <EmptyState
            title="No lessons uploaded yet"
            message="Once you upload a lesson, Learnify will summarize it, build flashcards, and unlock AI chat."
            actionLabel="Upload your first lesson"
            onAction={() => alert('Upload flow coming soon!')}
          />
        )}
      </div>
    </Layout>
  );
}
