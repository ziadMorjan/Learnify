'use client';

import { useState } from 'react';
import Link from 'next/link';
import Input from '@/components/common/Input';
import ActionButton from '@/components/common/ActionButton';
import AuthShell from '@/components/common/AuthShell';

export default function ResetPasswordPage() {
  const [isResetting, setIsResetting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setIsResetting(true);

    setTimeout(() => {
      setIsResetting(false);
      setSuccess(true);
    }, 1500);
  };

  return (
    <AuthShell
      title="Set a new password"
      description="Choose a strong password to secure your workspace."
      footer={
        <Link href="/login" className="font-semibold text-indigo-600 dark:text-indigo-400">
          Back to sign in
        </Link>
      }
    >
      <form className="space-y-5" onSubmit={handleSubmit}>
        <Input label="New password" type="password" placeholder="********" required />
        <Input label="Confirm password" type="password" placeholder="********" required />
        <ActionButton type="submit" fullWidth disabled={isResetting}>
          {success ? 'Password updated' : isResetting ? 'Updating...' : 'Update password'}
        </ActionButton>
      </form>
    </AuthShell>
  );
}
