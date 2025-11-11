'use client';

import Layout from '@/components/layout/Layout';
import LessonCard from '@/components/common/LessonCard';
import EmptyState from '@/components/common/EmptyState';
import ActionButton from '@/components/common/ActionButton';

export default function DashboardPage() {
  const lessons = [
    {
      id: 1,
      title: 'Introduction to React',
      description: 'Learn the fundamentals of React and component-based architecture.',
    },
    {
      id: 2,
      title: 'Advanced TypeScript',
      description: 'Master advanced TypeScript patterns and type systems.',
    },
    {
      id: 3,
      title: 'Next.js App Router',
      description: 'Build modern web applications with Next.js 14 and the App Router.',
    },
  ];

  return (
    <Layout title="Dashboard">
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            My Lessons
          </h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Continue your learning journey with AI-powered lessons.
          </p>
        </div>

        {lessons.length ? (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {lessons.map((lesson) => (
              <LessonCard
                key={lesson.id}
                title={lesson.title}
                description={lesson.description}
                actions={
                  <ActionButton
                    href={{
                      pathname: `lessons/${lesson.id}`,
                    }}
                    fullWidth
                  >
                    Open lesson
                  </ActionButton>
                }
              />
            ))}
          </div>
        ) : (
          <EmptyState
            title="No lessons found"
            message="You haven't uploaded or enrolled in any lessons yet."
            actionLabel="Upload a new lesson"
            onAction={() => alert('Upload modal coming soon!')}
          />
        )}
      </div>
    </Layout>
  );
}
