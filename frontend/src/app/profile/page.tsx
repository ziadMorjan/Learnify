'use client';

import { useState } from 'react';
import Layout from '@/components/layout/Layout';
import SectionCard from '@/components/common/SectionCard';
import ActionButton from '@/components/common/ActionButton';
import { useTheme } from '@/components/theme/ThemeProvider';

interface UserProfile {
  name: string;
  email: string;
  role: string;
  bio: string;
  progress: number;
}

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState<UserProfile>({
    name: 'Ziad Morjan',
    email: 'ziad@example.com',
    role: 'Student',
    bio: 'Software engineering student passionate about AI-powered education.',
    progress: 72,
  });
  const { theme } = useTheme();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setIsEditing(false);
    // TODO: persist profile changes
  };

  return (
    <Layout title="Profile">
      <div className="mx-auto max-w-4xl space-y-8">
        <SectionCard
          title="Your learning profile"
          description="Update your personal info so Learnify insights stay personalized."
        >
          <div className="flex flex-col items-center gap-6 text-center sm:flex-row sm:items-start sm:text-left">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 text-3xl font-bold text-white">
              {user.name.charAt(0)}
            </div>
            <div className="space-y-2">
              <p className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">{user.name}</p>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">{user.role}</p>
              <p className="text-xs uppercase tracking-wide text-indigo-500">
                {user.progress}% course completion
              </p>
              <span
                className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${
                  theme === 'dark'
                    ? 'bg-indigo-500/10 text-indigo-200'
                    : 'bg-indigo-50 text-indigo-600'
                }`}
              >
                <span
                  className={`h-2 w-2 rounded-full ${
                    theme === 'dark' ? 'bg-indigo-300' : 'bg-indigo-500'
                  }`}
                />
                {theme === 'dark' ? 'Dark mode active' : 'Light mode active'}
              </span>
            </div>
          </div>
        </SectionCard>

        <SectionCard
          title="Account details"
          description="Control what you share with study partners and AI tools."
          actions={
            <ActionButton onClick={() => setIsEditing((prev) => !prev)}>
              {isEditing ? 'Cancel' : 'Edit profile'}
            </ActionButton>
          }
        >
          {!isEditing ? (
            <div className="space-y-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Email</p>
                <p className="mt-1 text-sm text-zinc-900 dark:text-zinc-100">{user.email}</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Bio</p>
                <p className="mt-1 text-sm text-zinc-900 dark:text-zinc-100">{user.bio}</p>
              </div>
            </div>
          ) : (
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="name"
                  className="text-sm font-semibold text-zinc-700 dark:text-zinc-200"
                >
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  value={user.name}
                  onChange={handleChange}
                  className="mt-2 w-full rounded-xl border border-zinc-200 bg-white px-4 py-2 text-sm text-zinc-900 focus:border-indigo-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="text-sm font-semibold text-zinc-700 dark:text-zinc-200"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={user.email}
                  onChange={handleChange}
                  className="mt-2 w-full rounded-xl border border-zinc-200 bg-white px-4 py-2 text-sm text-zinc-900 focus:border-indigo-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
                />
              </div>

              <div>
                <label
                  htmlFor="bio"
                  className="text-sm font-semibold text-zinc-700 dark:text-zinc-200"
                >
                  Bio
                </label>
                <textarea
                  id="bio"
                  name="bio"
                  rows={4}
                  value={user.bio}
                  onChange={handleChange}
                  className="mt-2 w-full rounded-xl border border-zinc-200 bg-white px-4 py-2 text-sm text-zinc-900 focus:border-indigo-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
                />
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <ActionButton type="submit" fullWidth>
                  Save changes
                </ActionButton>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="w-full rounded-xl border border-zinc-200 px-4 py-2 text-sm font-semibold text-zinc-800 hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-100 dark:hover:bg-zinc-800"
                >
                  Discard
                </button>
              </div>
            </form>
          )}
        </SectionCard>
      </div>
    </Layout>
  );
}
