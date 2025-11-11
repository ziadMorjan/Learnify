'use client';

import { useState } from 'react';
import Link from 'next/link';
import Input from '@/components/common/Input';
import ActionButton from '@/components/common/ActionButton';
import AuthShell from '@/components/common/AuthShell';

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1500);
  };

  return (
    <AuthShell
      title="Create your account"
      description="Upload lessons, chat with AI, and build flashcards in one workspace."
      footer={
        <>
          Already have an account?{' '}
          <Link href="/login" className="font-semibold text-indigo-600 dark:text-indigo-400">
            Sign in
          </Link>
        </>
      }
    >
      <form className="space-y-5" onSubmit={handleSubmit}>
        <Input label="Full name" type="text" placeholder="Ziad Morjan" required />
        <Input label="Email" type="email" placeholder="user@example.com" required />
        <Input label="Password" type="password" placeholder="********" required />
        <ActionButton type="submit" fullWidth disabled={isLoading}>
          {isLoading ? 'Creating account...' : 'Create account'}
        </ActionButton>
      </form>
    </AuthShell>
  );
}
