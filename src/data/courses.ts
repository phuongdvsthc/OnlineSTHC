import { Course, CourseCategory, FAQItem, StudentReview } from "../types";

export const categories: CourseCategory[] = [
  {
    id: "culinary",
    name: "Nghệ thuật Bếp Việt & Âu",
    icon: "UtensilsCrossed",
    description: "Kỹ thuật nấu nướng từ cơ bản đến nâng cao, công thức nước sốt chuẩn 5 sao và cách setup bếp chuyên nghiệp.",
    courseCount: 12
  },
  {
    id: "baking",
    name: "Bánh Âu & Bánh Mì Hiện Đại",
    icon: "Cake",
    description: "Từ kỹ thuật làm cốt bánh chiffon, bánh kem tạo hình, đến các loại bánh mì men tự nhiên Sourdough thượng hạng.",
    courseCount: 8
  },
  {
    id: "beverage",
    name: "Barista & Pha Chế Chuyên Sâu",
    icon: "Coffee",
    description: "Làm chủ nghệ thuật Latte Art, kỹ năng pha chế đồ uống hiện đại, cocktail cổ điển và quản lý quầy bar hiệu quả.",
    courseCount: 10
  },
  {
    id: "hospitality",
    name: "Nghiệp Vụ Nhà Hàng - Khách Sạn",
    icon: "Hotel",
    description: "Quản trị tiền sảnh, kỹ năng phục vụ bàn chuyên nghiệp, quy trình phục vụ tiệc và dịch vụ buồng phòng tiêu chuẩn quốc tế.",
    courseCount: 6
  }
];

export const instructors = {
  tuan_nguyen: {
    id: "inst_1",
    name: "Master Barista Nguyễn Anh Tuấn",
    title: "Chuyên gia Pha chế & Giảng viên cấp cao tại Saigontourist",
    avatar: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&q=80&w=400",
    bio: "Hơn 15 năm kinh nghiệm làm việc tại các quầy bar của các tập đoàn khách sạn quốc tế. Thầy Tuấn đã đào tạo hơn 2,000 học viên, nhiều người trong số họ hiện là Head Barista và chủ các thương hiệu cà phê nổi bật tại Việt Nam.",
    achievements: [
      "Quán quân Vietnam Barista Championship 2018",
      "Giám khảo Chuyên môn Vietnam Latte Art Competition",
      "Cố vấn vận hành cho hơn 50 chuỗi cà phê và quầy bar cao cấp trên toàn quốc"
    ]
  },
  huong_tran: {
    id: "inst_2",
    name: "Chef De Partie Trần Thị Mai Hương",
    title: "Bếp trưởng Bánh Ngọt tại Khách sạn Rex (5 Sao)",
    avatar: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&q=80&w=400",
    bio: "Tốt nghiệp chuyên ngành Nghệ thuật Bánh ngọt tại Pháp (Ferrandi Paris). Cô Hương có hơn 12 năm kinh nghiệm thổi hồn vào những chiếc bánh Âu tinh tế và kết hợp hài hòa nguyên liệu nhiệt đới Việt Nam.",
    achievements: [
      "Giải Vàng cuộc thi Bánh ngọt Châu Á 2019 tại Singapore",
      "Hơn 10 năm kinh nghiệm làm Giảng viên thỉnh giảng tại các trường ẩm thực danh tiếng",
      "Tác giả cuốn sách nấu ăn đắt khách 'Bánh Âu ngọt ngào'"
    ]
  },
  minh_le: {
    id: "inst_3",
    name: "Executive Chef Lê Hoàng Minh",
    title: "Bếp Trưởng Điều Hành tại Khách Sạn Majestic (5 Sao)",
    avatar: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80&w=400",
    bio: "Hơn 20 năm cống hiến cho nghệ thuật ẩm thực. Chef Minh nổi tiếng với phong cách Fusion kết hợp kỹ thuật chế biến món Âu tinh xảo cùng hương vị đặc trưng truyền thống Việt Nam.",
    achievements: [
      "Huân chương vì sự nghiệp phát triển Du lịch & Ẩm thực TP.HCM",
      "Đại sứ Ẩm thực Việt Nam tại Lễ hội Văn hóa Du lịch Châu Âu 2022",
      "Chuyên gia cố vấn thực đơn tiệc chiêu đãi quốc tế cấp nhà nước"
    ]
  },
  vy_pham: {
    id: "inst_4",
    name: "Mrs. Phạm Thuấn Vy",
    title: "Trưởng Bộ Phận Lễ Tân Khách Sạn Caravelle (5 Sao)",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400",
    bio: "Chuyên gia với 18 năm thâm niên quản lý tiền sảnh và đào tạo nghiệp vụ khách sạn chuẩn quốc tế. Cô Vy nổi tiếng với kỹ năng xử lý tình huống khéo léo và nghệ thuật chăm sóc khách hàng VIP.",
    achievements: [
      "Giải thưởng Quản lý Tiền sảnh Xuất sắc nhất năm 2021 do Hiệp hội Khách sạn Việt Nam trao tặng",
      "Chứng chỉ Kiểm định viên Nghiệp vụ Lễ tân Quốc tế (VTOS)",
      "Đào tạo kỹ năng mềm và quy trình đón tiếp cho hơn 30 resort cao cấp"
    ]
  }
};

