import React, { useState, useMemo } from "react";
import { Search, SlidersHorizontal, Star, Clock, Filter, X, ChevronDown, Award } from "lucide-react";
import { courses, categories } from "../data/courses";
import { Course } from "../types";

interface CourseListingPageProps {
  onNavigate: (view: "home" | "courses" | "detail" | "admin", courseId?: string) => void;
}

export default function CourseListingPage({ onNavigate }: CourseListingPageProps) {
  // Filters State
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCats, setSelectedCats] = useState<string[]>([]);
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);
  const [selectedDurations, setSelectedDurations] = useState<string[]>([]);
  const [selectedPrices, setSelectedPrices] = useState<string[]>([]);
  const [selectedInstructors, setSelectedInstructors] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<"default" | "rating" | "priceAsc" | "priceDesc">("default");
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Level Options
  const levelOptions = ["Cơ bản", "Trung cấp", "Chuyên sâu", "Quản lý"];

  // Unique Instructor list derived from data
  const instructorOptions = useMemo(() => {
    const list = courses.map(c => c.instructor);
    return Array.from(new Map(list.map(i => [i.id, i])).values());
  }, []);

  // Filter & Sort Logic
  const filteredCourses = useMemo(() => {
    let result = [...courses];

    // 1. Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(c => 
        c.title.toLowerCase().includes(q) || 
        c.shortDescription.toLowerCase().includes(q) ||
        c.instructor.name.toLowerCase().includes(q) ||
        c.skillsAcquired.some(s => s.toLowerCase().includes(q))
      );
    }

    // 2. Category Filter
    if (selectedCats.length > 0) {
      result = result.filter(c => selectedCats.includes(c.category));
    }

    // 3. Level Filter
    if (selectedLevels.length > 0) {
      result = result.filter(c => selectedLevels.includes(c.level));
    }

    // 4. Duration Filter
    if (selectedDurations.length > 0) {
      result = result.filter(c => {
        const hours = parseInt(c.duration);
        if (selectedDurations.includes("under30") && hours < 30) return true;
        if (selectedDurations.includes("30to50") && hours >= 30 && hours <= 50) return true;
        if (selectedDurations.includes("over50") && hours > 50) return true;
        return false;
      });
    }

    // 5. Price Filter
    if (selectedPrices.length > 0) {
      result = result.filter(c => {
        if (selectedPrices.includes("under35") && c.price < 3500000) return true;
        if (selectedPrices.includes("35to45") && c.price >= 3500000 && c.price <= 4500000) return true;
        if (selectedPrices.includes("over45") && c.price > 4500000) return true;
        return false;
      });
    }

    // 6. Instructor Filter
    if (selectedInstructors.length > 0) {
      result = result.filter(c => selectedInstructors.includes(c.instructor.id));
    }

    // 7. Sort
    if (sortBy === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "priceAsc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "priceDesc") {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [searchQuery, selectedCats, selectedLevels, selectedDurations, selectedPrices, selectedInstructors, sortBy]);

  // Pagination calculation
  const totalItems = filteredCourses.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
  const paginatedCourses = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredCourses.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredCourses, currentPage]);

  const toggleFilter = (list: string[], setList: React.Dispatch<React.SetStateAction<string[]>>, val: string) => {
    setCurrentPage(1); // Reset page to 1 on any filter change
    if (list.includes(val)) {
      setList(list.filter(item => item !== val));
    } else {
      setList([...list, val]);
    }
  };

  const handleClearFilters = () => {
    setSelectedCats([]);
    setSelectedLevels([]);
    setSelectedDurations([]);
    setSelectedPrices([]);
    setSelectedInstructors([]);
    setSearchQuery("");
    setSortBy("default");
    setCurrentPage(1);
  };

  return (
    <div id="course-listing-container" className="pt-24 pb-16 bg-neutral-50/50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Banner header title */}
        <div className="text-center md:text-left space-y-3 mb-8">
          <h1 className="font-serif font-extrabold text-3xl sm:text-4xl lg:text-5xl text-neutral-900">Khám Phá Các Khóa Học</h1>
          <div className="w-16 h-1 bg-blue-800 rounded mx-auto md:mx-0"></div>
          <p className="text-sm sm:text-base text-gray-600 font-sans leading-relaxed">
            Chuẩn hóa kiến thức, rèn luyện kỹ năng thực tế 5 sao và nhận chứng chỉ hoàn thành danh giá từ Saigontourist.
          </p>
        </div>

        {/* Search header box */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-5 mb-8">
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            {/* Search Input */}
            <div className="relative w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                id="listing-search-input"
                type="text"
                placeholder="Tìm kiếm tên khóa học, giảng viên hoặc kỹ năng..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-11 pr-4 py-3 bg-neutral-50 border border-gray-200 rounded-xl text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all text-neutral-800 font-sans"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Mobile Filter and Sort */}
            <div className="flex gap-2.5 w-full sm:w-auto shrink-0 justify-end">
              <button
                onClick={() => setShowMobileFilters(!showMobileFilters)}
                className="sm:hidden w-full flex items-center justify-center space-x-1.5 px-4 py-3 border border-gray-200 bg-white rounded-xl text-sm font-semibold text-gray-700 hover:bg-neutral-50"
              >
                <SlidersHorizontal className="w-4 h-4" />
                <span>Bộ lọc</span>
              </button>
              
              <div className="relative w-full sm:w-48">
                <select
                  id="listing-sort-select"
                  value={sortBy}
                  onChange={(e: any) => setSortBy(e.target.value)}
                  className="w-full pl-3 pr-8 py-3 bg-white border border-gray-200 rounded-xl text-sm sm:text-base font-semibold text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-800 cursor-pointer appearance-none"
                >
                  <option value="default">Sắp xếp: Mặc định</option>
                  <option value="rating">Đánh giá cao nhất</option>
                  <option value="priceAsc">Giá: Thấp đến Cao</option>
                  <option value="priceDesc">Giá: Cao đến Thấp</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

        {/* Content Layout (Sidebar + Main Grid) */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* A. LEFT SIDEBAR FILTERS (DESKTOP) */}
          <aside className="hidden lg:block space-y-6">
            <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6 sticky top-24 space-y-6">
              <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                <h2 className="font-serif font-bold text-neutral-900 text-sm sm:text-base flex items-center space-x-2">
                  <Filter className="w-4.5 h-4.5 text-blue-800" />
                  <span>Bộ lọc tìm kiếm</span>
                </h2>
                <button
                  onClick={handleClearFilters}
                  className="text-xs sm:text-sm font-bold text-blue-700 hover:text-blue-900 transition-colors cursor-pointer"
                >
                  Xóa tất cả
                </button>
              </div>

              {/* 1. Category Filter */}
              <div className="space-y-3">
                <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-neutral-400">Danh mục</h3>
                <div className="space-y-2 text-sm text-gray-700">
                  {categories.map((cat) => (
                    <label key={cat.id} className="flex items-center space-x-2.5 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={selectedCats.includes(cat.id)}
                        onChange={() => toggleFilter(selectedCats, setSelectedCats, cat.id)}
                        className="w-4.5 h-4.5 rounded text-blue-800 border-gray-300 focus:ring-blue-500 accent-blue-800"
                      />
                      <span className="group-hover:text-blue-800 transition-colors text-xs sm:text-sm font-medium">{cat.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* 2. Level Filter */}
              <div className="space-y-3 border-t border-gray-50 pt-4">
                <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-neutral-400">Cấp độ</h3>
                <div className="space-y-2 text-sm text-gray-700">
                  {levelOptions.map((level) => (
                    <label key={level} className="flex items-center space-x-2.5 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={selectedLevels.includes(level)}
                        onChange={() => toggleFilter(selectedLevels, setSelectedLevels, level)}
                        className="w-4.5 h-4.5 rounded text-blue-800 border-gray-300 focus:ring-blue-500 accent-blue-800"
                      />
                      <span className="group-hover:text-blue-800 transition-colors text-xs sm:text-sm font-medium">{level}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* 3. Duration Filter */}
              <div className="space-y-3 border-t border-gray-50 pt-4">
                <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-neutral-400">Thời lượng</h3>
                <div className="space-y-2 text-sm text-gray-700">
                  <label className="flex items-center space-x-2.5 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={selectedDurations.includes("under30")}
                      onChange={() => toggleFilter(selectedDurations, setSelectedDurations, "under30")}
                      className="w-4.5 h-4.5 rounded text-blue-800 border-gray-300 focus:ring-blue-500 accent-blue-800"
                    />
                    <span className="group-hover:text-blue-800 transition-colors text-xs sm:text-sm font-medium">Dưới 30 giờ</span>
                  </label>
                  <label className="flex items-center space-x-2.5 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={selectedDurations.includes("30to50")}
                      onChange={() => toggleFilter(selectedDurations, setSelectedDurations, "30to50")}
                      className="w-4.5 h-4.5 rounded text-blue-800 border-gray-300 focus:ring-blue-500 accent-blue-800"
                    />
                    <span className="group-hover:text-blue-800 transition-colors text-xs sm:text-sm font-medium">Từ 30 - 50 giờ</span>
                  </label>
                  <label className="flex items-center space-x-2.5 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={selectedDurations.includes("over50")}
                      onChange={() => toggleFilter(selectedDurations, setSelectedDurations, "over50")}
                      className="w-4.5 h-4.5 rounded text-blue-800 border-gray-300 focus:ring-blue-500 accent-blue-800"
                    />
                    <span className="group-hover:text-blue-800 transition-colors text-xs sm:text-sm font-medium">Trên 50 giờ</span>
                  </label>
                </div>
              </div>

              {/* 4. Price Filter */}
              <div className="space-y-3 border-t border-gray-50 pt-4">
                <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-neutral-400">Học phí</h3>
                <div className="space-y-2 text-sm text-gray-700">
                  <label className="flex items-center space-x-2.5 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={selectedPrices.includes("under35")}
                      onChange={() => toggleFilter(selectedPrices, setSelectedPrices, "under35")}
                      className="w-4.5 h-4.5 rounded text-blue-800 border-gray-300 focus:ring-blue-500 accent-blue-800"
                    />
                    <span className="group-hover:text-blue-800 transition-colors text-xs sm:text-sm font-medium">Dưới 3.5M đ</span>
                  </label>
                  <label className="flex items-center space-x-2.5 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={selectedPrices.includes("35to45")}
                      onChange={() => toggleFilter(selectedPrices, setSelectedPrices, "35to45")}
                      className="w-4.5 h-4.5 rounded text-blue-800 border-gray-300 focus:ring-blue-500 accent-blue-800"
                    />
                    <span className="group-hover:text-blue-800 transition-colors text-xs sm:text-sm font-medium">Từ 3.5M - 4.5M đ</span>
                  </label>
                  <label className="flex items-center space-x-2.5 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={selectedPrices.includes("over45")}
                      onChange={() => toggleFilter(selectedPrices, setSelectedPrices, "over45")}
                      className="w-4.5 h-4.5 rounded text-blue-800 border-gray-300 focus:ring-blue-500 accent-blue-800"
                    />
                    <span className="group-hover:text-blue-800 transition-colors text-xs sm:text-sm font-medium">Trên 4.5M đ</span>
                  </label>
                </div>
              </div>

              {/* 5. Instructor Filter */}
              <div className="space-y-3 border-t border-gray-50 pt-4">
                <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-neutral-400">Giảng viên</h3>
                <div className="space-y-2 text-sm text-gray-700">
                  {instructorOptions.map((inst) => (
                    <label key={inst.id} className="flex items-center space-x-2.5 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={selectedInstructors.includes(inst.id)}
                        onChange={() => toggleFilter(selectedInstructors, setSelectedInstructors, inst.id)}
                        className="w-4.5 h-4.5 rounded text-blue-800 border-gray-300 focus:ring-blue-500 accent-blue-800"
                      />
                      <span className="group-hover:text-blue-800 transition-colors text-xs sm:text-sm font-medium">{inst.name.replace("Giảng viên", "").replace("Master Barista", "").replace("Chef De Partie", "").replace("Executive Chef", "").trim()}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* B. RIGHT COURSE LIST GRID */}
          <main className="lg:col-span-3 space-y-8">
            {/* Filter tags summary */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs sm:text-sm text-gray-400 gap-2 border-b border-gray-100 pb-3">
              <div>
                Hiển thị <span className="font-bold text-neutral-800">{paginatedCourses.length}</span> trên{" "}
                <span className="font-bold text-neutral-800">{totalItems}</span> khóa học
              </div>
              {totalItems !== courses.length && (
                <button
                  onClick={handleClearFilters}
                  className="text-blue-800 hover:text-blue-950 font-bold uppercase tracking-wider text-[10px] sm:text-xs cursor-pointer"
                >
                  Xóa toàn bộ bộ lọc active
                </button>
              )}
            </div>

            {/* Empty State */}
            {paginatedCourses.length === 0 ? (
              <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center space-y-4 shadow-sm">
                <div className="text-gray-300 text-6xl">🔍</div>
                <h3 className="font-serif font-bold text-xl text-neutral-900">Không tìm thấy khóa học nào</h3>
                <p className="text-sm text-gray-500 max-w-md mx-auto">
                  Hãy thử thay đổi từ khóa tìm kiếm hoặc bỏ chọn một số tiêu chuẩn lọc ở cột bên trái.
                </p>
                <button
                  onClick={handleClearFilters}
                  className="bg-blue-800 hover:bg-blue-900 text-white font-semibold text-xs sm:text-sm uppercase tracking-wider px-5 py-2.5 rounded cursor-pointer"
                >
                  Hiển thị lại toàn bộ khóa học
                </button>
              </div>
            ) : (
              /* Courses Cards Grid */
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {paginatedCourses.map((course, index) => {
                  const discountPct = Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100);
                  return (
                    <div
                      key={course.id}
                      className="bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between group overflow-hidden"
                    >
                      <div>
                        {/* Image banner with discount badge */}
                        <div className="relative overflow-hidden h-44">
                          <img
                            src={course.image}
                            alt={course.title}
                            className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute top-3 left-3 bg-blue-800 text-white text-[11px] uppercase font-bold tracking-wider px-2 py-0.5 rounded shadow-sm">
                            {course.level}
                          </div>
                          {discountPct > 0 && (
                            <div className="absolute top-3 right-3 bg-amber-500 text-neutral-950 text-[11px] font-extrabold uppercase px-2 py-0.5 rounded shadow-sm">
                              Giảm {discountPct}%
                            </div>
                          )}
                        </div>

                        {/* Card body content */}
                        <div className="p-5 space-y-3">
                          <div className="flex items-center space-x-3 text-[10px] sm:text-xs text-gray-400 font-medium">
                            <span className="bg-blue-50 text-blue-900 font-bold px-2 py-0.5 rounded uppercase text-[10px]">
                              {categories.find(c => c.id === course.category)?.name || "Nghiệp vụ"}
                            </span>
                            <span className="flex items-center space-x-1">
                              <Clock className="w-3 h-3" />
                              <span>{course.duration}</span>
                            </span>
                            <span className="flex items-center space-x-0.5 text-amber-500 font-bold">
                              ★ <span className="text-gray-700">{course.rating}</span>
                            </span>
                          </div>

                          <h3 className="font-serif font-bold text-base sm:text-lg text-neutral-900 group-hover:text-blue-850 transition-colors line-clamp-2 leading-snug min-h-[44px]">
                            {course.title}
                          </h3>

                          <p className="text-xs sm:text-sm text-gray-500 line-clamp-2 leading-relaxed min-h-[36px]">
                            {course.shortDescription}
                          </p>

                          {/* Chef/Instructor details */}
                          <div className="flex items-center space-x-2 pt-2 border-t border-gray-50">
                            <img
                              src={course.instructor.avatar}
                              alt={course.instructor.name}
                              className="w-7 h-7 rounded-full object-cover border border-blue-50"
                            />
                            <div className="flex flex-col text-[9px] sm:text-[10px] leading-tight">
                              <span className="font-bold text-gray-700">{course.instructor.name}</span>
                              <span className="text-gray-400 font-medium max-w-[150px] truncate">{course.instructor.title}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Card pricing and detailed click footer */}
                      <div className="px-5 pb-5 pt-3 bg-neutral-50/30 border-t border-gray-50 flex items-center justify-between">
                        <div className="flex flex-col">
                          <span className="text-neutral-400 line-through text-[9px] font-medium leading-none mb-1">
                            {course.originalPrice.toLocaleString("vi-VN")}đ
                          </span>
                          <span
                            className="text-blue-850 font-extrabold text-sm sm:text-base leading-none"
                            style={
                              index === 0
                                ? { color: "#0D4F8B" }
                                : index === 1
                                ? { color: "#2D79C7" }
                                : undefined
                            }
                          >
                            {course.price.toLocaleString("vi-VN")}đ
                          </span>
                        </div>

                        <button
                          onClick={() => onNavigate("detail", course.id)}
                          className="bg-amber-500 hover:bg-amber-600 text-white font-bold text-[11px] sm:text-xs uppercase tracking-wider px-3.5 py-2 rounded-lg transition-colors shadow-sm cursor-pointer"
                          style={
                            index === 1
                              ? { backgroundColor: "#0D4F8B" }
                              : undefined
                          }
                        >
                          Chi tiết
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Pagination controls */}
            {totalPages > 1 && (
              <div id="listing-pagination" className="flex items-center justify-center space-x-1.5 pt-4">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(currentPage - 1)}
                  className="w-9 h-9 rounded-lg bg-white border border-gray-200 text-gray-600 hover:bg-blue-50 hover:text-blue-800 disabled:opacity-40 disabled:hover:bg-white disabled:hover:text-gray-600 flex items-center justify-center text-xs transition-colors cursor-pointer"
                >
                  ◀
                </button>
                {[...Array(totalPages)].map((_, i) => {
                  const pageNum = i + 1;
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`w-9 h-9 rounded-lg font-bold text-xs transition-all cursor-pointer ${
                        currentPage === pageNum
                          ? "bg-blue-850 text-white shadow shadow-blue-100"
                          : "bg-white text-gray-600 border border-gray-200 hover:border-blue-300"
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(currentPage + 1)}
                  className="w-9 h-9 rounded-lg bg-white border border-gray-200 text-gray-600 hover:bg-blue-50 hover:text-blue-800 disabled:opacity-40 disabled:hover:bg-white disabled:hover:text-gray-600 flex items-center justify-center text-xs transition-colors cursor-pointer"
                >
                  ▶
                </button>
              </div>
            )}
          </main>
        </div>

        {/* C. BOTTOM ADVERTISING BANNER */}
        <section className="bg-gradient-to-r from-blue-950 via-blue-900 to-amber-950 text-white rounded-3xl p-8 sm:p-12 shadow-xl mt-16 text-center space-y-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full filter blur-3xl"></div>

          <div className="relative z-10 max-w-3xl mx-auto space-y-4">
            <span className="inline-block bg-blue-800/80 text-white text-[10px] sm:text-xs font-bold uppercase tracking-widest px-3.5 py-1 rounded-full border border-blue-500/30">
              Nhập học hôm nay - Nhận học bổng 25%
            </span>
            <h2 className="font-serif font-bold text-2xl sm:text-3.5xl leading-tight">
              Bắt Đầu Hành Trình Của Bạn Ngay Hôm Nay
            </h2>
            <p className="text-xs sm:text-sm text-blue-100 leading-relaxed max-w-2xl mx-auto font-sans">
              Chúng tôi luôn sẵn sàng hỗ trợ, tư vấn lộ trình học tập miễn phí 24/7. Nhận toàn bộ giáo trình gốc chi tiết ngay sau khi hoàn thành hồ sơ đăng ký tư vấn.
            </p>
            <div className="pt-2">
              <button
                onClick={() => {
                  onNavigate("home");
                  setTimeout(() => {
                    const el = document.getElementById("consultation-form-section");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }, 100);
                }}
                className="bg-amber-400 hover:bg-amber-500 text-neutral-950 font-bold px-8 py-3.5 rounded-xl shadow-md transition-all uppercase text-xs sm:text-sm tracking-wider cursor-pointer"
              >
                Đăng ký tư vấn ngay
              </button>
            </div>
          </div>
        </section>
      </div>

      {/* MOBILE FILTERS DRAWER (OVERLAY) */}
      {showMobileFilters && (
        <div id="mobile-filter-modal" className="fixed inset-0 z-50 overflow-y-auto flex bg-black/60 lg:hidden">
          <div className="relative bg-white max-w-xs w-full h-full shadow-2xl p-6 overflow-y-auto flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                <h2 className="font-serif font-bold text-neutral-900 text-base flex items-center space-x-2">
                  <Filter className="w-4.5 h-4.5 text-blue-850" />
                  <span>Bộ lọc tìm kiếm</span>
                </h2>
                <button
                  onClick={() => setShowMobileFilters(false)}
                  className="p-1.5 hover:bg-neutral-100 rounded-md text-gray-500 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Mobile Filter Category list */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400">Danh mục</h3>
                <div className="space-y-2 text-xs text-gray-700">
                  {categories.map((cat) => (
                    <label key={cat.id} className="flex items-center space-x-2.5 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={selectedCats.includes(cat.id)}
                        onChange={() => toggleFilter(selectedCats, setSelectedCats, cat.id)}
                        className="w-4 h-4 rounded text-blue-800 border-gray-300 focus:ring-blue-500 accent-blue-800"
                      />
                      <span className="group-hover:text-blue-800 transition-colors font-medium">{cat.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Mobile Filter Level list */}
              <div className="space-y-3 border-t border-gray-100 pt-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400">Cấp độ</h3>
                <div className="space-y-2 text-xs text-gray-700">
                  {levelOptions.map((level) => (
                    <label key={level} className="flex items-center space-x-2.5 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={selectedLevels.includes(level)}
                        onChange={() => toggleFilter(selectedLevels, setSelectedLevels, level)}
                        className="w-4 h-4 rounded text-blue-800 border-gray-300 focus:ring-blue-500 accent-blue-800"
                      />
                      <span className="group-hover:text-blue-800 transition-colors font-medium">{level}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Mobile Price */}
              <div className="space-y-3 border-t border-gray-100 pt-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400">Học phí</h3>
                <div className="space-y-2 text-xs text-gray-700">
                  <label className="flex items-center space-x-2.5 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={selectedPrices.includes("under35")}
                      onChange={() => toggleFilter(selectedPrices, setSelectedPrices, "under35")}
                      className="w-4 h-4 rounded text-blue-800 border-gray-300 focus:ring-blue-500 accent-blue-800"
                    />
                    <span className="group-hover:text-blue-800 transition-colors font-medium">Dưới 3.5M đ</span>
                  </label>
                  <label className="flex items-center space-x-2.5 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={selectedPrices.includes("35to45")}
                      onChange={() => toggleFilter(selectedPrices, setSelectedPrices, "35to45")}
                      className="w-4 h-4 rounded text-blue-800 border-gray-300 focus:ring-blue-500 accent-blue-800"
                    />
                    <span className="group-hover:text-blue-800 transition-colors font-medium">Từ 3.5M - 4.5M đ</span>
                  </label>
                  <label className="flex items-center space-x-2.5 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={selectedPrices.includes("over45")}
                      onChange={() => toggleFilter(selectedPrices, setSelectedPrices, "over45")}
                      className="w-4 h-4 rounded text-blue-800 border-gray-300 focus:ring-blue-500 accent-blue-800"
                    />
                    <span className="group-hover:text-blue-800 transition-colors font-medium">Trên 4.5M đ</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-gray-100 space-y-2">
              <button
                onClick={handleClearFilters}
                className="w-full text-center py-2 border border-blue-200 text-blue-850 rounded-lg text-xs font-semibold cursor-pointer"
              >
                Xóa tất cả bộ lọc
              </button>
              <button
                onClick={() => setShowMobileFilters(false)}
                className="w-full text-center py-2.5 bg-blue-850 text-white rounded-lg text-xs font-bold cursor-pointer"
              >
                Áp dụng bộ lọc ({totalItems})
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
