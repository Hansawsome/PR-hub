import { Reveal, SectionHeading } from "@/components/common/common";
import { useLang } from "@/i18n/LanguageProvider";

const ITEMS = [
  {
    no: "01", ko_t: "통합 보안 설계", en_t: "Integrated Security Design",
    ko_d: "Smart Building 트렌드를 반영한 통합 보안 설계.",
    en_d: "Integrated security design aligned with the Smart Building era.",
    icon: (
      <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.4">
        <path d="M3 21h18M5 21V8l7-5 7 5v13" /><path d="M9 13h2M13 13h2M9 17h2M13 17h2" />
      </svg>
    ),
  },
  {
    no: "02", ko_t: "O2O ID 통합", en_t: "O2O Identity & DID",
    ko_d: "Online–Offline ID 통합 및 DID 블록체인 응용.",
    en_d: "Unifying O2O identity, with DID/blockchain applications.",
    icon: (
      <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.4">
        <circle cx="8" cy="12" r="5" /><circle cx="16" cy="12" r="5" />
      </svg>
    ),
  },
  {
    no: "03", ko_t: "응용개발 · SDK · API", en_t: "App Dev · SDK · API",
    ko_d: "통합 시스템을 위한 Integration·API 설계.",
    en_d: "Integration & API design for unified systems.",
    icon: (
      <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.4">
        <path d="M8 6l-6 6 6 6M16 6l6 6-6 6M14 4l-4 16" />
      </svg>
    ),
  },
  {
    no: "04", ko_t: "무인화 전략", en_t: "Unmanned Operations",
    ko_d: "얼굴인식·모바일 크레덴셜 기반 비대면·무인 출입.",
    en_d: "Contactless / unmanned access via face & mobile credentials.",
    icon: (
      <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.4">
        <circle cx="12" cy="9" r="4" /><path d="M4 20c1-4 5-6 8-6s7 2 8 6" /><path d="M3 3l3 3M21 3l-3 3M3 21l3-3M21 21l-3-3" />
      </svg>
    ),
  },
];

export function Vision() {
  const { t } = useLang();
  return (
    <section id="vision" className="section vision-section">
      <div className="vision-glow" aria-hidden="true" />
      <div className="container">
        <SectionHeading
          no="06 / VISION"
          eyebrowKo="Vision" eyebrowEn="미래지향 SI 방향성"
          titleKo={<span>4차 산업혁명 첨단기술 기반의<br /><span className="text-grad">시스템 통합</span></span>}
          titleEn={<span>Systems integration powered by<br /><span className="text-grad">frontier technology</span></span>}
        />
        <div className="vision-grid">
          {ITEMS.map((v, i) => (
            <Reveal key={v.no} delay={i * 90}>
              <div className="vision-card glass">
                <div className="vision-top">
                  <div className="vision-icon">{v.icon}</div>
                  <span className="vision-no">{v.no}</span>
                </div>
                <h3 className="h3 vision-title">{t(v.ko_t, v.en_t)}</h3>
                <p className="vision-desc">{t(v.ko_d, v.en_d)}</p>
                <div className="vision-line" />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
