import React from "react";
import { Mail, Phone, MapPin, Award, Shield, Facebook, Youtube, ExternalLink } from "lucide-react";
import sthcLogo from "../assets/images/regenerated_image_1783479369142.png";

interface FooterProps {
  onNavigate: (view: "home" | "courses" | "detail", courseId?: string, anchorId?: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="main-footer" className="text-neutral-300 border-t border-neutral-800" style={{ backgroundColor: "#162937" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand and Description */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center space-x-3 cursor-pointer" onClick={() => onNavigate("home")}>
              <img
                src={sthcLogo}
                alt="STHC Logo"
                className="object-contain rounded"
                style={{ width: "180px", height: "80px" }}
                referrerPolicy="no-referrer"
              />
            </div>
            <p className="text-neutral-400 text-xs leading-relaxed max-w-sm">
              Trường Trung cấp Du lịch và Khách sạn Saigontourist (Saigontourist Hospitality College), tự hào là đơn vị tiên phong với hơn 37 năm kinh nghiệm đào tạo thực tiễn nguồn nhân lực chất lượng cao cho ngành Du lịch - Khách sạn và Ẩm thực Việt Nam.
            </p>
            <div className="flex space-x-3 pt-2">
              <a href="#" className="w-9 h-9 rounded-full bg-neutral-800 hover:bg-blue-800 hover:text-white flex items-center justify-center transition-colors text-neutral-400" aria-label="Facebook">
                <Facebook className="w-4.5 h-4.5" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-neutral-800 hover:bg-blue-800 hover:text-white flex items-center justify-center transition-colors text-neutral-400" aria-label="Youtube">
                <Youtube className="w-4.5 h-4.5" />
              </a>
            </div>
          </div>

          {/* Contact Details */}
          <div className="space-y-4">
            <h3 className="text-white text-sm font-semibold tracking-wider uppercase border-b border-neutral-800 pb-2">
              Thông tin liên hệ
            </h3>
            <ul className="space-y-3 text-xs text-neutral-400">
              <li className="flex items-start space-x-2.5">
                <MapPin className="w-4.5 h-4.5 text-blue-500 shrink-0 mt-0.5" />
                <span>23/8 Hoàng Việt, Phường 4, Quận Tân Bình, TP. Hồ Chí Minh</span>
              </li>
              <li className="flex items-center space-x-2.5">
                <Phone className="w-4.5 h-4.5 text-blue-500 shrink-0" />
                <a href="tel:18005588" className="hover:text-blue-400 transition-colors">1800 5588 (Hotline miễn phí)</a>
              </li>
              <li className="flex items-center space-x-2.5">
                <Mail className="w-4.5 h-4.5 text-blue-500 shrink-0" />
                <a href="mailto:tuyensinh@saigontourist.edu.vn" className="hover:text-blue-400 transition-colors">info@sthc-learning.edu.vn</a>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-white text-sm font-semibold tracking-wider uppercase border-b border-neutral-800 pb-2">
              Khóa học nổi bật
            </h3>
            <ul className="space-y-2.5 text-xs text-neutral-400">
              <li>
                <button onClick={() => onNavigate("courses")} className="hover:text-blue-400 transition-colors text-left flex items-center space-x-1">
                  <span>Latte Art Chuyên Sâu</span>
                  <ExternalLink className="w-3 h-3 text-neutral-600" />
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate("courses")} className="hover:text-blue-400 transition-colors text-left flex items-center space-x-1">
                  <span>Chế Biến Sốt Âu 5 Sao</span>
                  <ExternalLink className="w-3 h-3 text-neutral-600" />
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate("courses")} className="hover:text-blue-400 transition-colors text-left flex items-center space-x-1">
                  <span>Bánh Âu Hiện Đại</span>
                  <ExternalLink className="w-3 h-3 text-neutral-600" />
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate("courses")} className="hover:text-blue-400 transition-colors text-left flex items-center space-x-1">
                  <span>Quản trị Tiền sảnh Khách sạn</span>
                  <ExternalLink className="w-3 h-3 text-neutral-600" />
                </button>
              </li>
            </ul>
          </div>

          {/* Accreditation and Admin Link */}
          <div className="space-y-4">
            <h3 className="text-white text-sm font-semibold tracking-wider uppercase border-b border-neutral-800 pb-2">
              Chứng thực chất lượng
            </h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2 bg-neutral-800/50 p-2.5 rounded border border-neutral-800">
                <Award className="w-5 h-5 text-amber-500 shrink-0" />
                <span className="text-[11px] text-neutral-300 leading-tight">
                  Tiêu chuẩn quốc gia VTOS & Tổng cục giáo dục nghề nghiệp
                </span>
              </div>
              <div className="flex items-center space-x-2 bg-neutral-800/50 p-2.5 rounded border border-neutral-800">
                <Shield className="w-5 h-5 text-blue-500 shrink-0" />
                <span className="text-[11px] text-neutral-300 leading-tight">
                  Bảo chứng uy tín từ Saigontourist Group thương hiệu du lịch quốc gia
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-neutral-800 flex flex-col md:flex-row justify-between items-center text-xs text-neutral-500">
          <p>© {currentYear} Saigontourist Online Learning. Tất cả các quyền được bảo lưu.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-neutral-400 transition-colors">Điều khoản sử dụng</a>
            <a href="#" className="hover:text-neutral-400 transition-colors">Chính sách bảo mật</a>
            <a href="#" className="hover:text-neutral-400 transition-colors">Hướng dẫn thanh toán</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
