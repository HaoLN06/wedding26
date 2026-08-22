import type { WeddingConfig } from "@/types/wedding";

/**
 * Nơi duy nhất để thay đổi toàn bộ thông tin cá nhân của website đám cưới.
 * Dữ liệu nhạy cảm bên dưới chỉ là placeholder và cần được thay trước khi xuất bản.
 */
export const weddingConfig: WeddingConfig = {
  couple: {
    bride: {
      firstName: "Nam Nam",
      fullName: "Vũ Thị Nabc",
      role: "bride",
      image: "/images/bacninh/quanho2.jpg",
      description: "Dịu dàng, tinh tế và luôn giữ nụ cười ấm áp trong những điều bình dị nhất.",
      father: "Ông [Tên bố cô dâu]",
      mother: "Bà [Tên mẹ cô dâu]",
    },
    groom: {
      firstName: "Habc",
      fullName: "Lương Ngọc Habc",
      role: "groom",
      image: "/images/bacninh/quanho1.jpg",
      description: "Điềm tĩnh, chân thành và luôn trân trọng những khoảnh khắc ở cạnh người mình thương.",
      father: "Ông [Tên bố chú rể]",
      mother: "Bà [Tên mẹ chú rể]",
    },
  },
  date: "2026-12-01T18:00:00+07:00",
  invitation: {
    eyebrow: "Trân trọng kính mời",
    defaultGuestName: "Người thương mến",
    message: "Về chung vui cùng đôi lứa",
    openButtonLabel: "Mở thiệp",
  },
  hero: {
    //public\images\riengtu\img7.jpg
    // image: "/images/bacninh/quanho3.jpg",public\images\hero-wedding.png
    image: "/images/riengtu/img14.jpg",
    imageAlt: "Hào và Nam nắm tay nhau, mỉm cười hạnh phúc trong khung cảnh lụa mềm tối giản",
    eyebrow: "Duyên quan họ — Nghĩa trăm năm",
    showCountdown: true,
  },
  events: [
    {
      id: "wedding-ceremony",
      title: "Lễ Thành Hôn",
      date: "2026-12-20T09:00:00+07:00",
      venue: "Tư gia nhà trai",
      address: "Số 128 Đường Lý Thái Tổ, P. Võ Cường, TP. Bắc Ninh",
      mapUrl: "https://maps.google.com/?q=128+Ly+Thai+To+Vo+Cuong+Bac+Ninh",
      description: "Nghi lễ thành hôn thân mật, nơi hai gia đình cùng chứng kiến lời hẹn ước của chúng mình.",
      dressCode: "Trang phục lịch sự · Tông đỏ đô · Hồng sen",
      note: "Vui lòng có mặt trước 15 phút.",
    },
    {
      id: "wedding-party",
      title: "Tiệc Cưới",
      date: "2026-12-20T18:00:00+07:00",
      venue: "Trung tâm tiệc cưới Kinh Bắc Palace",
      address: "Khu đô thị Hồ Ngọc Lân 2, P. Kinh Bắc, TP. Bắc Ninh",
      mapUrl: "https://maps.google.com/?q=Kinh+Bac+Palace+Bac+Ninh",
      description: "Một buổi tối ấm áp với gia đình và những người bạn thân yêu nhất.",
      dressCode: "Thanh lịch · Ivory · Beige · Terracotta",
    },
  ],
  loveStory: [
    {
      id: "first-meet",
      date: "Tháng 08 · 2019",
      title: "Lần đầu gặp nhau",
      description: "Một buổi chiều rất đỗi bình thường, một cuộc trò chuyện không ai muốn kết thúc — câu chuyện của chúng mình bắt đầu như thế.",
      image: "/images/hero-wedding.png",
    },
    {
      id: "first-journey",
      date: "Mùa hè · 2021",
      title: "Chuyến đi đầu tiên",
      description: "Chúng mình học cách đồng hành qua những con đường mới, những lần lạc nhau và thật nhiều khoảnh khắc đáng nhớ.",
    },
    {
      id: "our-home",
      date: "Năm 2023",
      title: "Một nơi gọi là nhà",
      description: "Từ những điều nhỏ bé mỗi ngày, chúng mình hiểu rằng nhà không phải một nơi chốn — mà là khi có nhau.",
    },
    {
      id: "proposal",
      date: "Tháng 12 · 2025",
      title: "Lời cầu hôn",
      description: "Không cần một khoảnh khắc quá lớn lao. Chỉ có một câu hỏi, một cái gật đầu và lời hứa cùng nhau đi hết hành trình phía trước.",
    },
  ],
  gallery: [
    {
      id: "gallery-01",
      src: "/images/riengtu/img14.jpg",
      alt: "Cô dâu và chú rể cùng bước đi trong khu vườn ngày cưới",
      width: 1703,
      height: 2560,
      caption: "Chúng mình, trong một buổi chiều tháng Mười Hai",
      featured: true,
      orientation: "portrait",
    },
    {
      id: "gallery-02",
      src: "/images/riengtu/img2.jpg",
      alt: "Khoảnh khắc bình yên của đôi uyên ương trong ngày cưới",
      width: 1703,
      height: 2560,
      caption: "Những khoảnh khắc bình yên",
      orientation: "portrait",
    },
    {
      id: "gallery-03",
      src: "/images/riengtu/img1.jpg",
      alt: "Không gian cưới với gam màu ivory ấm áp",
      width: 2560,
      height: 1703,
      caption: "Một ngày để nhớ mãi",
      orientation: "landscape",
    },
    {
      id: "gallery-04",
      src: "/images/riengtu/img6a.jpg",
      alt: "Nụ cười hạnh phúc trong ngày trọng đại",
      width: 1703,
      height: 2560,
      caption: "Khi mọi thứ đều đúng lúc",
      orientation: "portrait",
    },
    {
      id: "gallery-05",
      src: "/images/riengtu/img3.jpg",
      alt: "Hai bàn tay nắm chặt trong ánh hoàng hôn",
      width: 2560,
      height: 1703,
      caption: "Và chúng mình chọn đi cùng nhau",
      orientation: "landscape",
    },
  ],
  gift: {
    title: "Gửi quà mừng",
    description: "Tình cảm và sự hiện diện của bạn là món quà quý giá nhất. Nếu muốn gửi thêm một món quà nhỏ, bạn có thể tham khảo thông tin dưới đây.",
    accounts: [
      {
        id: "groom",
        label: "Nhà trai",
        accountName: "LUONG NGOC HAO",
        accountNumber: "190376688888",
        bankName: "Techcombank",
      },
      {
        id: "bride",
        label: "Nhà gái",
        accountName: "VU THI NAM",
        accountNumber: "9704220001234567",
        bankName: "MB Bank",
      },
    ],
  },
  rsvp: {
    title: "Bạn sẽ tham dự chứ?",
    description: "Sự hiện diện của bạn là niềm vui lớn đối với chúng mình. Hãy dành một phút để gửi lời xác nhận nhé.",
    maxGuests: 5,
    allowMessage: true,
    submitLabel: "Gửi xác nhận",
    successTitle: "Cảm ơn bạn!",
    successMessage: "Chúng mình đã ghi nhận lời hồi đáp và rất mong được gặp bạn trong ngày vui.",
  },
  wishes: {
    title: "Lời chúc",
    description: "Những lời thương mến từ gia đình và bạn bè dành cho hành trình mới của chúng mình.",
    submitLabel: "Gửi lời chúc",
    items: [
      {
        id: "wish-01",
        name: "Gia đình thân yêu",
        message: "Chúc hai con luôn bình an, yêu thương và cùng nhau vun đắp một mái ấm thật hạnh phúc.",
      },
      {
        id: "wish-02",
        name: "Những người bạn",
        message: "Chúc Hào và Nam mãi giữ được nụ cười, sự dịu dàng và niềm vui như trong ngày hôm nay.",
      },
    ],
  },
  music: {
    title: "Nhạc cưới",
    autoplayAfterInvitation: false,
    loop: true,
  },
  site: {
    title: "Hào & Nam — Về chung một nhà",
    description: "Thiệp mời đám cưới của Hào và Nam — Duyên quan họ Bắc Ninh.",
    locale: "vi_VN",
    url: "https://example.com",
  },
  features: {
    couple: true,
    loveStory: true,
    events: true,
    gallery: true,
    rsvp: true,
    wishes: true,
    gift: true,
    music: true,
  },
};
