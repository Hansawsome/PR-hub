import { useEffect, useMemo, useState } from "react";
import { Reveal, CountUp } from "@/components/common/common";
import { SplineScene } from "@/components/ui/splite";
import { Spotlight } from "@/components/ui/spotlight";
import { useLang } from "@/i18n/LanguageProvider";

const SPLINE_SCENE = "https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode";

/* Animated SVG network nodes — security metaphor (fallback / ambient) */
function NetworkVisual() {
  const nodes = useMemo(() => {
    const arr: { x: number; y: number; ring: number; i: number }[] = [];
    const rings = [
      { r: 0, count: 1 },
      { r: 95, count: 6 },
      { r: 165, count: 9 },
      { r: 235, count: 12 },
    ];
    rings.forEach((ring, ri) => {
      for (let i = 0; i < ring.count; i++) {
        const ang = (i / ring.count) * Math.PI * 2 + ri * 0.32;
        arr.push({ x: Math.cos(ang) * ring.r, y: Math.sin(ang) * ring.r, ring: ri, i: arr.length });
      }
    });
    return arr;
  }, []);

  const links = useMemo(() => {
    const ls: [number, number][] = [];
    nodes.filter((n) => n.ring === 1).forEach((n) => ls.push([0, n.i]));
    const r1 = nodes.filter((n) => n.ring === 1);
    const r2 = nodes.filter((n) => n.ring === 2);
    r1.forEach((a) => {
      [...r2].sort((p, q) => Math.hypot(p.x - a.x, p.y - a.y) - Math.hypot(q.x - a.x, q.y - a.y))
        .slice(0, 2)
        .forEach((c) => ls.push([a.i, c.i]));
    });
    return ls;
  }, [nodes]);

  return (
    <div className="hero-visual">
      <svg viewBox="-300 -300 600 600" className="hero-svg">
        <defs>
          <radialGradient id="ringFade" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.18" />
            <stop offset="60%" stopColor="var(--accent-2)" stopOpacity="0.06" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
          <linearGradient id="linkGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="var(--accent)" stopOpacity="0.7" />
            <stop offset="1" stopColor="var(--accent-2)" stopOpacity="0.15" />
          </linearGradient>
          <radialGradient id="nodeGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0" stopColor="var(--accent)" stopOpacity="0.9" />
            <stop offset="1" stopColor="var(--accent)" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="0" cy="0" r="280" fill="url(#ringFade)" />
        {[95, 165, 235].map((r) => (
          <circle key={r} cx="0" cy="0" r={r} fill="none" stroke="var(--border-subtle)" strokeWidth="1" strokeDasharray={r === 165 ? "0" : "2 6"} />
        ))}
        <g style={{ transformOrigin: "0 0", animation: "sweep 9s linear infinite" }}>
          <path d="M0,0 L260,0 A260,260 0 0,1 184,184 Z" fill="url(#nodeGlow)" opacity="0.18" />
        </g>
        <g stroke="url(#linkGrad)" strokeWidth="1" fill="none">
          {links.map(([a, b], idx) => (
            <line key={idx} x1={nodes[a].x} y1={nodes[a].y} x2={nodes[b].x} y2={nodes[b].y} opacity="0.5" />
          ))}
        </g>
        {nodes.map((n) => {
          const r = n.ring === 0 ? 10 : n.ring === 1 ? 5.5 : n.ring === 2 ? 4 : 3;
          return (
            <g key={n.i}>
              <circle cx={n.x} cy={n.y} r={r + 8} fill="url(#nodeGlow)" opacity={n.ring === 0 ? 0.6 : 0.3} />
              <circle cx={n.x} cy={n.y} r={r} fill={n.ring === 0 ? "var(--accent)" : "var(--bg-base)"} stroke="var(--accent)" strokeWidth={n.ring === 0 ? 0 : 1.2} />
            </g>
          );
        })}
        <g>
          <circle cx="0" cy="0" r="22" fill="var(--bg-elevated)" stroke="var(--accent)" strokeWidth="1" />
          <text x="0" y="2" textAnchor="middle" dominantBaseline="middle" fontFamily="var(--font-display)" fontSize="14" fontWeight="700" fill="var(--accent)">H</text>
        </g>
      </svg>
    </div>
  );
}

export function Hero() {
  const { t } = useLang();
  const [use3d, setUse3d] = useState(true);

  useEffect(() => {
    const mobile = window.matchMedia("(max-width: 1000px)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (mobile || reduced) setUse3d(false);
  }, []);

  return (
    <section id="top" className="hero">
      <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="rgba(0,229,255,0.9)" />
      <div className="container">
        <div className="hero-stage">
          {/* Center: 3D robot (or network fallback) */}
          <div className="hero-3d-center">
            {use3d ? (
              <SplineScene
                scene={SPLINE_SCENE}
                className="w-full h-full"
                fallback={<div className="hero-svg-fallback"><NetworkVisual /></div>}
              />
            ) : (
              <div className="hero-svg-fallback"><NetworkVisual /></div>
            )}
          </div>

          {/* Overlay: title on top of the robot, enlarged + lowered */}
          <div className="hero-overlay">
            <Reveal>
              <span className="eyebrow">{t("보안 전문가 · 20년+", "Security Professional · 20+ yrs")}</span>
            </Reveal>
            <Reveal delay={80}>
              <h1 className="h-display hero-headline hero-headline-xl">
                {t(
                  <>
                    <span className="line">물리·정보보안을 잇는</span>
                    <span className="line text-grad">융합 SI 전문가</span>
                  </>,
                  <>
                    <span className="line">Bridging physical &amp; cyber</span>
                    <span className="line text-grad">security as a convergence expert</span>
                  </>
                )}
              </h1>
            </Reveal>
            <Reveal delay={160}>
              <p className="subtle hero-sub hero-sub-center">
                {t(
                  "CISSP 보유. 설계(PM)부터 수주(Sales)까지, 통합 보안 시스템을 끝까지 책임집니다.",
                  "CISSP-certified. From design (PM) to deal (Sales), I own integrated security systems end to end."
                )}
              </p>
            </Reveal>
            <Reveal delay={240}>
              <div className="hero-ctas hero-ctas-center">
                <a href="#projects" className="btn btn-primary">
                  {t("프로젝트 보기", "View projects")} <span className="arrow">→</span>
                </a>
                <a href="#contact" className="btn btn-ghost">
                  {t("연락하기", "Get in touch")}
                </a>
              </div>
            </Reveal>
            <Reveal delay={320}>
              <div className="hero-cert-strip">CISSP · CCNA · {t("무선설비기사 · 정보처리기사", "Wireless / Info-Proc Eng.")} · {t("숭실대 IT융합대학원 석사", "M.S. IT Convergence")}</div>
            </Reveal>
          </div>

          {/* Floating stat card */}
          <div className="hero-stat-card glass">
            <div className="hero-stat-row">
              <div>
                <div className="hero-stat-num"><CountUp to={300} suffix="억+" /></div>
                <div className="hero-stat-lbl">{t("누적 수주 규모", "KRW in SI deals")}</div>
              </div>
              <div className="vrule" />
              <div>
                <div className="hero-stat-num"><CountUp to={28} /></div>
                <div className="hero-stat-lbl">{t("글로벌 사이트", "Global sites")}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
