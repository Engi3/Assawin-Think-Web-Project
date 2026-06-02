// ประเภทข้อมูลสำหรับบทเรียน (Lesson)
export interface Lesson {
  id: string;
  title: string;
  title_en: string;
  videoUrl: string;
  content: string;
  content_en: string;
  resources: { name: string; name_en: string; url: string }[];
}

// ประเภทข้อมูลสำหรับรายวิชา (Course)
export interface Course {
  id: string;
  code: string;
  title: string;
  title_en: string;
  description: string;
  description_en: string;
  image: string;
  syllabus: string;
  syllabus_en: string;
  lessons: Lesson[];
}

export const courses: Course[] = [
  {
    id: "mechatronics-101",
    code: "MCT101",
    title: "พื้นฐานเมคคาทรอนิกส์",
    title_en: "Basic Mechatronics",
    description: "เรียนรู้เกี่ยวกับการผสมผสานระหว่างวิศวกรรมเครื่องกล อิเล็กทรอนิกส์ และการควบคุมด้วยคอมพิวเตอร์",
    description_en: "Explore the integration of mechanical engineering, electronics, and computer control systems.",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800",
    syllabus: "รายวิชานี้ครอบคลุมเนื้อหาตั้งแต่พื้นฐานของเซนเซอร์ (Sensors), ตัวขับเคลื่อน (Actuators), ไปจนถึงการเขียนโปรแกรมควบคุมไมโครคอนโทรลเลอร์เบื้องต้น",
    syllabus_en: "This course covers everything from basic sensors and actuators to micro-controller programming for automation.",
    lessons: [
      {
        id: "intro-to-mct",
        title: "บทที่ 1: บทนำสู่เมคคาทรอนิกส์",
        title_en: "Chapter 1: Intro to Mechatronics",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        content: "เมคคาทรอนิกส์คือการบูรณาการศาสตร์หลายแขนงเข้าด้วยกัน เพื่อสร้างระบบที่ชาญฉลาด...",
        content_en: "Mechatronics is the synergy of multiple engineering fields to create intelligent systems...",
        resources: [
          { name: "สไลด์ประกอบการสอน", name_en: "Lecture Slides", url: "#" }
        ]
      }
    ]
  },
  {
    id: "robotics-design",
    code: "ROB201",
    title: "การออกแบบและสร้างหุ่นยนต์",
    title_en: "Robotics Design",
    description: "เน้นการออกแบบโครงสร้างหุ่นยนต์และระบบส่งกำลัง",
    description_en: "Focused on mechanical structure design and transmission systems for robotics.",
    image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=800",
    syllabus: "วิชานี้จะสอนการใช้โปรแกรม CAD ในการออกแบบหุ่นยนต์ การคำนวณ Kinematics และการประกอบหุ่นยนต์จริง",
    syllabus_en: "Learn CAD modeling, kinematics calculation, and physical assembly of robotic systems.",
    lessons: [
      {
        id: "robot-kinematics",
        title: "บทที่ 1: จลนศาสตร์ของหุ่นยนต์",
        title_en: "Chapter 1: Robot Kinematics",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        content: "การคำนวณตำแหน่งและทิศทางของแขนกลหุ่นยนต์โดยใช้คณิตศาสตร์...",
        content_en: "Calculating the position and orientation of robotic arms using advanced mathematics...",
        resources: [
          { name: "ชีทสรุปสูตร", name_en: "Formula Cheat Sheet", url: "#" }
        ]
      }
    ]
  }
];

export const teacherProfile = {
  name: "Assawin Namsert",
  title: "Mechatronics & Robotics Specialist",
  department: "Department of Mechatronics Engineering",
  bio: "มีความเชี่ยวชาญในการพัฒนาหุ่นยนต์อุตสาหกรรมและระบบอัตโนมัติ มีประสบการณ์การสอนมากกว่า 10 ปี มุ่งเน้นการถ่ายทอดความรู้ผ่านการลงมือทำจริง",
  bio_en: "Specializing in industrial robotics and automation with over 10 years of academic experience. Focused on practical, hands-on learning and innovation.",
  philosophy: "เรียนรู้ผ่านการสร้างสรรค์ ต่อยอดด้วยนวัตกรรม",
  philosophy_en: "Learn by building, evolve through innovation.",
  email: "assawin@example.com",
  github: "https://github.com/assawin",
  researchGate: "https://researchgate.net/profile/Assawin_Namsert",
  photoUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400"
};
