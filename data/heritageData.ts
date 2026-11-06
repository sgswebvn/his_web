export interface HeritageSite {
  id: string;
  name: string;
  vietnameseTitle: string;
  englishName: string;
  category: 'hoang-cung' | 'lang-tam' | 'cung-dien' | 'di-tich-khac';
  address: string;
  mapUrl: string;
  priceAdult: number;
  priceChild: number;
  images: string[];
  thumbnail: string;
  shortDesc: string;
  fullDesc: string[];
  architecture: string;
  history: string;
  summerHours: string;
  winterHours: string;
  featured?: boolean;
}

export interface RouteTicket {
  id: string;
  name: string;
  sites: string[];
  priceAdult: number;
  priceChild: number;
  saving?: string;
  description: string;
}

export interface TourJourney {
  id: string;
  title: string;
  duration: 'Tuyến nửa ngày' | 'Tuyến 1 ngày';
  route: string;
  description: string;
  stops: {
    time: string;
    siteName: string;
    description: string;
    ticketTip: string;
  }[];
  tips: string[];
}

export const COMPANY_INFO = {
  name: "Công ty TNHH Di sản Văn hóa Huế",
  brand: "Khảm Sắc Cố Đô",
  desktopSlogan: "Khám phá di sản",
  mobileSlogan: "Khảm sắc xưa – Họa sắc nay",
  hotline: "0325912850",
  email: "khamsaccodo@gmail.com",
  address: "257 Đặng Tất, phường Hóa Châu, thành phố Huế, Việt Nam",
  facebook: "https://www.facebook.com/profile.php?id=61595452873372",
  tiktok: "https://www.tiktok.com",
  aboutMission: "Công ty TNHH Di sản Văn hóa Huế hướng đến việc khai thác, quảng bá và phát huy các giá trị di sản văn hóa Huế thông qua các sản phẩm, dịch vụ và hoạt động truyền thông sáng tạo. Kết hợp giữa tinh hoa truyền thống, tư duy thiết kế hiện đại và công nghệ số, thương hiệu mong muốn đưa di sản đến gần hơn với cộng đồng, đặc biệt là thế hệ trẻ.",
  summerOpen: "06:30 – 17:30 (Đóng cửa ngừng đón khách: 18:30)",
  winterOpen: "07:00 – 17:00 (Đóng cửa ngừng đón khách: 18:00)",
  rules: [
    "Khi vào tham quan di tích phải mua vé theo quy định, xếp hàng thứ tự và cầm vé trên tay khi vào cổng kiểm soát.",
    "Nêu cao ý thức gìn giữ, bảo vệ di tích, di vật; không sờ, không nằm, ngồi, viết vẽ lên hiện vật, công trình kiến trúc, không giẫm đạp lên thảm cỏ, không hái hoa, bẻ cành.",
    "Giữ gìn an ninh trật tự, tuân thủ các quy định về phòng, chống cháy nổ, không hút thuốc lá trong khuôn viên di tích. Không được mang theo vũ khí, hung khí, chất độc, chất nổ, chất dễ cháy, các loài động vật sống vào khu vực di tích.",
    "Không phát ngôn thiếu chuẩn mực; trang phục lịch sự khi tham quan di tích, không được mặc trang phục phản cảm, hở hang (như quần cộc, váy ngắn, áo hở vai...) tại các khu vực nội điện, nơi thờ cúng trang nghiêm, không đội mũ, nón khi vào nội điện, giữ yên lặng trong các cung điện và nơi tôn nghiêm.",
    "Giữ gìn vệ sinh chung, bỏ rác đúng nơi quy định, không xâm hại cảnh quan môi trường di tích như: chặt phá, đốt rừng, săn bắt các loài động vật.",
    "Không sử dụng thiết bị flycam (thiết bị bay siêu nhẹ), không tự ý tổ chức các hoạt động trình diễn, trải nghiệm, quay phim, ghi hình, tổ chức vui chơi, ăn uống… khi chưa được cấp phép theo quy định.",
    "Khách tham quan phải chịu trách nhiệm trước pháp luật đối với những tổn thất do mình gây ra.",
    "Khi phát hiện các hiện tượng tiêu cực, vi phạm, khách tham quan thông tin cho bảo vệ di tích để kịp thời xử lý.",
    "Người sử dụng các loại phương tiện ra, vào di tích để làm việc phải xuống xe, tắt máy, xuất trình giấy tờ để nhân viên bảo vệ kiểm tra và hướng dẫn cụ thể.",
    "Bảo vệ di tích có quyền chấm dứt chương trình tham quan đối với du khách khi vi phạm Nội quy."
  ]
};

