/**
 * SVG minh họa Quan họ Bắc Ninh — dựa trên phác thảo tham khảo
 */

type IconProps = { className?: string; size?: number };

/** Chim Lạc cách điệu — lấy cảm hứng từ trống đồng Đông Sơn */
export function ChimLac({ className = "", size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" className={className} aria-hidden="true">
      {/* Thân chim */}
      <path d="M25 55c4-12 14-20 28-22 8-1 16 2 22 8 4 4 5 9 3 14-3 6-10 9-18 8-6-1-12-4-16-9" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="currentColor" fillOpacity="0.1" />
      {/* Đầu chim */}
      <circle cx="72" cy="45" r="6" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="2" />
      <circle cx="74" cy="43" r="1.5" fill="currentColor" />
      {/* Mỏ */}
      <path d="M78 44l6-2-5 4" fill="currentColor" opacity="0.8" />
      {/* Mào */}
      <path d="M70 39c-1-4 0-8 3-11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
      <path d="M73 39c0-5 2-9 5-12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
      {/* Cánh xòe */}
      <path d="M35 52c3-8 8-14 15-18 4-2 8-3 12-2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
      <path d="M30 58c5-6 11-11 18-14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
      {/* Đuôi dài cách điệu */}
      <path d="M25 55c-6 2-12 6-16 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M28 58c-7 3-13 8-17 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
      <path d="M30 62c-6 4-11 9-14 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
      {/* Chân */}
      <path d="M50 63v10M47 73h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
      {/* Hoa văn Đông Sơn trên cánh */}
      <path d="M42 48c2-1 4-1 6 0" stroke="currentColor" strokeWidth="1" opacity="0.4" />
      <path d="M38 52c2-1 5-1 7 0" stroke="currentColor" strokeWidth="1" opacity="0.3" />
    </svg>
  );
}

/** Đôi liền anh liền chị — áo the, nón quai thao, ô lọng */
export function DoiLienAnhChi({ className = "", size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 100" fill="none" className={className} aria-hidden="true">
      {/* Liền anh (trái) */}
      {/* Đầu */}
      <circle cx="38" cy="22" r="7" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="1.8" />
      {/* Khăn xếp */}
      <path d="M31 18c0-3 3-6 7-6s7 3 7 6" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.1" />
      <path d="M33 18h10" stroke="currentColor" strokeWidth="1" opacity="0.5" />
      {/* Thân áo the */}
      <path d="M33 29l-5 32h20l-5-32" fill="currentColor" fillOpacity="0.08" stroke="currentColor" strokeWidth="1.8" />
      {/* Vạt áo */}
      <path d="M38 29v32" stroke="currentColor" strokeWidth="1" opacity="0.3" />
      <path d="M34 35l4 2 4-2" stroke="currentColor" strokeWidth="0.8" opacity="0.4" />
      {/* Tay áo */}
      <path d="M33 32l-8 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M43 32l6 10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      {/* Quạt trên tay */}
      <path d="M23 42c-2-4 0-8 3-10 3-2 6-1 8 2" stroke="currentColor" strokeWidth="1.2" opacity="0.6" />
      <path d="M25 44l1-3M27 43l0-4M29 42l-1-4" stroke="currentColor" strokeWidth="0.8" opacity="0.4" />

      {/* Liền chị (phải) */}
      {/* Đầu */}
      <circle cx="82" cy="22" r="7" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="1.8" />
      {/* Nón quai thao */}
      <path d="M82 10L70 20h24L82 10Z" fill="currentColor" fillOpacity="0.12" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="82" cy="11" r="1.5" fill="currentColor" opacity="0.4" />
      {/* Quai thao */}
      <path d="M73 20c-1 3-1 6 0 9" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.4" />
      <path d="M91 20c1 3 1 6 0 9" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.4" />
      {/* Áo tứ thân */}
      <path d="M77 29l-4 32h18l-4-32" fill="currentColor" fillOpacity="0.08" stroke="currentColor" strokeWidth="1.8" />
      {/* Thắt lưng */}
      <path d="M74 42h16" stroke="currentColor" strokeWidth="2" opacity="0.5" />
      {/* Yếm */}
      <path d="M79 30c1.5 3 3 3 6 0" stroke="currentColor" strokeWidth="1.2" opacity="0.5" />
      {/* Tay áo */}
      <path d="M77 32l-7 10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M87 32l8 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      {/* Khăn mỏ quạ trên tay */}
      <path d="M94 42l4-2 2 3-4 1" stroke="currentColor" strokeWidth="1" fill="currentColor" fillOpacity="0.1" opacity="0.5" />

      {/* Ô lọng ở giữa trên */}
      <path d="M60 5v8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
      <path d="M50 13c0-5 4.5-8 10-8s10 3 10 8" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.05" opacity="0.3" />
      <path d="M52 13h16" stroke="currentColor" strokeWidth="0.8" opacity="0.2" />

      {/* Chân */}
      <path d="M34 61l-2 10M42 61l2 10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.4" />
      <path d="M78 61l-2 10M86 61l2 10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.4" />

      {/* Mặt đất/sóng nước */}
      <path d="M15 75c10 3 20-2 30-1s20 4 30 1 20-4 30-1" stroke="currentColor" strokeWidth="1" opacity="0.15" />
    </svg>
  );
}

