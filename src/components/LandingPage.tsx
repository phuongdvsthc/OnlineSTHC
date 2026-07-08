import React, { useState } from "react";
import { 
  ArrowRight, CheckCircle2, Award, Users, BookOpen, Star, 
  Tv, Compass, Network, HelpCircle, ChevronDown, ChevronUp, Play, 
  TrendingUp, ShieldCheck, Laptop, Shield, MessageSquare, Coffee, 
  UtensilsCrossed, Cake, Hotel, Clock, ArrowRightLeft 
} from "lucide-react";
import { courses, categories, faqs, reviews } from "../data/courses";
import { Course } from "../types";
import ConsultationForm from "./ConsultationForm";

interface LandingPageProps {
  onNavigate: (view: "home" | "courses" | "detail" | "admin", courseId?: string) => void;
}

export default function LandingPage({ onNavigate }: LandingPageProps) {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [openFaqId, setOpenFaqId] = useState<string | null>("faq_1");
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [activeReviewIndex, setActiveReviewIndex] = useState(0);

  // Group and filter courses for Highlight section
  const highlightedCourses = activeCategory === "all" 
    ? courses.slice(0, 3) 
    : courses.filter(c => c.category === activeCategory).slice(0, 3);

  // Stats items
  const stats = [
    { value: "5,000+", label: "Học viên đã học", desc: "Tốt nghiệp & có việc làm" },
    { value: "30+", label: "Khóa học cao cấp", desc: "Sát nhu cầu doanh nghiệp" },
    { value: "190+", label: "Giảng viên kỳ cựu", desc: "Hơn 15 năm kinh nghiệm" },
    { value: "35+", label: "Năm truyền thống", desc: "Đại học & Cao đẳng Saigontourist" }
  ];

  // Training objectives (6 cards)
  const objectives = [
    { title: "Làm việc tại nhà hàng", desc: "Bếp nóng, bếp bánh, quầy bar hoặc quản lý F&B tại hệ thống ẩm thực cao cấp.", icon: UtensilsCrossed, color: "text-blue-700 bg-blue-50 border-blue-100" },
    { title: "Làm việc tại khách sạn", desc: "Nhập môn và quản lý nghiệp vụ tiền sảnh, buồng phòng, giám sát buồng, ẩm thực khách sạn 5 sao.", icon: Hotel, color: "text-amber-600 bg-amber-50 border-amber-100" },
    { title: "Mở quán cà phê tự kinh doanh", desc: "Làm chủ quy trình chiết xuất, pha chế hạt specialty, thiết kế menu uống, dự tính giá vốn và quản lý kho.", icon: Coffee, color: "text-emerald-600 bg-emerald-50 border-emerald-100" },
    { title: "Mở tiệm bánh ngọt", desc: "Sở hữu tay nghề nướng bánh Âu hiện đại, Mousse, bánh mì Sourdough, teabreak cung ứng chuỗi.", icon: Cake, color: "text-pink-600 bg-pink-50 border-pink-100" },
    { title: "Nâng cao tay nghề hiện có", desc: "Chuẩn hóa nghiệp vụ theo chuẩn du lịch VTOS của quốc gia và khu vực ASEAN để thăng tiến quản lý.", icon: TrendingUp, color: "text-blue-600 bg-blue-50 border-blue-100" },
    { title: "Chuẩn bị làm việc ở nước ngoài", desc: "Trang bị tay nghề và chứng nhận uy tín đạt chuẩn quốc tế để tự tin định cư, làm việc quốc tế.", icon: ArrowRightLeft, color: "text-indigo-600 bg-indigo-50 border-indigo-100" }
  ];

  // Problems listed (Are you...)
  const problems = [
    "Muốn tự tay làm ra những đĩa thức ăn, ly cà phê nghệ thuật chuẩn 5 sao nhưng thiếu kỹ năng nền tảng?",
    "Muốn nâng tầm kinh doanh quán xá nhưng menu nghèo nàn, giá vốn cao và chưa biết quản lý vận hành?",
    "Muốn thi thăng chức lên Giám sát, Quản lý tại khách sạn nhưng chưa có chứng chỉ chuẩn VTOS?",
    "Quá bận rộn, không có thời gian đến trường học tập trung theo giờ cố định hàng ngày?",
    "Ngại học trực tuyến chất lượng kém, video mờ, lý thuyết suông và không được giảng viên hỗ trợ sửa lỗi?"
  ];

  // Why choose us (8 points)
  const keyFeatures = [
    { title: "Giảng viên Thực tế", desc: "Học từ các Bếp trưởng, Chuyên gia đầu ngành từ hệ thống khách sạn Majestic, Rex, Caravelle.", icon: Award },
    { title: "Video HD 4K Đa Góc Quay", desc: "Quay cận cảnh thao tác tay của giảng viên, đính kèm công thức định lượng chi tiết.", icon: Tv },
    { title: "Học Mọi Lúc Mọi Thiết Bị", desc: "Kích hoạt 1 lần, sở hữu tài khoản trọn đời. Học trên điện thoại, máy tính, iPad tiện lợi.", icon: Laptop },
    { title: "Giáo Trình Sát Doanh Nghiệp", desc: "Kiến thức thực tiễn chuẩn VTOS, dạy đúng những gì nhà hàng - khách sạn lớn đang tuyển dụng.", icon: Compass },
    { title: "Chấm Điểm & Sửa Lỗi 1-1", desc: "Học viên nộp bài thực hành bằng hình ảnh/video và được giảng viên phản hồi, chỉ lỗi sai tận tâm.", icon: MessageSquare },
    { title: "Chứng Nhận Uy Tín Quốc Gia", desc: "Cấp chứng nhận hoàn thành khóa học từ Trường Cao đẳng Du lịch Sài Gòn danh tiếng 35 năm.", icon: ShieldCheck },
    { title: "Hỗ Trợ Cộng Đồng Vĩnh Viễn", desc: "Tham gia nhóm kín trao đổi kinh nghiệm, chia sẻ nguồn mua nguyên vật liệu, dụng cụ giá sỉ.", icon: Network },
    { title: "Giới Thiệu Việc Làm Uy Tín", desc: "Kết nối trực tiếp cơ hội thực tập, việc làm tại các tập đoàn đối tác lớn thuộc Saigontourist Group.", icon: Users }
  ];

  const toggleFaq = (id: string) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };

  const handleNextReview = () => {
    setActiveReviewIndex((prev) => (prev + 1) % reviews.length);
  };

  const handlePrevReview = () => {
    setActiveReviewIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  return (
    <div id="landing-page-container" className="pt-20">
      {/* 1. HERO SECTION */}
      <section id="hero-section" className="bg-gradient-to-b from-blue-50/40 via-white to-white py-16 lg:py-24 overflow-hidden border-b border-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column Text */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center space-x-2 bg-blue-50 border border-blue-200/50 px-3.5 py-1.5 rounded-full text-blue-900 text-xs sm:text-sm font-bold uppercase tracking-wider animate-pulse">
                <Award className="w-4.5 h-4.5 text-amber-600" />
                <span>Khai phóng nghệ thuật nghề nghiệp chuẩn 5 sao</span>
              </div>
              
              <h1
                className="font-serif font-extrabold text-4xl sm:text-5xl lg:text-6xl text-neutral-900 leading-[1.12] tracking-tight"
                style={{ fontFamily: "Times New Roman", fontSize: "54px" }}
              >
                Học nghề đẳng cấp chuẩn 5 sao <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-800 to-amber-500">
                  cùng Trường Saigontourist
                </span>
              </h1>
              
              <p className="text-gray-650 text-base sm:text-lg lg:text-xl max-w-2xl mx-auto lg:mx-0 leading-relaxed font-sans">
                Chương trình đào tạo nghề trực tuyến hàng đầu từ <b>Trường Trung cấp Du lịch & Khách sạn Saigontourist</b>. Làm chủ kỹ năng nấu ăn, làm bánh, pha chế và quản trị khách sạn thực tế cùng các Bếp trưởng & Chuyên gia đầu ngành.
              </p>

              {/* USP Checkmarks */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-lg mx-auto lg:mx-0 text-left text-sm sm:text-base text-gray-700 font-medium">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-5 h-5 text-blue-850 shrink-0" />
                  <span>Học 100% online trọn đời</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-5 h-5 text-blue-850 shrink-0" />
                  <span>Bếp trưởng 5 sao trực tiếp kèm cặp</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-5 h-5 text-blue-850 shrink-0" />
                  <span>Chứng chỉ đào tạo uy tín toàn quốc</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-5 h-5 text-blue-850 shrink-0" />
                  <span>Hỗ trợ việc làm sau khi tốt nghiệp</span>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <button
                  id="hero-primary-cta"
                  onClick={() => onNavigate("courses")}
                  className="w-full sm:w-auto bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold px-8 py-4 rounded-xl shadow-lg shadow-amber-500/10 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center space-x-2 text-base cursor-pointer"
                >
                  <span>Khám phá khóa học</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button
                  id="hero-secondary-cta"
                  onClick={() => {
                    const el = document.getElementById("consultation-form-section");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="w-full sm:w-auto bg-white border-2 border-amber-500/50 text-amber-600 hover:bg-amber-50/20 hover:border-amber-600 font-bold px-8 py-3.5 rounded-xl transition-all flex items-center justify-center space-x-2 text-base cursor-pointer"
                >
                  <span>Đăng ký tư vấn miễn phí</span>
                </button>
              </div>
            </div>

            {/* Right Column Image Stack */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Decorative backgrounds */}
                <div className="absolute -top-6 -left-6 w-72 h-72 bg-amber-100 rounded-full mix-blend-multiply filter blur-2xl opacity-60 animate-blob"></div>
                <div className="absolute -bottom-8 -right-6 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-2xl opacity-60 animate-blob" style={{ animationDelay: "2s" }}></div>
                
                {/* Main Hero Card */}
                <div className="relative bg-white border border-gray-100 rounded-3xl p-3 shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500">
                  <img
                    src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&q=80&w=800"
                    alt="Saigontourist Chef Whisking"
                    className="rounded-2xl w-full h-[320px] sm:h-[380px] object-cover"
                    referrerPolicy="no-referrer"
                  />
                  {/* Overlay Floater */}
                  <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-sm border border-blue-50 rounded-2xl p-4 shadow-lg flex items-center space-x-3.5">
                    <div className="w-11 h-11 rounded-full bg-blue-100 flex items-center justify-center text-blue-800 shrink-0">
                      <Star className="w-6 h-6 fill-amber-500 text-amber-500" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider leading-none">Chương trình đào tạo</h4>
                      <p className="text-sm sm:text-base font-extrabold text-neutral-900 mt-1">Đạt chứng nhận uy tín chuẩn VTOS</p>
                    </div>
                  </div>
                </div>

                {/* Second Floating elements */}
                <div className="absolute -right-4 top-12 bg-white border border-gray-100 rounded-2xl p-3 shadow-lg hidden sm:flex items-center space-x-2 animate-bounce" style={{ animationDuration: "3s" }}>
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-ping"></div>
                  <span className="text-xs font-bold text-gray-700">● 142 học viên đang online</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. STATS BAR */}
      <section id="stats-section" className="bg-blue-900 text-white py-12 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center divide-y divide-blue-800 lg:divide-y-0 lg:divide-x divide-blue-800/80">
            {stats.map((stat, idx) => (
              <div key={idx} className="space-y-1.5 pt-6 lg:pt-0">
                <p className="font-serif font-extrabold text-3xl sm:text-4xl text-amber-400">{stat.value}</p>
                <p className="text-base sm:text-lg font-bold tracking-wide">{stat.label}</p>
                <p className="text-xs sm:text-sm text-blue-200">{stat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. TRAINING OBJECTIVES */}
      <section id="objectives-section" className="py-20 bg-neutral-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
            <h2 className="font-serif font-bold text-3xl sm:text-4xl text-neutral-900">Mục Tiêu Đào Tạo / Học Để Làm Gì?</h2>
            <div className="w-16 h-1 bg-blue-800 mx-auto rounded"></div>
            <p className="text-sm sm:text-base text-gray-500 font-sans">
              Các khóa học trực tuyến tại Saigontourist thiết kế bám sát thực tế nghề nghiệp, phục vụ trực tiếp cho các nhóm mục tiêu sự nghiệp rõ ràng.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {objectives.map((obj, index) => {
              const Icon = obj.icon;
              return (
                <div
                  key={index}
                  className="bg-white border border-gray-100 p-6 rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${obj.color} shrink-0`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-serif font-bold text-lg sm:text-xl text-neutral-900 leading-snug">{obj.title}</h3>
                    <p className="text-xs sm:text-sm text-gray-500 leading-relaxed font-sans">{obj.desc}</p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-gray-50 flex items-center text-xs sm:text-sm font-bold text-blue-700 hover:text-blue-900 cursor-pointer" onClick={() => onNavigate("courses")}>
                    <span>Tìm hiểu khóa học liên quan</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. PAIN POINTS */}
      <section id="problems-section" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Image */}
            <div className="lg:col-span-5 relative order-last lg:order-first">
              <div className="relative mx-auto max-w-md">
                <div className="absolute -top-3 -right-3 w-full h-full bg-blue-800 rounded-2xl"></div>
                <div className="relative bg-white border border-gray-100 rounded-2xl p-2 shadow-lg">
                  <img
                    src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800"
                    alt="Student reading iPad in kitchen"
                    className="rounded-xl w-full h-[360px] object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            </div>

            {/* Right Bullet Points */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <h2 className="font-serif font-bold text-3xl sm:text-4xl text-neutral-900">Bạn Có Đang...</h2>
                <div className="w-12 h-1 bg-blue-800 rounded"></div>
              </div>

              <div className="space-y-4">
                {problems.map((problem, idx) => (
                  <div key={idx} className="flex items-start space-x-3">
                    <div className="w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center text-blue-800 shrink-0 mt-0.5 border border-blue-200">
                      <span className="text-xs font-bold">?</span>
                    </div>
                    <p className="text-gray-700 text-sm sm:text-base font-semibold leading-relaxed">{problem}</p>
                  </div>
                ))}
              </div>

              <div className="bg-amber-50 border border-amber-200/50 p-6 rounded-2xl mt-8">
                <p className="font-serif italic text-amber-950 font-semibold text-center text-base sm:text-lg lg:text-xl">
                  &ldquo;Nếu câu trả lời là CÓ, bạn đang ở đúng nơi. Chúng tôi biến đam mê của bạn thành tay nghề chuyên nghiệp được bảo chứng bởi thương hiệu quốc gia.&rdquo;
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. WHY CHOOSE US */}
      <section id="why-choose-us-section" className="py-20 bg-neutral-900 text-white relative overflow-hidden">
        {/* Abstract background graphics */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-800/20 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-600/10 rounded-full filter blur-3xl"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
            <h2 className="font-serif font-bold text-3xl sm:text-4xl text-white">Vì Sao Chọn Saigontourist Online Learning?</h2>
            <div className="w-16 h-1 bg-blue-500 mx-auto rounded"></div>
            <p className="text-sm sm:text-base text-neutral-400 font-sans">
              Chúng tôi không chỉ bán những bài giảng ghi hình sẵn, chúng tôi cung cấp trải nghiệm đào tạo nghề toàn diện, chất lượng cao và có cam kết đầu ra.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {keyFeatures.map((feat, idx) => {
              const Icon = feat.icon;
              return (
                <div key={idx} className="space-y-3.5 bg-neutral-800/40 p-5 rounded-xl border border-neutral-800 hover:border-blue-900/50 hover:bg-neutral-800/80 transition-all duration-300">
                  <div className="w-10 h-10 rounded-lg bg-blue-950/40 border border-blue-800 flex items-center justify-center text-blue-400 shrink-0">
                    <Icon className="w-5 h-5 text-amber-400" />
                  </div>
                  <h3 className="font-serif font-bold text-base sm:text-lg text-white">{feat.title}</h3>
                  <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-sans">{feat.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. COURSE CATEGORIES EXPLORER */}
      <section id="course-categories-section" className="py-20 bg-neutral-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div className="space-y-3 text-center md:text-left">
              <h2 className="font-serif font-bold text-3xl sm:text-4xl text-neutral-900">Danh Mục Khóa Học Nổi Bật</h2>
              <div className="w-16 h-1 bg-blue-800 rounded mx-auto md:mx-0"></div>
              <p className="text-xs sm:text-sm text-gray-500 font-sans font-medium">Tìm kiếm và chọn lựa chương trình học phù hợp nhất với kế hoạch của bạn.</p>
            </div>
            {/* View All Button */}
            <button
              onClick={() => onNavigate("courses")}
              className="mt-4 md:mt-0 inline-flex items-center space-x-1.5 text-sm sm:text-base font-extrabold text-amber-500 hover:text-amber-600 transition-colors self-center cursor-pointer"
            >
              <span>Xem tất cả khóa học</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2.5 mb-8 border-b border-gray-100 pb-4">
            <button
              onClick={() => setActiveCategory("all")}
              className={`px-5 py-2 rounded-full text-xs sm:text-sm font-extrabold transition-all cursor-pointer ${
                activeCategory === "all"
                  ? "bg-amber-500 text-white shadow-md shadow-amber-100"
                  : "bg-white text-gray-600 border border-gray-200 hover:border-blue-300"
              }`}
            >
              Tất cả khóa học
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-5 py-2 rounded-full text-xs sm:text-sm font-extrabold transition-all cursor-pointer ${
                  activeCategory === cat.id
                    ? "bg-amber-500 text-white shadow-md shadow-amber-100"
                    : "bg-white text-gray-600 border border-gray-200 hover:border-blue-300"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Courses Highlights Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {highlightedCourses.map((course) => (
              <div
                key={course.id}
                className="bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between group overflow-hidden"
              >
                <div>
                  {/* Image with level tag */}
                  <div className="relative overflow-hidden h-[190px]">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-4 left-4 bg-blue-850 text-white text-[11px] uppercase font-bold tracking-wider px-2.5 py-1 rounded shadow-sm">
                      {course.level}
                    </div>
                    {course.isTopRated && (
                      <div className="absolute top-4 right-4 bg-amber-500 text-neutral-900 text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded shadow-sm flex items-center space-x-1">
                        <Star className="w-3.5 h-3.5 fill-neutral-900 text-neutral-900 shrink-0" />
                        <span>Bán chạy</span>
                      </div>
                    )}
                  </div>

                  {/* Body Info */}
                  <div className="p-5 space-y-3">
                    <div className="flex items-center space-x-3 text-xs text-gray-400 font-medium">
                      <span className="bg-blue-50 text-blue-900 font-bold px-2 py-0.5 rounded text-[10px] uppercase">
                        {categories.find(c => c.id === course.category)?.name || "Khóa Học"}
                      </span>
                      <span className="flex items-center space-x-1">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{course.duration} học</span>
                      </span>
                    </div>

                    <h3 className="font-serif font-bold text-lg sm:text-xl text-neutral-900 leading-snug group-hover:text-blue-800 transition-colors line-clamp-2 min-h-[52px]">
                      {course.title}
                    </h3>
                    
                    <p className="text-xs sm:text-sm text-gray-500 line-clamp-2 leading-relaxed min-h-[36px]">
                      {course.shortDescription}
                    </p>

                    <div className="flex items-center space-x-2 pt-2 border-t border-gray-50">
                      <img
                        src={course.instructor.avatar}
                        alt={course.instructor.name}
                        className="w-7 h-7 rounded-full object-cover border border-blue-100"
                      />
                      <div className="flex flex-col text-[10px] leading-tight">
                        <span className="font-bold text-gray-700">{course.instructor.name}</span>
                        <span className="text-gray-400 font-medium max-w-[180px] truncate">{course.instructor.title}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Pricing & CTA footer */}
                <div className="px-5 pb-5 pt-3 bg-neutral-50/50 border-t border-gray-50 flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-neutral-400 line-through text-[10px] font-medium">
                      {course.originalPrice.toLocaleString("vi-VN")}đ
                    </span>
                    <span className="text-blue-850 font-extrabold text-base sm:text-lg leading-none">
                      {course.price.toLocaleString("vi-VN")}đ
                    </span>
                  </div>
                  
                  <button
                    onClick={() => onNavigate("detail", course.id)}
                    className="bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs sm:text-sm uppercase tracking-wider px-4 py-2.5 rounded-lg shadow-sm transition-colors cursor-pointer"
                  >
                    Chi tiết
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. ONLINE LEARNING EXPERIENCE */}
      <section id="experience-section" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-6 space-y-6">
              <div className="space-y-2">
                <h2 className="font-serif font-bold text-3xl sm:text-4xl text-neutral-900 leading-tight">Trải Nghiệm Học Trực Tuyến Đỉnh Cao</h2>
                <div className="w-16 h-1 bg-blue-800 rounded"></div>
              </div>
              <p className="text-gray-650 text-sm sm:text-base leading-relaxed font-sans">
                Chương trình e-learning tại Saigontourist Online được nghiên cứu và thiết kế tối ưu cho học viên thực hành tại gia. Giảng viên hướng dẫn cụ thể từng bước từ khâu chọn nguyên liệu, kiểm soát nhiệt độ lò nướng, góc đánh sữa Latte Art đến xử lý kỹ thuật phức tạp.
              </p>
              
              <ul className="space-y-3.5 text-sm sm:text-base text-gray-700">
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="w-5.5 h-5.5 text-amber-500 shrink-0 mt-0.5" />
                  <span><b>Học thử miễn phí:</b> Xem thử bài học mẫu và tài liệu trước khi đăng ký chính thức.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="w-5.5 h-5.5 text-amber-500 shrink-0 mt-0.5" />
                  <span><b>Giao diện hiện đại:</b> Trình phát video bài giảng thân thiện, hỗ trợ tua lại nhanh.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="w-5.5 h-5.5 text-amber-500 shrink-0 mt-0.5" />
                  <span><b>Tương tác hỏi đáp:</b> Để lại bình luận trực tiếp dưới bài giảng để nhận hỗ trợ từ đội ngũ trợ giảng.</span>
                </li>
              </ul>

              <div className="pt-2">
                <button
                  onClick={() => setIsVideoModalOpen(true)}
                  className="bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-sm sm:text-base uppercase tracking-wider px-6 py-3.5 rounded-xl shadow-md transition-all flex items-center space-x-2 cursor-pointer"
                >
                  <Play className="w-4 h-4 fill-white text-white" />
                  <span>Xem thử bài học mẫu</span>
                </button>
              </div>
            </div>

            {/* Right Video Mockup Column */}
            <div className="lg:col-span-6 relative">
              <div className="relative mx-auto max-w-lg">
                {/* Macbook Frame Mockup */}
                <div className="bg-neutral-900 rounded-3xl p-4 shadow-2xl relative border-4 border-neutral-800">
                  <div className="relative aspect-video rounded-xl overflow-hidden bg-neutral-950 flex items-center justify-center group cursor-pointer" onClick={() => setIsVideoModalOpen(true)}>
                    <img
                      src="https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=800"
                      alt="Cocktail drink lesson"
                      className="w-full h-full object-cover opacity-80 group-hover:scale-102 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    {/* Play button */}
                    <div className="absolute inset-0 bg-neutral-950/20 flex items-center justify-center transition-colors group-hover:bg-neutral-950/40">
                      <div className="w-16 h-16 rounded-full bg-blue-800/90 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        <Play className="w-6 h-6 fill-white text-white translate-x-0.5" />
                      </div>
                    </div>
                    {/* Caption floating */}
                    <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-sm px-3.5 py-1.5 rounded-lg border border-neutral-800 text-left">
                      <p className="text-[10px] text-amber-400 font-bold uppercase tracking-wider">Bài học mẫu</p>
                      <p className="text-xs font-bold text-white leading-none mt-0.5">Kỹ Thuật Đánh Sữa Latte Art - Thầy Tuấn</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. CORPORATE PARTNERS */}
      <section id="partners-section" className="py-16 bg-neutral-50/50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <div className="space-y-1">
            <h2 className="text-xs uppercase font-bold tracking-widest text-gray-400">Học đúng kỹ năng doanh nghiệp đang cần</h2>
            <p className="text-sm font-semibold text-gray-600">Học viên của chúng tôi thực tập & làm việc tại các khách sạn lớn:</p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 opacity-60 grayscale hover:grayscale-0 transition-all">
            <span className="font-serif font-extrabold text-xl text-neutral-800 uppercase tracking-tighter">REX HOTEL</span>
            <span className="font-serif font-extrabold text-xl text-neutral-800 uppercase tracking-tighter">CARAVELLE</span>
            <span className="font-serif font-extrabold text-xl text-neutral-800 uppercase tracking-tighter">MAJESTIC</span>
            <span className="font-serif font-extrabold text-xl text-neutral-800 uppercase tracking-tighter">NEW WORLD</span>
            <span className="font-serif font-extrabold text-xl text-neutral-800 uppercase tracking-tighter">SHERATON</span>
            <span className="font-serif font-extrabold text-xl text-neutral-800 uppercase tracking-tighter">INTERCONTINENTAL</span>
          </div>
        </div>
      </section>

      {/* 9. TESTIMONIALS CAROUSEL */}
      <section id="testimonials-section" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
            <h2 className="font-serif font-bold text-3xl sm:text-4xl text-neutral-900">Học Viên Nói Gì Về Chúng Tôi</h2>
            <div className="w-16 h-1 bg-blue-800 mx-auto rounded"></div>
            <p className="text-sm sm:text-base text-gray-500 font-sans">
              Câu chuyện thành công từ những người học đi trước đã thay đổi thu nhập và cơ hội nghề nghiệp nhờ kiến thức thực tiễn của Saigontourist.
            </p>
          </div>

          <div className="max-w-4xl mx-auto relative bg-neutral-50 border border-gray-100 rounded-2xl p-6 sm:p-10 shadow-sm">
            <div className="absolute top-6 left-6 text-blue-200/30 text-7xl font-serif select-none pointer-events-none">&ldquo;</div>
            <div className="absolute bottom-6 right-6 text-blue-200/30 text-7xl font-serif select-none pointer-events-none rotate-180">&rdquo;</div>

            <div className="relative z-10 space-y-6 text-center">
              {/* Stars */}
              <div className="flex items-center justify-center space-x-1 text-amber-500">
                {[...Array(reviews[activeReviewIndex].rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-500 text-amber-500" />
                ))}
              </div>

              {/* Comment */}
              <p className="text-neutral-700 text-sm sm:text-lg leading-relaxed italic max-w-2xl mx-auto">
                &ldquo;{reviews[activeReviewIndex].comment}&rdquo;
              </p>

              {/* Profile Card */}
              <div className="flex flex-col items-center space-y-2">
                <img
                  src={reviews[activeReviewIndex].avatar}
                  alt={reviews[activeReviewIndex].studentName}
                  className="w-12 h-12 rounded-full object-cover border-2 border-blue-700 shadow-sm"
                />
                <div className="text-sm">
                  <span className="font-extrabold text-neutral-900 block text-base">{reviews[activeReviewIndex].studentName}</span>
                  <span className="text-gray-400 text-xs sm:text-sm block font-medium mt-0.5">{reviews[activeReviewIndex].jobTitle}</span>
                  <span className="text-xs text-gray-400 uppercase tracking-widest mt-1 block">Khóa học: {reviews[activeReviewIndex].courseName}</span>
                </div>
              </div>
            </div>

            {/* Carousel Navigation */}
            <div className="flex justify-center space-x-2 mt-8">
              <button
                onClick={handlePrevReview}
                className="w-9 h-9 rounded-full bg-white border border-gray-200 text-gray-600 hover:bg-blue-50 hover:text-blue-800 flex items-center justify-center transition-all cursor-pointer"
                aria-label="Previous review"
              >
                <span className="text-xs">◀</span>
              </button>
              <button
                onClick={handleNextReview}
                className="w-9 h-9 rounded-full bg-white border border-gray-200 text-gray-600 hover:bg-blue-50 hover:text-blue-800 flex items-center justify-center transition-all cursor-pointer"
                aria-label="Next review"
              >
                <span className="text-xs">▶</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 10. FAQS ACCORDION */}
      <section id="faq-section" className="py-20 bg-neutral-50/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-3 mb-12">
            <h2 className="font-serif font-bold text-3xl text-neutral-900">Câu Hỏi Thường Gặp (FAQ)</h2>
            <div className="w-16 h-1 bg-blue-800 mx-auto rounded"></div>
            <p className="text-xs sm:text-sm text-gray-500 font-sans font-medium">Giải đáp nhanh những băn khoăn phổ biến của các bạn học viên mới.</p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq) => {
              const isOpen = openFaqId === faq.id;
              return (
                <div
                  key={faq.id}
                  className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden transition-all duration-200"
                >
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full text-left px-5 py-4 flex justify-between items-center bg-white hover:bg-blue-50/20 cursor-pointer"
                  >
                    <span className="font-serif font-bold text-sm sm:text-base lg:text-lg text-neutral-900 leading-tight">
                      {faq.question}
                    </span>
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5 text-blue-700 shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400 shrink-0" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-1.5 border-t border-gray-50 bg-white">
                      <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-sans">{faq.answer}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 11. INSTRUCTORS SECTION ON HOME */}
      <section id="instructors-section" className="py-20 bg-white border-t border-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
            <h2 className="font-serif font-bold text-3xl sm:text-4xl text-neutral-900">Đội Ngũ Giảng Viên Hướng Dẫn</h2>
            <div className="w-16 h-1 bg-blue-800 mx-auto rounded"></div>
            <p className="text-sm sm:text-base text-gray-500 font-sans font-medium">
              Học trực tiếp từ những nghệ nhân, chuyên gia xuất sắc và các Bếp trưởng sở hữu thâm niên thực tế đồ sộ tại các tập đoàn khách sạn 5 sao.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {Object.values(courses.map(c => c.instructor).reduce((acc: any, curr) => {
              acc[curr.id] = curr;
              return acc;
            }, {} as any)).map((inst: any, idx) => (
              <div key={idx} className="bg-neutral-50 border border-gray-100 rounded-2xl overflow-hidden p-4 space-y-4 hover:shadow-md transition-all">
                <img
                  src={inst.avatar}
                  alt={inst.name}
                  className="w-full h-48 object-cover rounded-xl border border-gray-100 shadow-inner"
                  referrerPolicy="no-referrer"
                />
                <div className="text-center space-y-1">
                  <h3 className="font-serif font-bold text-base sm:text-lg text-neutral-900">{inst.name}</h3>
                  <p className="text-[11px] uppercase font-extrabold tracking-wider text-amber-600">{inst.title}</p>
                </div>
                <p className="text-[12px] text-gray-500 line-clamp-3 leading-relaxed text-center font-sans">
                  {inst.bio}
                </p>
                <div className="pt-2 border-t border-gray-100 flex flex-col space-y-1 text-[11px] text-neutral-600">
                  <span className="font-bold text-blue-800 text-center uppercase tracking-wide">Thành tựu tiêu biểu</span>
                  <p className="line-clamp-2 text-center text-gray-500 italic">&ldquo;{inst.achievements[0]}&rdquo;</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 12. CONSULTATION FORM CONTAINER SECTION */}
      <section id="consultation-form-section" className="py-20 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Consultation Left Details */}
            <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
              <h2 className="font-['Verdana'] font-bold text-3xl sm:text-4xl text-neutral-900 leading-tight text-left">Bắt Đầu Hành Trình Nghề Nghiệp Của Bạn Ngay Hôm Nay</h2>
              <p className="text-gray-650 text-sm sm:text-base leading-relaxed font-sans">
                Đừng trì hoãn giấc mơ trở thành thợ làm bánh chuyên nghiệp, nghệ nhân pha chế thượng hạng hay nhà quản lý khách sạn danh giá. Hãy đăng ký thông tin ngay hôm nay để được liên hệ sớm nhất.
              </p>

              <div className="space-y-4 text-left max-w-md mx-auto lg:mx-0 text-xs sm:text-sm text-gray-700 font-medium">
                <div className="flex items-center space-x-3 bg-white p-3.5 rounded-lg shadow-sm border border-gray-100">
                  <Award className="w-5.5 h-5.5 text-amber-500 shrink-0" />
                  <span>Đồng hành cùng thương hiệu trường đào tạo ẩm thực 5 sao</span>
                </div>
                <div className="flex items-center space-x-3 bg-white p-3.5 rounded-lg shadow-sm border border-gray-100">
                  <BookOpen className="w-5.5 h-5.5 text-blue-700 shrink-0" />
                  <span>Kèm giáo trình định lượng gram độc quyền miễn phí</span>
                </div>
                <div className="flex items-center space-x-3 bg-white p-3.5 rounded-lg shadow-sm border border-gray-100">
                  <Clock className="w-5.5 h-5.5 text-blue-600 shrink-0" />
                  <span>Hỗ trợ tuyển sinh 24/7 trực tuyến tận tâm</span>
                </div>
              </div>
            </div>

            {/* Consultation Right Form Container */}
            <div className="lg:col-span-6">
              <ConsultationForm />
            </div>
          </div>
        </div>
      </section>

      {/* VIDEO SAMPLE MODAL */}
      {isVideoModalOpen && (
        <div id="video-sample-modal" className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center bg-black/80 p-4">
          <div className="relative bg-neutral-950 rounded-2xl overflow-hidden max-w-3xl w-full aspect-video border border-neutral-800 shadow-2xl">
            {/* Close Button */}
            <button
              onClick={() => setIsVideoModalOpen(false)}
              className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-red-700 transition-colors focus:outline-none cursor-pointer"
              aria-label="Close modal"
            >
              ✕
            </button>

            {/* HTML Video Player */}
            <video
              src="https://www.w3schools.com/html/mov_bbb.mp4"
              controls
              autoPlay
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
}