export const HERITAGE_SITES: HeritageSite[] = [
  {
    id: "dai-noi",
    name: "Đại Nội Huế",
    vietnameseTitle: "Đại Nội Huế (Hoàng Thành & Tử Cấm Thành)",
    englishName: "Hue Imperial City",
    category: "hoang-cung",
    address: "Phường Phú Xuân, TP Huế, Việt Nam",
    mapUrl: "https://maps.google.com/?q=Hue+Imperial+City",
    priceAdult: 200000,
    priceChild: 40000,
    thumbnail: "/images/hue/dai-noi/img_0566.jpg",
    images: [
      "/images/hue/dai-noi/img_0566.jpg",
      "/images/hue/dai-noi/img_0568.jpg",
      "/images/hue/dai-noi/img_0595.png"
    ],
    shortDesc: "Trung tâm chính trị, văn hóa của triều Nguyễn, nơi lưu giữ kho tàng kiến trúc cung đình tráng lệ cùng Nhã nhạc cung đình Huế.",
    fullDesc: [
      "Kinh thành Huế là nơi đóng đô của triều Nguyễn từ năm 1805 đến năm 1945, được vua Gia Long khởi công xây dựng và vua Minh Mạng hoàn thiện vào năm 1832. Công trình nằm ở bờ Bắc sông Hương, có diện tích hơn 500 ha, kết hợp kiến trúc thành lũy phương Tây với kiến trúc truyền thống phương Đông.",
      "Tổng thể Kinh thành gồm ba vòng thành: Kinh Thành, Hoàng Thành và Tử Cấm Thành. Trong đó, Hoàng Thành là nơi tổ chức các nghi lễ và thờ các vua Nguyễn; Tử Cấm Thành là khu vực sinh hoạt riêng của vua và hoàng gia. Kinh thành còn có hệ thống cửa thành, pháo đài, cung điện và nhiều công trình kiến trúc đặc sắc.",
      "Kinh thành Huế là trung tâm chính trị, văn hóa của triều Nguyễn và là một phần quan trọng của Quần thể di tích Cố đô Huế được UNESCO công nhận là Di sản Văn hóa Thế giới năm 1993."
    ],
    architecture: "Kiến trúc cung đình đỉnh cao với hệ thống Ngọ Môn, Điện Thái Hòa, Thế Miếu, Hiển Lâm Các, Cung Diên Thọ và hệ thống mái ngói lưu ly đặc trưng phản ánh quan niệm thẩm mỹ và trật tự vương triều.",
    history: "Xây dựng từ năm 1805 dưới thời vua Gia Long và hoàn thành năm 1832 dưới triều vua Minh Mạng, tồn tại qua 143 năm lịch sử triều Nguyễn.",
    summerHours: "06:30 – 17:30 (Đóng cửa 18:30)",
    winterHours: "07:00 – 17:00 (Đóng cửa 18:00)",
    featured: true
  },
  {
    id: "lang-tu-duc",
    name: "Lăng Tự Đức (Khiêm Lăng)",
    vietnameseTitle: "Lăng Tự Đức (Khiêm Lăng)",
    englishName: "Mausoleum of Emperor Tu Duc",
    category: "lang-tam",
    address: "Phường Thủy Xuân, TP Huế, Việt Nam",
    mapUrl: "https://maps.google.com/?q=Tomb+of+Tu+Duc",
    priceAdult: 150000,
    priceChild: 30000,
    thumbnail: "/images/hue/lang-tu-duc/img_0572.jpg",
    images: [
      "/images/hue/lang-tu-duc/img_0572.jpg",
      "/images/hue/lang-tu-duc/img_0573.jpg",
      "/images/hue/lang-tu-duc/img_0575.jpg"
    ],
    shortDesc: "Không gian lăng tẩm thơ mộng bậc nhất, hài hòa giữa hồ Lưu Khiêm, đồi thông xanh và tâm hồn thi sĩ của vị vua triều Nguyễn.",
    fullDesc: [
      "Lăng Tự Đức nằm tại phường Thủy Xuân, thành phố Huế, được xây dựng dưới triều vua Tự Đức. Ban đầu, công trình có tên là Vạn Niên Cơ, sau đổi thành Khiêm Cung và được gọi là Khiêm Lăng sau khi vua qua đời.",
      "Lăng có không gian rộng lớn, gồm hai khu vực chính là khu tẩm điện và khu lăng mộ, được bố trí hài hòa với hồ Lưu Khiêm, đồi thông và cây xanh. Các công trình tiêu biểu gồm Khiêm Cung Môn, điện Hòa Khiêm, điện Lương Khiêm, Minh Khiêm Đường và Xung Khiêm Tạ.",
      "Lăng Tự Đức nổi bật bởi kiến trúc mềm mại, đường đi uốn lượn và cảnh quan thơ mộng, thể hiện tâm hồn thi sĩ, sở thích nghệ thuật và phong cách sống của vua Tự Đức."
    ],
    architecture: "Kiến trúc uốn lượn không gò bó theo đường thẳng, lấy hồ Lưu Khiêm làm trung tâm sinh khí với nhà hát cổ Minh Khiêm Đường và nhà thủy tạ tao nhã.",
    history: "Khởi công năm 1864, hoàn thành năm 1867, là nơi vua Tự Đức lui về nghỉ ngơi, ngâm thơ và làm việc lúc sinh thời.",
    summerHours: "06:30 – 17:30 (Đóng cửa 18:30)",
    winterHours: "07:00 – 17:00 (Đóng cửa 18:00)",
    featured: true
  },
  {
    id: "lang-minh-mang",
    name: "Lăng Minh Mạng (Hiếu Lăng)",
    vietnameseTitle: "Lăng Minh Mạng (Hiếu Lăng)",
    englishName: "Mausoleum of Emperor Minh Mang",
    category: "lang-tam",
    address: "Xã Hương Thọ, TP Huế (gần ngã ba Bằng Lãng)",
    mapUrl: "https://maps.google.com/?q=Tomb+of+Minh+Mang",
    priceAdult: 150000,
    priceChild: 30000,
    thumbnail: "/images/hue/lang-minh-mang/img_0577.jpg",
    images: [
      "/images/hue/lang-minh-mang/img_0577.jpg",
      "/images/hue/lang-minh-mang/img_0578.jpg",
      "/images/hue/lang-minh-mang/img_0579.jpg"
    ],
    shortDesc: "Công trình uy nghi, đối xứng chuẩn mực dọc theo trục Thần đạo dài 700m giữa khung cảnh non nước hữu tình của ngã ba Bằng Lãng.",
    fullDesc: [
      "Lăng Minh Mạng được xây dựng từ năm 1840, dưới triều vua Minh Mạng, và hoàn thành năm 1843 dưới thời vua Thiệu Trị. Lăng nằm gần ngã ba Bằng Lãng, nơi hợp lưu của hai nhánh Tả Trạch và Hữu Trạch tạo thành sông Hương thơ mộng.",
      "Quần thể lăng được quy hoạch đối xứng nghiêm ngặt theo trục Thần đạo dài khoảng 700 m, bao gồm các công trình như Đại Hồng Môn, Bái Đình, Bi Đình, sân triều lễ và khu vực lăng mộ. Xen giữa các công trình là hồ sen Tân Nguyệt, đồi thông và cảnh quan thiên nhiên.",
      "Lăng Minh Mạng nổi bật với bố cục cân đối, kiến trúc trang nghiêm và sự kết hợp hài hòa tuyệt đối giữa thiên nhiên với nghệ thuật kiến trúc cung đình triều Nguyễn."
    ],
    architecture: "Quy hoạch đăng đối hoàn hảo theo trục Thần đạo xuyên suốt, thể hiện tư tưởng Nho giáo sâu sắc và uy quyền tối thượng của bậc minh quân.",
    history: "Được vua Minh Mạng chọn vị trí năm 1840 và vua Thiệu Trị tiếp tục xây dựng hoàn tất vào năm 1843.",
    summerHours: "06:30 – 17:30 (Đóng cửa 18:30)",
    winterHours: "07:00 – 17:00 (Đóng cửa 18:00)",
    featured: true
  },
  {
    id: "lang-khai-dinh",
    name: "Lăng Khải Định (Ứng Lăng)",
    vietnameseTitle: "Lăng Khải Định (Ứng Lăng)",
    englishName: "Mausoleum of Emperor Khai Dinh",
    category: "lang-tam",
    address: "Phường Thủy Xuân, Núi Châu Chữ, TP Huế",
    mapUrl: "https://maps.google.com/?q=Tomb+of+Khai+Dinh",
    priceAdult: 150000,
    priceChild: 30000,
    thumbnail: "/images/hue/lang-khai-dinh/img_0580.jpg",
    images: [
      "/images/hue/lang-khai-dinh/img_0580.jpg",
      "/images/hue/lang-khai-dinh/img_0581.jpg",
      "/images/hue/lang-khai-dinh/img_0584.jpg"
    ],
    shortDesc: "Đỉnh cao tuyệt mỹ của nghệ thuật khảm sành sứ và thủy tinh màu, giao thoa độc đáo giữa kiến trúc phương Đông và phương Tây.",
    fullDesc: [
      "Lăng Khải Định được khởi công ngày 4/9/1920 và hoàn thành sau 11 năm xây dựng kỳ công. Lăng tọa lạc trên triền núi Châu Chữ, có diện tích tương đối nhỏ nhưng kiến trúc vô cùng công phu và tinh xảo.",
      "Công trình nổi bật với 127 bậc cấp đá xám, hệ thống tượng quan quân chầu hầu, nhà bia bát giác và cung Thiên Định tráng lệ. Kiến trúc là sự giao thoa giữa nghệ thuật truyền thống Việt Nam với các phong cách phương Tây như Roman, Gothic, cùng ảnh hưởng từ kiến trúc Ấn Độ và Phật giáo.",
      "Nội thất cung Thiên Định được trang trí bằng hàng triệu mảnh sành sứ, chén đĩa cổ và thủy tinh màu ghép thành các bức phù điêu Cửu Long Ẩn Vân tinh xảo bậc nhất thế giới."
    ],
    architecture: "Nghệ thuật ghép khảm sành sứ thượng thừa kết hợp bê tông sắt thép hiện đại với bức bích họa 'Cửu Long Ẩn Vân' trên trần cung Thiên Định.",
    history: "Xây dựng từ năm 1920 đến 1931 qua 2 đời vua Khải Định và Bảo Đại mới hoàn tất.",
    summerHours: "06:30 – 17:30 (Đóng cửa 18:30)",
    winterHours: "07:00 – 17:00 (Đóng cửa 18:00)",
    featured: true
  },
  {
    id: "lang-gia-long",
    name: "Lăng Gia Long (Thiên Thọ Lăng)",
    vietnameseTitle: "Lăng Gia Long (Thiên Thọ Lăng)",
    englishName: "Mausoleum of Emperor Gia Long",
    category: "lang-tam",
    address: "Phường Kim Long, TP Huế (vùng đồi Hương Thọ)",
    mapUrl: "https://maps.google.com/?q=Tomb+of+Gia+Long",
    priceAdult: 150000,
    priceChild: 0,
    thumbnail: "/images/hue/lang-gia-long/img_0587.jpg",
    images: [
      "/images/hue/lang-gia-long/img_0587.jpg",
      "/images/hue/lang-gia-long/img_0588.jpg",
      "/images/hue/lang-gia-long/img_0596.jpg"
    ],
    shortDesc: "Khu lăng cổ kính và hoang sơ nhất của vị vua khai sáng triều Nguyễn, nổi bật với hai ngôi mộ song táng uy nghi giữa núi rừng Đại Thiên Thọ.",
    fullDesc: [
      "Lăng Gia Long được xây dựng trong giai đoạn 1814–1820, là quần thể lăng mộ của vua Gia Long, Thừa Thiên Cao Hoàng hậu và nhiều thành viên hoàng tộc. Khu lăng nằm giữa vùng núi đồi rộng lớn, với núi Đại Thiên Thọ làm tiền án và hệ thống núi bao quanh tạo nên cảnh quan tự nhiên hùng vĩ.",
      "Lăng gồm ba khu vực chính: khu lăng mộ vua và Hoàng hậu, khu tẩm điện với điện Minh Thành và khu bia tưởng niệm. Điểm đặc biệt là hai ngôi mộ của vua Gia Long và Hoàng hậu được đặt song táng cạnh nhau dưới bóng thông già, thể hiện tình nghĩa thủy chung son sắt.",
      "Lăng Gia Long nổi bật bởi vẻ đẹp cổ kính, không gian khoáng đạt và sự hòa quyện hoàn mỹ giữa kiến trúc nhân tạo với thiên nhiên non nước hoang sơ."
    ],
    architecture: "Kiến trúc mộc mạc, bền bỉ bằng đá thanh thô mộc, bao bọc bởi quần thể đồi núi phong thủy tự nhiên nguyên sơ.",
    history: "Xây dựng từ năm 1814 đến năm 1820 khi vua Gia Long băng hà.",
    summerHours: "06:30 – 17:30 (Đóng cửa 18:30)",
    winterHours: "07:00 – 17:00 (Đóng cửa 18:00)"
  },
  {
    id: "lang-dong-khanh",
    name: "Lăng Đồng Khánh (Tư Lăng)",
    vietnameseTitle: "Lăng Đồng Khánh (Tư Lăng)",
    englishName: "Mausoleum of Emperor Dong Khanh",
    category: "lang-tam",
    address: "Phường Thủy Xuân, TP Huế",
    mapUrl: "https://maps.google.com/?q=Tomb+of+Dong+Khanh",
    priceAdult: 100000,
    priceChild: 0,
    thumbnail: "/images/hue/lang-dong-khanh/img_0592.jpg",
    images: [
      "/images/hue/lang-dong-khanh/img_0592.jpg",
      "/images/hue/lang-dong-khanh/img_0593.jpg",
      "/images/hue/lang-dong-khanh/img_0594.jpg"
    ],
    shortDesc: "Công trình phản ánh sự chuyển tiếp rõ rệt từ phong cách kiến trúc thuần truyền thống sang phong cách tân cổ điển Á - Âu.",
    fullDesc: [
      "Lăng Đồng Khánh nằm tại phường Thủy Xuân, thành phố Huế. Công trình hình thành từ điện Truy Tư, vốn được xây dựng để thờ cha của vua Đồng Khánh là Kiên Thái Vương. Sau khi vua qua đời năm 1888, điện được đổi thành điện Ngưng Hy để thờ vua và khu lăng được gọi là Tư Lăng.",
      "Đến thời vua Khải Định, lăng mộ và điện thờ tiếp tục được tu sửa, hoàn thiện. Quần thể gồm khu điện thờ Ngưng Hy với nghệ thuật sơn son thiếp vàng tráng lệ, Bái Đình, Bi Đình và khu mộ vua mang hơi thở phong cách mới.",
      "Lăng Đồng Khánh có giá trị lịch sử và kiến trúc quý giá, phản ánh bước ngoặt giao thoa văn hóa nghệ thuật xây dựng lăng tẩm cuối thế kỷ XIX đầu thế kỷ XX."
    ],
    architecture: "Điện Ngưng Hy là mẫu mực tráng lệ của nghệ thuật chạm khắc gỗ và sơn thếp son vàng rực rỡ truyền thống kết hợp ngói tây, kính màu.",
    history: "Trải qua 35 năm xây dựng từ thời Đồng Khánh (1888) đến đời Khải Định (1923) mới hoàn thiện trọn vẹn.",
    summerHours: "06:30 – 17:30 (Đóng cửa 18:30)",
    winterHours: "07:00 – 17:00 (Đóng cửa 18:00)"
  },
  {
    id: "lang-thieu-tri",
    name: "Lăng Thiệu Trị (Xương Lăng)",
    vietnameseTitle: "Lăng Thiệu Trị (Xương Lăng)",
    englishName: "Mausoleum of Emperor Thieu Tri",
    category: "lang-tam",
    address: "Làng Cư Chánh, Phường Thuận Hóa, TP Huế",
    mapUrl: "https://maps.google.com/?q=Tomb+of+Thieu+Tri",
    priceAdult: 50000,
    priceChild: 0,
    thumbnail: "/images/hue/lang-thieu-tri/img_0589.png",
    images: [
      "/images/hue/lang-thieu-tri/img_0589.png",
      "/images/hue/lang-thieu-tri/img_0590.png",
      "/images/hue/lang-thieu-tri/img_0591.png"
    ],
    shortDesc: "Vẻ đẹp thanh tịnh, giản dị và gần gũi với thiên nhiên, công trình không có la thành bao bọc mà tựa vào đồng ruộng làng quê thanh bình.",
    fullDesc: [
      "Lăng Thiệu Trị được xây dựng năm 1848 dưới triều vua Tự Đức, tại làng Cư Chánh, thành phố Huế. Công trình có hướng quay về phía Tây Bắc, khác biệt với nhiều lăng tẩm khác của triều Nguyễn.",
      "Lăng gồm hai khu vực chính là khu lăng mộ và khu tẩm điện. Kiến trúc kết hợp khéo léo các yếu tố mẫu mực của lăng Gia Long và lăng Minh Mạng, với những công trình tiêu biểu như Bái Đình, Bi Đình, lầu Đức Hinh và điện Biểu Đức.",
      "Điểm đặc biệt của lăng là không xây la thành khép kín bao quanh, thay vào đó là đồng ruộng xanh ngát và vườn cây ăn trái xum xuê. Công trình thể hiện quan niệm sống tiết kiệm, giảm bớt chi phí và hạn chế hao tổn sức dân của vua Thiệu Trị."
    ],
    architecture: "Tách biệt giữa khu tẩm và khu lăng bằng hồ nước bán nguyệt, đường nét mộc mạc hòa lẫn với hương lúa đồng nội.",
    history: "Được xây dựng thần tốc chỉ trong chưa đầy 10 tháng vào năm 1848 theo di nguyện của vua Thiệu Trị.",
    summerHours: "06:30 – 17:30 (Đóng cửa 18:30)",
    winterHours: "07:00 – 17:00 (Đóng cửa 18:00)"
  },
  {
    id: "cung-an-dinh",
    name: "Cung An Định",
    vietnameseTitle: "Cung An Định",
    englishName: "An Dinh Palace",
    category: "cung-dien",
    address: "179 Phan Đình Phùng, Phường An Cựu, TP Huế",
    mapUrl: "https://maps.app.goo.gl/gYEVbcZ66M3NKZzq6",
    priceAdult: 50000,
    priceChild: 0,
    thumbnail: "/images/hue/cung-an-dinh/img_0597.jpg",
    images: [
      "/images/hue/cung-an-dinh/img_0597.jpg",
      "/images/hue/cung-an-dinh/img_0598.jpg"
    ],
    shortDesc: "Viên ngọc kiến trúc tân cổ điển Á - Âu bên bờ sông An Cựu, nơi từng ghi dấu cuộc đời thăng trầm của vua Bảo Đại và Hoàng hậu Nam Phương.",
    fullDesc: [
      "Cung An Định nằm tại đường Phan Đình Phùng, thành phố Huế, bên bờ sông An Cựu thơ mộng. Công trình ban đầu được lập thành phủ An Định năm 1902, sau đó được vua Khải Định cải tạo thành cung điện nguy nga vào năm 1917 và hoàn thành năm 1919. Đây từng là nơi ở của vua Bảo Đại, Nam Phương Hoàng hậu và gia đình.",
      "Cung có diện tích hơn 23.000 m², ban đầu gồm nhiều công trình tráng lệ, hiện còn nổi bật ba công trình chính: cổng cung chạm đắp tinh vi, đình Trung Lập hình bát giác và lầu Khải Tường. Lầu Khải Tường là công trình quan trọng nhất, cao ba tầng mang phong cách lâu đài châu Âu kết hợp nghệ thuật trang trí truyền thống Việt Nam.",
      "Cung An Định là công trình tiêu biểu cho sự giao thoa văn hóa mỹ thuật Đông – Tây và là biểu tượng của phong cách tân cổ điển ở xứ Huế đầu thế kỷ XX."
    ],
    architecture: "Kiến trúc lâu đài châu Âu kết hợp bích họa 6 bức tranh phong cảnh lăng tẩm các vua triều Nguyễn trên tường tiền sảnh lầu Khải Tường.",
    history: "Khởi lập từ năm 1902 và hoàn thành mở rộng năm 1919.",
    summerHours: "06:30 – 17:30 (Đóng cửa 18:30)",
    winterHours: "07:00 – 17:00 (Đóng cửa 18:00)",
    featured: true
  },
  {
    id: "lang-duc-duc",
    name: "Lăng Dục Đức (An Lăng)",
    vietnameseTitle: "Lăng Dục Đức (An Lăng)",
    englishName: "Tomb of Duc Duc",
    category: "lang-tam",
    address: "Phường An Cựu, TP Huế",
    mapUrl: "https://maps.google.com/?q=Tomb+of+Duc+Duc",
    priceAdult: 50000,
    priceChild: 0,
    thumbnail: "/images/hue/lang-duc-duc/lang-duc-duc.webp",
    images: [
      "/images/hue/lang-duc-duc/lang-duc-duc.webp",
      "/images/hue/lang-duc-duc/lang_vua_duc_duc_03.jpeg"
    ],
    shortDesc: "Nơi an nghỉ giản dị của ba vị vua yêu nước và bi tráng triều Nguyễn: Dục Đức, Thành Thái và Duy Tân.",
    fullDesc: [
      "Lăng Dục Đức, còn gọi là An Lăng, là nơi an nghỉ của vua Dục Đức và hai vị vua thuộc các thế hệ sau là Thành Thái và Duy Tân. Công trình được hình thành từ năm 1884, có quy mô giản dị hơn nhiều lăng tẩm khác của triều Nguyễn.",
      "Lăng gồm hai khu vực chính là điện Long Ân và khu lăng mộ vua cùng Hoàng hậu. Kiến trúc mang phong cách truyền thống Việt Nam, không quá cầu kỳ, hòa hợp với cảnh quan thiên nhiên yên tĩnh.",
      "Lăng Dục Đức gắn liền với số phận bi tráng của vua Dục Đức và lòng yêu nước quật cường của vua Thành Thái, Duy Tân giữa những biến động chính trị cuối triều Nguyễn."
    ],
    architecture: "Kiến trúc trang nhã, điện Long Ân bằng gỗ lim với mái ngói lưu ly cổ kính.",
    history: "Xây dựng năm 1889 bởi vua Thành Thái để thờ phụ hoàng Dục Đức.",
    summerHours: "06:30 – 17:30 (Đóng cửa 18:30)",
    winterHours: "07:00 – 17:00 (Đóng cửa 18:00)"
  },
  {
    id: "ho-quyen",
    name: "Hổ Quyền",
    vietnameseTitle: "Di tích Hổ Quyền (Đấu trường Voi - Hổ)",
    englishName: "Ho Quyen Coliseum",
    category: "di-tich-khac",
    address: "373 Bùi Thị Xuân, Phường Thủy Xuân, TP Huế",
    mapUrl: "https://maps.google.com/?q=Ho+Quyen+Hue",
    priceAdult: 50000,
    priceChild: 0,
    thumbnail: "/images/hue/ho-quyen/ho-quyen-3_1633806500.webp",
    images: [
      "/images/hue/ho-quyen/ho-quyen-3_1633806500.webp",
      "/images/hue/ho-quyen/ho-quyen-4_1633806807.webp"
    ],
    shortDesc: "Đấu trường La Mã độc nhất vô nhị của Việt Nam thời phong kiến, nơi từng diễn ra những trận tỉ thí nảy lửa giữa voi và hổ.",
    fullDesc: [
      "Hổ Quyền được vua Minh Mạng cho xây dựng năm 1830 tại khu vực làng Nguyệt Biều, thành phố Huế. Đây là đấu trường dành riêng cho các trận quyết đấu giữa voi trận hoàng gia và mãnh hổ phục vụ hoạt động giải trí và luyện rèn dũng khí của triều đình.",
      "Công trình có kết cấu hình vành khăn tròn kiên cố gồm hai vòng tường thành bằng gạch, vôi vữa và đá. Đấu trường có khu khán đài ngồi trang trọng dành cho vua, hoàng thân và binh lính; đối diện là hệ thống 5 cửa chuồng nhốt hổ cùng lối đưa voi chiến vào sân đấu.",
      "Hổ Quyền là công trình kiến trúc quân sự và lễ hội vô cùng độc đáo, hiếm có trên thế giới, phản ánh đời sống phong tục cung đình triều Nguyễn."
    ],
    architecture: "Đấu trường hình vành tròn hở ngoài đường kính rộng 168m, cấu trúc bậc cấp và đường thông ngầm kiên cố.",
    history: "Khởi dựng năm 1830 dưới triều Minh Mạng, trận đấu cuối cùng diễn ra năm 1904 dưới thời vua Thành Thái.",
    summerHours: "06:30 – 17:30 (Đóng cửa 18:30)",
    winterHours: "07:00 – 17:00 (Đóng cửa 18:00)"
  },
  {
    id: "dien-hon-chen",
    name: "Điện Hòn Chén",
    vietnameseTitle: "Điện Hòn Chén (Huệ Nam Điện)",
    englishName: "Hon Chen Shrine",
    category: "di-tich-khac",
    address: "Núi Ngọc Trản, Xã Hương Thọ, TP Huế",
    mapUrl: "https://maps.google.com/?q=Hon+Chen+Temple+Hue",
    priceAdult: 50000,
    priceChild: 0,
    thumbnail: "/images/hue/dien-hon-chen/dien-hon-chen-3.webp",
    images: [
      "/images/hue/dien-hon-chen/dien-hon-chen-3.webp",
      "/images/hue/dien-hon-chen/dien-hon-chen-main.jpg"
    ],
    shortDesc: "Trung tâm tín ngưỡng Thờ Mẫu linh thiêng bậc nhất xứ Huế, tọa lạc trên vách đá ngắm nhìn làn nước xanh ngắt của sông Hương.",
    fullDesc: [
      "Điện Hòn Chén nằm trên sườn núi Ngọc Trản dựng đứng, soi bóng bên bờ sông Hương. Ban đầu, nơi đây là đền thờ nữ thần Po Nagar của đồng bào Chăm. Về sau, tín ngưỡng này được người Việt tiếp thu và gắn với việc phụng thờ Thánh mẫu Thiên Y A Na.",
      "Quần thể điện gồm khoảng 10 công trình, trong đó nổi bật là Minh Kính Đài, cùng các điện thờ, am và miếu nhỏ. Minh Kính Đài là nơi tổ chức các kỳ tế lễ long trọng, gồm ba cung thờ thần linh và thực hiện nghi lễ dâng hương hát văn hầu đồng.",
      "Điện Hòn Chén nổi bật bởi sự giao lưu văn hóa Chăm - Việt và là tâm điểm của các lễ hội rước sắc rực rỡ sắc màu trên sông Hương vào tháng 3 và tháng 7 âm lịch hàng năm."
    ],
    architecture: "Minh Kính Đài nguy nga trên triền đá dốc, hoa văn long phụng ghép sành sứ tinh xảo.",
    history: "Có từ thời cổ Chămpa, được vua Đồng Khánh đại trùng tu và ban tên Huệ Nam Điện năm 1886.",
    summerHours: "06:30 – 17:30 (Đóng cửa 18:30)",
    winterHours: "07:00 – 17:00 (Đóng cửa 18:00)"
  },
  {
    id: "dan-nam-giao",
    name: "Đàn Nam Giao",
    vietnameseTitle: "Đàn Nam Giao",
    englishName: "Nam Giao Esplanade",
    category: "di-tich-khac",
    address: "Phường Thuận Hóa, TP Huế",
    mapUrl: "https://maps.google.com/?q=Nam+Giao+Esplanade",
    priceAdult: 50000,
    priceChild: 0,
    thumbnail: "/images/hue/dan-nam-giao/img_0600.jpg",
    images: [
      "/images/hue/dan-nam-giao/img_0600.jpg",
      "/images/hue/dan-nam-giao/img_0602.jpg",
      "/images/hue/dan-nam-giao/img_0603.jpg"
    ],
    shortDesc: "Nơi tôn nghiêm các bậc hoàng đế cử hành đại lễ tế Trời Đất, tượng trưng cho quan niệm vũ trụ Thiên – Địa – Nhân của bậc Thiên tử.",
    fullDesc: [
      "Đàn Nam Giao là nơi các vua Nguyễn tổ chức lễ tế trời đất long trọng, được vua Gia Long cho xây dựng năm 1803 và dời về vị trí hiện nay vào năm 1806.",
      "Công trình gồm ba tầng đàn tượng trưng cho Thiên – Địa – Nhân (Trời – Đất – Người). Tầng trên cùng hình tròn (Viên Đàn) sơn xanh tượng trưng cho Trời; tầng giữa và tầng dưới hình vuông (Phương Đàn) sơn vàng và đỏ tượng trưng cho Đất và Con người. Bao quanh đàn tế là rừng thông xanh rì rào cùng Trai Cung, Thần Trù và Thần Khố.",
      "Lễ tế Giao đầu tiên dưới triều Nguyễn diễn ra năm 1807 để cầu quốc thái dân an, mưa thuận gió hòa và khẳng định thiên mệnh cai trị của vương triều."
    ],
    architecture: "Kiến trúc đàn lộ thiên 3 tầng độc đáo thể hiện triết lý âm dương dịch học uyên thâm, bao bọc bởi tường hoa và thông cổ.",
    history: "Xây dựng năm 1806, là đàn tế Trời duy nhất còn nguyên vẹn tại Việt Nam.",
    summerHours: "06:30 – 17:30 (Đóng cửa 18:30)",
    winterHours: "07:00 – 17:00 (Đóng cửa 18:00)"
  },
  {
    id: "chua-thien-mu",
    name: "Chùa Thiên Mụ (Linh Mụ)",
    vietnameseTitle: "Chùa Thiên Mụ (Linh Mụ Tự)",
    englishName: "Thien Mu Pagoda",
    category: "di-tich-khac",
    address: "Đồi Hà Khê, Phường Kim Long, TP Huế",
    mapUrl: "https://maps.google.com/?q=Thien+Mu+Pagoda",
    priceAdult: 0,
    priceChild: 0,
    thumbnail: "/images/hue/chua-thien-mu/khung-canh-tho-mong-ben-chua-thien-mu_1750782094.jpg",
    images: [
      "/images/hue/chua-thien-mu/khung-canh-tho-mong-ben-chua-thien-mu_1750782094.jpg",
      "/images/hue/chua-thien-mu/dien-dai-hung-chua-thien-mu_1750782012.jpg"
    ],
    shortDesc: "Biểu tượng tâm linh ngàn đời của xứ Huế mộng mơ, soi bóng tháp Phước Duyên 7 tầng lung linh xuống dòng sông Hương êm đềm.",
    fullDesc: [
      "Chùa Thiên Mụ nằm trên đồi Hà Khê, bên bờ sông Hương, cách trung tâm thành phố Huế khoảng 5 km. Chùa được chúa Nguyễn Hoàng cho xây dựng năm 1601 và trở thành một trong những trung tâm Phật giáo quan trọng nhất của xứ Đàng Trong.",
      "Công trình nổi bật với tháp Phước Duyên hình bát giác cao bảy tầng sừng sững, được xây dựng năm 1844 dưới thời vua Thiệu Trị. Ngoài ra, chùa còn có điện Đại Hùng linh thiêng, điện Địa Tạng, điện Quan Âm, lầu chuông, lầu trống và chuông Đại Hồng Chung đúc năm 1710 nặng hơn 2 tấn âm vang khắp chốn kinh kỳ.",
      "Chùa Thiên Mụ có giá trị vô giá về văn hóa, lịch sử và tâm linh, là thắng cảnh thi ca bất hủ gắn liền với linh hồn người dân xứ Huế."
    ],
    architecture: "Tháp bát giác Phước Duyên 7 tầng cao 21m, cổng Tam quan cổ kính và các tẩm điện thanh tịnh bên bóng thông và hoa sen.",
    history: "Xây dựng năm 1601 bởi chúa Tiên Nguyễn Hoàng, là ngôi chùa cổ nhất xứ Huế.",
    summerHours: "06:30 – 17:30 (Đóng cửa 18:30)",
    winterHours: "07:00 – 17:00 (Đóng cửa 18:00)",
    featured: true
  },
  {
    id: "van-mieu",
    name: "Văn Miếu Huế (Văn Thánh)",
    vietnameseTitle: "Văn Miếu Huế (Văn Thánh)",
    englishName: "Hue Temple of Literature",
    category: "di-tich-khac",
    address: "Phường Kim Long, TP Huế (bờ Bắc sông Hương)",
    mapUrl: "https://maps.app.goo.gl/zb23cMGiFXNRNnoZA",
    priceAdult: 0,
    priceChild: 0,
    thumbnail: "/images/hue/van-mieu/van-thanh-12.jpg",
    images: [
      "/images/hue/van-mieu/van-thanh-12.jpg",
      "/images/hue/van-mieu/van-thanh-hue.jpg"
    ],
    shortDesc: "Nơi tôn vinh đạo học và hiền tài dân tộc, lưu giữ 32 tấm bia Tiến sĩ triều Nguyễn dựng trên lưng rùa đá trang nghiêm.",
    fullDesc: [
      "Văn Miếu Huế là nơi phụng thờ Khổng Tử cùng các bậc tiên hiền Nho học, biểu tượng cho truyền thống hiếu học, tôn sư trọng đạo của dân tộc. Văn Miếu được vua Gia Long khởi dựng tại vị trí hiện nay vào năm 1808 bên bờ sông Hương.",
      "Khuôn viên có mặt bằng hình vuông mỗi cạnh khoảng 160m, gồm các kiến trúc tiêu biểu như Đại Thành Môn, Đại Thành Điện, Đông Vu, Tây Vu, Hữu Văn Đường và Dị Lễ Đường.",
      "Điểm đặc biệt và quý giá nhất tại đây là 32 tấm bia đá đặt trên lưng rùa, khắc tên 293 vị Tiến sĩ đỗ đạt qua các khoa thi đình thời Nguyễn từ năm 1822 đến năm 1919."
    ],
    architecture: "Kiến trúc theo lối 'trùng thiềm điệp ốc' truyền thống, hệ thống 32 bia tiến sĩ bằng đá thanh cẩm thạch.",
    history: "Khởi dựng năm 1808 thời vua Gia Long, đánh dấu thời kỳ thịnh vượng của khoa cử Nho học triều Nguyễn.",
    summerHours: "06:30 – 17:30 (Đóng cửa 18:30)",
    winterHours: "07:00 – 17:00 (Đóng cửa 18:00)"
  }
];

