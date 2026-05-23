import { Reveal, SectionHeading } from "@/components/common/common";
import { useLang } from "@/i18n/LanguageProvider";

/* ---- Part A data: leadership / team building (portfolio §4, as charts) ---- */
const CAGR_BARS = [
  { year: "2020", h: 0.46 },
  { year: "2021", h: 0.76 },
  { year: "2022", h: 1.0 },
];
const CAGR_STEPS = ["+64%", "+41%"]; // YoY growth annotations from portfolio

const TRAINING = [
  { ko: "업무분장 R&R", en: "Roles & R&R" },
  { ko: "네트워크 기초", en: "Networking" },
  { ko: "모바일 솔루션", en: "Mobile Solutions" },
  { ko: "케이블링·도면", en: "Cabling & Drawings" },
  { ko: "SI 상품구성", en: "SI Product Mix" },
  { ko: "VMS 설계", en: "VMS Design" },
  { ko: "암호화", en: "Cryptography" },
  { ko: "SI 견적산출", en: "SI Estimation" },
  { ko: "SI 설계요소", en: "SI Design" },
  { ko: "카드 구조", en: "Card Architecture" },
  { ko: "출입통제 교육", en: "Access Control" },
  { ko: "신규입사자 OJT", en: "New-hire OJT" },
];

const PROCESS = [
  { ko: "마케팅", en: "Marketing", sub: "Campaigns · Events" },
  { ko: "인사이드 세일즈", en: "Inside Sales", sub: "Nurturing · CRM" },
  { ko: "필드 세일즈", en: "Field Sales", sub: "Proposal · Bid" },
  { ko: "고객 성공", en: "Customer Success", sub: "Renewal · Support" },
];

const EXTRA = [
  {
    ko_t: "지식 공유 · 강연", en_t: "Knowledge Sharing & Talks",
    ko_d: "ISEC 2020 국제 보안 컨퍼런스에서 «모바일 출입카드를 활용한 비대면 출입관리» 발표.",
    en_d: "Spoke at ISEC 2020 on contactless access management with mobile credentials.",
    tags: ["ISEC 2020", "Speaker"],
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M3 11a4 4 0 014-4h2l5-3v16l-5-3H7a4 4 0 01-4-4z" /><path d="M18 8a5 5 0 010 8" />
      </svg>
    ),
  },
  {
    ko_t: "자기계발", en_t: "Continuous Growth",
    ko_d: "«스마트폰을 인증수단으로 활용한 출입제어시스템 설계»로 석사학위 취득, CISSP 등 지속 학습.",
    en_d: "M.S. thesis on smartphone-credential access control; keeps current via CISSP and beyond.",
    tags: ["M.S. Thesis", "CISSP"],
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M22 10L12 5 2 10l10 5 10-5z" /><path d="M6 12v5c0 1 2.7 3 6 3s6-2 6-3v-5" />
      </svg>
    ),
  },
];

/* ---- Part B: AI vibe-coding ---- */
const AI = [
  {
    ko_t: "바이브코딩 CRM", en_t: "Vibe-Coded CRM",
    ko_d: "AI 페어코딩으로 영업 현장에 맞춘 CRM을 직접 설계·구현. 요구사항을 곧장 코드로 옮깁니다.",
    en_d: "Designed and shipped a sales-fit CRM via AI pair-coding — requirements straight into code.",
    tags: ["AI Pair-Coding", "CRM", "Full-stack"],
    icon: (
      <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="4" width="18" height="14" rx="2" /><path d="M8 9l-2 2 2 2M16 9l2 2-2 2M13 8l-2 6" />
      </svg>
    ),
  },
  {
    ko_t: "자동 상품등록 시스템", en_t: "Auto Product-Listing System",
    ko_d: "상품 등록·관리를 자동화하는 시스템을 개발해 반복 입력을 제거하고 등록 속도를 끌어올렸습니다.",
    en_d: "Built a system that automates product registration — removing repetitive entry and speeding listings.",
    tags: ["Automation", "AI Agents", "Ops"],
    icon: (
      <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /><path d="M14 17.5h7M17.5 14v7" />
      </svg>
    ),
  },
  {
    ko_t: "업무 자동화 에이전트", en_t: "Workflow Automation Agents",
    ko_d: "반복 업무를 AI 에이전트·스크립트로 자동화해 팀의 운영 리드타임을 줄입니다.",
    en_d: "Automates repetitive workflows with AI agents and scripts, cutting operational lead time.",
    tags: ["AI Agents", "Scripting"],
    icon: (
      <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="3" /><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1" />
      </svg>
    ),
  },
  {
    ko_t: "데이터 대시보드 · 내부 툴", en_t: "Dashboards & Internal Tools",
    ko_d: "실적·운영 데이터를 시각화하는 대시보드와 내부 툴을 만들어 의사결정을 빠르게 합니다.",
    en_d: "Creates dashboards and internal tools that visualize performance/ops data for faster decisions.",
    tags: ["Dashboards", "Data Viz"],
    icon: (
      <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M9 21V9" />
      </svg>
    ),
  },
];

