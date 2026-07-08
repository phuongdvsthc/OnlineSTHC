import React, { useState, useEffect, useMemo } from "react";
import { ConsultationInquiry } from "../types";
import { courses } from "../data/courses";
import { 
  Users, PhoneCall, CheckCircle, GraduationCap, Search, Trash2, 
  RotateCcw, Database, FileSpreadsheet, ShieldCheck, Mail, Phone, Calendar 
} from "lucide-react";

export default function AdminDashboard() {
  const [inquiries, setInquiries] = useState<ConsultationInquiry[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCourse, setFilterCourse] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  // Load inquiries from localStorage
  const loadInquiries = () => {
    try {
      const stored = localStorage.getItem("saigontourist_inquiries");
      if (stored) {
        setInquiries(JSON.parse(stored));
      } else {
        setInquiries([]);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    loadInquiries();
  }, []);

  // Compute metrics
  const metrics = useMemo(() => {
    let total = inquiries.length;
    let pending = inquiries.filter(i => i.status === "Chờ liên hệ").length;
    let consulted = inquiries.filter(i => i.status === "Đã tư vấn").length;
    let enrolled = inquiries.filter(i => i.status === "Đã nhập học").length;

    return { total, pending, consulted, enrolled };
  }, [inquiries]);

  // Handle Status Change
  const handleStatusChange = (id: string, newStatus: ConsultationInquiry["status"]) => {
    try {
      const updated = inquiries.map(item => {
        if (item.id === id) {
          return { ...item, status: newStatus };
        }
        return item;
      });
      localStorage.setItem("saigontourist_inquiries", JSON.stringify(updated));
      setInquiries(updated);
    } catch (e) {
      console.error(e);
    }
  };

  // Handle Delete
  const handleDelete = (id: string) => {
    if (window.confirm(`Bạn có chắc chắn muốn xóa hồ sơ tư vấn ${id}?`)) {
      try {
        const filtered = inquiries.filter(item => item.id !== id);
        localStorage.setItem("saigontourist_inquiries", JSON.stringify(filtered));
        setInquiries(filtered);
      } catch (e) {
        console.error(e);
      }
    }
  };

  // Seed sample data for demonstration
  const handleSeedData = () => {
    const sampleInquiries: ConsultationInquiry[] = [
      {
        id: "ST-847291",
        fullName: "Trần Anh Quốc",
        phoneNumber: "0905112233",
        email: "anhquoc.tran@gmail.com",
        courseId: "latte-art-pro",
        notes: "Muốn hỏi về chính sách học phí chia làm 2 đợt đóng và lịch khai giảng tối thứ 2-4-6.",
        createdAt: new Date(Date.now() - 3600000 * 2).toISOString(), // 2 hours ago
        status: "Chờ liên hệ"
      },
      {
        id: "ST-194829",
        fullName: "Nguyễn Thị Mai Chi",
        phoneNumber: "0912445566",
        email: "maichi.cuisine@yahoo.com",
        courseId: "sot-au-5sao",
        notes: "Đang mở quán bít tết nhỏ, cần chuẩn hóa công thức sốt tiêu và sốt vang đỏ.",
        createdAt: new Date(Date.now() - 3600000 * 18).toISOString(), // 18 hours ago
        status: "Đã tư vấn"
      },
      {
        id: "ST-330419",
        fullName: "Lâm Minh Quân",
        phoneNumber: "0988776655",
        email: "minhquan.baker@gmail.com",
        courseId: "sourdough-artisan",
        notes: "Đăng ký nhận ưu đãi giảm 25% cho khóa bánh mì Sourdough.",
        createdAt: new Date(Date.now() - 3600000 * 40).toISOString(), // 40 hours ago
        status: "Đã nhập học"
      }
    ];

    try {
      localStorage.setItem("saigontourist_inquiries", JSON.stringify(sampleInquiries));
      setInquiries(sampleInquiries);
    } catch (e) {
      console.error(e);
    }
  };

  // Clear all data
  const handleClearAll = () => {
    if (window.confirm("CẢNH BÁO: Bạn có chắc chắn muốn xóa toàn bộ danh sách hồ sơ tư vấn?")) {
      try {
        localStorage.removeItem("saigontourist_inquiries");
        setInquiries([]);
      } catch (e) {
        console.error(e);
      }
    }
  };

  // Filtered and searched list
  const filteredInquiries = useMemo(() => {
    return inquiries.filter(item => {
      // 1. Search term (Matches Name, Email, Phone, Code)
      const query = searchTerm.toLowerCase();
      const matchesSearch = !query || 
        item.fullName.toLowerCase().includes(query) ||
        item.email.toLowerCase().includes(query) ||
        item.phoneNumber.includes(query) ||
        item.id.toLowerCase().includes(query);

      // 2. Course Filter
      const matchesCourse = filterCourse === "all" || item.courseId === filterCourse;

      // 3. Status Filter
      const matchesStatus = filterStatus === "all" || item.status === filterStatus;

      return matchesSearch && matchesCourse && matchesStatus;
    });
  }, [inquiries, searchTerm, filterCourse, filterStatus]);

  return (
    <div id="admin-dashboard-container" className="pt-24 pb-16 bg-neutral-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Title Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-200 pb-5">
          <div className="space-y-1">
            <h1 className="font-serif font-extrabold text-3xl sm:text-4xl text-neutral-900 flex items-center space-x-2.5">
              <ShieldCheck className="w-8 h-8 text-blue-800" />
              <span>Hệ Thống Quản Lý Đăng Ký Tư Vấn</span>
            </h1>
            <p className="text-sm sm:text-base text-gray-500 font-sans">
              Trang thông tin dành riêng cho Quản trị viên/Ban tuyển sinh Saigontourist. Theo dõi và cập nhật trạng thái tuyển sinh trực tiếp.
            </p>
          </div>

          {/* Quick Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleSeedData}
              className="px-4 py-2 bg-white hover:bg-neutral-50 text-neutral-800 rounded-lg text-xs sm:text-sm font-bold border border-gray-200 flex items-center space-x-1.5 transition-colors cursor-pointer"
            >
              <Database className="w-4 h-4 text-amber-600" />
              <span>Tạo dữ liệu mẫu</span>
            </button>
            <button
              onClick={handleClearAll}
              disabled={inquiries.length === 0}
              className="px-4 py-2 bg-red-50 hover:bg-red-100 text-red-800 disabled:opacity-40 rounded-lg text-xs sm:text-sm font-bold border border-red-100 flex items-center space-x-1.5 transition-colors cursor-pointer"
            >
              <Trash2 className="w-4 h-4" />
              <span>Xóa tất cả</span>
            </button>
          </div>
        </div>

        {/* METRICS GRID CARDS */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl border border-gray-200 p-4 flex items-center space-x-4 shadow-sm">
            <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-gray-400 block tracking-wider">Tổng Đăng Ký</span>
              <p className="text-2xl font-bold text-neutral-800 leading-none mt-1">{metrics.total}</p>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-4 flex items-center space-x-4 shadow-sm">
            <div className="w-10 h-10 rounded-lg bg-blue-55 text-blue-800 flex items-center justify-center shrink-0">
              <PhoneCall className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-gray-400 block tracking-wider">Chờ Liên Hệ</span>
              <p className="text-2xl font-bold text-blue-900 leading-none mt-1">{metrics.pending}</p>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-4 flex items-center space-x-4 shadow-sm">
            <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-gray-400 block tracking-wider">Đã Tư Vấn</span>
              <p className="text-2xl font-bold text-amber-800 leading-none mt-1">{metrics.consulted}</p>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-4 flex items-center space-x-4 shadow-sm">
            <div className="w-10 h-10 rounded-lg bg-green-50 text-green-600 flex items-center justify-center shrink-0">
              <CheckCircle className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-gray-400 block tracking-wider">Đã Nhập Học</span>
              <p className="text-2xl font-bold text-green-700 leading-none mt-1">{metrics.enrolled}</p>
            </div>
          </div>
        </div>

        {/* MAIN DATA FILTER & TABLE */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          
          {/* Filters Bar */}
          <div className="p-4 sm:p-5 bg-neutral-50 border-b border-gray-200 grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-400" />
              <input
                type="text"
                placeholder="Tìm tên, email, sđt, mã hồ sơ..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-800 font-sans"
              />
            </div>

            {/* Course Filter */}
            <div>
              <select
                value={filterCourse}
                onChange={(e) => setFilterCourse(e.target.value)}
                className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-800 cursor-pointer text-gray-600 font-medium"
              >
                <option value="all">Tất cả Khóa học</option>
                {courses.map((course) => (
                  <option key={course.id} value={course.id}>{course.title}</option>
                ))}
              </select>
            </div>

            {/* Status Filter */}
            <div>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-800 cursor-pointer text-gray-600 font-medium"
              >
                <option value="all">Tất cả Trạng thái</option>
                <option value="Chờ liên hệ">Chờ liên hệ</option>
                <option value="Đã tư vấn">Đã tư vấn</option>
                <option value="Đã nhập học">Đã nhập học</option>
              </select>
            </div>
          </div>

          {/* Table Container */}
          <div className="overflow-x-auto">
            {filteredInquiries.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <p className="text-gray-300 text-5xl">📭</p>
                <p className="font-serif font-bold text-gray-800 text-sm">Không tìm thấy hồ sơ đăng ký nào</p>
                <p className="text-xs text-gray-400 font-sans max-w-sm mx-auto">
                  Hiện tại không có thông tin đăng ký nào khớp với tiêu chuẩn lọc của bạn. Bạn hãy đăng ký một hồ sơ ở Trang chủ để kiểm tra.
                </p>
              </div>
            ) : (
              <table className="w-full text-left border-collapse min-w-[800px]">
                <thead>
                  <tr className="bg-neutral-50/50 text-xs uppercase font-bold tracking-wider text-gray-400 border-b border-gray-200">
                    <th className="px-5 py-3">Mã & Ngày tạo</th>
                    <th className="px-5 py-3">Học viên</th>
                    <th className="px-5 py-3">Khóa học quan tâm</th>
                    <th className="px-5 py-3">Yêu cầu cụ thể</th>
                    <th className="px-5 py-3">Trạng thái</th>
                    <th className="px-5 py-3 text-right">Thao tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-150 text-xs sm:text-sm text-gray-700">
                  {filteredInquiries.map((item) => {
                    const currentCourse = courses.find(c => c.id === item.courseId);
                    return (
                      <tr key={item.id} className="hover:bg-neutral-50/40 transition-colors">
                        {/* ID Code and Date */}
                        <td className="px-5 py-4 space-y-1 whitespace-nowrap">
                          <span className="font-mono font-bold text-blue-850 bg-blue-50 px-2.5 py-0.5 rounded border border-blue-100">
                            {item.id}
                          </span>
                          <span className="text-[10px] sm:text-xs text-gray-400 block flex items-center space-x-1 pt-1">
                            <Calendar className="w-3.5 h-3.5" />
                            <span>{new Date(item.createdAt).toLocaleString("vi-VN")}</span>
                          </span>
                        </td>

                        {/* Student profile details */}
                        <td className="px-5 py-4 space-y-1">
                          <p className="font-bold text-neutral-800">{item.fullName}</p>
                          <div className="space-y-0.5 text-[10px] sm:text-xs text-gray-400 font-medium">
                            <span className="flex items-center space-x-1">
                              <Phone className="w-3 h-3 text-gray-400 shrink-0" />
                              <a href={`tel:${item.phoneNumber}`} className="hover:text-blue-800">{item.phoneNumber}</a>
                            </span>
                            <span className="flex items-center space-x-1 pt-0.5">
                              <Mail className="w-3 h-3 text-gray-400 shrink-0" />
                              <a href={`mailto:${item.email}`} className="hover:text-blue-800 truncate max-w-[150px]">{item.email}</a>
                            </span>
                          </div>
                        </td>

                        {/* Selected Course details */}
                        <td className="px-5 py-4 max-w-[180px]">
                          <p className="font-semibold text-gray-800 truncate">{currentCourse?.title || "Chưa chọn"}</p>
                          <span className="text-[10px] sm:text-xs text-amber-600 block mt-0.5 font-bold uppercase">{currentCourse?.level}</span>
                        </td>

                        {/* Customer Notes */}
                        <td className="px-5 py-4 max-w-[200px]">
                          <p className="text-gray-500 font-sans italic line-clamp-2" title={item.notes}>
                            {item.notes || "Không có yêu cầu đặc biệt."}
                          </p>
                        </td>

                        {/* Status updating dropdown */}
                        <td className="px-5 py-4">
                          <select
                            value={item.status}
                            onChange={(e: any) => handleStatusChange(item.id, e.target.value)}
                            className={`px-2 py-1 text-[10px] sm:text-xs font-bold uppercase tracking-wider rounded border cursor-pointer focus:outline-none ${
                              item.status === "Chờ liên hệ"
                                ? "bg-blue-50 text-blue-800 border-blue-200"
                                : item.status === "Đã tư vấn"
                                ? "bg-amber-50 text-amber-800 border-amber-200"
                                : "bg-green-50 text-green-800 border-green-200"
                            }`}
                          >
                            <option value="Chờ liên hệ">Chờ liên hệ</option>
                            <option value="Đã tư vấn">Đã tư vấn</option>
                            <option value="Đã nhập học">Đã nhập học</option>
                          </select>
                        </td>

                        {/* Delete single inquiry */}
                        <td className="px-5 py-4 text-right whitespace-nowrap">
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="p-1.5 text-gray-400 hover:text-red-700 bg-gray-50 hover:bg-red-50 border border-gray-200 hover:border-red-100 rounded-md transition-colors cursor-pointer"
                            title="Xóa hồ sơ"
                          >
                            <Trash2 className="w-4.5 h-4.5" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
