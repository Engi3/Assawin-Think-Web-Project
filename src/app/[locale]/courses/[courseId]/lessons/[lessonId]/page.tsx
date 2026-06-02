import { getCourseBySlug, getLesson } from "@/lib/content-api";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Download, ExternalLink, Play, CheckCircle } from "lucide-react";
import SimulationManager from "@/components/simulations/SimulationManager";
import MotionWrapper from "@/components/MotionWrapper";

interface LessonPageProps {
  params: Promise<{ locale: string; courseId: string; lessonId: string }>;
}

export default async function LessonPage({ params }: LessonPageProps) {
  const { locale, courseId, lessonId } = await params;
  const course = await getCourseBySlug(courseId);
  if (!course) notFound();

  const lessonIndex = course.lessons.findIndex((l: any) => l.id === lessonId);
  const lesson = course.lessons[lessonIndex];
  if (!lesson) notFound();

  const prevLesson = course.lessons[lessonIndex - 1];
  const nextLesson = course.lessons[lessonIndex + 1];

  const title = locale === 'en' ? lesson.title_en : lesson.title_th;
  const content = locale === 'en' ? lesson.content_en : lesson.content_th;

  return (
    <MotionWrapper>
      <div className="max-w-5xl">
        {/* Header Branding */}
        <div className="mb-16">
          <div className="flex items-center gap-3 text-primary font-black text-[10px] uppercase tracking-[0.4em] mb-4">
            <div className="w-8 h-[1px] bg-primary/40"></div>
            {locale === 'en' ? "Engineering Module" : "โมดูลวิศวกรรม"}
          </div>
          <h1 className="text-5xl lg:text-7xl font-black text-foreground tracking-tighter leading-none mb-6">
            {title}
          </h1>
          <div className="flex items-center gap-6 text-secondary text-sm font-bold uppercase tracking-widest opacity-60">
             <span>Module {lessonIndex + 1}</span>
             <span className="w-1.5 h-1.5 bg-border rounded-full"></span>
             <span>ID: {lesson.id}</span>
          </div>
        </div>

        {/* Cinematic Video Player */}
        <div className="group relative mb-20">
          <div className="absolute -inset-4 bg-primary/10 rounded-[3rem] blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
          <div className="aspect-video w-full bg-slate-950 rounded-[2.5rem] overflow-hidden shadow-[0_40px_100px_-20px_rgba(0,0,0,0.5)] border border-white/5 relative z-10">
            {lesson.videoUrl ? (
              <iframe
                src={lesson.videoUrl}
                title={title}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            ) : (
              <div className="w-full h-full bg-slate-900 flex flex-col items-center justify-center text-center p-8">
                <div className="p-5 bg-slate-800 rounded-full mb-6 border border-border">
                    <Play className="w-10 h-10 text-primary" fill="currentColor" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">
                    {locale === 'en' ? 'Video Lesson In Production' : 'บทเรียนวิดีโอกำลังจัดทำ'}
                </h3>
                <p className="text-secondary max-w-sm">
                    {locale === 'en' ? 'This content is being prepared and will be available soon. Check back later!' : 'เนื้อหานี้กำลังอยู่ระหว่างการเตรียมการและจะพร้อมให้ใช้งานเร็วๆ นี้'}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Content Section */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-16 mb-24">
           <div className="xl:col-span-8">
              <div className="prose prose-slate dark:prose-invert max-w-none">
                <h2 className="text-2xl font-black text-foreground mb-8 uppercase tracking-tight flex items-center gap-4">
                   <span className="w-1.5 h-8 bg-primary rounded-full"></span>
                   {locale === 'en' ? "Theoretical Overview" : "รายละเอียดเชิงทฤษฎี"}
                </h2>
                <p className="text-xl text-secondary leading-relaxed whitespace-pre-wrap font-medium font-sans opacity-90">
                  {content}
                </p>
              </div>
           </div>
           
           <div className="xl:col-span-4">
              {lesson.resources.length > 0 && (
                <div className="eng-card p-8 sticky top-24">
                   <h3 className="text-xs font-black text-foreground uppercase tracking-widest mb-6 flex items-center gap-2">
                     <Download size={14} className="text-primary" /> Engineering Assets
                   </h3>
                   <div className="space-y-3">
                     {lesson.resources.map((resource: any, idx: number) => (
                       <a
                         key={idx}
                         href={resource.url}
                         className="flex items-center justify-between p-4 bg-background/60 border border-border rounded-xl hover:border-primary/50 hover:bg-background transition-all group/res"
                       >
                         <span className="text-sm font-black text-secondary group-hover/res:text-primary transition-colors">
                           {locale === 'en' ? resource.name_en : resource.name_th}
                         </span>
                         <ExternalLink size={14} className="text-border group-hover/res:text-primary" />
                       </a>
                     ))}
                   </div>
                </div>
              )}
           </div>
        </div>

        {/* Simulation Integration */}
        <div className="relative">
           <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-border to-transparent"></div>
           <SimulationManager simulationId={lesson.simulationId} locale={locale} />
        </div>

        {/* Intelligent Navigation */}
        <div className="flex flex-col sm:flex-row items-stretch justify-between gap-6 mt-32 pt-12 border-t border-border">
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
