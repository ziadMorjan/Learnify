'use client';
export default function ErrorMessage({ message }: { message: string }) {
  if (!message) return null;
  return <p className="text-sm text-red-500 mt-2">{message}</p>;
}
