'use client';

import Layout from '@/components/layout/Layout';
import { useState } from 'react';
import Link from 'next/link';

export default function SettingsPage() {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [language, setLanguage] = useState('en');
  const [twoFactor, setTwoFactor] = useState(false);

  const handleSave = () => {
    alert('✅ Settings saved successfully!');
  };

  return (
    <Layout title="Settings">
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mb-2">
            Settings
          </h1>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Customize your app experience and privacy preferences.
          </p>
        </div>

        {/* Preferences Section */}
        <section className="rounded-2xl bg-white dark:bg-zinc-900 p-6 shadow-lg border border-zinc-100 dark:border-zinc-800">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 mb-4">
            Preferences
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Enable Dark Mode
              </span>
              <input
                type="checkbox"
                checked={darkMode}
                onChange={() => setDarkMode(!darkMode)}
                className="w-5 h-5 accent-indigo-600"
              />
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Enable Notifications
              </span>
              <input
                type="checkbox"
                checked={notifications}
                onChange={() => setNotifications(!notifications)}
                className="w-5 h-5 accent-indigo-600"
              />
            </div>

            <div>
              <label
                htmlFor="language"
                className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1"
              >
                Language
              </label>
              <select
                id="language"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-4 py-2 text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="en">English</option>
                <option value="ar">العربية</option>
              </select>
            </div>
          </div>
        </section>

        {/* Security Section */}
        <section className="rounded-2xl bg-white dark:bg-zinc-900 p-6 shadow-lg border border-zinc-100 dark:border-zinc-800">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 mb-4">Security</h2>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Two-Factor Authentication
              </span>
              <input
                type="checkbox"
                checked={twoFactor}
                onChange={() => setTwoFactor(!twoFactor)}
                className="w-5 h-5 accent-indigo-600"
              />
            </div>

            <Link
              href="/settings/change-password"
              className="block text-center w-full rounded-lg border border-zinc-300 dark:border-zinc-700 py-2 text-sm font-medium text-zinc-800 dark:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
            >
              Change Password
            </Link>

            <button
              onClick={() => alert('⚠️ Account deletion feature coming soon')}
              className="w-full rounded-lg border border-red-400 text-red-600 py-2 text-sm font-medium hover:bg-red-50 dark:hover:bg-red-900/20 transition"
            >
              Delete Account
            </button>
          </div>
        </section>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            className="px-6 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium shadow hover:opacity-90 transition focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          >
            Save Changes
          </button>
        </div>
      </div>
    </Layout>
  );
}
