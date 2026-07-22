import { getCourseBySlug } from "@/lib/content-api";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, List } from "lucide-react";

interface LessonLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string; courseId: string; lessonId: string }>;
}

export default async function LessonLayout({ children, params }: LessonLayoutProps) {
  const { locale, courseId, lessonId } = await params;
  const course = await getCourseBySlug(courseId);

  if (!course) notFound();

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-background transition-colors">
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:block w-80 border-r border-border sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto bg-secondary/5">
        <div className="p-8">
          <Link
            href={`/${locale}/courses/${course.id}`}
            className="flex items-center gap-2 text-primary font-bold mb-10 hover:gap-3 transition-all text-sm uppercase tracking-widest"
          >
            <ChevronLeft className="h-4 w-4" /> {locale === 'en' ? "Course Details" : "รายละเอียดวิชา"}
          </Link>
          <div className="flex items-center gap-2 mb-8 border-b border-border pb-4">
            <List className="h-5 w-5 text-secondary" />
            <h3 className="font-bold text-foreground uppercase tracking-widest text-sm">
              {locale === 'en' ? "Curriculum" : "เนื้อหาบทเรียน"}
            </h3>
          </div>
          <nav className="space-y-2">
            {course.lessons.map((lesson: any, index: number) => (
              <Link
                key={lesson.id}
                href={`/${locale}/courses/${course.id}/lessons/${lesson.id}`}
                className={`block px-5 py-4 rounded-2xl text-sm font-bold transition-all ${
                  lesson.id === lessonId
                    ? "bg-primary text-on-primary shadow-lg shadow-primary/20"
                    : "text-secondary hover:bg-background hover:text-primary border border-transparent hover:border-border"
                }`}
              >
                <div className="flex items-center gap-4">
                  <span className={`flex-shrink-0 font-mono ${
                    lesson.id === lessonId ? "text-on-primary/70" : "text-secondary/50"
                  }`}>
                    {(index + 1).toString().padStart(2, '0')}
                  </span>
                  <span className="truncate">{locale === 'en' ? lesson.title_en : lesson.title_th}</span>
                </div>
              </Link>
            ))}
          </nav>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-grow">
        {/* Mobile Course Info Header */}
        <div className="lg:hidden bg-background border-b border-border px-4 py-4 flex items-center justify-between">
          <Link
            href={`/${locale}/courses/${course.id}`}
            className="flex items-center gap-2 text-secondary text-xs font-bold uppercase tracking-widest"
          >
            <ChevronLeft className="h-4 w-4" /> {locale === 'en' ? "Back" : "กลับ"}
          </Link>
          <span className="text-xs font-bold text-primary truncate max-w-[200px]">
            {locale === 'en' ? course.title_en : course.title_th}
          </span>
        </div>
        
        <div className="max-w-5xl mx-auto px-6 lg:px-16 py-12 lg:py-20">
          {children}
        </div>
      </main>
    </div>
  );
}
