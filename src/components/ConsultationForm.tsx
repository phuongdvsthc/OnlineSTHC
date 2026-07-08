import React, { useState, useEffect } from "react";
import { Check, Send, AlertCircle, Smile, Settings, Copy, FileSpreadsheet, Mail, ExternalLink, X, RefreshCw } from "lucide-react";
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

  // Admin Config State
  const [showConfigModal, setShowConfigModal] = useState(false);
  const [googleScriptUrl, setGoogleScriptUrl] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const [testStatus, setTestStatus] = useState<"idle" | "testing" | "success" | "error">("idle");
  const [testError, setTestError] = useState("");

  useEffect(() => {
    if (preselectedCourseId) {
      setSelectedCourseId(preselectedCourseId);
    }
  }, [preselectedCourseId]);

  useEffect(() => {
    // Load saved script URL on mount
    const saved = localStorage.getItem("saigontourist_google_script_url");
    if (saved) {
      setGoogleScriptUrl(saved);
    }
  }, []);

  const handleSaveConfig = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("saigontourist_google_script_url", googleScriptUrl.trim());
    alert("Đã lưu cấu hình kết nối Google Sheet thành công!");
  };

  const handleTestConnection = async () => {
    if (!googleScriptUrl.trim()) {
      setTestStatus("error");
      setTestError("Vui lòng nhập URL Web App trước khi kiểm tra");
      return;
    }

    setTestStatus("testing");
    setTestError("");

    try {
      const testPayload = {
        id: "TEST-ST",
        fullName: "Người kiểm tra hệ thống",
        phoneNumber: "0900000000",
        email: email || "test@sthc.edu.vn",
        courseId: "test-course",
        courseTitle: "Kiểm tra kết nối hệ thống",
        notes: "Đây là yêu cầu kiểm tra tự động từ hệ thống Saigontourist Online Learning.",
      };

      await fetch(googleScriptUrl.trim(), {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(testPayload),
      });

      setTestStatus("success");
    } catch (err: any) {
      setTestStatus("error");
      setTestError(err.message || "Lỗi kiểm tra kết nối");
    }
  };

  const handleCopyCode = () => {
    const code = getAppsScriptCode();
    navigator.clipboard.writeText(code);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
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

    try {
      const code = "ST-" + Math.floor(100000 + Math.random() * 900000);
      setInquiryCode(code);

      const activeCourse = courses.find((c) => c.id === selectedCourseId);
      const courseTitle = activeCourse ? activeCourse.title : "Khóa học chưa xác định";

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

      // Save to localStorage (fallback & local logs)
      const existingRaw = localStorage.getItem("saigontourist_inquiries");
      const existing: ConsultationInquiry[] = existingRaw ? JSON.parse(existingRaw) : [];
      existing.unshift(newInquiry);
      localStorage.setItem("saigontourist_inquiries", JSON.stringify(existing));

      // Google Script Integration Trigger
      const envUrl = (import.meta as any).env?.VITE_GOOGLE_SCRIPT_URL;
      const localUrl = localStorage.getItem("saigontourist_google_script_url");
      const targetUrl = localUrl || envUrl || "";

      if (targetUrl) {
        try {
          await fetch(targetUrl, {
            method: "POST",
            mode: "no-cors",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id: code,
              fullName: fullName.trim(),
              phoneNumber: phoneNumber.trim(),
              email: email.trim(),
              courseId: selectedCourseId,
              courseTitle: courseTitle,
              notes: notes.trim(),
            }),
          });
        } catch (scriptErr) {
          console.error("Google script trigger failed:", scriptErr);
        }
      }

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
  };

  const getAppsScriptCode = () => {
    return `function doPost(e) {
  try {
    var data = {};
    if (e && e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (parseErr) {
        // Fallback if not pure JSON
        data = e.parameter;
      }
    } else if (e && e.parameter) {
      data = e.parameter;
    }

    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheets()[0];
    
    // Create headers if sheet is empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Mã hồ sơ", 
        "Họ và tên", 
        "Số điện thoại", 
        "Email", 
        "Khóa học quan tâm", 
        "Ghi chú bổ sung", 
        "Thời gian đăng ký"
      ]);
      sheet.getRange(1, 1, 1, 7).setFontWeight("bold").setBackground("#0D4F8B").setFontColor("#FFFFFF");
    }
    
    var vnTime = new Date().toLocaleString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh" });
    
    // Append registrant data
    sheet.appendRow([
      data.id || "N/A",
      data.fullName || "N/A",
      data.phoneNumber || "N/A",
      data.email || "N/A",
      data.courseTitle || "N/A",
      data.notes || "Không có",
      vnTime
    ]);
    
    // 1. Send Notification Email to Admin
    var adminEmail = Session.getEffectiveUser().getEmail();
    if (!adminEmail) {
      adminEmail = Session.getActiveUser().getEmail();
    }
    
    if (adminEmail) {
      var adminSubject = "[Saigontourist] Có đăng ký tư vấn mới từ " + (data.fullName || "Học viên");
      var adminBody = "Kính gửi Ban Tuyển Sinh,\\n\\n" +
        "Hệ thống vừa ghi nhận một yêu cầu đăng ký tư vấn học trực tuyến mới như sau:\\n\\n" +
        "==================================================\\n" +
        " Mã hồ sơ: " + (data.id || "N/A") + "\\n" +
        " Họ và tên: " + (data.fullName || "N/A") + "\\n" +
        " Số điện thoại: " + (data.phoneNumber || "N/A") + "\\n" +
        " Email: " + (data.email || "N/A") + "\\n" +
        " Khóa học quan tâm: " + (data.courseTitle || "N/A") + "\\n" +
        " Ghi chú khách hàng: " + (data.notes || "Không có") + "\\n" +
        " Thời gian đăng ký: " + vnTime + "\\n" +
        "==================================================\\n\\n" +
        "Vui lòng đăng nhập Google Sheet để xem danh sách đầy đủ hoặc liên hệ hỗ trợ học viên kịp thời.\\n\\n" +
        "Trân trọng,\\n" +
        "Hệ thống Tuyển sinh Saigontourist Online Learning";
        
      try {
        GmailApp.sendEmail(adminEmail, adminSubject, adminBody);
      } catch (gmailErr) {
        MailApp.sendEmail(adminEmail, adminSubject, adminBody);
      }
    }
    
    // 2. Send Automated Confirmation Email to Student
    if (data.email && data.email.indexOf("@") !== -1) {
      var studentSubject = "[Saigontourist] Đăng ký tư vấn khóa học thành công - Mã hồ sơ: " + (data.id || "");
      var studentBody = "Kính gửi anh/chị " + (data.fullName || "") + ",\\n\\n" +
        "Trường Trung cấp Du lịch & Khách sạn Saigontourist xin chân thành cảm ơn anh/chị đã quan tâm và đăng ký nhận tư vấn lộ trình học tập trực tuyến.\\n\\n" +
        "Thông tin hồ sơ tuyển sinh đã được ghi nhận thành công:\\n" +
        " - Khóa học quan tâm: " + (data.courseTitle || "") + "\\n" +
        " - Mã hồ sơ ưu đãi học phí: " + (data.id || "") + "\\n\\n" +
        "Chuyên viên tuyển sinh của Trường sẽ liên hệ trực tiếp với anh/chị qua số điện thoại " + (data.phoneNumber || "") + " trong vòng tối đa 2 giờ làm việc để cung cấp chi tiết lịch học, mức học phí và các chương trình ưu đãi dành riêng cho anh/chị.\\n\\n" +
        "Chúc anh/chị một ngày mới tràn đầy năng lượng và gặt hái nhiều thành công!\\n\\n" +
        "Trân trọng,\\n" +
        "Ban tuyển sinh Trường Saigontourist\\n" +
        "Hotline miễn phí: 1800 5588";
        
      try {
        GmailApp.sendEmail(data.email, studentSubject, studentBody);
      } catch (gmailErr2) {
        MailApp.sendEmail(data.email, studentSubject, studentBody);
      }
    }
    
    return ContentService.createTextOutput(JSON.stringify({ status: "success", code: data.id }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ status: "error", message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}`;
  };

  return (
    <div className="relative">
      <div id="consultation-form-wrapper" className="bg-white rounded-2xl shadow-xl border border-blue-100 p-6 sm:p-8 max-w-lg mx-auto transition-all duration-300">
        {submitSuccess ? (
          <div id="form-success-state" className="text-center py-8 space-y-4">
            <div className="w-16 h-16 bg-green-50 border-2 border-green-500 rounded-full flex items-center justify-center mx-auto text-green-500 animate-bounce">
              <Check className="w-8 h-8" />
            </div>
            <h3 className="font-sans font-extrabold text-2xl text-blue-900">Đăng Ký Thành Công!</h3>
            <p className="text-gray-700 text-sm sm:text-base max-w-sm mx-auto leading-relaxed">
              Hệ thống đào tạo trực tuyến Saigontourist đã ghi nhận đăng ký tư vấn của bạn. Chúng tôi sẽ liên hệ trong vòng <b>2 giờ làm việc</b>.
            </p>
            
            <div className="bg-amber-50/70 border border-amber-200 rounded-lg p-4 text-left max-w-md mx-auto space-y-1.5 text-xs sm:text-sm">
              <div className="flex justify-between border-b border-amber-200 pb-1.5">
                <span className="font-semibold text-amber-900">Mã hồ sơ tư vấn:</span>
                <span className="font-mono font-bold text-blue-800">{inquiryCode}</span>
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
              className="mt-6 inline-flex items-center space-x-2 bg-gradient-to-r from-blue-800 to-blue-900 text-white text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded hover:from-blue-900 hover:to-blue-950 transition-colors cursor-pointer"
            >
              <Smile className="w-4 h-4" />
              <span>Đăng ký thêm thông tin</span>
            </button>
          </div>
        ) : (
          <form id="consultation-form-element" onSubmit={handleSubmit} className="space-y-4">
            <div className="text-center space-y-1.5 mb-6">
              <h3 className="font-sans font-extrabold text-2xl sm:text-3xl text-[#0D4F8B] leading-tight">Nhận Tư Vấn Lộ Trình Nghề Nghiệp</h3>
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
              className="w-full mt-4 bg-amber-500 hover:bg-amber-600 text-white font-bold py-3.5 px-4 rounded-lg shadow-md hover:shadow-lg transition-all active:scale-[0.99] flex items-center justify-center space-x-2 text-base uppercase tracking-wide disabled:opacity-50 cursor-pointer"
              style={{ backgroundColor: "#D4A017" }}
            >
              {isSubmitting ? (
                <span className="flex items-center space-x-1.5">
                  <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span>Đang ghi nhận đăng ký...</span>
                </span>
              ) : (
                <>
                  <Send className="w-4.5 h-4.5" />
                  <span>Gửi yêu cầu & Nhận tài liệu miễn phí</span>
                </>
              )}
            </button>
            
            <div className="text-xs text-gray-400 text-center leading-relaxed">
              Cam kết bảo mật tuyệt đối thông tin. Bằng cách đăng ký, bạn đồng ý nhận cuộc gọi tư vấn tuyển sinh và email tài liệu tuyển sinh từ Saigontourist.
            </div>
          </form>
        )}
      </div>

      {/* Subtle Settings Trigger at the bottom */}
      <div className="text-center mt-6">
        <button
          onClick={() => setShowConfigModal(true)}
          className="inline-flex items-center space-x-1.5 text-xs font-semibold text-[#0D4F8B] hover:text-[#2D79C7] transition-all bg-white px-3.5 py-1.5 rounded-full shadow-sm hover:shadow-md border border-blue-100 cursor-pointer"
        >
          <Settings className="w-3.5 h-3.5 animate-spin-slow" />
          <span>Tích hợp Google Sheets & Email (Admin)</span>
        </button>
      </div>

      {/* Modern Slide-Over / Centered Modal for Settings */}
      {showConfigModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-neutral-900/60 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-blue-50 overflow-hidden my-8 flex flex-col max-h-[90vh]">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-blue-800 to-blue-900 text-white">
              <div className="flex items-center space-x-2.5">
                <FileSpreadsheet className="w-5.5 h-5.5 text-amber-400" />
                <div>
                  <h3 className="font-bold text-lg leading-none">Kết nối Google Sheets & Gmail</h3>
                  <p className="text-[11px] text-blue-200 mt-0.5">Tự động hóa lưu trữ và gửi Email thông báo tuyển sinh</p>
                </div>
              </div>
              <button
                onClick={() => setShowConfigModal(false)}
                className="p-1 text-blue-100 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content (Scrollable) */}
            <div className="p-6 overflow-y-auto space-y-6 text-gray-700 text-sm leading-relaxed flex-grow">
              
              {/* Instructions Panel */}
              <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-4.5 space-y-3.5">
                <h4 className="font-extrabold text-blue-900 flex items-center space-x-1.5 uppercase tracking-wide text-xs">
                  <span className="bg-blue-800 text-white text-[10px] w-4.5 h-4.5 rounded-full inline-flex items-center justify-center">1</span>
                  <span>Hướng dẫn cài đặt nhanh trong 3 bước:</span>
                </h4>
                <ol className="list-decimal pl-4 space-y-2.5 text-xs text-gray-600">
                  <li>
                    Mở một <b>Google Sheet</b> mới của bạn. Truy cập menu <b>Tiện ích mở rộng (Extensions)</b> &rarr; Chọn <b>Apps Script</b>.
                  </li>
                  <li>
                    Xóa toàn bộ mã mặc định hiện có và dán mã nguồn được cung cấp dưới đây vào khung soạn thảo.
                  </li>
                  <li>
                    Click nút <b>Triển khai (Deploy)</b> ở góc phải &rarr; Chọn <b>Tối ưu triển khai mới (New deployment)</b>.
                    <ul className="list-disc pl-4 mt-1 text-[11px] text-gray-500 space-y-0.5">
                      <li>Loại hình (Type): Chọn <b>Ứng dụng Web (Web app)</b></li>
                      <li>Người thực thi (Execute as): Chọn <b>Tôi (Me)</b></li>
                      <li>Ai có quyền truy cập (Who has access): Chọn <b>Mọi người (Anyone)</b></li>
                    </ul>
                    Bấm Triển khai, cấp quyền cho tài khoản Google của bạn khi được hỏi, sau đó <b>sao chép URL Ứng dụng Web</b> nhận được dán vào ô bên dưới.
                  </li>
                </ol>
              </div>

              {/* Apps Script Code Section */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-gray-800 text-xs uppercase tracking-wider flex items-center space-x-1.5">
                    <Mail className="w-4 h-4 text-amber-500" />
                    <span>Mã nguồn Google Apps Script:</span>
                  </span>
                  <button
                    onClick={handleCopyCode}
                    className="inline-flex items-center space-x-1 text-xs text-blue-800 hover:text-amber-600 font-bold transition-colors cursor-pointer"
                  >
                    {isCopied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-green-500" />
                        <span className="text-green-600">Đã sao chép!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Sao chép mã nhanh</span>
                      </>
                    )}
                  </button>
                </div>
                
                <div className="relative">
                  <pre className="text-[11px] font-mono bg-neutral-900 text-neutral-200 p-4 rounded-xl overflow-x-auto max-h-48 border border-neutral-800 leading-normal select-all">
                    {getAppsScriptCode()}
                  </pre>
                </div>
              </div>

              {/* Configuration Form */}
              <div className="border-t border-gray-100 pt-5 space-y-4">
                <span className="font-bold text-gray-800 text-xs uppercase tracking-wider flex items-center space-x-1.5">
                  <FileSpreadsheet className="w-4.5 h-4.5 text-emerald-600" />
                  <span>Cấu hình đường dẫn kết nối:</span>
                </span>

                <form onSubmit={handleSaveConfig} className="space-y-3">
                  <div className="space-y-1">
                    <label htmlFor="script-url-input" className="block text-xs font-semibold text-gray-600">Google Apps Script Web App URL</label>
                    <input
                      id="script-url-input"
                      type="url"
                      placeholder="https://script.google.com/macros/s/.../exec"
                      value={googleScriptUrl}
                      onChange={(e) => setGoogleScriptUrl(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs font-mono bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-800 text-gray-800"
                      required
                    />
                  </div>

                  <div className="flex flex-wrap gap-2.5 pt-1">
                    <button
                      type="submit"
                      className="bg-blue-800 hover:bg-blue-900 text-white font-bold text-xs px-4 py-2.5 rounded-lg transition-colors cursor-pointer"
                    >
                      Lưu cấu hình
                    </button>
                    
                    <button
                      type="button"
                      onClick={handleTestConnection}
                      disabled={testStatus === "testing"}
                      className="bg-neutral-100 hover:bg-neutral-200 text-neutral-800 font-bold text-xs px-4 py-2.5 rounded-lg transition-colors flex items-center space-x-1.5 cursor-pointer disabled:opacity-50"
                    >
                      {testStatus === "testing" ? (
                        <>
                          <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                          <span>Đang gửi thử...</span>
                        </>
                      ) : (
                        <span>Kiểm tra kết nối</span>
                      )}
                    </button>
                  </div>
                </form>

                {/* Test Connection Results */}
                {testStatus === "success" && (
                  <div className="bg-emerald-50 text-emerald-800 border border-emerald-100 p-3 rounded-lg text-xs font-medium flex items-center space-x-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span><b>Kết nối thành công!</b> Một dòng kiểm tra đã được gửi tới Google Sheet và email của bạn sẽ nhận được thông báo tuyển sinh thử nghiệm.</span>
                  </div>
                )}
                
                {testStatus === "error" && (
                  <div className="bg-red-50 text-red-800 border border-red-100 p-3 rounded-lg text-xs font-medium flex items-center space-x-2">
                    <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                    <span><b>Kết nối thất bại:</b> {testError}. Vui lòng kiểm tra lại URL của bạn và đảm bảo cấu hình quyền truy cập là 'Anyone'.</span>
                  </div>
                )}
              </div>

            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-gray-150 bg-gray-50 flex justify-end">
              <button
                onClick={() => setShowConfigModal(false)}
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold text-xs uppercase tracking-wider px-5 py-2.5 rounded-lg transition-colors cursor-pointer"
              >
                Đóng lại
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
