'use client';

import { useState } from 'react';
import Link from 'next/link';
import Input from '@/components/common/Input';
import ErrorMessage from '@/components/common/ErrorMessage';
import ActionButton from '@/components/common/ActionButton';
import AuthShell from '@/components/common/AuthShell';

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setError('');
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setError('Invalid email or password');
    }, 1500);
  };

  return (
    <AuthShell
      title="Welcome back to Learnify"
      description="Sign in to continue your learning journey."
      linkSlot={
        <Link href="/forgot-password" className="font-semibold">
          Forgot password?
        </Link>
      }
      footer={
        <>
          Don&apos;t have an account?{' '}
          <Link href="/register" className="font-semibold text-indigo-600 dark:text-indigo-400">
            Sign up
          </Link>
        </>
      }
    >
      <form className="space-y-5" onSubmit={handleSubmit}>
        <Input label="Email" type="email" placeholder="user@example.com" required />
        <Input label="Password" type="password" placeholder="********" required />
        {error && <ErrorMessage message={error} />}
        <ActionButton type="submit" fullWidth disabled={isLoading}>
          {isLoading ? 'Signing in...' : 'Sign in'}
        </ActionButton>
      </form>
    </AuthShell>
  );
}
