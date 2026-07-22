"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import CourseCard from "@/components/CourseCard";

interface CourseSearchProps {
  courses: any[];
  locale: string;
  dict: any;
}

export default function CourseSearch({ courses, locale, dict }: CourseSearchProps) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return courses;
    return courses.filter((course: any) => {
      const haystack = [
        course.code,
        course.title_en,
        course.title_th,
        course.description_en,
        course.description_th,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [courses, query]);

  return (
    <>
      <div className="relative max-w-xl mb-12">
        <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-secondary pointer-events-none" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={dict.search_placeholder}
          className="w-full bg-background border border-border rounded-2xl py-4 pl-14 pr-5 text-foreground placeholder:text-secondary/60 focus:border-primary/50 focus:ring-4 focus:ring-primary/10 outline-none transition-all"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {filtered.map((course: any) => (
          <CourseCard key={course.id} course={course} locale={locale} dict={dict} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-32 rounded-3xl border border-dashed border-border">
          <p className="text-secondary font-medium">{dict.no_results}</p>
        </div>
      )}
    </>
  );
}
