'use client';

import Layout from '@/components/layout/Layout';
import LessonCard from '@/components/common/LessonCard';
import ActionButton from '@/components/common/ActionButton';
import EmptyState from '@/components/common/EmptyState';

const flashcardLessons = [
  {
    id: 1,
    title: 'Biology - Chapter 3',
    description: '10 spaced-repetition flashcards generated from your lesson.',
  },
  {
    id: 2,
    title: 'Mathematics - Calculus Notes',
    description: '8 flashcards ready for quick practice.',
  },
  {
    id: 3,
    title: 'History - World War II',
    description: '12 flashcards highlighting key events and timelines.',
  },
];

export default function FlashcardsPage() {
  return (
    <Layout title="Flashcards">
      <div className="space-y-8">
        <header className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Study flashcards
          </h1>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Every lesson can generate flashcards instantly. Pick one to keep practicing.
          </p>
        </header>

        {flashcardLessons.length ? (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {flashcardLessons.map((lesson) => (
              <LessonCard
                key={lesson.id}
                title={lesson.title}
                description={lesson.description}
                badge="Flashcards"
                actions={
                  <ActionButton
                    href={{
                      pathname: `/flashcards/${lesson.id}`,
                    }}
                    fullWidth
                  >
                    View flashcards
                  </ActionButton>
                }
              />
            ))}
          </div>
        ) : (
          <EmptyState
            title="You have not generated flashcards yet"
            message="Upload a lesson and tap Generate Flashcards to create your first deck."
            actionLabel="Upload a lesson"
            actionHref="/lessons"
          />
        )}
      </div>
    </Layout>
  );
}
