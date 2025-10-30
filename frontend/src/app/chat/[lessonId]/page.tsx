'use client';

import Layout from '@/components/layout/Layout';
import { useState, useEffect, useRef } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

interface Message {
  id: number;
  sender: 'user' | 'ai';
  text: string;
  time: string;
}

export default function LessonChatPage() {
  const { lessonId } = useParams();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: 'ai',
      text: '👋 Welcome back! I’m your AI tutor for this lesson. How can I help you today?',
      time: '09:30 AM',
    },
  ]);
  const [newMessage, setNewMessage] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Scroll down when messages update
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const userMsg: Message = {
      id: Date.now(),
      sender: 'user',
      text: newMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setNewMessage('');

    // Mock AI reply (to be replaced with real API)
    setTimeout(() => {
      const aiMsg: Message = {
        id: Date.now() + 1,
        sender: 'ai',
        text: 'That’s a good question! Here’s what you need to know...',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, aiMsg]);
    }, 1000);
  };

  return (
    <Layout title={`Lesson Chat`}>
      <div className="flex flex-col h-[calc(100vh-10rem)] bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-100 dark:border-zinc-800 shadow-lg overflow-hidden">
        {/* Header */}
        <div className="border-b border-zinc-200 dark:border-zinc-800 px-6 py-4 bg-zinc-50 dark:bg-zinc-950 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
              Lesson Chat – {lessonId}
            </h2>
            <Link
              href="/chat"
              className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline mt-1 inline-block"
            >
              ← Back to all chats
            </Link>
          </div>
          <span className="text-xs text-zinc-500 dark:text-zinc-500">AI Tutor Active</span>
        </div>

        {/* Chat messages */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4 bg-zinc-50/50 dark:bg-zinc-950/30">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[75%] rounded-2xl px-4 py-2 text-sm ${
                  msg.sender === 'user'
                    ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-br-none'
                    : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 rounded-bl-none'
                }`}
              >
                <p>{msg.text}</p>
                <span className="block text-[10px] mt-1 opacity-70">{msg.time}</span>
              </div>
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>

        {/* Input */}
        <form
          onSubmit={handleSendMessage}
          className="p-4 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 flex items-center gap-3"
        >
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-4 py-2 text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            type="submit"
            className="rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-5 py-2 font-medium text-sm shadow hover:opacity-90 transition"
          >
            Send
          </button>
        </form>
      </div>
    </Layout>
  );
}