export const ROUTE_TICKETS: RouteTicket[] = [
  {
    id: "tuyen-1",
    name: "Tuyến 1: Lăng Minh Mạng – Lăng Gia Long",
    sites: ["Lăng Minh Mạng", "Lăng Gia Long"],
    priceAdult: 240000,
    priceChild: 30000,
    saving: "Tiết kiệm 60.000đ",
    description: "Khám phá sự giao hòa giữa vẻ đẹp uy nghiêm đối xứng của Lăng Minh Mạng và sự khoáng đạt tĩnh mịch nơi núi rừng Thiên Thọ của Lăng Gia Long."
  },
  {
    id: "tuyen-2",
    name: "Tuyến 2: Lăng Tự Đức – Lăng Đồng Khánh",
    sites: ["Lăng Tự Đức", "Lăng Đồng Khánh"],
    priceAdult: 200000,
    priceChild: 30000,
    saving: "Tiết kiệm 50.000đ",
    description: "Chiêm ngưỡng không gian thi vị đầy chất thơ của Lăng Tự Đức kết hợp nghệ thuật sơn son thiếp vàng tráng lệ của Lăng Đồng Khánh."
  },
  {
    id: "tuyen-3",
    name: "Tuyến 3: Bảo tàng Cổ vật Cung đình Huế – Cung An Định",
    sites: ["Bảo tàng Cổ vật Cung đình Huế", "Cung An Định"],
    priceAdult: 80000,
    priceChild: 0,
    saving: "Tiết kiệm 20.000đ",
    description: "Hành trình hoài niệm chiêm ngưỡng những báu vật vương triều và cung điện giao thoa tân cổ điển Á - Âu."
  },
  {
    id: "tuyen-4",
    name: "Tuyến 4: Đại Nội – Lăng Minh Mạng – Lăng Tự Đức",
    sites: ["Đại Nội Huế", "Lăng Minh Mạng", "Lăng Tự Đức"],
    priceAdult: 420000,
    priceChild: 80000,
    saving: "Tiết kiệm 80.000đ",
    description: "Bộ ba di tích danh tiếng bậc nhất kinh đô, trọn vẹn tinh hoa quyền lực và nghệ thuật kiến trúc cung đình triều Nguyễn."
  },
  {
    id: "tuyen-5",
    name: "Tuyến 5: Đại Nội – Lăng Minh Mạng – Lăng Khải Định",
    sites: ["Đại Nội Huế", "Lăng Minh Mạng", "Lăng Khải Định"],
    priceAdult: 420000,
    priceChild: 80000,
    saving: "Tiết kiệm 80.000đ",
    description: "Chuyến đi tương phản thú vị giữa trung tâm hoàng cung tráng lệ, lăng tẩm đăng đối và nghệ thuật khảm sành sứ độc bản."
  },
  {
    id: "tuyen-6",
    name: "Tuyến 6: Đại Nội – Lăng Tự Đức – Lăng Khải Định",
    sites: ["Đại Nội Huế", "Lăng Tự Đức", "Lăng Khải Định"],
    priceAdult: 420000,
    priceChild: 80000,
    saving: "Tiết kiệm 80.000đ",
    description: "Lộ trình phổ biến nhất dành cho du khách khám phá hoàng cung uy nghiêm cùng 2 phong cách lăng tẩm đặc sắc nhất xứ Huế."
  },
  {
    id: "tuyen-7",
    name: "Tuyến 7: Đại Nội – Lăng Minh Mạng – Lăng Tự Đức – Lăng Khải Định",
    sites: ["Đại Nội Huế", "Lăng Minh Mạng", "Lăng Tự Đức", "Lăng Khải Định"],
    priceAdult: 530000,
    priceChild: 100000,
    saving: "Tiết kiệm 120.000đ",
    description: "Tuyến 4 điểm di tích biểu tượng, mang đến góc nhìn toàn diện và sâu sắc nhất về lịch sử và văn hóa vương triều Nguyễn."
  },
  {
    id: "tuyen-8",
    name: "Tuyến 8: Vé tham quan tất cả các điểm di tích",
    sites: ["Tất cả các điểm thuộc Quần thể Di tích Cố đô Huế"],
    priceAdult: 600000,
    priceChild: 120000,
    saving: "Vé toàn tuyến ưu đãi nhất",
    description: "Tấm vé vạn năng tự do khám phá toàn bộ 14 di tích thuộc Quần thể Di tích Cố đô Huế với hạn sử dụng linh hoạt."
  }
];

