'use client';

import Layout from '@/components/layout/Layout';
import { useState } from 'react';
import Link from 'next/link';

export default function LessonsPage() {
  const [isDragging, setIsDragging] = useState(false);

  const uploadedLessons = [
    { id: 1, fileName: 'Biology - Chapter 3.pdf', uploadDate: 'March 15, 2024' },
    { id: 2, fileName: 'History - World War II.docx', uploadDate: 'March 14, 2024' },
    { id: 3, fileName: 'Mathematics - Calculus Notes.pdf', uploadDate: 'March 12, 2024' },
    { id: 4, fileName: 'Chemistry - Organic Compounds.txt', uploadDate: 'March 10, 2024' },
  ];

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    // TODO: Handle file upload
  };

  const handleFileSelect = () => {
    // TODO: Handle manual file selection
  };

  return (
    <Layout title="My Lessons">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-2">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          My Lessons
        </h1>
        <button className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-sm font-medium shadow hover:opacity-90 transition focus:ring-2 focus:ring-indigo-500 focus:outline-none">
          + Upload New Lesson
        </button>
      </div>
      <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-8">
        Upload your study materials and let AI help you learn faster.
      </p>

      {/* Upload Section */}
      <section className="rounded-2xl bg-white dark:bg-zinc-900 p-8 shadow-lg border border-zinc-100 dark:border-zinc-800 mb-10">
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`relative border-2 border-dashed rounded-xl p-12 text-center transition ${
            isDragging
              ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-950/20'
              : 'border-zinc-300 dark:border-zinc-700 hover:border-indigo-400 dark:hover:border-indigo-600'
          }`}
        >
          <input
            type="file"
            id="file-upload"
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            accept=".pdf,.docx,.txt"
            onChange={handleFileSelect}
            aria-label="Upload file"
          />

          <div className="mb-4 flex justify-center">
            <svg
              className="w-16 h-16 text-zinc-400 dark:text-zinc-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
          </div>

          <p className="text-lg font-medium text-zinc-900 dark:text-zinc-50 mb-2">
            Drop your study material here or click to upload
          </p>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            PDF, DOCX, or TXT files supported
          </p>
        </div>
      </section>

      {/* Lessons Grid */}
      <section>
        <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-4">
          Uploaded Lessons
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {uploadedLessons.map((lesson) => (
            <div
              key={lesson.id}
              className="rounded-2xl bg-white dark:bg-zinc-900 p-6 shadow-lg border border-zinc-100 dark:border-zinc-800 hover:shadow-xl transition"
            >
              <div className="mb-4">
                <svg
                  className="w-10 h-10 text-indigo-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>

              <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-50 mb-1 line-clamp-2">
                {lesson.fileName}
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-500 mb-4">{lesson.uploadDate}</p>

              <div className="space-y-2">
                <Link
                  href={`/lessons/${lesson.id}`}
                  className="block w-full rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 py-2 text-sm font-medium text-white shadow hover:opacity-90 transition"
                >
                  View Details
                </Link>
                <div className="grid grid-cols-3 gap-2">
                  <button className="rounded-lg border border-zinc-300 dark:border-zinc-700 py-2 text-xs font-medium text-zinc-800 dark:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition">
                    Summarize
                  </button>
                  <Link
                    href={`/flashcards/${lesson.id}`}
                    className="rounded-lg border border-zinc-300 dark:border-zinc-700 py-2 text-xs font-medium text-center text-zinc-800 dark:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
                  >
                    Flashcards
                  </Link>
                  <Link
                    href={`/chat/${lesson.id}`}
                    className="rounded-lg border border-zinc-300 dark:border-zinc-700 py-2 text-xs font-medium text-center text-zinc-800 dark:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
                  >
                    Ask AI
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
}