/** Hoa sen nở — bông sen Bắc Ninh */
export function HoaSen({ className = "", size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none" className={className} aria-hidden="true">
      {/* Cánh sen ngoài */}
      <path d="M40 18c-3 6-5 12-5 18 0 5 2 9 5 9s5-4 5-9c0-6-2-12-5-18Z" fill="currentColor" fillOpacity="0.25" stroke="currentColor" strokeWidth="1.5" />
      <path d="M28 24c-1 6 0 13 3 17 2 3 5 3 6 1 1-3 0-7-2-12s-5-8-7-6Z" fill="currentColor" fillOpacity="0.18" stroke="currentColor" strokeWidth="1.3" />
      <path d="M52 24c1 6 0 13-3 17-2 3-5 3-6 1-1-3 0-7 2-12s5-8 7-6Z" fill="currentColor" fillOpacity="0.18" stroke="currentColor" strokeWidth="1.3" />
      {/* Cánh sen ngoài cùng */}
      <path d="M20 30c0 5 2 11 5 14 2 2 5 2 6-1 1-3-1-8-4-12-3-4-6-4-7-1Z" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="1.2" />
      <path d="M60 30c0 5-2 11-5 14-2 2-5 2-6-1-1-3 1-8 4-12 3-4 6-4 7-1Z" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="1.2" />
      {/* Nhụy sen */}
      <circle cx="40" cy="38" r="4" fill="currentColor" fillOpacity="0.3" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="40" cy="38" r="1.5" fill="currentColor" fillOpacity="0.5" />
      {/* Đài sen nhỏ */}
      <path d="M37 42c1 1 2 1.5 3 1.5s2-0.5 3-1.5" stroke="currentColor" strokeWidth="1" opacity="0.4" />
      {/* Cuống */}
      <path d="M40 46c0 8-1 16-2 22" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" opacity="0.5" />
      {/* Lá sen */}
      <path d="M30 60c4-3 8-4 12-3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.3" />
      <path d="M38 68c4 0 8-1 12-3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.3" />
    </svg>
  );
}

/** Nón quai thao — chi tiết hơn */
export function NonQuaiThao({ className = "", size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 60" fill="none" className={className} aria-hidden="true">
      {/* Thân nón */}
      <path d="M40 6L10 42h60L40 6Z" fill="currentColor" fillOpacity="0.08" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      {/* Đường vành nón */}
      <ellipse cx="40" cy="42" rx="30" ry="4" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.05" />
      {/* Chóp nón */}
      <circle cx="40" cy="7" r="2.5" fill="currentColor" fillOpacity="0.3" stroke="currentColor" strokeWidth="1.2" />
      {/* Nan nón */}
      <path d="M40 9L20 40" stroke="currentColor" strokeWidth="0.6" opacity="0.2" />
      <path d="M40 9L30 41" stroke="currentColor" strokeWidth="0.6" opacity="0.15" />
      <path d="M40 9L50 41" stroke="currentColor" strokeWidth="0.6" opacity="0.15" />
      <path d="M40 9L60 40" stroke="currentColor" strokeWidth="0.6" opacity="0.2" />
      {/* Bài thơ trên nón (cách điệu) */}
      <path d="M32 25h5" stroke="currentColor" strokeWidth="0.8" opacity="0.25" />
      <path d="M35 28h6" stroke="currentColor" strokeWidth="0.8" opacity="0.2" />
      <path d="M37 31h5" stroke="currentColor" strokeWidth="0.8" opacity="0.15" />
      {/* Quai thao bên trái */}
      <path d="M18 42c-3 3-5 7-5 11 0 2 1 3 2 3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" opacity="0.6" />
      {/* Quai thao bên phải */}
      <path d="M62 42c3 3 5 7 5 11 0 2-1 3-2 3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" opacity="0.6" />
      {/* Tua quai */}
      <path d="M14 55c1 1 2 2 3 2M16 56c0 1 1 2 2 2" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" opacity="0.35" />
      <path d="M64 55c-1 1-1 2-2 2M63 56c0 1-1 2-2 2" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" opacity="0.35" />
    </svg>
  );
}

