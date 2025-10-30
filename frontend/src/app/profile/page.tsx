'use client';

import Layout from '@/components/layout/Layout';
import { useState } from 'react';

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);

  const [user, setUser] = useState({
    name: 'Ziad Morjan',
    email: 'ziad@example.com',
    role: 'Student',
    bio: 'Software Engineering student passionate about AI-powered education.',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditing(false);
    // TODO: Send update to backend API
  };

  return (
    <Layout title="Profile">
      <main className="max-w-3xl mx-auto py-10 px-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50 mb-2">My Profile</h1>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Manage your personal information and learning preferences.
          </p>
        </div>

        {/* Profile card */}
        <div className="rounded-2xl bg-white dark:bg-zinc-900 p-8 shadow-lg border border-zinc-100 dark:border-zinc-800">
          <div className="flex flex-col items-center gap-4 mb-8">
            <div className="w-24 h-24 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white text-2xl font-bold">
              {user.name.charAt(0)}
            </div>
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">{user.name}</h2>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">{user.role}</p>
          </div>

          {!isEditing ? (
            <>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                    Email
                  </label>
                  <p className="text-zinc-900 dark:text-zinc-100">{user.email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                    Bio
                  </label>
                  <p className="text-zinc-900 dark:text-zinc-100">{user.bio}</p>
                </div>
              </div>

              <button
                onClick={() => setIsEditing(true)}
                className="mt-8 w-full rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 py-2.5 text-white font-medium shadow hover:opacity-90 transition"
              >
                Edit Profile
              </button>
            </>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2"
                >
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  value={user.name}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-4 py-2 text-sm text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={user.email}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-4 py-2 text-sm text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label
                  htmlFor="bio"
                  className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2"
                >
                  Bio
                </label>
                <textarea
                  id="bio"
                  name="bio"
                  rows={3}
                  value={user.bio}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-4 py-2 text-sm text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  type="submit"
                  className="flex-1 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 py-2.5 text-white font-medium shadow hover:opacity-90 transition"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="flex-1 rounded-lg border border-zinc-300 dark:border-zinc-700 py-2.5 text-sm font-medium text-zinc-800 dark:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </main>
    </Layout>
  );
}
