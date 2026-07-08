export interface Instructor {
  id: string;
  name: string;
  title: string;
  avatar: string;
  bio: string;
  achievements: string[];
}

export interface CurriculumChapter {
  title: string;
  description: string;
  duration: string;
  lessons: string[];
}

export interface Course {
  id: string;
  title: string;
  category: string;
  level: 'Cơ bản' | 'Trung cấp' | 'Chuyên sâu' | 'Quản lý';
  duration: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviewCount: number;
  image: string;
  videoSampleUrl: string;
  description: string;
  shortDescription: string;
  skillsAcquired: string[];
  careerOpportunities: string[];
  instructor: Instructor;
  curriculum: CurriculumChapter[];
  studentProjects: { title: string; image: string }[];
  isTopRated?: boolean;
}

export interface CourseCategory {
  id: string;
  name: string;
  icon: string;
  description: string;
  courseCount: number;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface StudentReview {
  id: string;
  studentName: string;
  courseName: string;
  rating: number;
  comment: string;
  date: string;
  avatar: string;
  jobTitle?: string;
}

export interface ConsultationInquiry {
  id: string;
  fullName: string;
  phoneNumber: string;
  email: string;
  courseId: string;
  notes?: string;
  createdAt: string;
  status: 'Chờ liên hệ' | 'Đã tư vấn' | 'Đã nhập học';
}
