'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Layout from '@/components/layout/Layout';
import SectionCard from '@/components/common/SectionCard';
import ActionButton from '@/components/common/ActionButton';
import EmptyState from '@/components/common/EmptyState';

interface Flashcard {
  id: number;
  question: string;
  answer: string;
}

export default function LessonFlashcardsPage() {
  const { lessonId } = useParams();
  const [current, setCurrent] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const flashcards: Flashcard[] = [
    {
      id: 1,
      question: 'Define photosynthesis.',
      answer: 'A process where plants convert sunlight, water, and CO2 into glucose and oxygen.',
    },
    {
      id: 2,
      question: 'What is chlorophyll?',
      answer: 'The green pigment in chloroplasts that absorbs light energy for photosynthesis.',
    },
    {
      id: 3,
      question: 'What are stomata?',
      answer: 'Tiny pores on leaves that regulate gas exchange and water vapor.',
    },
  ];

  const hasFlashcards = flashcards.length > 0;

  const handleFlip = () => setFlipped((prev) => !prev);
  const nextCard = () => {
    setFlipped(false);
    setCurrent((prev) => (prev + 1) % flashcards.length);
  };
  const prevCard = () => {
    setFlipped(false);
    setCurrent((prev) => (prev === 0 ? flashcards.length - 1 : prev - 1));
  };

  if (!hasFlashcards) {
    return (
      <Layout title="Flashcards">
        <EmptyState
          title="No flashcards yet"
          message="Generate flashcards for this lesson to start practicing key concepts."
          actionLabel="Generate flashcards"
          onAction={() => alert('Generating flashcards...')}
        />
      </Layout>
    );
  }

  return (
    <Layout title="Flashcards">
      <div className="space-y-8">
        <SectionCard
          title={`Lesson ${lessonId}`}
          description="Flip through each card to test yourself. Learnify tracks progress across sessions."
        >
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Deck size: {flashcards.length} cards - Currently viewing card {current + 1}
          </p>
        </SectionCard>

        <SectionCard contentClassName="flex flex-col items-center gap-8">
          <div
            onClick={handleFlip}
            className={`flex h-72 w-full max-w-xl cursor-pointer items-center justify-center rounded-2xl border text-center text-lg font-semibold shadow-xl ${
              flipped
                ? 'border-zinc-100 bg-white text-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100'
                : 'border-transparent bg-gradient-to-r from-blue-500 to-indigo-600 text-white'
            }`}
          >
            <p className="px-10">
              {flipped ? flashcards[current].answer : flashcards[current].question}
            </p>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={prevCard}
              className="rounded-xl border border-zinc-200 px-5 py-2 text-sm font-semibold text-zinc-800 hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-100 dark:hover:bg-zinc-800"
            >
              Previous
            </button>
            <ActionButton onClick={nextCard}>Next card</ActionButton>
          </div>

          <p className="text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-500">
            Card {current + 1} of {flashcards.length}
          </p>
        </SectionCard>
      </div>
    </Layout>
  );
}
