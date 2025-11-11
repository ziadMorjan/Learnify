'use client';

import Layout from '@/components/layout/Layout';
import LessonCard from '@/components/common/LessonCard';
import ActionButton from '@/components/common/ActionButton';
import EmptyState from '@/components/common/EmptyState';

const chatEnabledLessons = [
  {
    id: 1,
    title: 'Biology - Chapter 3',
    description: 'Reviewing chloroplast structure and the Calvin cycle.',
    lastMessage: 'Can you explain how ATP synthase works?',
    updatedAt: '2 hours ago',
  },
  {
    id: 2,
    title: 'History - WW II Overview',
    description: 'Allied strategy, key battles, and post-war recovery.',
    lastMessage: 'Summarize the causes of the war.',
    updatedAt: 'Yesterday',
  },
  {
    id: 3,
    title: 'Mathematics - Calculus Notes',
    description: 'Chain rule practice questions and derivatives.',
    lastMessage: 'What is the chain rule again?',
    updatedAt: '3 days ago',
  },
];

export default function ChatPage() {
  return (
    <Layout title="AI Chat">
      <div className="space-y-8">
        <header className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Chat through your lessons
          </h1>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Pick a lesson with AI chat enabled to keep the conversation going where you left off.
          </p>
        </header>

        {chatEnabledLessons.length ? (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {chatEnabledLessons.map((lesson) => (
              <LessonCard
                key={lesson.id}
                title={lesson.title}
                description={lesson.description}
                meta={`Last reply - ${lesson.updatedAt}`}
                actions={
                  <>
                    <ActionButton
                      href={{
                        pathname: `/chat/${lesson.id}`,
                      }}
                      fullWidth
                    >
                      Open chat
                    </ActionButton>
                    <p className="text-xs text-zinc-500 dark:text-zinc-500">
                      &ldquo;{lesson.lastMessage}&rdquo;
                    </p>
                  </>
                }
                badge="AI chat"
              />
            ))}
          </div>
        ) : (
          <EmptyState
            title="No active chats yet"
            message="Upload a lesson to unlock AI chat and ask questions in real time."
            actionLabel="Upload a lesson"
            actionHref="/lessons"
          />
        )}
      </div>
    </Layout>
  );
}
