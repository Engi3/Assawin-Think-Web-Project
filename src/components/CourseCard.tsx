import Link from "next/link";
import { BookOpen, ArrowRight } from "lucide-react";
import { Course } from "@/lib/data";

interface CourseCardProps {
  course: Course;
  locale: string;
  dict: any;
}

const CourseCard = ({ course, locale, dict }: CourseCardProps) => {
  const title = locale === 'en' ? course.title_en : course.title;
  const description = locale === 'en' ? course.description_en : course.description;

  return (
    <div className="bg-background rounded-2xl border border-border overflow-hidden hover:border-primary/50 transition-all group glow-card">
      <div className="relative h-52 w-full overflow-hidden">
        <img
          src={course.image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute top-4 left-4 bg-background/90 backdrop-blur-md border border-border px-3 py-1 rounded-lg text-xs font-bold text-primary shadow-xl">
          {course.code}
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-foreground mb-3 line-clamp-1 group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="text-secondary text-sm mb-6 line-clamp-2 leading-relaxed">
          {description}
        </p>
        
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-border">
          <div className="flex items-center gap-2 text-secondary text-xs font-bold uppercase tracking-wider">
            <BookOpen className="h-4 w-4 text-primary" />
            {course.lessons.length} {dict.lessons_count}
          </div>
          
          <Link
            href={`/${locale}/courses/${course.id}`}
            className="flex items-center gap-1 text-foreground text-sm font-bold hover:text-primary transition-all group/link"
          >
            {dict.enter_course} <ArrowRight className="h-4 w-4 group-hover/link:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
