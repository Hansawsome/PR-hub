import { useEffect, useRef, useState, type ReactNode } from "react";
import { useLang } from "@/i18n/LanguageProvider";

/* IntersectionObserver-driven reveal */
export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setTimeout(() => setShown(true), delay);
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -10% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);
  return (
    <div ref={ref} className={`reveal ${shown ? "in" : ""} ${className}`}>
      {children}
    </div>
  );
}

/* CountUp number animation on view */
export function CountUp({
  to,
  prefix = "",
  suffix = "",
  duration = 1400,
}: {
  to: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [val, setVal] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          const start = performance.now();
          const tick = (t: number) => {
            const p = Math.min(1, (t - start) / duration);
            const eased = 1 - Math.pow(1 - p, 3);
            setVal(eased * to);
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
          io.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [to, duration]);
  return (
    <span ref={ref} className="font-display" style={{ fontVariantNumeric: "tabular-nums" }}>
      {prefix}
      {Math.round(val).toLocaleString()}
      {suffix}
    </span>
  );
}

/* Logo — "H" shield mark + Hans wordmark */
export function Logo({ size = 28, showWordmark = true }: { size?: number; showWordmark?: boolean }) {
  return (
    <a href="#top" className="logo" style={{ display: "inline-flex", alignItems: "center", gap: 10 }} aria-label="Hans — home">
      <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true">
        <defs>
          <linearGradient id="lg-mark" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="var(--accent)" />
            <stop offset="1" stopColor="var(--accent-2)" />
          </linearGradient>
        </defs>
        <path d="M6 4 L14 3 L14 29 L7 28 Z" fill="url(#lg-mark)" opacity="0.95" />
        <path d="M26 4 L18 3 L18 29 L25 28 Z" fill="url(#lg-mark)" opacity="0.95" />
        <rect x="14" y="14.5" width="4" height="3" fill="var(--accent)" />
        <circle cx="14" cy="16" r="1.6" fill="var(--bg-base)" stroke="var(--accent)" strokeWidth="0.8" />
        <circle cx="18" cy="16" r="1.6" fill="var(--bg-base)" stroke="var(--accent)" strokeWidth="0.8" />
      </svg>
      {showWordmark ? (
        <span style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 18, letterSpacing: "0.02em", color: "var(--text-primary)" }}>
          Hans
        </span>
      ) : null}
    </a>
  );
}

/* Profile portrait — duotone "characterized" treatment with HUD overlay */
export function ProfilePortrait({ className = "" }: { className?: string }) {
  const { t } = useLang();
  return (
    <figure className={`hero-portrait glow-border ${className}`}>
      <img src={`${import.meta.env.BASE_URL}hans-profile.jpg`} alt="한성혁 (Hans) — Security Professional" loading="lazy" />
      <span className="portrait-corner tl" />
      <span className="portrait-corner tr" />
      <span className="portrait-corner bl" />
      <span className="portrait-corner br" />
      <div className="portrait-scan" />
      <figcaption className="portrait-tag">
        <span className="chip-dot" /> {t("객체 인식 · IDENTITY VERIFIED", "OBJECT DETECTED · IDENTITY VERIFIED")}
      </figcaption>
    </figure>
  );
}

/* Section heading — language aware */
export function SectionHeading({
  no,
  eyebrowKo,
  eyebrowEn,
  titleKo,
  titleEn,
  descKo,
  descEn,
}: {
  no?: string;
  eyebrowKo: string;
  eyebrowEn: string;
  titleKo: ReactNode;
  titleEn: ReactNode;
  descKo?: string;
  descEn?: string;
}) {
  const { t } = useLang();
  return (
    <div className="section-header">
      <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
        {no ? <span className="sec-no">{no}</span> : null}
        <span className="eyebrow">{t(eyebrowKo, eyebrowEn)}</span>
      </div>
      <h2 className="h2">{t(titleKo, titleEn)}</h2>
      {descKo ? (
        <p className="subtle" style={{ fontSize: "clamp(15px, 1.3vw, 17px)", maxWidth: 640, margin: 0 }}>
          {t(descKo, descEn ?? descKo)}
        </p>
      ) : null}
    </div>
  );
}
