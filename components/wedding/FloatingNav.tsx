"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { OPEN_WISHES_POPUP_EVENT } from "@/components/wedding/Wishes/FloatingWishes";

type NavSection = {
  id: string;
  label: string;
};

const sections: NavSection[] = [
  { id: "hero", label: "Trang đầu" },
  { id: "couple", label: "Cô dâu & Chú rể" },
  { id: "love-story", label: "Chuyện tình" },
  { id: "wedding-events", label: "Sự kiện" },
  { id: "gallery", label: "Album" },
  { id: "rsvp", label: "RSVP" },
  { id: "wishes", label: "Lời chúc" },
  { id: "wedding-gift", label: "Mừng cưới" },
];

const quickLinks: NavSection[] = [
  { id: "rsvp", label: "RSVP" },
  { id: "wishes", label: "Lời chúc" },
  { id: "bank", label: "Gửi quà" },
];

export function FloatingNav() {
  const [activeSection, setActiveSection] = useState("");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [visible, setVisible] = useState(false);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  const updateScroll = useCallback(() => {
    const scrollY = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? Math.min(scrollY / docHeight, 1) : 0;

    setScrollProgress(progress);
    setVisible(scrollY > window.innerHeight * 0.5);

    lastScrollY.current = scrollY;
    ticking.current = false;
  }, []);

  useEffect(() => {
    function onScroll() {
      if (!ticking.current) {
        ticking.current = true;
        requestAnimationFrame(updateScroll);
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    updateScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [updateScroll]);

  useEffect(() => {
    const sectionElements = sections
      .map((s) => document.getElementById(s.id))
      .filter(Boolean) as HTMLElement[];

    if (!sectionElements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
            break;
          }
        }
      },
      { threshold: 0.1, rootMargin: "-20% 0px -50% 0px" },
    );

    sectionElements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }

  function handleQuickAction(section: NavSection) {
    if (section.id === "wishes") {
      window.dispatchEvent(new Event(OPEN_WISHES_POPUP_EVENT));
      return;
    }
    scrollTo(section.id);
  }

  function backToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <>
      {/* Scroll progress bar */}
      <div
        className={`fixed top-0 left-0 z-40 h-[2px] bg-[var(--color-primary)] transition-opacity duration-300 ${visible ? "opacity-100" : "opacity-0"}`}
        style={{ width: `${scrollProgress * 100}%` }}
        role="progressbar"
        aria-valuenow={Math.round(scrollProgress * 100)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Tiến trình đọc"
      />

      {/* Dot navigation */}
      <nav
        className={`fixed right-6 top-1/2 z-30 hidden -translate-y-1/2 transition-[opacity,transform] duration-300 md:block ${visible ? "translate-x-0 opacity-100" : "pointer-events-none translate-x-4 opacity-0"}`}
        aria-label="Điều hướng nhanh"
      >
        <ul className="flex flex-col items-center gap-4">
          {sections.map((section) => (
            <li key={section.id}>
              <button
                className={`group relative grid size-3.5 place-items-center rounded-full border transition-all duration-200 ${
                  activeSection === section.id
                    ? "scale-125 border-[var(--color-primary)] bg-[var(--color-primary)]"
                    : "border-[var(--color-muted)]/50 bg-[var(--color-surface)] hover:border-[var(--color-primary)] hover:scale-110"
                }`}
                type="button"
                onClick={() => scrollTo(section.id)}
                aria-label={section.label}
                aria-current={activeSection === section.id ? "true" : undefined}
              >
                <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap bg-[var(--color-foreground)] px-2.5 py-1 text-[0.65rem] font-medium tracking-[0.04em] text-[var(--color-on-image)] opacity-0 shadow-lg transition-opacity duration-[var(--duration-fast)] group-hover:opacity-100">
                  {section.label}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Sticky quick actions */}
      <nav
        className={`fixed top-[max(0.8rem,env(safe-area-inset-top))] left-1/2 z-30 hidden w-[min(calc(100%-1.5rem),36rem)] -translate-x-1/2 transition-[opacity,transform] duration-300 md:flex ${visible ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-3 opacity-0"}`}
        aria-label="Lối tắt nhanh"
      >
        <ul className="grid grid-cols-3 gap-2 border border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-surface)_90%,white)] p-2 shadow-[var(--shadow-floating)] backdrop-blur-sm">
          {quickLinks.map((section) => (
            <li key={section.id}>
              <button
                className="flex min-h-10 w-full items-center justify-center border border-[var(--color-border)] bg-[var(--color-surface)] px-3 text-[0.64rem] font-semibold tracking-[0.12em] text-[var(--color-primary)] uppercase transition-colors duration-200 hover:border-[var(--color-primary)] hover:text-[var(--color-primary-hover)]"
                type="button"
                onClick={() => handleQuickAction(section)}
              >
                {section.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Back to top */}
      <button
        className={`fixed right-5 bottom-[max(5.6rem,calc(env(safe-area-inset-bottom)+5rem))] z-30 hidden size-11 place-items-center border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-primary)] shadow-[var(--shadow-floating)] transition-[opacity,transform,border-color] duration-300 hover:border-[var(--color-primary)] md:grid ${visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"}`}
        type="button"
        onClick={backToTop}
        aria-label="Lên đầu trang"
      >
        <span className="text-base" aria-hidden="true">↑</span>
      </button>

      {/* Mobile bottom navigation */}
      <nav
        className={`fixed bottom-6 left-1/2 z-[100] block w-max -translate-x-1/2 transition-[opacity,transform] duration-300 md:hidden ${visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"}`}
        aria-label="Điều hướng nổi"
      >
        <ul className="mx-auto flex items-center justify-center gap-6 rounded-full bg-white/90 px-6 py-3 shadow-[0_8px_30px_rgb(0,0,0,0.12)] backdrop-blur-md">
          {quickLinks.map((section) => (
            <li key={`mobile-${section.id}`}>
              <button
                className="flex min-h-11 min-w-14 flex-col items-center justify-center gap-1 whitespace-nowrap text-[10px] font-semibold tracking-[0.04em] text-gray-600 transition-colors duration-200 hover:text-red-700"
                type="button"
                onClick={() => handleQuickAction(section)}
              >
                <span className="grid h-5 w-5 place-items-center" aria-hidden="true">
                  {section.id === "rsvp" ? (
                    <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current" strokeWidth="1.8">
                      <path d="M4 6h16v12H4z" />
                      <path d="m4 8 8 6 8-6" />
                    </svg>
                  ) : section.id === "wishes" ? (
                    <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current" strokeWidth="1.8">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current" strokeWidth="1.8">
                      <rect x="3.5" y="6" width="17" height="14" rx="2.5" />
                      <path d="M8 10h8M8 14h5" />
                    </svg>
                  )}
                </span>
                <span>{section.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
