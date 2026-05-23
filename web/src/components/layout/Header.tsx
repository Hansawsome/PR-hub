import { useEffect, useState } from "react";
import { Logo } from "@/components/common/common";
import { useLang } from "@/i18n/LanguageProvider";

const NAV = [
  { ko: "About", en: "About", href: "#about" },
  { ko: "Career", en: "Career", href: "#career" },
  { ko: "Projects", en: "Projects", href: "#projects" },
  { ko: "Expertise", en: "Expertise", href: "#expertise" },
  { ko: "Vision", en: "Vision", href: "#vision" },
  { ko: "Growth", en: "Growth", href: "#growth" },
  { ko: "Contact", en: "Contact", href: "#contact" },
];

export function Header() {
  const { lang, setLang, t } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`site-header ${scrolled ? "scrolled" : ""}`}>
      <div className="container header-row">
        <Logo />
        <nav className="primary-nav">
          {NAV.map((n) => (
            <a key={n.href} href={n.href}>
              {t(n.ko, n.en)}
            </a>
          ))}
        </nav>
        <div className="header-right">
          <div className="lang-toggle" role="group" aria-label="Language">
            <button className={lang === "ko" ? "active" : ""} onClick={() => setLang("ko")} aria-pressed={lang === "ko"}>
              KO
            </button>
            <button className={lang === "en" ? "active" : ""} onClick={() => setLang("en")} aria-pressed={lang === "en"}>
              EN
            </button>
          </div>
          <a href="#contact" className="btn btn-primary" style={{ height: 40, padding: "0 18px", fontSize: 14 }}>
            {t("연락하기", "Get in touch")} <span className="arrow">→</span>
          </a>
          <button className="menu-btn" aria-label="Menu" onClick={() => setMenuOpen(true)}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M3 6h18M3 12h18M3 18h18" />
            </svg>
          </button>
        </div>
      </div>

      {menuOpen ? (
        <div className="mobile-menu" onClick={() => setMenuOpen(false)}>
          <button className="close" aria-label="Close">✕</button>
          {NAV.map((n) => (
            <a key={n.href} href={n.href} onClick={() => setMenuOpen(false)}>
              {t(n.ko, n.en)}
            </a>
          ))}
        </div>
      ) : null}
    </header>
  );
}
