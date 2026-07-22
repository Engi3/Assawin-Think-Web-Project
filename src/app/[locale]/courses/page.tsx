import { getCourses } from "@/lib/content-api";
import CourseSearch from "@/components/CourseSearch";
import { BookOpen } from "lucide-react";
import { getDictionary } from "@/lib/get-dictionary";

export default async function CoursesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const courses = await getCourses();
  const dict = await getDictionary(locale as "en" | "th");

  return (
    <div className="relative py-24 bg-background min-h-screen overflow-hidden">
      <div className="codenest-grid-lines opacity-30" />
      <div className="codenest-glow-ellipse left-1/2 top-0 h-[320px] w-[800px] max-w-[140vw] -translate-x-1/2" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mb-16">
          <span className="codenest-eyebrow block mb-4">
            {locale === 'en' ? 'Course Catalog' : 'รายวิชาทั้งหมด'}
          </span>
          <div className="flex items-center gap-4 mb-6">
            <div className="p-2 bg-primary/10 rounded-xl">
              <BookOpen className="h-6 w-6 text-primary" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-foreground">{dict.courses.title}</h1>
          </div>
          <p className="text-secondary max-w-2xl text-lg leading-relaxed">
            {dict.courses.description}
          </p>
        </div>

        {courses.length > 0 ? (
          <CourseSearch courses={courses} locale={locale} dict={dict.courses} />
        ) : (
          <div className="text-center py-32 rounded-3xl border border-dashed border-border">
            <p className="text-secondary font-medium">{dict.courses.no_courses}</p>
          </div>
        )}
      </div>
    </div>
  );
}