export const TOUR_JOURNEYS: TourJourney[] = [
  {
    id: "journey-half-1",
    title: "Hành trình Cung đình & Cổ tự ven sông Hương",
    duration: "Tuyến nửa ngày",
    route: "Đại Nội Huế → Chùa Thiên Mụ",
    description: "Khám phá trái tim vương triều Nguyễn tại Đại Nội, sau đó xuôi dòng sông Hương viếng thăm ngôi chùa cổ kính bậc nhất xứ Huế.",
    stops: [
      {
        time: "07:30 – 10:30",
        siteName: "Đại Nội Huế",
        description: "Đi qua cổng Ngọ Môn uy nghi, bước trên cầu Trung Đạo ngắm nhìn Điện Thái Hòa nguy nga. Dạo bước qua Thế Miếu, Hiển Lâm Các, Cung Diên Thọ và tìm hiểu nhịp sống hoàng cung xưa.",
        ticketTip: "Vé đơn điểm: 200.000đ/người lớn (hoặc vé tuyến kết hợp)"
      },
      {
        time: "10:30 – 11:30",
        siteName: "Chùa Thiên Mụ",
        description: "Di chuyển dọc đường Kim Long bên dòng sông Hương thơ mộng, chiêm bái tháp Phước Duyên 7 tầng thanh thoát, lắng nghe tiếng chuông chùa ngân vang và ngắm toàn cảnh sông nước hữu tình.",
        ticketTip: "Miễn phí vé tham quan"
      }
    ],
    tips: [
      "Nên khởi hành sớm vào buổi sáng để tránh nắng và đón ánh bình minh tuyệt đẹp trên sông Hương.",
      "Trang phục lịch sự khi vào nội điện Đại Nội và chùa Thiên Mụ.",
      "Mang theo nón, quạt cầm tay và nước uống cá nhân."
    ]
  },
  {
    id: "journey-half-2",
    title: "Hành trình Thi ca & Nghệ thuật Sành sứ Cố Đô",
    duration: "Tuyến nửa ngày",
    route: "Lăng Tự Đức → Lăng Khải Định",
    description: "Trải nghiệm hai phong cách kiến trúc đối lập độc đáo: một bên là nét lãng mạn thi ca hòa quyện non nước, một bên là đỉnh cao trang trí khảm sành sứ Tây - Đông.",
    stops: [
      {
        time: "08:00 – 10:00",
        siteName: "Lăng Tự Đức (Khiêm Lăng)",
        description: "Thả bộ quanh hồ Lưu Khiêm, ngồi bên Xung Khiêm Tạ ngắm hoa súng nở, ghé nhà hát cổ Minh Khiêm Đường và cảm nhận tâm hồn thi sĩ của vị vua hiếu học.",
        ticketTip: "Vé đơn điểm: 150.000đ/người lớn"
      },
      {
        time: "10:15 – 11:45",
        siteName: "Lăng Khải Định (Ứng Lăng)",
        description: "Leo 127 bậc thang đá vươn lên đỉnh núi Châu Chữ, chiêm ngưỡng bức bích họa Cửu Long Ẩn Vân và choáng ngợp trước hàng vạn mảnh sành sứ ghép nổi tinh xảo tại cung Thiên Định.",
        ticketTip: "Vé đơn điểm: 150.000đ/người lớn (Gợi ý: Mua vé Tuyến 6 để tiết kiệm)"
      }
    ],
    tips: [
      "Hai lăng cách nhau khoảng 7km, dễ dàng di chuyển bằng taxi, xe máy hoặc ô tô.",
      "Chuẩn bị giày đế bệt êm chân vì lăng Khải Định có các bậc thang tương đối cao."
    ]
  },
  {
    id: "journey-full-day",
    title: "Đại lộ Di sản Vương triều Nguyễn trọn vẹn một ngày",
    duration: "Tuyến 1 ngày",
    route: "Lăng Tự Đức → Lăng Khải Định → Lăng Minh Mạng",
    description: "Chuyến du hành xuyên thời gian một ngày khám phá trọn vẹn ba kiệt tác lăng tẩm hoàng gia tiêu biểu nhất của triều đại phong kiến cuối cùng tại Việt Nam.",
    stops: [
      {
        time: "08:00 – 10:00",
        siteName: "Buổi sáng: Lăng Tự Đức",
        description: "Bắt đầu ngày mới tại Lăng Tự Đức, tìm hiểu kiến trúc lăng tẩm gắn với cảnh quan thiên nhiên và những dấu ấn văn chương của vị vua thi sĩ.",
        ticketTip: "Khởi động hành trình với không khí trong lành mát mẻ"
      },
      {
        time: "10:30 – 12:00",
        siteName: "Buổi trưa: Lăng Khải Định",
        description: "Di chuyển đến lăng Khải Định, chiêm ngưỡng đỉnh cao của nghệ thuật khảm sành sứ và chụp những bức hình kỷ niệm ấn tượng với góc nhìn toàn cảnh từ trên đỉnh núi.",
        ticketTip: "Tham quan trước khi nghỉ trưa"
      },
      {
        time: "12:00 – 14:00",
        siteName: "Nghỉ trưa & Ẩm thực Cố Đô",
        description: "Thưởng thức ẩm thực xứ Huế tại các quán ăn truyền thống gần khu vực đồi thông hoặc bờ sông Hương (bánh bèo, nậm, lọc, bún bò Huế, cơm sen).",
        ticketTip: "Nghỉ ngơi chuẩn bị cho chặng buổi chiều"
      },
      {
        time: "14:30 – 16:30",
        siteName: "Buổi chiều: Lăng Minh Mạng",
        description: "Đến ngã ba Bằng Lãng viếng lăng Minh Mạng trong ánh nắng chiều dịu nhẹ. Bước đi trên trục Thần đạo trang nghiêm, ngắm hồ Tân Nguyệt và những rặng thông già cổ thụ trầm mặc.",
        ticketTip: "Mua combo Vé Tuyến 4 hoặc Tuyến 7 để nhận mức giá ưu đãi nhất"
      }
    ],
    tips: [
      "Khuyên dùng vé Tuyến 7: Đại Nội – Minh Mạng – Tự Đức – Khải Định (530.000đ) có giá trị trong 2 ngày nếu muốn ghé thêm Đại Nội.",
      "Mang theo ô/dù che nắng, kem chống nắng và máy ảnh sạc đầy pin."
    ]
  }
];

