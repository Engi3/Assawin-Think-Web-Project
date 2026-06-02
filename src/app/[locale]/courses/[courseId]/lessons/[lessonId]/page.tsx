import { getCourseBySlug } from "@/lib/content-api";
import type { Lesson } from "@/lib/content-api";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Play, CheckCircle } from "lucide-react";
import MotionWrapper from "@/components/MotionWrapper";
import LessonDisplay from "@/components/LessonDisplay";

interface LessonPageProps {
  params: Promise<{ locale: string; courseId: string; lessonId: string }>;
}

export default async function LessonPage({ params }: LessonPageProps) {
  const { locale, courseId, lessonId } = await params;
  const course = await getCourseBySlug(courseId);
  if (!course) notFound();

  const lessonIndex = course.lessons.findIndex((l: Lesson) => l.id === lessonId);
  const lesson = course.lessons[lessonIndex];
  if (!lesson) notFound();

  const prevLesson = course.lessons[lessonIndex - 1];
  const nextLesson = course.lessons[lessonIndex + 1];

  const title = locale === 'en' ? lesson.title_en : lesson.title_th;

  return (
    <MotionWrapper>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Branding */}
        <div className="mb-12 pt-8">
          <div className="flex items-center gap-3 text-primary font-black text-[10px] uppercase tracking-[0.4em] mb-4">
            <div className="w-8 h-[1px] bg-primary/40"></div>
            {locale === 'en' ? "Engineering Module" : "โมดูลวิศวกรรม"}
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-foreground tracking-tighter leading-tight mb-4">
            {title}
          </h1>
          <div className="flex items-center gap-6 text-secondary text-sm font-bold uppercase tracking-widest opacity-60">
             <span>Module {lessonIndex + 1}</span>
             <span className="w-1.5 h-1.5 bg-border rounded-full"></span>
             <span>ID: {lesson.id}</span>
          </div>
        </div>

        {/* Cinematic Video Player */}
        {lesson.videoUrl && (
            <div className="group relative mb-16">
            <div className="absolute -inset-4 bg-primary/10 rounded-[3rem] blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
            <div className="aspect-video w-full bg-slate-950 rounded-[2.5rem] overflow-hidden shadow-[0_40px_100px_-20px_rgba(0,0,0,0.5)] border border-white/5 relative z-10">
                <iframe
                    src={lesson.videoUrl}
                    title={title}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
            </div>
            </div>
        )}
        
        {/* Main Content Area handled by Client Component */}
        <LessonDisplay lesson={lesson} locale={locale} />

        {/* Intelligent Navigation */}
        <div className="flex flex-col sm:flex-row items-stretch justify-between gap-6 mt-24 pt-12 border-t border-border">
          {prevLesson ? (
            <Link
              href={`/${locale}/courses/${course.id}/lessons/${prevLesson.id}`}
              className="flex-1 eng-card p-6 flex items-center gap-6 group hover:border-primary/40"
            >
              <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                 <ChevronLeft className="text-secondary group-hover:text-primary transition-transform group-hover:-translate-x-1" />
              </div>
              <div className="text-left">
                <p className="text-[10px] font-black text-secondary uppercase tracking-widest mb-1 opacity-50">Back to Module</p>
                <p className="font-black text-foreground line-clamp-1">{locale === 'en' ? prevLesson.title_en : prevLesson.title_th}</p>
              </div>
            </Link>
          ) : <div className="flex-1"></div>}

          {nextLesson ? (
            <Link
              href={`/${locale}/courses/${course.id}/lessons/${nextLesson.id}`}
              className="flex-1 eng-card p-6 flex items-center justify-between group hover:border-primary border-primary/20 bg-primary/5"
            >
              <div className="text-right flex-grow pr-6 border-r border-border">
                <p className="text-[10px] font-black text-primary uppercase tracking-widest mb-1">Advance Protocol</p>
                <p className="font-black text-foreground line-clamp-1">{locale === 'en' ? nextLesson.title_en : nextLesson.title_th}</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
                 <ChevronRight className="transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          ) : (
            <Link
              href={`/${locale}/courses/${course.id}`}
              className="flex-1 eng-button-primary flex items-center justify-center gap-3"
            >
              {locale === 'en' ? "Course Terminated" : "จบรายวิชา"} <CheckCircle size={20} />
            </Link>
          )}
        </div>
      </div>
    </MotionWrapper>
  );
}
