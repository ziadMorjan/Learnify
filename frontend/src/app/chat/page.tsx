'use client';

import Layout from '@/components/layout/Layout';
import Link from 'next/link';

export default function ChatPage() {
  const chats = [
    {
      id: 1,
      title: 'Biology - Chapter 3',
      lastMessage: 'Can you explain mitochondria function?',
      lastUpdated: '2 hours ago',
    },
    {
      id: 2,
      title: 'History - WWII Overview',
      lastMessage: 'Summarize the causes of the war.',
      lastUpdated: 'Yesterday',
    },
    {
      id: 3,
      title: 'Mathematics - Calculus Notes',
      lastMessage: 'What is the chain rule?',
      lastUpdated: '3 days ago',
    },
  ];

  return (
    <Layout title="AI Chat">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          AI Chat
        </h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          Continue your conversations with Learnify AI — personalized to each lesson.
        </p>
      </div>

      {/* Chat List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {chats.map((chat) => (
          <Link
            key={chat.id}
            href={`/chat/${chat.id}`}
            className="rounded-2xl bg-white dark:bg-zinc-900 p-6 shadow-lg border border-zinc-100 dark:border-zinc-800 hover:shadow-xl transition flex flex-col justify-between"
          >
            <div>
              <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 mb-2">
                {chat.title}
              </h2>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2">
                {chat.lastMessage}
              </p>
            </div>
            <p className="text-xs text-zinc-500 dark:text-zinc-500 mt-4">{chat.lastUpdated}</p>
          </Link>
        ))}
      </div>

      {/* Empty state */}
      {chats.length === 0 && (
        <div className="text-center py-24">
          <h2 className="text-lg font-medium text-zinc-700 dark:text-zinc-300 mb-2">
            No active chats yet
          </h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-500 mb-4">
            Upload a lesson to start chatting with Learnify AI.
          </p>
          <Link
            href="/lessons"
            className="inline-block rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 py-2.5 px-5 text-white font-medium shadow hover:opacity-90 transition"
          >
            Go to Lessons
          </Link>
        </div>
      )}
    </Layout>
  );
}
