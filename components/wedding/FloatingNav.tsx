"use client";

import { useCallback, useEffect, useRef, useState } from "react";

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
    </>
  );
}
