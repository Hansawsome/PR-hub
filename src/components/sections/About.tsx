import { Reveal, SectionHeading, ProfilePortrait } from "@/components/common/common";
import { useLang } from "@/i18n/LanguageProvider";

const STRENGTHS = [
  {
    tag: "01",
    ko_t: "PM × Sales 융합", en_t: "PM × Sales",
    ko_d: "설계 현장과 수주 영업을 모두 책임진 흔치 않은 이력.",
    en_d: "A rare track record owning both delivery and the deal.",
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M3 7l9-4 9 4-9 4-9-4z" /><path d="M3 12l9 4 9-4" /><path d="M3 17l9 4 9-4" />
      </svg>
    ),
  },
  {
    tag: "02",
    ko_t: "시스템 통합 설계", en_t: "Systems Integration",
    ko_d: "출입통제·영상·침입감지·모바일을 하나로 엮는 Integration.",
    en_d: "Weaving access, video, intrusion & mobile into one.",
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.6">
        <circle cx="6" cy="6" r="2.5" /><circle cx="18" cy="6" r="2.5" /><circle cx="6" cy="18" r="2.5" />
        <circle cx="18" cy="18" r="2.5" /><circle cx="12" cy="12" r="2.5" /><path d="M6 6L12 12L18 6M6 18L12 12L18 18" />
      </svg>
    ),
  },
  {
    tag: "03",
    ko_t: "글로벌 역량", en_t: "Global Reach",
    ko_d: "글로벌 투자은행 외투법인 대상 영어 영업·표준 설계.",
    en_d: "English-language sales & standard design for global IB clients.",
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.6">
        <circle cx="12" cy="12" r="9" /><path d="M3 12h18" /><path d="M12 3a14 14 0 010 18M12 3a14 14 0 000 18" />
      </svg>
    ),
  },
];

const BADGES = [
  { k: "CISSP", g: "Security" },
  { k: "CCNA", g: "Network" },
  { k: "무선설비기사", g: "Wireless Eng." },
  { k: "정보처리기사", g: "Info-Proc Eng." },
  { k: "인터넷정보검색사 1급", g: "Info-Search L1" },
  { k: "숭실대 IT융합대학원 석사", g: "M.S. IT Convergence" },
];

export function About() {
  const { t } = useLang();
  return (
    <section id="about" className="section">
      <div className="container">
        <SectionHeading
          no="01 / ABOUT"
          eyebrowKo="About" eyebrowEn="소개"
          titleKo={<span>현장과 비즈니스를 잇는<br /><span className="text-grad">융합 보안 전문가</span></span>}
          titleEn={<span>A convergence security expert<br />bridging <span className="text-grad">delivery & business</span></span>}
        />

        <div className="about-grid about-grid-photo">
          <div className="about-intro">
            <Reveal>
              <p className="about-lead">
                {t(
                  "물리보안과 정보보안의 경계를 넘나들며, 대규모 통합 보안 시스템을 설계하고 수주해 온 20년 차 전문가입니다.",
                  "For 20+ years I've designed and won large-scale integrated security systems, working across the line between physical and cyber security."
                )}
              </p>
            </Reveal>
            <Reveal delay={120}>
              <p className="about-lead subtle" style={{ marginTop: 24 }}>
                {t(
                  "현장 PM과 글로벌 영업을 모두 경험했기에, ",
                  "Having served as both an on-site PM and a global sales lead, "
                )}
                <strong>
                  {t("고객의 언어로 기술을 설명하고 기술의 언어로 사업을 설계합니다.", "I explain technology in the customer's language and design business in the language of technology.")}
                </strong>
              </p>
            </Reveal>
            <Reveal delay={200}>
              <div className="quote-card">
                <div className="quote-mark">"</div>
                <div className="quote-text">
                  {t("설계는 약속이고, 영업은 신뢰다.", "Design is a promise; sales is trust.")}<br />
                  <span className="muted">{t("— 통합 보안 SI의 두 축", "— the two axes of integrated security SI")}</span>
                </div>
              </div>
            </Reveal>
            <Reveal delay={280}>
              <div className="cert-row cert-row-inline">
                <div className="cert-label">
                  <span className="sec-no">CERTIFICATIONS</span>
                  <span className="muted" style={{ fontSize: 13, marginLeft: 12 }}>{t("자격 · 학력", "Certs · Edu")}</span>
                </div>
                <div className="cert-list">
                  {BADGES.map((b) => (
                    <div key={b.k} className="cert-badge">
                      <span className="cert-k">{b.k}</span>
                      <span className="cert-g">{b.g}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          <div className="about-photo-col">
            <Reveal>
              <ProfilePortrait className="about-photo" />
            </Reveal>
            <div className="about-photo-name">
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 18 }}>한성혁 · Hans</div>
              <div className="muted font-mono" style={{ fontSize: 12, marginTop: 4 }}>Security Professional · ISEC Speaker</div>
            </div>
          </div>
        </div>

        <div className="about-strengths-row">
          {STRENGTHS.map((s, i) => (
            <Reveal key={s.tag} delay={i * 100}>
              <div className="strength-card glass">
                <div className="strength-top">
                  <div className="strength-icon">{s.icon}</div>
                  <span className="sec-no">{s.tag}</span>
                </div>
                <div className="strength-title">{t(s.ko_t, s.en_t)}</div>
                <p className="strength-desc">{t(s.ko_d, s.en_d)}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
