'use client';

import { useEffect, useRef, useState } from 'react';
import Layout from '@/components/layout/Layout';
import SectionCard from '@/components/common/SectionCard';
import ActionButton from '@/components/common/ActionButton';

interface Message {
  id: number;
  sender: 'user' | 'ai';
  text: string;
  time: string;
}

export default function LessonChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: 'ai',
      text: "Welcome back! I'm your AI tutor for this lesson. What would you like to review?",
      time: '09:30 AM',
    },
  ]);
  const [newMessage, setNewMessage] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = (event: React.FormEvent) => {
    event.preventDefault();
    if (!newMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      sender: 'user',
      text: newMessage.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setNewMessage('');

    setTimeout(() => {
      const aiMessage: Message = {
        id: Date.now() + 1,
        sender: 'ai',
        text: 'Great question! Here is what you should remember...',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, aiMessage]);
    }, 900);
  };

  return (
    <Layout title="Lesson Chat">
      <SectionCard
        title="AI Tutor"
        description="Learnify remembers your previous questions so you can continue the conversation seamlessly."
        className="flex h-[calc(100vh-14rem)] flex-col"
        contentClassName="flex h-full flex-col"
      >
        <div className="flex-1 space-y-4 overflow-y-auto rounded-2xl bg-zinc-50/80 p-4 dark:bg-zinc-950/40">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[75%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                  message.sender === 'user'
                    ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg shadow-indigo-500/30'
                    : 'bg-white text-zinc-900 shadow-sm dark:bg-zinc-900 dark:text-zinc-100'
                }`}
              >
                <p>{message.text}</p>
                <span className="mt-2 block text-[11px] uppercase tracking-wide opacity-70">
                  {message.time}
                </span>
              </div>
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>

        <form
          onSubmit={handleSendMessage}
          className="mt-4 flex items-center gap-3 rounded-2xl border border-zinc-100 bg-white p-3 dark:border-zinc-800 dark:bg-zinc-900"
        >
          <input
            type="text"
            value={newMessage}
            onChange={(event) => setNewMessage(event.target.value)}
            placeholder="Ask something about this lesson..."
            className="flex-1 rounded-xl border border-transparent bg-zinc-50 px-4 py-2 text-sm text-zinc-900 placeholder:text-zinc-500 focus:border-indigo-500 focus:outline-none dark:bg-zinc-950 dark:text-zinc-100"
          />
          <ActionButton type="submit">Send</ActionButton>
        </form>
      </SectionCard>
    </Layout>
  );
}