export const courses: Course[] = [
  {
    id: "latte-art-pro",
    title: "Kỹ thuật Pha chế và Latte Art Chuyên sâu",
    category: "beverage",
    level: "Chuyên sâu",
    duration: "48 Giờ",
    price: 3600000,
    originalPrice: 4800000,
    rating: 4.9,
    reviewCount: 312,
    image: "https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&q=80&w=800",
    videoSampleUrl: "https://www.w3schools.com/html/mov_bbb.mp4", // Free online public testing video
    description: "Khóa học được thiết kế đặc biệt nhằm nâng tầm tay nghề pha chế của bạn lên mức nghệ thuật thực thụ. Học viên sẽ được học lý thuyết chuyên sâu về cà phê, cách điều chỉnh cỡ xay, nhiệt độ nước và đặc biệt là làm chủ kỹ thuật tạo bọt sữa siêu mịn (microfoam) để vẽ các mẫu Latte Art kinh điển như Trái tim, Rosetta, Tulip, Thiên nga và các họa tiết nâng cao khác.",
    shortDescription: "Làm chủ máy pha cà phê Espresso chuyên nghiệp, tạo bọt sữa chuẩn vẽ Latte Art đỉnh cao từ Rosetta đến Thiên nga kiêu sa.",
    skillsAcquired: [
      "Làm chủ hoàn toàn máy pha Espresso công nghiệp",
      "Căn chỉnh tỷ lệ chiết xuất (Espresso Extraction) chuẩn xác từng giây",
      "Kỹ thuật đánh sữa tạo bọt microfoam bóng mịn, không bong bóng",
      "Vẽ thành thạo các hình Latte Art: Heart, Tulip, Rosetta, Swan",
      "Quy trình vệ sinh, bảo dưỡng máy móc thiết bị quầy Bar"
    ],
    careerOpportunities: [
      "Trở thành Nghệ nhân Pha chế (Barista) chuyên nghiệp tại các quán cà phê specialty",
      "Quản lý Quầy Bar hoặc Giám sát Pha chế tại khách sạn, nhà hàng 5 sao",
      "Tự tin mở và vận hành quán cà phê của riêng mình",
      "Trở thành Chuyên viên Đào tạo (Barista Trainer) cho các thương hiệu chuỗi"
    ],
    instructor: instructors.tuan_nguyen,
    curriculum: [
      {
        title: "Chương 1: Khoa học về hạt Cà phê & Khai phóng giác quan",
        description: "Khám phá bản chất hạt cà phê Arabica, Robusta và quy trình chiết xuất Espresso hoàn hảo.",
        duration: "8 Giờ",
        lessons: [
          "Lịch sử và nguồn gốc các giống cà phê phổ biến trên thế giới",
          "Cách đọc hiểu hồ sơ rang (Roast Profile) và lựa chọn cà phê",
          "Thực hành Cupping cảm quan hương vị cà phê chuyên sâu",
          "Các yếu tố ảnh hưởng trực tiếp đến chiết xuất: Nước, Nhiệt độ, Áp suất"
        ]
      },
      {
        title: "Chương 2: Làm chủ Máy xay & Máy pha Espresso",
        description: "Vận hành và căn chỉnh các thiết bị đắt giá trong quầy bar chuyên nghiệp.",
        duration: "10 Giờ",
        lessons: [
          "Cấu tạo chi tiết và nguyên lý hoạt động của máy pha Espresso",
          "Cách chỉnh độ mịn máy xay (Grind Size Calibration) để đạt tỷ lệ chiết xuất vàng",
          "Kỹ thuật phân bổ lực nén (Tamping) chuẩn xác tránh hiện tượng tạo rãnh (Channeling)",
          "Thực hành chiết xuất Double Shot Espresso hoàn hảo có lớp Crema dày mượt"
        ]
      },
      {
        title: "Chương 3: Phép thuật Microfoam - Đánh Sữa Đỉnh Cao",
        description: "Kỹ thuật biến sữa tươi thành lớp bọt sánh mịn màng như lụa.",
        duration: "12 Giờ",
        lessons: [
          "Lựa chọn loại sữa tươi tối ưu cho tạo bọt Latte Art",
          "Vị trí vòi hơi và góc đánh sữa để tạo xoáy lốc cuộn mịn bọt sữa",
          "Kiểm soát nhiệt độ đánh sữa lý tưởng (60°C - 65°C) giữ vị ngọt tự nhiên",
          "Cách lắc và xoay ca đánh sữa để đồng nhất bọt sữa và sữa nước"
        ]
      },
      {
        title: "Chương 4: Thực hành Nghệ thuật Latte Art",
        description: "Bắt đầu những nét vẽ đầu tiên trên tách cà phê bằng sữa ấm.",
        duration: "18 Giờ",
        lessons: [
          "Tư thế đứng, cách cầm ca sữa và góc đổ sữa căn bản",
          "Kỹ thuật vẽ hình Trái tim đối xứng (Basic Heart) và Trái tim xếp tầng",
          "Kỹ thuật lắc ca tạo sóng vẽ Rosetta kinh điển",
          "Làm chủ hình Tulip đa tầng (3-tier, 5-tier Tulip)",
          "Thực hành vẽ hình nâng cao: Thiên nga (Swan) và Sáng tạo tự do"
        ]
      }
    ],
    studentProjects: [
      { title: "Tác phẩm Latte Art Swan của học viên Minh Nhật", image: "https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&q=80&w=400" },
      { title: "Mẫu Tulip 7 Tầng hoàn hảo của học viên Phương Vy", image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=400" },
      { title: "Ly Flat White tinh tế của học viên Khánh Linh", image: "https://images.unsplash.com/photo-1577968897966-3d4325b36b61?auto=format&fit=crop&q=80&w=400" }
    ],
    isTopRated: true
  },
  {
    id: "sot-au-5sao",
    title: "Kỹ thuật Chế biến Sốt Âu Cơ bản & Nâng cao",
    category: "culinary",
    level: "Trung cấp",
    duration: "36 Giờ",
    price: 3800000,
    originalPrice: 4500000,
    rating: 4.8,
    reviewCount: 185,
    image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=800",
    videoSampleUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    description: "Trong ẩm thực Âu, nước sốt chính là linh hồn của món ăn. Khóa học này hướng dẫn chi tiết cách làm 5 loại sốt mẹ (Mother Sauces) kinh điển của Pháp và từ đó sáng tạo ra hàng trăm loại sốt biến tấu hiện đại. Thích hợp cho người muốn nâng tầm tay nghề nấu ăn tại nhà hoặc đầu bếp chuyên nghiệp muốn chuẩn hóa quy trình nấu nướng.",
    shortDescription: "Làm chủ 5 loại sốt mẹ kinh điển nước Pháp và hàng chục loại sốt hiện đại cho steak, hải sản và salad haute-cuisine.",
    skillsAcquired: [
      "Nấu nước dùng (Stocks) chuẩn vị Pháp trong suốt, thơm sâu",
      "Kỹ thuật làm chất làm đặc Roux, Beurre Manié và Liaison",
      "Thực hành thành thục 5 loại Sốt Mẹ: Béchamel, Velouté, Espagnole, Tomato, Hollandaise",
      "Kết hợp nguyên liệu Việt Nam tạo sốt Fusion đột phá"
    ],
    careerOpportunities: [
      "Đảm nhận vị trí Saucier (Đầu bếp chuyên về sốt) tại nhà hàng Âu",
      "Xây dựng menu độc quyền cho quán ăn, nhà hàng của riêng mình",
      "Nâng cao thu nhập và cấp bậc trong bếp nóng"
    ],
    instructor: instructors.minh_le,
    curriculum: [
      {
        title: "Chương 1: Nghệ thuật Ninh nước dùng & Chất kết dính",
        description: "Nền tảng của mọi loại nước sốt hảo hạng bắt đầu từ xương ninh hảo hạng.",
        duration: "8 Giờ",
        lessons: [
          "Quy trình nấu nước dùng bò (Brown Stock) và gà (White Stock) chuẩn khách sạn 5 sao",
          "Kỹ thuật lọc nước dùng trong suốt bằng lòng trắng trứng (Consommé)",
          "Thực hành làm Roux trắng, Roux vàng và Roux nâu đúng màu sắc và độ sánh"
        ]
      },
      {
        title: "Chương 2: Khám phá 5 loại Sốt Mẹ Pháp cổ điển",
        description: "Đi qua lịch sử ẩm thực thông qua những loại nước sốt nền tảng.",
        duration: "16 Giờ",
        lessons: [
          "Sốt kem sữa trắng Béchamel quyến rũ cho mỳ Ý và đồ nướng",
          "Sốt Velouté mượt mà từ nước dùng gà hải sản",
          "Sốt nâu Espagnole đậm đà từ xương bò nướng",
          "Sốt cà chua nguyên bản của Pháp Tomato Sauce",
          "Kỹ thuật đánh trứng bơ ấm tạo sốt Hollandaise mịn tắp bất bại"
        ]
      }
    ],
    studentProjects: [
      { title: "Sốt Hollandaise phủ trên trứng Benedict của học viên Anh Tú", image: "https://images.unsplash.com/photo-1608039829572-78524f79c4c7?auto=format&fit=crop&q=80&w=400" },
      { title: "Món Bít tết bò Mỹ sốt tiêu đen Espagnole của học viên Ngọc Anh", image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=400" }
    ],
    isTopRated: true
  },
  {
    id: "banh-au-hien-dai",
    title: "Lớp Học Bánh Âu Hiện Đại & Tạo Hình Nghệ Thuật",
    category: "baking",
    level: "Trung cấp",
    duration: "40 Giờ",
    price: 4200000,
    originalPrice: 5500000,
    rating: 4.9,
    reviewCount: 228,
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=800",
    videoSampleUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    description: "Đắm chìm vào thế giới bánh ngọt Pháp hiện đại đầy sắc màu và hương thơm. Học viên được học từ lý thuyết cân bằng công thức, kỹ thuật làm mousse mềm mịn, tráng gương bóng loáng (Mirror Glaze), phun nhung sang trọng và nghệ thuật lắp ráp bánh nhiều lớp phức tạp.",
    shortDescription: "Tạo tác các dòng bánh lạnh cao cấp, bánh Mousse tráng gương, phun nhung nghệ thuật chuẩn tiệm bánh Patisserie Pháp.",
    skillsAcquired: [
      "Hiểu sâu về cấu trúc bột, trứng, đường, chất tạo đông Gelatin",
      "Kỹ thuật đánh bông lòng trắng trứng (Meringue) kiểu Pháp, Ý, Thụy Sĩ",
      "Kỹ thuật tráng gương bánh Mousse bóng như gương",
      "Trang trí bánh với Chocolate Tempering và hoa quả tươi"
    ],
    careerOpportunities: [
      "Pastry Chef tại các tiệm bánh Âu, nhà hàng, khách sạn cao cấp",
      "Mở tiệm bánh ngọt online hoặc quán trà bánh phong cách Instagram",
      "Giảng dạy hoặc làm Content Creator mảng ẩm thực bánh ngọt"
    ],
    instructor: instructors.huong_tran,
    curriculum: [
      {
        title: "Chương 1: Nền tảng nguyên liệu & Cốt bánh Âu",
        description: "Nắm vững lý thuyết định lượng nguyên liệu bánh chính xác tuyệt đối.",
        duration: "10 Giờ",
        lessons: [
          "Tính chất hóa lý của bơ, sữa, gelatin và bột mì",
          "Kỹ thuật nướng cốt bánh Chiffon, Biscuit Joconde, Genoise mềm xốp",
          "Làm chủ các loại kem nền: Crème Pâtissière, Crémeux, Ganache"
        ]
      },
      {
        title: "Chương 2: Thế giới Mousse & Nghệ thuật Tráng gương",
        description: "Kỹ năng phối hợp các tầng hương vị và trang trí bề mặt bánh kiêu sa.",
        duration: "20 Giờ",
        lessons: [
          "Kỹ thuật làm nhân thạch trái cây (Compote/Gelee) chua ngọt cân bằng",
          "Phương pháp đổ khuôn silicon mousse đa dạng hình dáng độc đáo",
          "Công thức pha chế nước tráng gương sô-cô-la màu sắc bắt mắt",
          "Mẹo phun nhung mịn màng bám đều mặt bánh lạnh"
        ]
      }
    ],
    studentProjects: [
      { title: "Bánh Mousse Raspberry Tráng gương của học viên Thảo Vy", image: "https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&q=80&w=400" },
      { title: "Set bánh teabreak nhỏ xinh của học viên Hoàng Nam", image: "https://images.unsplash.com/photo-1550617931-e17a7b70dce2?auto=format&fit=crop&q=80&w=400" }
    ],
    isTopRated: false
  },
  {
    id: "quan-tri-tien-sanh",
    title: "Quản trị Tiền sảnh Khách sạn Quốc tế 5 Sao",
    category: "hospitality",
    level: "Quản lý",
    duration: "60 Giờ",
    price: 4500000,
    originalPrice: 6000000,
    rating: 4.7,
    reviewCount: 94,
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=800",
    videoSampleUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    description: "Bộ mặt của mọi khách sạn chính là bộ phận Tiền sảnh (Front Office). Khóa học đào tạo toàn diện nghiệp vụ đón tiếp, check-in, check-out, kỹ thuật bán phòng vượt mức (Upselling), kỹ năng quản lý thông tin khách hàng qua phần mềm Opera/Fidelio và nghệ thuật giao tiếp đỉnh cao với khách VIP.",
    shortDescription: "Trở thành nhà quản lý tiền sảnh xuất sắc, thông thạo phần mềm Opera và nghệ thuật làm hài lòng những vị khách khó tính nhất.",
    skillsAcquired: [
      "Sử dụng phần mềm quản lý khách sạn Opera/Fidelio thuần thục",
      "Kỹ năng xử lý khiếu nại (Complaint Handling) tinh tế bằng quy trình L.E.A.R.N",
      "Chiến thuật bán thêm phòng nâng hạng (Upselling techniques)",
      "Quy trình đón tiếp VIP, đại sứ quán và phái đoàn chính phủ"
    ],
    careerOpportunities: [
      "Quản lý bộ phận Lễ tân (Reception Manager) hoặc Trưởng bộ phận Tiền sảnh (FOM)",
      "Chuyên viên Quan hệ Khách hàng (Guest Relations Officer) tại resort cao cấp",
      "Giám sát dịch vụ chăm sóc khách hàng tại các tập đoàn dịch vụ tài chính, y tế tư nhân"
    ],
    instructor: instructors.vy_pham,
    curriculum: [
      {
        title: "Chương 1: Tổng quan và Kỹ năng Lễ tân chuẩn VTOS",
        description: "Học chuẩn nghiệp vụ du lịch Việt Nam VTOS và quốc tế.",
        duration: "15 Giờ",
        lessons: [
          "Tác phong, diện mạo và ngôn ngữ cơ thể của nhân viên khách sạn cao cấp",
          "Quy trình Check-in chuẩn mực: Đón chào, xác nhận thông tin, cấp chìa khóa",
          "Kỹ năng nghe điện thoại, đặt phòng gián tiếp chuyên nghiệp"
        ]
      },
      {
        title: "Chương 2: Xử lý tình huống & Quản lý doanh thu",
        description: "Cấp độ quản trị với những tình huống thực tế cam go.",
        duration: "25 Giờ",
        lessons: [
          "Xử lý tình huống mất hành lý, khách say xỉn, lỗi hệ thống phòng",
          "Tối ưu hóa công suất phòng thông qua chiến lược Overbooking thông minh",
          "Lập báo cáo ca trực và bàn giao công việc cuối ngày"
        ]
      }
    ],
    studentProjects: [
      { title: "Buổi đóng vai xử lý tình huống khẩn cấp của lớp FOM03", image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=400" },
      { title: "Thực hành phần mềm Opera tại phòng Lab Saigontourist", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=400" }
    ],
    isTopRated: false
  },
  {
    id: "bep-viet-fusion",
    title: "Nghệ thuật Bếp Việt Hiện đại & Food Styling",
    category: "culinary",
    level: "Cơ bản",
    duration: "30 Giờ",
    price: 3200000,
    originalPrice: 4000000,
    rating: 4.85,
    reviewCount: 142,
    image: "https://images.unsplash.com/photo-1583032353423-0474309a0db8?auto=format&fit=crop&q=80&w=800",
    videoSampleUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    description: "Nâng tầm món ăn Việt truyền thống lên đẳng cấp ẩm thực thế giới bằng nghệ thuật bài trí tinh tế và kỹ thuật nấu nướng hiện đại như Sous Vide, màng bọc phân tử, hun khói. Thích hợp cho những ai muốn đưa ẩm thực Việt vào nhà hàng Fine Dining hoặc làm đẹp món ăn để chụp hình quảng cáo thương mại.",
    shortDescription: "Cách tân món ăn truyền thống Việt Nam: Phở, Chả Giò, Gỏi Cuốn theo phong cách trình bày Michelin và công nghệ ẩm thực phân tử.",
    skillsAcquired: [
      "Cách tân hương vị Việt mà không làm mất đi bản sắc dân tộc",
      "Làm quen với các dụng cụ Food Styling chuyên nghiệp (nhíp, cọ quét, máy khò)",
      "Nguyên lý bố cục đĩa ăn ẩm thực cao cấp (chấm, phá, đối xứng, bốc cao)",
      "Kỹ thuật kiểm soát nhiệt độ lõi cho thịt, cá trong bếp lò hiện đại"
    ],
    careerOpportunities: [
      "Đầu bếp sáng tạo (Creative Chef) món Việt hiện đại",
      "Food Stylist chụp ảnh quảng cáo, quay TVC ẩm thực chuyên nghiệp",
      "Sở hữu nhà hàng Việt phong cách đương đại"
    ],
    instructor: instructors.minh_le,
    curriculum: [
      {
        title: "Chương 1: Tôn vinh Nguyên liệu & Giải cấu trúc món ăn",
        description: "Phương pháp tư duy tách lớp hương vị và tái cấu trúc đĩa ăn độc đáo.",
        duration: "10 Giờ",
        lessons: [
          "Bản đồ hương vị vùng miền Việt Nam và cách phối hợp gia vị thảo mộc",
          "Kỹ thuật nấu chậm Sous Vide cho món Bò kho mềm mọng nước",
          "Thực hành tạo 'Bọt khí vị sả' (Lemongrass Foam) bằng chất nhũ hóa tự nhiên"
        ]
      }
    ],
    studentProjects: [
      { title: "Món Phở bò tái lăn Food Styling bởi học viên Quốc Huy", image: "https://images.unsplash.com/photo-1583032353423-0474309a0db8?auto=format&fit=crop&q=80&w=400" },
      { title: "Gỏi cuốn tôm hùm trình bày kiểu tinh hoa của học viên Mai Chi", image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&q=80&w=400" }
    ],
    isTopRated: false
  },
  {
    id: "sourdough-artisan",
    title: "Kỹ thuật Làm Bánh Mì Men Tự Nhiên (Sourdough)",
    category: "baking",
    level: "Chuyên sâu",
    duration: "24 Giờ",
    price: 3400000,
    originalPrice: 4200000,
    rating: 4.95,
    reviewCount: 78,
    image: "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?auto=format&fit=crop&q=80&w=800",
    videoSampleUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    description: "Làm bánh mì men tự nhiên Sourdough được ví như 'đỉnh cao' và là thử thách lớn nhất của người thợ làm bánh mì. Khóa học giúp bạn nắm vững nghệ thuật nuôi cấy men hoang dã (Starter) từ hoa quả tươi, kiểm soát nhiệt độ lên men kéo dài 24-36 tiếng, kỹ thuật rạch bánh nghệ thuật (Scoring) tạo tai bánh giòn rụm kiêu hãnh.",
    shortDescription: "Tự tay nuôi cấy men Starter hoang dã, rạch bánh tạo tai thỏ nghệ thuật và nướng ra những ổ Sourdough vỏ giòn ruột dai bóng bẩy.",
    skillsAcquired: [
      "Quy trình khởi tạo, nuôi và duy trì con men Sourdough Starter hàng năm trời",
      "Kỹ thuật nhào gập Stretch & Fold không mỏi tay, phát triển mạng Gluten tối ưu",
      "Nhận biết thời điểm bột ủ đạt chuẩn (bulk fermentation)",
      "Sử dụng dao rạch Lamé tạo hoa văn tinh xảo nghệ thuật trên vỏ bánh"
    ],
    careerOpportunities: [
      "Artisan Baker mở lò bánh mì nướng củi specialty",
      "Tự sản xuất bánh mì dinh dưỡng ít gluten cung cấp cho chuỗi ăn kiêng lành mạnh",
      "Nâng tầm danh mục bánh mì trong các khách sạn cao cấp"
    ],
    instructor: instructors.huong_tran,
    curriculum: [
      {
        title: "Chương 1: Sự sống của Sourdough Starter",
        description: "Khởi tạo hệ vi sinh vật tự nhiên tuyệt diệu từ nước và bột.",
        duration: "8 Giờ",
        lessons: [
          "Hóa học đằng sau quá trình lên men axit Lactic và cồn",
          "Lịch trình cho men ăn và cách duy trì hoạt tính mạnh mẽ",
          "Kỹ thuật Float Test kiểm tra độ chín muồi của men trước khi trộn bột"
        ]
      }
    ],
    studentProjects: [
      { title: "Ổ Sourdough rạch họa tiết lúa mạch của học viên Minh Quân", image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=400" }
    ],
    isTopRated: true
  }
];

export const reviews: StudentReview[] = [
  {
    id: "rev_1",
    studentName: "Nguyễn Minh Khang",
    courseName: "Kỹ thuật Pha chế và Latte Art Chuyên sâu",
    rating: 5,
    comment: "Tôi đã học nhiều trung tâm nhưng chỉ ở Saigontourist Online mới được giảng viên chỉ bảo cặn kẽ từng góc đặt ca đánh sữa, cách lắc ca tạo sóng đều đặn. Video chất lượng cực nét, quay cận cảnh bàn tay thầy nên rất dễ bắt chước. Nay tôi đã tự tin vẽ hình thiên nga rồi!",
    date: "12/05/2026",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=150",
    jobTitle: "Chủ quán 'Khang's Coffee Specialty' - Đà Nẵng"
  },
  {
    id: "rev_2",
    studentName: "Lê Thị Hồng Ngọc",
    courseName: "Lớp Học Bánh Âu Hiện Đại & Tạo Hình Nghệ Thuật",
    rating: 5,
    comment: "Khóa học bánh của cô Hương quá đỉnh! Kỹ thuật tráng gương (Mirror Glaze) tưởng phức tạp nhưng nhờ cô giải thích tỷ lệ nhiệt độ chuẩn nên làm phát ăn ngay, mặt bánh bóng loáng phản chiếu rõ mặt người luôn. Rất bõ đồng tiền bát gạo.",
    date: "28/04/2026",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150",
    jobTitle: "Bánh ngọt sỉ lẻ - TP. HCM"
  },
  {
    id: "rev_3",
    studentName: "Phạm Minh Hoàng",
    courseName: "Kỹ thuật Chế biến Sốt Âu Cơ bản & Nâng cao",
    rating: 5,
    comment: "Là một đầu bếp trẻ, khóa học sốt của Chef Minh đã giúp tôi chuẩn hóa lại toàn bộ kiến thức nước sốt Pháp. Sốt Hollandaise của tôi không còn bị tách dầu nữa nhờ bí quyết điều nhiệt của thầy. Đề xuất nhiệt tình cho các bạn đồng nghiệp nhé!",
    date: "14/03/2026",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150",
    jobTitle: "Đầu bếp tại Sol Kitchen & Bar"
  }
];

export const faqs: FAQItem[] = [
  {
    id: "faq_1",
    question: "Học trực tuyến (Online) thì làm sao thực hành các món ăn/đồ uống được?",
    answer: "Học trực tuyến tại Saigontourist Online được tối ưu hóa qua các video bài học góc quay cận cảnh siêu sắc nét (Multi-angle 4K UHD), hiển thị rõ nét từng chuyển động tay của giảng viên. Mỗi bài học đều đính kèm tài liệu định lượng chi tiết đến từng gram. Bạn sẽ tự thực hành tại bếp nhà mình theo quy trình từng bước, sau đó chụp ảnh/quay video thành phẩm gửi lên hệ thống cộng đồng học viên để giảng viên trực tiếp chấm điểm, nhận xét và chỉ ra lỗi sai (như bọt sữa bị to, sốt bị loãng, cốt bánh bị chai, v.v.).",
    category: "Chương trình học"
  },
  {
    id: "faq_2",
    question: "Chứng nhận sau khóa học có giá trị xin việc hay không?",
    answer: "Học viên hoàn thành đầy đủ bài học, nộp báo cáo thực hành đạt yêu cầu và vượt qua bài kiểm tra lý thuyết/thực hành trực tuyến sẽ được cấp Chứng nhận Hoàn Thành Khóa Học điện tử đồng thương hiệu bởi Saigontourist Hospitality College - Trường đào tạo du lịch khách sạn uy tín hàng đầu Việt Nam suốt 35 năm qua. Chứng nhận này được các tập đoàn khách sạn và chuỗi nhà hàng lớn trên cả nước công nhận và đánh giá cao khi tuyển dụng.",
    category: "Chứng nhận & Đầu ra"
  },
  {
    id: "faq_3",
    question: "Tôi có thể xem lại video bài học sau khi kết thúc khóa học không?",
    answer: "Có! Một khi bạn đã đăng ký khóa học thành công, tài khoản của bạn sẽ được kích hoạt quyền truy cập trọn đời (Lifetime Access). Bạn có thể xem đi xem lại bài học bất kỳ lúc nào, trên mọi thiết bị di động, máy tính bảng hay máy tính cá nhân để ôn tập kiến thức cũ và cập nhật các video bổ sung công thức mới từ giảng viên hoàn toàn miễn phí.",
    category: "Tài khoản & Học phí"
  },
  {
    id: "faq_4",
    question: "Học phí đã bao gồm nguyên vật liệu thực hành chưa?",
    answer: "Học phí hiển thị trên website là chi phí đào tạo, bản quyền video bài học và sự hỗ trợ kèm cặp của giảng viên. Học viên sẽ chủ động tự chuẩn bị nguyên vật liệu và dụng cụ thực hành tại nhà theo danh sách chi tiết được hệ thống gửi ngay sau khi đăng ký khóa học. Các nguyên vật liệu này đều rất thông dụng và dễ dàng tìm mua tại các siêu thị, cửa hàng đồ làm bánh hay cửa hàng nguyên liệu pha chế chuyên dụng.",
    category: "Tài khoản & Học phí"
  }
];