/** Đôi chim Lạc đối xứng — biểu tượng duyên đôi */
export function DoiChimLac({ className = "", size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 80" fill="none" className={className} aria-hidden="true">
      {/* Chim trái */}
      <g>
        <path d="M20 45c4-10 12-16 22-17 6-1 11 1 14 5 2 3 2 7 0 10-3 4-8 6-14 5-4-1-9-3-12-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="currentColor" fillOpacity="0.08" />
        <circle cx="50" cy="35" r="4" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="51.5" cy="34" r="1" fill="currentColor" />
        <path d="M54 35l4-1.5-3.5 3" fill="currentColor" opacity="0.7" />
        <path d="M48 31c-1-3 0-6 2-8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
        {/* Đuôi */}
        <path d="M20 45c-4 2-8 5-11 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M22 48c-5 3-9 7-12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
        {/* Cánh */}
        <path d="M30 40c2-4 5-7 9-9" stroke="currentColor" strokeWidth="1.2" opacity="0.4" />
      </g>
      {/* Chim phải (lật) */}
      <g transform="scale(-1,1) translate(-120,0)">
        <path d="M20 45c4-10 12-16 22-17 6-1 11 1 14 5 2 3 2 7 0 10-3 4-8 6-14 5-4-1-9-3-12-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="currentColor" fillOpacity="0.08" />
        <circle cx="50" cy="35" r="4" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="51.5" cy="34" r="1" fill="currentColor" />
        <path d="M54 35l4-1.5-3.5 3" fill="currentColor" opacity="0.7" />
        <path d="M48 31c-1-3 0-6 2-8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
        <path d="M20 45c-4 2-8 5-11 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M22 48c-5 3-9 7-12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
        <path d="M30 40c2-4 5-7 9-9" stroke="currentColor" strokeWidth="1.2" opacity="0.4" />
      </g>
      {/* Hoa sen nhỏ ở giữa */}
      <path d="M60 58c-2-4-3-8-3-12 0-3 1.3-5 3-5s3 2 3 5c0 4-1 8-3 12Z" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="1" />
      <path d="M55 52c0-3 1-6 3-8" stroke="currentColor" strokeWidth="0.8" opacity="0.3" />
      <path d="M65 52c0-3-1-6-3-8" stroke="currentColor" strokeWidth="0.8" opacity="0.3" />
    </svg>
  );
}

/** Trống đồng Đông Sơn cách điệu */
export function TrongDong({ className = "", size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none" className={className} aria-hidden="true">
      {/* Mặt trống (nhìn từ trên) */}
      <circle cx="40" cy="40" r="28" stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity="0.04" />
      <circle cx="40" cy="40" r="22" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
      <circle cx="40" cy="40" r="16" stroke="currentColor" strokeWidth="1.2" opacity="0.35" />
      <circle cx="40" cy="40" r="8" stroke="currentColor" strokeWidth="1.5" opacity="0.6" />
      {/* Ngôi sao trung tâm */}
      <path d="M40 34l2 4 4 0.5-3 3 0.7 4.5-3.7-2-3.7 2 0.7-4.5-3-3 4-0.5Z" fill="currentColor" fillOpacity="0.4" />
      {/* Hoa văn tia sáng */}
      <path d="M40 12v6M40 62v6M12 40h6M62 40h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
      <path d="M20 20l4 4M56 56l4 4M56 20l-4 4M20 56l4-4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.3" />
      {/* Chim Lạc nhỏ trên vành */}
      <path d="M22 28c2-1 4-1 5 0 1 1 0 2-1 2s-3 0-4-2Z" fill="currentColor" opacity="0.3" />
      <path d="M54 52c-2 1-4 1-5 0-1-1 0-2 1-2s3 0 4 2Z" fill="currentColor" opacity="0.3" />
      {/* Vòng hoa văn */}
      <circle cx="40" cy="40" r="25" stroke="currentColor" strokeWidth="0.8" strokeDasharray="3 2" opacity="0.25" />
    </svg>
  );
}

