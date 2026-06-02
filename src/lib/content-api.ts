import fs from 'fs';
import path from 'path';

const CONTENT_PATH = path.join(process.cwd(), 'src/content');

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

export async function getCourses() {
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

export async function getCourseBySlug(slug: string) {
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

export async function getLesson(courseSlug: string, lessonId: string) {
  const course = await getCourseBySlug(courseSlug);
  if (!course) return null;
  
  const lesson = course.lessons.find((l: any) => l.id === lessonId);
  return lesson || null;
}
