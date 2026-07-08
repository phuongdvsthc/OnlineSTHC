import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LandingPage from "./components/LandingPage";
import CourseListingPage from "./components/CourseListingPage";
import CourseDetailPage from "./components/CourseDetailPage";
import { courses } from "./data/courses";
import { AnimatePresence, motion } from "motion/react";

export default function App() {
  const [currentView, setCurrentView] = useState<"home" | "courses" | "detail">("home");
  const [selectedCourseId, setSelectedCourseId] = useState<string>("latte-art-pro");

  // Keep scroll positions at the top when views change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as any });
  }, [currentView, selectedCourseId]);

  const handleNavigate = (view: "home" | "courses" | "detail", courseId?: string) => {
    if (courseId) {
      setSelectedCourseId(courseId);
    }
    setCurrentView(view);
  };

  const getActiveCourse = () => {
    return courses.find((c) => c.id === selectedCourseId) || courses[0];
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-neutral-50/30 text-neutral-800 font-sans selection:bg-blue-800 selection:text-white">
      {/* Dynamic Header Navbar */}
      <Navbar currentView={currentView} onNavigate={handleNavigate} />

      {/* Main View Transition Stage */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentView + (currentView === "detail" ? selectedCourseId : "")}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
          >
            {currentView === "home" && (
              <LandingPage onNavigate={handleNavigate} />
            )}
            
            {currentView === "courses" && (
              <CourseListingPage onNavigate={handleNavigate} />
            )}
            
            {currentView === "detail" && (
              <CourseDetailPage
                course={getActiveCourse()}
                onBack={() => handleNavigate("courses")}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Corporate Accreditation Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
