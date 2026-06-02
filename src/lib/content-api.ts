import fs from 'fs';
import path from 'path';

const CONTENT_PATH = path.join(process.cwd(), 'src/content');

export interface Resource {
  name_en: string;
  name_th: string;
  url: string;
}

export interface Lesson {
  id: string;
  title_en: string;
  title_th: string;
  videoUrl?: string;
  iframeUrl?: string;
  content_en: string;
  content_th: string;
  simulationId?: string;
  resources: Resource[];
}

export interface Course {
  id: string;
  code: string;
  title_en: string;
  title_th: string;
  description_en: string;
  description_th: string;
  image: string;
  syllabus_en: string;
  syllabus_th: string;
  slug: string;
  lessons: Lesson[];
}

export async function getProfile() {
  const filePath = path.join(CONTENT_PATH, 'profile/profile.json');
  const fileContent = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(fileContent);
}

export async function getPortfolio() {
  const filePath = path.join(CONTENT_PATH, 'profile/portfolio.json');
  const fileContent = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(fileContent);
}

export async function getCourses(): Promise<Course[]> {
  const coursesPath = path.join(CONTENT_PATH, 'courses');
  const courseFolders = fs.readdirSync(coursesPath);
  
  const courses = courseFolders.map(folder => {
    const coursePath = path.join(coursesPath, folder, 'course.json');
    const lessonsPath = path.join(coursesPath, folder, 'lessons.json');
    
    const courseData = JSON.parse(fs.readFileSync(coursePath, 'utf8'));
    const lessonsData = JSON.parse(fs.readFileSync(lessonsPath, 'utf8'));
    
    return {
      ...courseData,
      slug: folder,
      lessons: lessonsData
    };
  });
  
  return courses;
}

export async function getCourseBySlug(slug: string): Promise<Course | null> {
  const coursePath = path.join(CONTENT_PATH, 'courses', slug, 'course.json');
  const lessonsPath = path.join(CONTENT_PATH, 'courses', slug, 'lessons.json');
  
  if (!fs.existsSync(coursePath)) return null;
  
  const courseData = JSON.parse(fs.readFileSync(coursePath, 'utf8'));
  const lessonsData = JSON.parse(fs.readFileSync(lessonsPath, 'utf8'));
  
  return {
    ...courseData,
    slug,
    lessons: lessonsData
  };
}

export async function getLesson(courseSlug: string, lessonId: string): Promise<Lesson | null> {
  const course = await getCourseBySlug(courseSlug);
  if (!course) return null;
  
  const lesson = course.lessons.find((l: Lesson) => l.id === lessonId);
  return lesson || null;
}