export const BRAND_LAUNCH_EVENT = {
  title: "Sự kiện ra mắt bộ nhận diện thương hiệu mới",
  campaignName: "Khảm Sắc Cố Đô",
  timeframe: "22/10/2026 – 05/12/2026",
  status: "Đang diễn ra",
  badge: "Đang diễn ra",
  overview: "Chuỗi hoạt động truyền thông và sự kiện nghệ thuật tôn vinh nghệ thuật khảm sành sứ độc bản, lan tỏa vẻ đẹp di sản văn hóa Huế đến đông đảo bạn trẻ và du khách trong nước, quốc tế.",
  onlineActivity: {
    title: "Mini Game Online: 'Khoảnh Khắc Khảm Sắc Cố Đô'",
    time: "27/10/2026 – 27/11/2026",
    summary: "Kết quả được tổng hợp và công bố vào cuối mỗi tuần trên Fanpage chính thức.",
    participants: "Tất cả du khách tham quan các địa điểm thuộc Quần thể Di tích Cố đô Huế.",
    rules: [
      "Tham quan một hoặc nhiều địa điểm thuộc Quần thể Di tích Cố đô Huế. Chụp ảnh hoặc quay video check-in tại địa điểm tham quan.",
      "Truy cập bài viết Mini Game được đăng tải trên Fanpage chính thức của chương trình.",
      "Đăng tải hình ảnh hoặc video check-in dưới phần bình luận của bài viết, kèm theo hashtag chính thức #KhamSacCoDo #HueHeritage.",
      "Mỗi người tham gia gửi 01 bài dự thi/tuần trong suốt thời gian diễn ra chương trình."
    ],
    prize: "Mỗi tuần chọn 1 người chiến thắng, nhận 01 Hộp quà lưu niệm cao cấp gồm 3 sản phẩm độc quyền trong bộ nhận diện thương hiệu mới."
  },
  offlineEvents: [
    {
      id: "event-1",
      name: 'Sự kiện Offline 1: "Khám Phá Di Sản – Săn Dấu Đổi Quà"',
      time: "02/11/2026 – 15/11/2026",
      location: "Các điểm di tích thuộc Quần thể Di tích Cố đô Huế",
      description: "Hành trình trải nghiệm tương tác trực tiếp: du khách check-in và sưu tập con dấu nghệ thuật khảm sành sứ tại các trạm di sản để đổi ngay quà tặng lưu niệm giới hạn."
    },
    {
      id: "event-2",
      name: 'Sự kiện Offline 2: "Chạm Di Sản, Lưu Khoảnh Khắc"',
      time: "16/11/2026 – 29/11/2026",
      location: "Khu vực trưng bày trải nghiệm Cung Diên Thọ & Cung An Định",
      description: "Không gian workshop nghệ thuật ghép mảnh sành sứ, chụp ảnh tương tác cùng trang phục hoàng gia truyền thống và lưu giữ khoảnh khắc đáng nhớ bên di sản."
    }
  ]
};

