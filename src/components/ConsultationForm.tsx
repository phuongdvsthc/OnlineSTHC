import React, { useState, useEffect } from "react";
import { Check, Send, AlertCircle, Smile } from "lucide-react";
import { courses } from "../data/courses";
import { ConsultationInquiry } from "../types";

interface ConsultationFormProps {
  preselectedCourseId?: string;
  onSuccess?: () => void;
}

export default function ConsultationForm({ preselectedCourseId, onSuccess }: ConsultationFormProps) {
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [selectedCourseId, setSelectedCourseId] = useState(preselectedCourseId || "");
  const [notes, setNotes] = useState("");
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [inquiryCode, setInquiryCode] = useState("");

  useEffect(() => {
    if (preselectedCourseId) {
      setSelectedCourseId(preselectedCourseId);
    }
  }, [preselectedCourseId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    // Simple client side validation
    if (!fullName.trim()) {
      setErrorMessage("Vui lòng nhập Họ và tên của bạn");
      return;
    }
    if (!phoneNumber.trim()) {
      setErrorMessage("Vui lòng nhập Số điện thoại");
      return;
    }
    if (!/^[0-9+()#&.\s\-]{8,15}$/.test(phoneNumber.trim())) {
      setErrorMessage("Số điện thoại không hợp lệ");
      return;
    }
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      setErrorMessage("Địa chỉ Email không hợp lệ");
      return;
    }
    if (!selectedCourseId) {
      setErrorMessage("Vui lòng chọn một khóa học bạn quan tâm");
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      try {
        const code = "ST-" + Math.floor(100000 + Math.random() * 900000);
        setInquiryCode(code);

        const newInquiry: ConsultationInquiry = {
          id: code,
          fullName: fullName.trim(),
          phoneNumber: phoneNumber.trim(),
          email: email.trim(),
          courseId: selectedCourseId,
          notes: notes.trim(),
          createdAt: new Date().toISOString(),
          status: "Chờ liên hệ"
        };

        // Save to localStorage
        const existingRaw = localStorage.getItem("saigontourist_inquiries");
        const existing: ConsultationInquiry[] = existingRaw ? JSON.parse(existingRaw) : [];
        existing.unshift(newInquiry);
        localStorage.setItem("saigontourist_inquiries", JSON.stringify(existing));

        setSubmitSuccess(true);
        setFullName("");
        setPhoneNumber("");
        setEmail("");
        setNotes("");
        
        if (onSuccess) {
          onSuccess();
        }
      } catch (e) {
        setErrorMessage("Có lỗi hệ thống xảy ra. Vui lòng thử lại sau.");
      } finally {
        setIsSubmitting(false);
      }
    }, 800);
  };

  return (
    <div id="consultation-form-wrapper" className="bg-white rounded-2xl shadow-xl border border-blue-100 p-6 sm:p-8 max-w-lg mx-auto transition-all duration-300">
      {submitSuccess ? (
        <div id="form-success-state" className="text-center py-8 space-y-4">
          <div className="w-16 h-16 bg-green-50 border-2 border-green-500 rounded-full flex items-center justify-center mx-auto text-green-500 animate-bounce">
            <Check className="w-8 h-8" />
          </div>
          <h3 className="font-serif font-extrabold text-2xl text-blue-900">Đăng Ký Thành Công!</h3>
          <p className="text-gray-700 text-sm sm:text-base max-w-sm mx-auto leading-relaxed">
            Hệ thống đào tạo trực tuyến Saigontourist đã ghi nhận đăng ký tư vấn của bạn. Chúng tôi sẽ liên hệ trong vòng <b>2 giờ làm việc</b>.
          </p>
          
          <div className="bg-amber-50/70 border border-amber-200 rounded-lg p-4 text-left max-w-md mx-auto space-y-1.5 text-xs sm:text-sm">
            <div className="flex justify-between border-b border-amber-200 pb-1.5">
              <span className="font-semibold text-amber-900">Mã hồ sơ tư vấn:</span>
              <span className="font-mono font-bold text-blue-750">{inquiryCode}</span>
            </div>
            <div className="flex justify-between pt-1">
              <span className="text-gray-600">Khóa học quan tâm:</span>
              <span className="font-semibold text-gray-800 max-w-[200px] text-right truncate">
                {courses.find(c => c.id === selectedCourseId)?.title || "Chưa xác định"}
              </span>
            </div>
            <div className="text-[11px] text-gray-400 mt-2 text-center leading-none italic">
              Vui lòng lưu lại mã này để nhận chương trình ưu đãi học phí lên tới 25% khi nhập học chính thức.
            </div>
          </div>

          <button
            onClick={() => setSubmitSuccess(false)}
            className="mt-6 inline-flex items-center space-x-2 bg-gradient-to-r from-blue-800 to-blue-900 text-white text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded hover:from-blue-900 hover:to-blue-950 transition-colors"
          >
            <Smile className="w-4 h-4" />
            <span>Đăng ký thêm thông tin</span>
          </button>
        </div>
      ) : (
        <form id="consultation-form-element" onSubmit={handleSubmit} className="space-y-4">
          <div className="text-center space-y-1.5 mb-6">
            <h3 className="font-sans font-extrabold text-2xl sm:text-3xl text-[#00386b] leading-tight">Nhận Tư Vấn Lộ Trình Nghề Nghiệp</h3>
            <p className="text-sm text-gray-500 max-w-md mx-auto">
              Nhập thông tin cá nhân của bạn để nhận tư vấn trực tiếp từ Chuyên viên Tuyển sinh và nhận tài liệu giáo trình miễn phí.
            </p>
          </div>

          {errorMessage && (
            <div className="bg-blue-50 text-blue-800 p-3.5 rounded-lg flex items-start space-x-2 text-xs sm:text-sm border border-blue-100 font-medium">
              <AlertCircle className="w-4.5 h-4.5 shrink-0 mt-0.5 text-blue-700" />
              <span>{errorMessage}</span>
            </div>
          )}

          <div className="space-y-1.5">
            <label htmlFor="fullname-input" className="block text-xs sm:text-sm font-bold text-gray-700 uppercase tracking-wider">Họ và tên <span className="text-blue-600">*</span></label>
            <input
              id="fullname-input"
              type="text"
              placeholder="Ví dụ: Nguyễn Văn A"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full px-4 py-3 text-base bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700 focus:bg-white transition-all text-gray-800"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label htmlFor="phone-input" className="block text-xs sm:text-sm font-bold text-gray-700 uppercase tracking-wider">Số điện thoại <span className="text-blue-600">*</span></label>
              <input
                id="phone-input"
                type="tel"
                placeholder="Ví dụ: 0901234567"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full px-4 py-3 text-base bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700 focus:bg-white transition-all text-gray-800"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="email-input" className="block text-xs sm:text-sm font-bold text-gray-700 uppercase tracking-wider">Địa chỉ Email <span className="text-blue-600">*</span></label>
              <input
                id="email-input"
                type="email"
                placeholder="Ví dụ: email@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 text-base bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700 focus:bg-white transition-all text-gray-800"
                required
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label htmlFor="course-select" className="block text-xs sm:text-sm font-bold text-gray-700 uppercase tracking-wider">Khóa học quan tâm <span className="text-blue-600">*</span></label>
            <select
              id="course-select"
              value={selectedCourseId}
              onChange={(e) => setSelectedCourseId(e.target.value)}
              className="w-full px-4 py-3 text-base bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700 focus:bg-white transition-all text-gray-800"
              required
            >
              <option value="" disabled>--- Chọn khóa học muốn nhận tư vấn ---</option>
              {courses.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.title} ({course.level})
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5">
            <label htmlFor="notes-textarea" className="block text-xs sm:text-sm font-bold text-gray-700 uppercase tracking-wider">Yêu cầu cụ thể (Không bắt buộc)</label>
            <textarea
              id="notes-textarea"
              rows={2}
              placeholder="Ví dụ: Tôi muốn hỏi về lịch khai giảng, phương thức đóng học phí chia nhỏ..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-4 py-3 text-base bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700 focus:bg-white transition-all text-gray-800 resize-none"
            />
          </div>

          <button
            id="submit-consultation-btn"
            type="submit"
            disabled={isSubmitting}
            className="w-full mt-4 bg-gradient-to-r from-[#c5a85c] to-[#b3954a] hover:from-[#b3954a] hover:to-[#a1823d] text-white font-bold py-3.5 px-4 rounded-lg shadow-md hover:shadow-lg transition-all active:scale-[0.99] flex items-center justify-center space-x-2 text-base uppercase tracking-wide disabled:opacity-50 cursor-pointer"
          >
            {isSubmitting ? (
              <span className="flex items-center space-x-1.5">
                <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <span>Đang xử lý hồ sơ...</span>
              </span>
            ) : (
              <>
                <Send className="w-4.5 h-4.5" />
                <span>Gửi yêu cầu & Nhận tài liệu miễn phí</span>
              </>
            )}
          </button>
          
          <div className="text-xs text-gray-400 text-center leading-relaxed">
            Cam kết bảo mật tuyệt đối thông tin. Bằng cách đăng ký, bạn đồng ý nhận cuộc gọi tư vấn tuyển sinh và email tài liệu từ Saigontourist.
          </div>
        </form>
      )}
    </div>
  );
}
