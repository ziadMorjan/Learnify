'use client';

import Layout from '@/components/layout/Layout';
import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

interface Flashcard {
  id: number;
  question: string;
  answer: string;
}

export default function LessonFlashcardsPage() {
  const { lessonId } = useParams();
  const [current, setCurrent] = useState(0);
  const [flipped, setFlipped] = useState(false);

  // Dummy flashcards for the lesson
  const flashcards: Flashcard[] = [
    {
      id: 1,
      question: 'Define photosynthesis.',
      answer:
        'The process by which green plants use sunlight to synthesize foods from CO₂ and water.',
    },
    {
      id: 2,
      question: 'What is chlorophyll?',
      answer: 'A green pigment found in plants that absorbs light energy for photosynthesis.',
    },
    {
      id: 3,
      question: 'What are stomata?',
      answer: 'Tiny pores on plant leaves that allow gas exchange.',
    },
  ];

  const handleFlip = () => setFlipped(!flipped);
  const nextCard = () => {
    setFlipped(false);
    setCurrent((prev) => (prev + 1) % flashcards.length);
  };
  const prevCard = () => {
    setFlipped(false);
    setCurrent((prev) => (prev === 0 ? flashcards.length - 1 : prev - 1));
  };

  return (
    <Layout title={`Flashcards – Lesson ${lessonId}`}>
      <main className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)] bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-100 dark:border-zinc-800 shadow-lg p-8">
        <div className="w-full max-w-lg mb-8">
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-2">
            Lesson {lessonId} Flashcards
          </h1>
          <Link
            href="/flashcards"
            className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            ← Back to all flashcards
          </Link>
        </div>

        <div
          onClick={handleFlip}
          className="w-full max-w-lg h-64 flex items-center justify-center rounded-2xl cursor-pointer transition-transform duration-500 relative"
        >
          {/* Front */}
          <div
            className={`absolute w-full h-full flex items-center justify-center rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-lg font-medium ${
              flipped ? 'hidden' : ''
            }`}
          >
            {flashcards[current].question}
          </div>

          {/* Back */}
          <div
            className={`absolute w-full h-full flex items-center justify-center rounded-2xl bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 text-lg font-medium ${
              flipped ? '' : 'hidden'
            }`}
          >
            {flashcards[current].answer}
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4 mt-10">
          <button
            onClick={prevCard}
            className="px-4 py-2 rounded-lg bg-zinc-200 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 font-medium hover:bg-zinc-300 dark:hover:bg-zinc-700 transition"
          >
            ← Previous
          </button>

          <button
            onClick={nextCard}
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium shadow hover:opacity-90 transition"
          >
            Next →
          </button>
        </div>

        <p className="mt-6 text-sm text-zinc-500 dark:text-zinc-400">
          Card {current + 1} of {flashcards.length}
        </p>
      </main>
    </Layout>
  );
}
