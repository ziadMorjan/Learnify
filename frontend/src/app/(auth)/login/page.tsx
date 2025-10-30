'use client';

import Link from 'next/link';

export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-black px-4">
      <div className="w-full max-w-md rounded-2xl bg-white dark:bg-zinc-900 p-8 shadow-lg border border-zinc-100 dark:border-zinc-800">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mb-2">
            Welcome back to Learnify
          </h1>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Sign in to continue your learning journey
          </p>
        </div>

        <form className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="user@example.com"
              aria-label="Email address"
              className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-4 py-2 text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              aria-label="Password"
              className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-4 py-2 text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 py-2.5 text-white font-medium shadow hover:opacity-90 transition focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          >
            Sign in
          </button>

          <div className="text-center">
            <Link
              href="/forgot-password"
              className="text-sm text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300 underline"
            >
              Forgot your password?
            </Link>
          </div>
        </form>

        <div className="mt-8 text-center">
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Don&apos;t have an account?{' '}
            <Link
              href="/register"
              className="text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300 underline font-medium"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
