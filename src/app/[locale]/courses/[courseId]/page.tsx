import { getCourseBySlug } from "@/lib/content-api";
import { notFound } from "next/navigation";
import Link from "next/link";
import { PlayCircle, ArrowLeft, Book, Download, ChevronRight, CheckCircle2 } from "lucide-react";
import { getDictionary } from "@/lib/get-dictionary";

interface CourseDetailPageProps {
  params: Promise<{ locale: string; courseId: string }>;
}

export default async function CourseDetailPage({ params }: CourseDetailPageProps) {
  const { locale, courseId } = await params;
  const course = await getCourseBySlug(courseId);
  const dict = await getDictionary(locale as "en" | "th");

  if (!course) notFound();

  const title = locale === 'en' ? course.title_en : course.title_th;
  const description = locale === 'en' ? course.description_en : course.description_th;
  const syllabus = locale === 'en' ? course.syllabus_en : course.syllabus_th;

  return (
    <div className="bg-background min-h-screen">
      {/* Header Section */}
      <section className="border-b border-border py-20 lg:py-32 relative overflow-hidden bg-secondary/5">
        <div className="codenest-grid-lines opacity-30" />
        <div className="codenest-glow-ellipse left-1/2 top-0 h-[320px] w-[800px] max-w-[140vw] -translate-x-1/2" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Link
            href={`/${locale}/courses`}
            className="inline-flex items-center gap-2 text-secondary hover:text-foreground transition-colors mb-10 font-bold text-sm uppercase tracking-widest"
          >
            <ArrowLeft className="h-4 w-4" /> {locale === 'en' ? "Back to Courses" : "กลับสู่หน้ารวมวิชา"}
          </Link>
          <div className="max-w-4xl">
            <span className="codenest-eyebrow block mb-4">
              {locale === 'en' ? 'Course Module' : 'รายวิชา'}
            </span>
            <span className="bg-primary/10 text-primary border border-primary/20 px-4 py-1 rounded-full text-xs font-bold mb-6 inline-block uppercase tracking-widest">
              {course.code}
            </span>
            <h1 className="text-4xl lg:text-6xl font-extrabold mb-8 tracking-tight">{title}</h1>
            <p className="text-xl text-secondary leading-relaxed max-w-2xl font-medium">
              {description}
            </p>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary/5 to-transparent"></div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Main Content (Syllabus) */}
          <div className="lg:col-span-8">
            <h2 className="text-2xl font-bold text-foreground mb-8 flex items-center gap-3">
              <Book className="h-6 w-6 text-primary" /> {locale === 'en' ? "Course Syllabus" : "รายละเอียดหลักสูตร"}
            </h2>
            <div className="bg-background border border-border p-10 rounded-3xl shadow-sm relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-primary/20"></div>
              <p className="text-lg text-secondary leading-relaxed whitespace-pre-wrap">
                {syllabus}
              </p>
            </div>
            
            <div className="mt-20">
              <h2 className="text-2xl font-bold text-foreground mb-8">{locale === 'en' ? "Key Outcomes" : "สิ่งที่คุณจะได้รับ"}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {(locale === 'en' 
                  ? ["System Analysis", "Control Programming", "Structural Design", "Problem Solving"]
                  : ["การวิเคราะห์ระบบ", "การเขียนโปรแกรมควบคุม", "การออกแบบโครงสร้าง", "การแก้ปัญหาเชิงวิศวกรรม"]
                ).map((skill) => (
                  <div key={skill} className="flex items-center gap-4 bg-secondary/5 border border-border p-6 rounded-2xl group hover:border-primary/30 transition-colors">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                    <span className="font-bold text-foreground/80">{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar (Lesson List) */}
          <div className="lg:col-span-4">
            <div className="sticky top-24 bg-background border border-border rounded-3xl overflow-hidden shadow-2xl">
              <div className="bg-secondary/5 px-8 py-6 border-b border-border">
                <h3 className="text-lg font-bold text-foreground">{locale === 'en' ? "Course Content" : "บทเรียนทั้งหมด"}</h3>
                <p className="text-xs text-secondary font-bold uppercase tracking-widest mt-1">
                  {course.lessons.length} {dict.courses.lessons_count}
                </p>
              </div>
              <div className="divide-y divide-border">
                {course.lessons.map((lesson: any, index: number) => (
                  <Link
                    key={lesson.id}
                    href={`/${locale}/courses/${course.id}/lessons/${lesson.id}`}
                    className="flex items-center gap-5 px-8 py-5 hover:bg-secondary/5 transition-all group"
                  >
                    <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center text-sm font-mono font-bold text-secondary group-hover:bg-primary group-hover:text-on-primary transition-all">
                      {(index + 1).toString().padStart(2, '0')}
                    </div>
                    <div className="flex-grow">
                      <h4 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors line-clamp-1">
                        {locale === 'en' ? lesson.title_en : lesson.title_th}
                      </h4>
                      <div className="flex items-center gap-2 text-[10px] font-bold text-secondary uppercase tracking-widest mt-1">
                        <PlayCircle className="h-3 w-3 text-primary" />
                        {lesson.videoUrl
                          ? (locale === 'en' ? "Video" : "วิดีโอ")
                          : lesson.iframeUrl
                          ? (locale === 'en' ? "Interactive Lab" : "ห้องปฏิบัติการ")
                          : (locale === 'en' ? "Lesson" : "บทเรียน")}
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-border group-hover:text-primary transition-colors" />
                  </Link>
                ))}
              </div>
              <div className="p-8 bg-secondary/5 border-t border-border">
                <button className="w-full bg-foreground text-background font-bold py-4 rounded-2xl flex items-center justify-center gap-2 hover:opacity-90 transition-all">
                  <Download className="h-4 w-4" /> {locale === 'en' ? "Download Resources" : "ดาวน์โหลดเอกสาร"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
