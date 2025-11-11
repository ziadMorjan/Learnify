'use client';

import { useState } from 'react';
import Layout from '@/components/layout/Layout';
import SectionCard from '@/components/common/SectionCard';
import ActionButton from '@/components/common/ActionButton';

export default function ChangePasswordPage() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (newPassword !== confirmPassword) {
      alert('New passwords do not match');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert('Password updated successfully!');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    }, 1200);
  };

  return (
    <Layout title="Change Password">
      <div className="mx-auto max-w-md">
        <SectionCard
          title="Update password"
          description="Make sure your new password is at least 8 characters with a mix of letters and numbers."
        >
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="currentPassword"
                className="text-sm font-semibold text-zinc-900 dark:text-zinc-50"
              >
                Current password
              </label>
              <input
                id="currentPassword"
                type="password"
                value={currentPassword}
                onChange={(event) => setCurrentPassword(event.target.value)}
                placeholder="********"
                className="mt-2 w-full rounded-xl border border-zinc-200 bg-white px-4 py-2 text-sm text-zinc-900 focus:border-indigo-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
              />
            </div>

            <div>
              <label
                htmlFor="newPassword"
                className="text-sm font-semibold text-zinc-900 dark:text-zinc-50"
              >
                New password
              </label>
              <input
                id="newPassword"
                type="password"
                value={newPassword}
                onChange={(event) => setNewPassword(event.target.value)}
                placeholder="********"
                className="mt-2 w-full rounded-xl border border-zinc-200 bg-white px-4 py-2 text-sm text-zinc-900 focus:border-indigo-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
              />
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="text-sm font-semibold text-zinc-900 dark:text-zinc-50"
              >
                Confirm password
              </label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                placeholder="********"
                className="mt-2 w-full rounded-xl border border-zinc-200 bg-white px-4 py-2 text-sm text-zinc-900 focus:border-indigo-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
              />
            </div>

            <ActionButton type="submit" fullWidth disabled={loading}>
              {loading ? 'Updating...' : 'Update password'}
            </ActionButton>
          </form>
        </SectionCard>
      </div>
    </Layout>
  );
}
