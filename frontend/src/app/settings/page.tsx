'use client';

import { useState } from 'react';
import Layout from '@/components/layout/Layout';
import SectionCard from '@/components/common/SectionCard';
import ActionButton from '@/components/common/ActionButton';
import Link from 'next/link';

export default function SettingsPage() {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [language, setLanguage] = useState('en');
  const [twoFactor, setTwoFactor] = useState(false);

  const handleSave = () => {
    alert('Settings saved successfully!');
  };

  return (
    <Layout title="Settings">
      <div className="mx-auto max-w-4xl space-y-8">
        <SectionCard
          title="Theme & preferences"
          description="Choose how Learnify looks and when you want reminders."
        >
          <div className="space-y-5">
            <label className="flex items-center justify-between rounded-2xl border border-zinc-100 px-4 py-3 dark:border-zinc-800">
              <div>
                <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">Dark mode</p>
                <p className="text-xs text-zinc-500">Syncs with the global appearance toggle.</p>
              </div>
              <input
                type="checkbox"
                checked={darkMode}
                onChange={() => setDarkMode((prev) => !prev)}
                className="h-5 w-5 accent-indigo-600"
              />
            </label>

            <label className="flex items-center justify-between rounded-2xl border border-zinc-100 px-4 py-3 dark:border-zinc-800">
              <div>
                <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                  Notifications
                </p>
                <p className="text-xs text-zinc-500">
                  Lesson reminders, flashcard nudges, and progress emails.
                </p>
              </div>
              <input
                type="checkbox"
                checked={notifications}
                onChange={() => setNotifications((prev) => !prev)}
                className="h-5 w-5 accent-indigo-600"
              />
            </label>

            <div>
              <label
                htmlFor="language"
                className="text-sm font-semibold text-zinc-900 dark:text-zinc-50"
              >
                Language
              </label>
              <select
                id="language"
                value={language}
                onChange={(event) => setLanguage(event.target.value)}
                className="mt-2 w-full rounded-xl border border-zinc-200 bg-white px-4 py-2 text-sm text-zinc-900 focus:border-indigo-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
              >
                <option value="en">English</option>
                <option value="ar">Arabic</option>
              </select>
            </div>
          </div>
        </SectionCard>

        <SectionCard
          title="Security"
          description="Protect your workspace with multi-factor auth and password updates."
        >
          <div className="space-y-4">
            <label className="flex items-center justify-between rounded-2xl border border-zinc-100 px-4 py-3 dark:border-zinc-800">
              <div>
                <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                  Two-factor authentication
                </p>
                <p className="text-xs text-zinc-500">Add an extra code when signing in.</p>
              </div>
              <input
                type="checkbox"
                checked={twoFactor}
                onChange={() => setTwoFactor((prev) => !prev)}
                className="h-5 w-5 accent-indigo-600"
              />
            </label>

            <Link
              href="/settings/change-password"
              className="block w-full rounded-2xl border border-zinc-200 px-4 py-3 text-center text-sm font-semibold text-zinc-800 transition hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-100 dark:hover:bg-zinc-800"
            >
              Change password
            </Link>

            <button
              onClick={() => alert('Account deletion coming soon.')}
              className="w-full rounded-2xl border border-red-300 px-4 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-50 dark:border-red-900 dark:hover:bg-red-950/30"
            >
              Delete account
            </button>
          </div>
        </SectionCard>

        <div className="flex justify-end">
          <ActionButton onClick={handleSave}>Save changes</ActionButton>
        </div>
      </div>
    </Layout>
  );
}