/* ---- Part C: press contributions ---- */
const ARTICLES = [
  {
    outlet_ko: "보안뉴스", outlet_en: "Boannews", date: "2025.07",
    ko_t: "데이터센터 보안의 완성 — AI·생체인증 기반 6단계 통합 방어 전략",
    en_t: "Completing Data-Center Security — a 6-stage AI & biometric defense strategy",
    ko_d: "물리보안 사고가 전체 데이터 유출의 10%를 차지한다는 문제의식에서, 외곽보안·생체인증 출입통제·AI 영상감시·이상행동 탐지·방문자 관리·환경 모니터링을 하나로 묶는 6단계 통합 방어를 제안.",
    en_d: "Physical incidents cause ~10% of data breaches; lays out a 6-layer defense uniting perimeter, biometric access, AI video, anomaly detection, visitor and environmental management.",
    href: "https://www.boannews.com/media/view.asp?idx=138415&page=2&kind=6",
  },
  {
    outlet_ko: "뉴스룸", outlet_en: "Newsroom", date: "2025.08",
    ko_t: "AI와 생체인증 기반 데이터센터 6단계 통합 방어",
    en_t: "AI & biometric-based 6-stage integrated defense for data centers",
    ko_d: "개별 솔루션을 따로 두지 않고 통합했을 때 비로소 완성되는 데이터센터 보안 — 무단 출입 차단과 실시간 이상행동 탐지를 아우르는 보안 생태계 관점을 제시.",
    en_d: "Data-center security is complete only when solutions are integrated — a security-ecosystem view spanning access prevention and real-time anomaly detection.",
    href: "https://supremainc.com/ko/about/news-detail.asp?iBOARD_CONT_NO=7736&iPage=3&News_Type=Articles&",
  },
];

/* CAGR bar chart (SVG) */
function CagrChart() {
  const W = 420, H = 230, base = 196, top = 28, bw = 64;
  const gap = (W - bw * 3) / 4;
  const x = (i: number) => gap + i * (bw + gap);
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="cagr-svg" role="img" aria-label="Team revenue growth (CAGR)">
      <defs>
        <linearGradient id="barG" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor="var(--accent-2)" />
          <stop offset="1" stopColor="var(--accent)" />
        </linearGradient>
      </defs>
      {/* baseline */}
      <line x1="0" y1={base} x2={W} y2={base} stroke="var(--border-subtle)" />
      {CAGR_BARS.map((b, i) => {
        const h = (base - top) * b.h;
        const y = base - h;
        return (
          <g key={b.year}>
            <rect x={x(i)} y={y} width={bw} height={h} rx="6" fill="url(#barG)" opacity={0.55 + i * 0.22} />
            <text x={x(i) + bw / 2} y={base + 20} textAnchor="middle" className="cagr-year">{b.year}</text>
          </g>
        );
      })}
      {/* YoY growth arrows */}
      {CAGR_STEPS.map((s, i) => {
        const cx = (x(i) + bw + x(i + 1)) / 2;
        return (
          <text key={s} x={cx} y={top + 6} textAnchor="middle" className="cagr-step">{s}</text>
        );
      })}
    </svg>
  );
}

