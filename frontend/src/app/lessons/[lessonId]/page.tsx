'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Layout from '@/components/layout/Layout';
import SectionCard from '@/components/common/SectionCard';
import ActionButton from '@/components/common/ActionButton';
import { BookOpenCheck, Download, MessageCircle, PanelsTopLeft } from 'lucide-react';

export default function LessonDetailsPage() {
  const { lessonId } = useParams();
  const [summaryVisible, setSummaryVisible] = useState(false);

  const lesson = {
    id: lessonId,
    title: 'Biology - Photosynthesis',
    uploadDate: 'October 20, 2025',
    fileType: 'PDF',
    fileSize: '2.4 MB',
    description:
      'An overview of the photosynthesis process, including light-dependent reactions, chlorophyll function, and energy conversion steps.',
    aiSummary:
      'Photosynthesis converts light energy into glucose. Light reactions capture photons inside chloroplast thylakoids, creating ATP and NADPH. The Calvin cycle uses those molecules to fix CO2 into sugars while regenerating RuBP.',
  };

  return (
    <Layout title={`Lesson - ${lesson.title}`}>
      <div className="mx-auto max-w-5xl space-y-8">
        <SectionCard
          title={lesson.title}
          description="All lesson metadata, uploads, and AI-generated insights stay synced across Learnify."
        >
          <p className="text-sm text-zinc-600 dark:text-zinc-300">{lesson.description}</p>

          <dl className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-zinc-100 p-4 dark:border-zinc-800">
              <dt className="text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                Uploaded
              </dt>
              <dd className="mt-2 text-base font-semibold text-zinc-900 dark:text-zinc-50">
                {lesson.uploadDate}
              </dd>
            </div>
            <div className="rounded-xl border border-zinc-100 p-4 dark:border-zinc-800">
              <dt className="text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                File details
              </dt>
              <dd className="mt-2 text-base font-semibold text-zinc-900 dark:text-zinc-50">
                {lesson.fileType} - {lesson.fileSize}
              </dd>
            </div>
          </dl>
        </SectionCard>

        <SectionCard
          title="AI Summary"
          description="Summaries update automatically each time you re-upload or regenerate."
          actions={
            <ActionButton onClick={() => setSummaryVisible((prev) => !prev)}>
              {summaryVisible ? 'Hide summary' : 'Generate summary'}
            </ActionButton>
          }
        >
          {summaryVisible ? (
            <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
              {lesson.aiSummary}
            </p>
          ) : (
            <p className="text-sm italic text-zinc-500 dark:text-zinc-500">
              Tap "Generate summary" to see Learnify&apos;s latest takeaways for this lesson.
            </p>
          )}
        </SectionCard>

        <SectionCard
          title="Continue learning"
          description="Jump back into flashcards, AI chat, or download the original file."
          contentClassName="grid gap-4 md:grid-cols-3"
        >
          <ActionButton
            href={{
              pathname: `/chat/${lesson.id}`,
            }}
            layout="tile"
            icon={<MessageCircle className="h-5 w-5" />}
          >
            Ask AI
          </ActionButton>
          <ActionButton
            href={{
              pathname: `/flashcards/${lesson.id}`,
            }}
            layout="tile"
            icon={<BookOpenCheck className="h-5 w-5" />}
          >
            Flashcards
          </ActionButton>
          <ActionButton
            onClick={() => alert('Download started!')}
            layout="tile"
            icon={<Download className="h-5 w-5" />}
          >
            Download
          </ActionButton>
        </SectionCard>

        <SectionCard
          title="Lesson tools"
          description="Enhance this lesson with AI suggestions, outlines, and quick actions."
        >
          <div className="flex flex-wrap gap-3">
            <ActionButton layout="inline" icon={<PanelsTopLeft className="h-4 w-4" />}>
              Outline builder
            </ActionButton>
            <ActionButton layout="inline">Quiz me</ActionButton>
            <ActionButton layout="inline">Share with peers</ActionButton>
          </div>
        </SectionCard>
      </div>
    </Layout>
  );
}
