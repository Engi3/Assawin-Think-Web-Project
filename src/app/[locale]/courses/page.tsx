import { getCourses } from "@/lib/content-api";
import CourseCard from "@/components/CourseCard";
import { BookOpen } from "lucide-react";
import { getDictionary } from "@/lib/get-dictionary";

export default async function CoursesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const courses = await getCourses();
  const dict = await getDictionary(locale as "en" | "th");

  return (
    <div className="py-24 bg-background min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16">
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {courses.map((course: any) => (
            <CourseCard 
              key={course.id} 
              course={course} 
              locale={locale} 
              dict={dict.courses} 
            />
          ))}
        </div>

        {courses.length === 0 && (
          <div className="text-center py-32 rounded-3xl border border-dashed border-border">
            <p className="text-secondary font-medium">{dict.courses.no_courses}</p>
          </div>
        )}
      </div>
    </div>
  );
}
