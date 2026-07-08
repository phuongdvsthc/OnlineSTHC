import React, { useState, useEffect } from "react";
import { Menu, X, BookOpen, GraduationCap, PhoneCall, HelpCircle } from "lucide-react";
import sthcLogo from "../assets/images/regenerated_image_1783479369142.png";

interface NavbarProps {
  currentView: "home" | "courses" | "detail";
  onNavigate: (view: "home" | "courses" | "detail", courseId?: string) => void;
}

export default function Navbar({ currentView, onNavigate }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLinkClick = (view: "home" | "courses", anchorId?: string) => {
    setIsOpen(false);
    onNavigate(view);
    if (anchorId) {
      setTimeout(() => {
        const el = document.getElementById(anchorId);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
    }
  };

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-md py-3.5 border-b border-blue-100"
          : "bg-white py-4.5 border-b border-gray-100"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo Brand */}
          <div
            id="navbar-brand"
            className="flex items-center space-x-3 cursor-pointer group"
            onClick={() => handleLinkClick("home")}
          >
            <img
              src={sthcLogo}
              alt="STHC Logo"
              className="h-12 w-auto object-contain rounded group-hover:scale-105 transition-transform"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Desktop Navigation Links */}
          <nav id="desktop-nav" className="hidden md:flex items-center space-x-1.5">
            <button
              id="nav-link-home"
              onClick={() => handleLinkClick("home")}
              className={`px-4.5 py-2.5 text-sm sm:text-base font-semibold rounded-md transition-colors ${
                currentView === "home"
                  ? "text-blue-800 bg-blue-50/80"
                  : "text-gray-650 hover:text-blue-800 hover:bg-neutral-50"
              }`}
            >
              Trang chủ
            </button>
            <button
              id="nav-link-courses"
              onClick={() => handleLinkClick("courses")}
              className={`px-4.5 py-2.5 text-sm sm:text-base font-semibold rounded-md transition-colors ${
                currentView === "courses" || currentView === "detail"
                  ? "text-blue-800 bg-blue-50/80"
                  : "text-gray-650 hover:text-blue-800 hover:bg-neutral-50"
              }`}
            >
              Khóa học
            </button>
            <button
              id="nav-link-instructors"
              onClick={() => handleLinkClick("home", "instructors-section")}
              className="px-4.5 py-2.5 text-sm sm:text-base font-semibold text-gray-650 hover:text-blue-800 hover:bg-neutral-50 rounded-md transition-colors"
            >
              Giảng viên
            </button>
            <button
              id="nav-link-faq"
              onClick={() => handleLinkClick("home", "faq-section")}
              className="px-4.5 py-2.5 text-sm sm:text-base font-semibold text-gray-650 hover:text-blue-800 hover:bg-neutral-50 rounded-md transition-colors"
            >
              FAQ
            </button>
          </nav>

          {/* Desktop CTA Action Button */}
          <div className="hidden md:flex items-center space-x-3">
            <button
              id="cta-nav-button"
              onClick={() => handleLinkClick("home", "consultation-form-section")}
              className="bg-amber-500 hover:bg-amber-600 text-white px-5.5 py-2.5 rounded-md text-sm sm:text-base font-bold tracking-wide shadow-md shadow-amber-100 transition-all hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 flex items-center space-x-1.5"
              style={{ backgroundColor: "#D4A017" }}
            >
              <PhoneCall className="w-4.5 h-4.5" />
              <span>Đăng ký ngay</span>
            </button>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="md:hidden flex items-center space-x-2">
            <button
              id="mobile-menu-toggle"
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-gray-600 hover:text-blue-800 hover:bg-neutral-50 rounded-md focus:outline-none"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {isOpen && (
        <div id="mobile-menu-drawer" className="md:hidden bg-white border-t border-gray-100 shadow-xl py-4 px-4 space-y-2.5 absolute top-full left-0 right-0 z-50">
          <button
            id="mobile-nav-link-home"
            onClick={() => handleLinkClick("home")}
            className={`w-full text-left px-4 py-3.5 text-base sm:text-lg font-bold rounded-md flex items-center space-x-3.5 ${
              currentView === "home" ? "bg-blue-50 text-blue-900" : "text-gray-700 hover:bg-neutral-50"
            }`}
          >
            <BookOpen className="w-5.5 h-5.5 text-blue-800" />
            <span>Trang chủ</span>
          </button>
          <button
            id="mobile-nav-link-courses"
            onClick={() => handleLinkClick("courses")}
            className={`w-full text-left px-4 py-3.5 text-base sm:text-lg font-bold rounded-md flex items-center space-x-3.5 ${
              currentView === "courses" || currentView === "detail" ? "bg-blue-50 text-blue-900" : "text-gray-700 hover:bg-neutral-50"
            }`}
          >
            <GraduationCap className="w-5.5 h-5.5 text-blue-800" />
            <span>Danh mục khóa học</span>
          </button>
          <button
            id="mobile-nav-link-instructors"
            onClick={() => handleLinkClick("home", "instructors-section")}
            className="w-full text-left px-4 py-3.5 text-base sm:text-lg font-bold rounded-md text-gray-700 hover:bg-neutral-50 flex items-center space-x-3.5"
          >
            <GraduationCap className="w-5.5 h-5.5 text-amber-600" />
            <span>Đội ngũ Giảng viên</span>
          </button>
          <button
            id="mobile-nav-link-faq"
            onClick={() => handleLinkClick("home", "faq-section")}
            className="w-full text-left px-4 py-3.5 text-base sm:text-lg font-bold rounded-md text-gray-700 hover:bg-neutral-50 flex items-center space-x-3.5"
          >
            <HelpCircle className="w-5.5 h-5.5 text-blue-700" />
            <span>Câu hỏi thường gặp</span>
          </button>
          <div className="pt-3 border-t border-gray-100">
            <button
              id="mobile-cta-nav-button"
              onClick={() => handleLinkClick("home", "consultation-form-section")}
              className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white text-center py-3.5 rounded-md font-bold text-base sm:text-lg shadow-md flex items-center justify-center space-x-2"
              style={{ backgroundColor: "#D4A017" }}
            >
              <PhoneCall className="w-5.5 h-5.5" />
              <span>Đăng ký tư vấn miễn phí</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
