import React, { useState, useEffect } from "react";
import { 
  ArrowLeft, Star, Clock, Award, Check, Play, BookOpen, 
  GraduationCap, Briefcase, Sparkles, ChevronDown, ChevronRight, CheckCircle2 
} from "lucide-react";
import { Course, CurriculumChapter } from "../types";
import { categories, reviews, faqs } from "../data/courses";
import ConsultationForm from "./ConsultationForm";

interface CourseDetailPageProps {
  course: Course;
  onBack: () => void;
}

export default function CourseDetailPage({ course, onBack }: CourseDetailPageProps) {
  const [openChapterIndex, setOpenChapterIndex] = useState<number>(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [activeTab, setActiveTab] = useState<"overview" | "curriculum" | "instructor" | "gallery">("overview");

  useEffect(() => {
    // Scroll to top on page render
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [course]);

  const toggleChapter = (index: number) => {
    setOpenChapterIndex(openChapterIndex === index ? -1 : index);
  };

  return (
    <div id="course-detail-container" className="pt-20 bg-neutral-50/50 min-h-screen pb-16">
      {/* 1. HERO HEADER BANNER */}
      <section id="course-detail-hero" className="bg-neutral-900 text-white py-12 lg:py-16 relative overflow-hidden">
        {/* Background mesh */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#1e40af_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-800/10 rounded-full filter blur-3xl"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Back button */}
          <button
            onClick={onBack}
            className="inline-flex items-center space-x-2 text-xs font-bold text-neutral-400 hover:text-white mb-6 uppercase tracking-wider transition-colors bg-white/5 hover:bg-white/10 px-3.5 py-2 rounded-lg border border-white/10 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Quay lại danh sách khóa học</span>
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-8 space-y-4">
              <div className="flex flex-wrap gap-2 items-center">
                <span className="bg-blue-800 text-white text-[10px] sm:text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded">
                  {categories.find(c => c.id === course.category)?.name || "Nghiệp vụ"}
                </span>
                <span className="bg-neutral-800 text-amber-400 text-[10px] sm:text-xs font-extrabold uppercase tracking-wider px-2.5 py-1 rounded border border-neutral-700 flex items-center space-x-1">
                  <Award className="w-3.5 h-3.5 shrink-0" />
                  <span>Top-Rated Certification</span>
                </span>
              </div>

              <h1 className="font-serif font-extrabold text-3xl sm:text-4xl lg:text-5xl leading-tight text-white tracking-tight">
                {course.title}
              </h1>

              <p className="text-sm sm:text-base text-neutral-350 leading-relaxed font-sans max-w-3xl">
                {course.description}
              </p>

              {/* Stats group row */}
              <div className="flex flex-wrap items-center gap-y-3 gap-x-6 pt-3 text-xs sm:text-sm text-neutral-300 font-medium border-t border-white/10">
                <div className="flex items-center space-x-1.5">
                  <span className="text-amber-400 text-base">★</span>
                  <span className="font-bold text-white text-sm sm:text-base">{course.rating}</span>
                  <span className="text-neutral-400">({course.reviewCount} đánh giá)</span>
                </div>
                <div className="flex items-center space-x-1.5 border-l border-neutral-700 pl-6">
                  <Clock className="w-4 h-4 text-blue-500" />
                  <span>Thời lượng: <b>{course.duration}</b></span>
                </div>
                <div className="flex items-center space-x-1.5 border-l border-neutral-700 pl-6">
                  <GraduationCap className="w-4 h-4 text-amber-500" />
                  <span>Cấp độ: <b>{course.level}</b></span>
                </div>
                <div className="flex items-center space-x-1.5 border-l border-neutral-700 pl-6">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-ping"></span>
                  <span>Học Online 100% trọn đời</span>
                </div>
              </div>
            </div>

            {/* Right Booking Panel column */}
            <div className="lg:col-span-4 bg-neutral-800 border border-neutral-700 rounded-2xl p-5 shadow-2xl space-y-4">
              <div className="text-center space-y-1 bg-neutral-900/60 py-3 rounded-lg border border-neutral-750">
                <p className="text-[10px] text-neutral-400 uppercase tracking-widest font-bold">Học phí ưu đãi trọn gói</p>
                <div className="flex items-center justify-center space-x-2">
                  <span className="text-neutral-400 line-through text-xs">{course.originalPrice.toLocaleString("vi-VN")}đ</span>
                  <span className="text-amber-400 font-extrabold text-2xl">{course.price.toLocaleString("vi-VN")}đ</span>
                </div>
                <p className="text-[10px] text-green-400 font-medium">Tiết kiệm {Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100)}% học phí</p>
              </div>

              <div className="space-y-2 text-xs text-neutral-300 font-medium">
                <div className="flex items-center space-x-2.5">
                  <Check className="w-4 h-4 text-green-500" />
                  <span>Sở hữu trọn đời quyền xem video</span>
                </div>
                <div className="flex items-center space-x-2.5">
                  <Check className="w-4 h-4 text-green-500" />
                  <span>Bao gồm toàn bộ giáo trình gốc</span>
                </div>
                <div className="flex items-center space-x-2.5">
                  <Check className="w-4 h-4 text-green-500" />
                  <span>Chứng nhận chuẩn Saigontourist</span>
                </div>
              </div>

              <button
                onClick={() => {
                  const el = document.getElementById("enroll-consultation-section");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold py-3.5 rounded-xl text-center text-xs sm:text-sm uppercase tracking-wider shadow-lg shadow-amber-950/20 active:translate-y-0 hover:-translate-y-0.5 transition-all cursor-pointer"
              >
                Nhận tư vấn & Đăng ký học
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. TABBED DETAIL CONTENT NAVIGATION */}
      <section id="course-detail-tabs" className="bg-white border-b border-gray-100 sticky top-16 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 overflow-x-auto text-xs sm:text-sm font-bold uppercase tracking-wider py-4">
            <button
              onClick={() => setActiveTab("overview")}
              className={`pb-1 border-b-2 transition-colors cursor-pointer ${
                activeTab === "overview" ? "border-blue-800 text-blue-900" : "border-transparent text-gray-500 hover:text-blue-850"
              }`}
            >
              Tổng quan
            </button>
            <button
              onClick={() => setActiveTab("curriculum")}
              className={`pb-1 border-b-2 transition-colors cursor-pointer ${
                activeTab === "curriculum" ? "border-blue-800 text-blue-900" : "border-transparent text-gray-500 hover:text-blue-850"
              }`}
            >
              Nội dung chương trình ({course.curriculum.length} Chương)
            </button>
            <button
              onClick={() => setActiveTab("instructor")}
              className={`pb-1 border-b-2 transition-colors cursor-pointer ${
                activeTab === "instructor" ? "border-blue-800 text-blue-900" : "border-transparent text-gray-500 hover:text-blue-850"
              }`}
            >
              Giảng viên
            </button>
            <button
              onClick={() => setActiveTab("gallery")}
              className={`pb-1 border-b-2 transition-colors cursor-pointer ${
                activeTab === "gallery" ? "border-blue-800 text-blue-900" : "border-transparent text-gray-500 hover:text-blue-850"
              }`}
            >
              Hình ảnh thực hành ({course.studentProjects.length})
            </button>
          </div>
        </div>
      </section>

      {/* 3. MAIN SECTION CONTAINER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT 8 COLUMNS: TAB CONTENTS */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* TAB: OVERVIEW */}
            {activeTab === "overview" && (
              <div id="tab-overview-content" className="space-y-8">
                {/* A. Bạn sẽ học được gì */}
                <div className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 shadow-sm space-y-4">
                  <h2 className="font-serif font-bold text-lg text-neutral-900 flex items-center space-x-2">
                    <Sparkles className="w-5 h-5 text-amber-500 shrink-0" />
                    <span>Bạn sẽ học được những gì từ khóa học này?</span>
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs sm:text-sm text-gray-700">
                    {course.skillsAcquired.map((skill, index) => (
                      <div key={index} className="flex items-start space-x-2.5">
                        <div className="w-5 h-5 rounded-full bg-green-50 border border-green-200 text-green-600 flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-3.5 h-3.5" />
                        </div>
                        <span className="font-medium leading-normal">{skill}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* B. Video Bài học mẫu */}
                <div className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 shadow-sm space-y-4">
                  <h2 className="font-serif font-bold text-lg text-neutral-900 flex items-center space-x-2">
                    <Play className="w-5 h-5 text-blue-800 shrink-0" />
                    <span>Trải nghiệm Video Bài học mẫu</span>
                  </h2>
                  <p className="text-xs sm:text-sm text-gray-500 font-sans leading-relaxed">
                    Xem trước trích đoạn một bài giảng chất lượng cao trong hệ thống e-learning để trải nghiệm chất lượng hình ảnh sắc nét, thao tác thực tế tỉ mỉ từ giảng viên.
                  </p>

                  <div className="bg-neutral-950 rounded-xl overflow-hidden aspect-video border border-neutral-800 relative shadow-inner">
                    {isVideoPlaying ? (
                      <video
                        src={course.videoSampleUrl}
                        controls
                        autoPlay
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-center cursor-pointer group" onClick={() => setIsVideoPlaying(true)}>
                        <img
                          src={course.image}
                          alt="Video Cover"
                          className="absolute inset-0 w-full h-full object-cover opacity-65 group-hover:scale-101 transition-transform"
                          referrerPolicy="no-referrer"
                        />
                        <div className="relative w-16 h-16 rounded-full bg-blue-800/90 text-white flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                          <Play className="w-6 h-6 fill-white text-white translate-x-0.5" />
                        </div>
                        <span className="relative text-white font-bold text-xs sm:text-sm mt-3 bg-black/60 backdrop-blur-sm px-4 py-1.5 rounded-full border border-white/10 uppercase tracking-wider">
                          Bấm để xem video mẫu ({course.instructor.name.replace("Giảng viên", "").trim()})
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* C. Cơ hội nghề nghiệp */}
                <div className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 shadow-sm space-y-4">
                  <h2 className="font-serif font-bold text-lg text-neutral-900 flex items-center space-x-2">
                    <Briefcase className="w-5 h-5 text-blue-600 shrink-0" />
                    <span>Sau khóa học bạn có thể làm những gì?</span>
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm text-gray-700 font-sans">
                    {course.careerOpportunities.map((career, index) => (
                      <div key={index} className="flex items-start space-x-2.5 p-3.5 bg-neutral-50 rounded-xl border border-gray-100">
                        <div className="w-6 h-6 rounded-lg bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                          {index + 1}
                        </div>
                        <span className="font-semibold text-gray-800 leading-normal">{career}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB: CURRICULUM */}
            {activeTab === "curriculum" && (
              <div id="tab-curriculum-content" className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 shadow-sm space-y-6">
                <div className="space-y-1.5">
                  <h2 className="font-serif font-bold text-lg sm:text-xl text-neutral-900 flex items-center space-x-2">
                    <BookOpen className="w-5 h-5 text-blue-800" />
                    <span>Nội dung chương trình đào tạo</span>
                  </h2>
                  <p className="text-xs sm:text-sm text-gray-500 font-sans leading-relaxed">
                    Khóa học chia làm các chương bài giảng cô đọng, đi từ cơ bản, kỹ năng nền tảng đến sáng tạo nghệ thuật nâng cao. Bấm vào từng chương để xem bài giảng chi tiết.
                  </p>
                </div>

                <div className="space-y-3">
                  {course.curriculum.map((chap, idx) => {
                    const isChapterOpen = openChapterIndex === idx;
                    return (
                      <div key={idx} className="border border-gray-100 rounded-xl overflow-hidden transition-all shadow-sm">
                        <button
                          onClick={() => toggleChapter(idx)}
                          className="w-full text-left px-5 py-4 flex justify-between items-center bg-neutral-50/50 hover:bg-neutral-50 cursor-pointer"
                        >
                          <div className="space-y-1">
                            <span className="text-[10px] uppercase font-mono font-bold text-blue-850">Chương {idx + 1} • {chap.duration}</span>
                            <h3 className="font-serif font-bold text-sm sm:text-base text-neutral-900 leading-tight">{chap.title}</h3>
                          </div>
                          {isChapterOpen ? (
                            <ChevronDown className="w-5 h-5 text-blue-850 shrink-0" />
                          ) : (
                            <ChevronRight className="w-5 h-5 text-gray-400 shrink-0" />
                          )}
                        </button>
                        
                        {isChapterOpen && (
                          <div className="px-5 pb-5 pt-3 border-t border-gray-50 bg-white space-y-4">
                            <p className="text-xs sm:text-sm text-gray-500 italic leading-relaxed">{chap.description}</p>
                            <div className="space-y-2 pt-2 border-t border-gray-50">
                              <span className="text-[10px] uppercase font-bold text-gray-400 block tracking-wider">Danh sách bài học chi tiết</span>
                              {chap.lessons.map((lesson, lIdx) => (
                                <div key={lIdx} className="flex items-center space-x-3 text-xs sm:text-sm text-gray-700 py-1 font-medium hover:text-blue-800 transition-colors">
                                  <div className="w-1.5 h-1.5 rounded-full bg-blue-800 shrink-0"></div>
                                  <span>Bài {lIdx + 1}: {lesson}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* TAB: INSTRUCTOR */}
            {activeTab === "instructor" && (
              <div id="tab-instructor-content" className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 shadow-sm space-y-6">
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 border-b border-gray-100 pb-6">
                  <img
                    src={course.instructor.avatar}
                    alt={course.instructor.name}
                    className="w-24 h-24 sm:w-32 sm:h-32 rounded-2xl object-cover border-2 border-blue-100 shadow-md shadow-blue-50"
                    referrerPolicy="no-referrer"
                  />
                  <div className="text-center sm:text-left space-y-2">
                    <span className="text-[10px] uppercase font-mono font-bold text-amber-600 tracking-wider">Giảng viên hướng dẫn chính</span>
                    <h2 className="font-serif font-bold text-xl sm:text-2xl text-neutral-900 leading-tight">{course.instructor.name}</h2>
                    <p className="text-xs sm:text-sm font-bold text-blue-800">{course.instructor.title}</p>
                    <p className="text-xs sm:text-sm text-gray-500 font-sans leading-relaxed max-w-xl">{course.instructor.bio}</p>
                  </div>
                </div>

                <div className="space-y-3.5">
                  <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 block">Thành tựu và Bằng cấp tiêu biểu</span>
                  <div className="grid grid-cols-1 gap-2.5 text-xs text-gray-700 font-medium">
                    {course.instructor.achievements.map((ach, index) => (
                      <div key={index} className="flex items-start space-x-2.5 p-3 bg-neutral-50/70 border border-gray-100 rounded-lg">
                        <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                        <span>{ach}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB: GALLERY */}
            {activeTab === "gallery" && (
              <div id="tab-gallery-content" className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 shadow-sm space-y-6">
                <div className="space-y-1.5">
                  <h2 className="font-serif font-bold text-lg text-neutral-900">Hình ảnh thực hành từ lớp học viên</h2>
                  <p className="text-xs text-gray-500 font-sans leading-relaxed">
                    Đây là thành phẩm thực tế được chụp bởi chính học viên của khóa học sau khi thực hành bám sát tài liệu hướng dẫn và gửi bài về cho giảng viên nhận xét.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {course.studentProjects.map((proj, idx) => (
                    <div key={idx} className="group relative rounded-xl overflow-hidden border border-gray-100 shadow-sm aspect-square bg-neutral-50 cursor-zoom-in">
                      <img
                        src={proj.image}
                        alt={proj.title}
                        className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3.5">
                        <p className="text-[11px] font-bold text-white leading-tight">{proj.title}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* RIGHT 4 COLUMNS: RESERVED FOR CONSULTATION INQUIRY FORM */}
          <div id="enroll-consultation-section" className="lg:col-span-4 lg:sticky lg:top-24">
            <ConsultationForm preselectedCourseId={course.id} />
          </div>

        </div>
      </div>
    </div>
  );
}
