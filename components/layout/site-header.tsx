"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const navigation = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState("about");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const currentSection = entries
          .filter((entry) => entry.isIntersecting)
          .sort((first, second) => second.intersectionRatio - first.intersectionRatio)[0];

        if (currentSection) setActiveSection(currentSection.target.id);
      },
      { rootMargin: "-30% 0px -55%", threshold: 0 },
    );

    const sections = navigation
      .map(({ href }) => document.querySelector(href))
      .filter((section): section is Element => Boolean(section));

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  if (pathname.startsWith("/carboncopies")) return null;

  return (
    <header className="site-header">
      <div className="site-shell header-grid">
        <nav className="primary-nav" aria-label="Primary navigation">
          {navigation.map((item) => (
            <Link
              key={item.href}
              className="nav-link label-text"
              href={item.href}
              aria-current={activeSection === item.href.slice(1) ? "location" : undefined}
              onClick={() => setActiveSection(item.href.slice(1))}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