export const CULTURAL_VALUES = [
  {
    id: "kien-truc",
    title: "Kiến trúc Cung đình uy nghi",
    subtitle: "Trật tự và thẩm mỹ vương triều",
    quote: "Từ những cổng thành uy nghi, cung điện bề thế đến các công trình có mái ngói lưu ly đặc trưng, mỗi kiến trúc đều phản ánh quan niệm thẩm mỹ và trật tự của triều đại phong kiến cuối cùng tại Việt Nam.",
    desc: "Quy hoạch phong thủy đỉnh cao dựa trên thuật phong thủy phương Đông: lấy sông Hương làm minh đường, núi Ngự Bình làm tiền án, cồn Hến và cồn Dã Viên làm tả thanh long hữu bạch hổ, tạo nên bố cục kinh đô bất hủ.",
    image: "/images/hue/dai-noi/img_0595.png"
  },
  {
    id: "kham-sanh-su",
    title: "Nghệ thuật Khảm Sành Sứ & Hoa Văn",
    subtitle: "Hồn cốt tinh xảo của mỹ thuật Huế",
    quote: "Khảm sành sứ là một nghệ thuật trang trí đặc sắc, sử dụng những mảnh sành, sứ và thủy tinh để tạo nên các hình tượng, hoa văn nhiều màu sắc trên kiến trúc. Những tác phẩm này góp phần tạo nên vẻ đẹp riêng cho nhiều công trình di sản Huế.",
    desc: "Những mảnh chén đĩa sứ vỡ qua bàn tay tài hoa của các nghệ nhân cung đình đã hóa thân thành rồng mây bay lượn, phượng múa, hoa sen, bát bửu sống động trường tồn cùng mưa nắng miền Trung.",
    image: "/images/hue/lang-khai-dinh/img_0580.jpg"
  }
];

