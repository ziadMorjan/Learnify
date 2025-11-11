'use client';

import { useState } from 'react';
import Link from 'next/link';
import Input from '@/components/common/Input';
import ActionButton from '@/components/common/ActionButton';
import AuthShell from '@/components/common/AuthShell';

export default function ForgotPasswordPage() {
  const [emailSent, setEmailSent] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setEmailSent(true);
  };

  return (
    <AuthShell
      title="Forgot your password?"
      description="Enter the email you use for Learnify and we will send reset instructions."
      footer={
        <Link href="/login" className="font-semibold text-indigo-600 dark:text-indigo-400">
          Back to sign in
        </Link>
      }
    >
      <form className="space-y-5" onSubmit={handleSubmit}>
        <Input label="Email" type="email" placeholder="user@example.com" required />
        <ActionButton type="submit" fullWidth>
          {emailSent ? 'Email sent' : 'Send reset link'}
        </ActionButton>
      </form>
    </AuthShell>
  );
}
