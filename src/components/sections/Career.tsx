import { Reveal, SectionHeading } from "@/components/common/common";
import { useLang } from "@/i18n/LanguageProvider";

const ACTS = [
  {
    no: "ACT I", years: "2006 – 2007",
    ko_title: "세계로 나가 IT 인프라의 기본을 배우다",
    en_title: "First steps in global IT infrastructure",
    ko_role: "글로벌 IT 서비스 기업 · 인턴 (인도 근무)",
    en_role: "Global IT Services Firm · Intern (based in India)",
    ko_body: "네트워크 인프라 운영 L3, BCP/DRP 경험. 다국적 환경에서 운영·복구의 기본기와 글로벌 협업 감각을 익혔습니다.",
    en_body: "Network infrastructure operations (L3) and BCP/DRP exposure — building ops/recovery fundamentals and global collaboration sense.",
    tags: ["Network L3", "BCP / DRP", "Global Ops"],
    side: "left",
  },
  {
    no: "ACT II", years: "2008 – 2015",
    ko_title: "현장을 설계하고, 세계를 영업하다",
    en_title: "Designed the site, sold to the world",
    ko_role: "국내 대형 물리보안 기업 · 솔루션팀 PM → 글로벌어카운트 영업",
    en_role: "Major Korean Physical-Security Firm · Solutions PM → Global Accounts Sales",
    ko_body: "통합보안 구축 PM으로 국가 주요기관 다수의 대규모 프로젝트를 수행한 뒤, 글로벌어카운트 영업으로 이동해 글로벌 투자은행 외투법인 28개소를 운영했습니다.",
    en_body: "Led integrated-security builds for several national critical facilities as PM, then moved into Global Accounts Sales — operating 28 sites for global investment-bank subsidiaries.",
    tags: ["통합보안 PM", "Global IB Accounts", "28 Sites"],
    side: "right",
  },
  {
    no: "ACT III", years: "2015 – 현재",
    ko_title: "모바일과 얼굴인식으로, 출입의 미래를 만들다",
    en_title: "Building the future of access with mobile & face",
    ko_role: "글로벌 생체인식 보안기업 · Enterprise 사업팀장 (팀원 6) · 영업지원팀장 겸직",
    en_role: "Global Biometric Security Firm · Enterprise Team Lead (6) · Sales Enablement Lead",
    ko_body: "모바일출입카드·얼굴인식·O2O SI를 주도. 팀 매출 CAGR 40%+, 대기업·정부·금융권 핵심 레퍼런스를 다수 확보했습니다.",
    en_body: "Driving mobile credentials, face recognition and O2O SI. Team revenue CAGR 40%+, with marquee references across enterprise, public and financial sectors.",
    tags: ["Mobile Credential", "Face Recognition", "CAGR 40%+"],
    side: "left",
    current: true,
  },
];

export function Career() {
  const { t } = useLang();
  return (
    <section id="career" className="section">
      <div className="container">
        <SectionHeading
          no="02 / CAREER"
          eyebrowKo="Career Journey" eyebrowEn="여정"
          titleKo={<span>인프라에서 영업으로,<br />그리고 <span className="text-grad">융합 보안</span>으로</span>}
          titleEn={<span>From infra to sales,<br />onward to <span className="text-grad">convergence security</span></span>}
          descKo="세 개의 막으로 정리한 20년." descEn="Twenty years told in three acts."
        />

        <div className="timeline">
          <div className="timeline-rail" aria-hidden="true" />
          {ACTS.map((act, idx) => (
            <Reveal key={act.no} delay={idx * 80} className={`timeline-node ${act.side}`}>
              <div className={`timeline-card glass ${act.current ? "current" : ""}`}>
                <div className="timeline-top">
                  <span className="timeline-no">{act.no}</span>
                  <span className="timeline-years font-mono">{act.years}</span>
                  {act.current ? <span className="chip accent"><span className="chip-dot" /> {t("현재", "Current")}</span> : null}
                </div>
                <h3 className="h3 timeline-title">{t(act.ko_title, act.en_title)}</h3>
                <div className="timeline-role">{t(act.ko_role, act.en_role)}</div>
                <p className="timeline-body">{t(act.ko_body, act.en_body)}</p>
                <div className="timeline-tags">
                  {act.tags.map((tag) => <span key={tag} className="chip">{tag}</span>)}
                </div>
              </div>
              <div className="timeline-dot" aria-hidden="true"><div className="timeline-dot-inner" /></div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