export function Growth() {
  const { t } = useLang();
  return (
    <section id="growth" className="section growth-section">
      <div className="container">
        <SectionHeading
          no="07 / GROWTH"
          eyebrowKo="Leadership & Growth" eyebrowEn="팀빌딩 · 자기계발 · AI"
          titleKo={<span>사람과 조직을 키우고,<br /><span className="text-grad">AI로 직접 만든다</span></span>}
          titleEn={<span>Growing people & teams —<br /><span className="text-grad">and now building with AI</span></span>}
          descKo="팀을 세우고 프로세스를 혁신해 온 리더십에, 이제 AI로 직접 코드를 짜는 빌더의 역량을 더합니다."
          descEn="A leader who builds teams and reinvents process — now also a builder who ships code with AI."
        />

        {/* Leadership data-viz */}
        <div className="lead-grid">
          <Reveal>
            <div className="lead-card glass">
              <div className="lead-card-head">
                <h3 className="h3">{t("팀 매출 성장", "Team Revenue Growth")}</h3>
                <span className="chip accent">CAGR 40%+</span>
              </div>
              <CagrChart />
              <p className="lead-note">
                {t(
                  "SI 전문팀(팀원 6) 신설·운영, 영업지원팀장 겸직. 국가기관 대형사업 제안 TF 구성.",
                  "Founded & led an SI specialist team (6) with a concurrent sales-enablement lead role; ran a bid TF for large public projects."
                )}
              </p>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="lead-card glass">
              <div className="lead-card-head">
                <h3 className="h3">{t("팀 기술교육 커리큘럼", "In-team Training Curriculum")}</h3>
                <span className="chip">12 {t("모듈", "modules")}</span>
              </div>
              <ol className="train-grid">
                {TRAINING.map((it, i) => (
                  <li key={it.en}>
                    <span className="train-no">{String(i + 1).padStart(2, "0")}</span>
                    {t(it.ko, it.en)}
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>
        </div>

        {/* Inside sales process */}
        <Reveal>
          <div className="lead-process glass">
            <div className="lead-card-head">
              <h3 className="h3">{t("인사이드 세일즈 프로세스 혁신", "Inside-Sales Process Innovation")}</h3>
              <div className="lead-proc-tags">
                <span className="chip accent">CRM</span><span className="chip">PowerBI</span><span className="chip">Sales ERP</span>
              </div>
            </div>
            <div className="proc-flow">
              {PROCESS.map((p, i) => (
                <div className="proc-step" key={p.en}>
                  <div className="proc-num">{i + 1}</div>
                  <div className="proc-body">
                    <div className="proc-title">{t(p.ko, p.en)}</div>
                    <div className="proc-sub">{p.sub}</div>
                  </div>
                  {i < PROCESS.length - 1 ? <span className="proc-arrow">→</span> : null}
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Speaking + self-development */}
        <div className="lead-extra-grid">
          {EXTRA.map((c, i) => (
            <Reveal key={c.en_t} delay={i * 90}>
              <div className="growth-card glass">
                <div className="growth-icon">{c.icon}</div>
                <h3 className="h3 growth-title">{t(c.ko_t, c.en_t)}</h3>
                <p className="growth-desc">{t(c.ko_d, c.en_d)}</p>
                <div className="growth-tags">
                  {c.tags.map((tag) => <span key={tag} className="chip">{tag}</span>)}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* AI vibe coding */}
        <div className="growth-subhead">
          <span className="chip accent"><span className="chip-dot" /> {t("새로운 역량", "New capability")}</span>
          <h3 className="h3">{t("AI로 짓는다 · 바이브코딩", "Building with AI · Vibe Coding")}</h3>
          <p className="subtle" style={{ margin: 0, fontSize: 15 }}>
            {t(
              "기획·영업의 언어를 곧장 동작하는 소프트웨어로 옮기는, AI 시대의 빌더.",
              "An AI-era builder who turns the language of product & sales straight into working software.",
            )}
          </p>
        </div>

        <div className="growth-grid">
          {AI.map((c, i) => (
            <Reveal key={c.en_t} delay={i * 80}>
              <div className="growth-card glass ai">
                <span className="growth-ai-badge">AI</span>
                <div className="growth-icon">{c.icon}</div>
                <h3 className="h3 growth-title">{t(c.ko_t, c.en_t)}</h3>
                <p className="growth-desc">{t(c.ko_d, c.en_d)}</p>
                <div className="growth-tags">
                  {c.tags.map((tag) => <span key={tag} className="chip">{tag}</span>)}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Press contributions */}
        <div className="articles-block">
          <div className="articles-head">
            <span className="chip accent"><span className="chip-dot" /> {t("기고", "Bylined")}</span>
            <h3 className="h3">{t("보안 매체 기고", "Security Media Contributions")}</h3>
            <span className="muted" style={{ fontSize: 13.5 }}>
              {t("보안뉴스 등 매체에 데이터센터·물리보안·모바일 출입을 주제로 다수 기고.", "Frequent contributor on data-center, physical security and mobile access to outlets such as Boannews.")}
            </span>
          </div>
          <div className="articles-grid">
            {ARTICLES.map((a) => (
              <Reveal key={a.href}>
                <a className="article-card glass" href={a.href} target="_blank" rel="noopener noreferrer">
                  <div className="article-meta">
                    <span>{t(a.outlet_ko, a.outlet_en)}</span><span className="muted">· {a.date}</span>
                  </div>
                  <h4 className="article-title">{t(a.ko_t, a.en_t)}</h4>
                  <p className="article-summary">{t(a.ko_d, a.en_d)}</p>
                  <span className="article-link">{t("원문 보기", "Read article")} <span className="arrow">→</span></span>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
