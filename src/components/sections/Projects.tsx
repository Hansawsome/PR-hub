import { useState } from "react";
import { Reveal, SectionHeading } from "@/components/common/common";
import { useLang } from "@/i18n/LanguageProvider";

type Project = {
  id: number;
  cat: "PM" | "Sales";
  ko_cat: string; en_cat: string;
  ko_client: string; en_client: string;
  ko_role: string; en_role: string;
  scale: string; en_scale: string;
  tags: string[];
  ko_outcome: string; en_outcome: string;
  ko_title: string; en_title: string;
  featured?: boolean;
};

const PROJECTS: Project[] = [
  {
    id: 1, cat: "PM", ko_cat: "PM", en_cat: "PM",
    ko_client: "국가 주요기관", en_client: "National Critical Facility",
    ko_role: "PM", en_role: "PM", scale: "약 9억원 규모", en_scale: "≈ KRW 0.9B",
    tags: ["IP 영상화 첫 도입", "RGB Matrix 종합상황실", "PIDS"],
    ko_outcome: "아날로그 CCTV를 IP 기반으로 전환한 대형 통합 프로젝트.",
    en_outcome: "Migrated legacy analog CCTV to IP across a flagship integrated build.",
    ko_title: "국가 주요기관 외곽 감시 통합 구축",
    en_title: "National facility · Perimeter surveillance integration",
  },
  {
    id: 2, cat: "PM", ko_cat: "PM", en_cat: "PM",
    ko_client: "국가정보기관", en_client: "National Intelligence Agency",
    ko_role: "PM", en_role: "PM", scale: "약 14억원 규모", en_scale: "≈ KRW 1.4B",
    tags: ["LPR", "볼라드·타이어킬러", "외곽침입감지", "System Integration"],
    ko_outcome: "차량 테러 방어부터 출입통제까지 다계층 보안 설계.",
    en_outcome: "Multi-layered security from anti-VBIED to access control.",
    ko_title: "국가정보기관 출입통제·대테러 시스템",
    en_title: "Intelligence agency · Access & counter-terror systems",
  },
  {
    id: 3, cat: "Sales", ko_cat: "Sales", en_cat: "Sales",
    ko_client: "대형 IT 플랫폼 본사 (판교)", en_client: "Major IT Platform HQ (Pangyo)",
    ko_role: "Sales · 설계", en_role: "Sales · Design", scale: "약 20억원 규모", en_scale: "≈ KRW 2.0B",
    tags: ["모바일출입카드", "얼굴인식", "스피드게이트", "LDAP 연동"],
    ko_outcome: "5,000명 규모 캠퍼스의 모바일·얼굴인식 통합.",
    en_outcome: "Mobile + face recognition for a 5,000-employee campus.",
    ko_title: "대형 IT 플랫폼 본사 출입통제",
    en_title: "IT platform HQ · Access control", featured: true,
  },
  {
    id: 4, cat: "Sales", ko_cat: "Sales", en_cat: "Sales",
    ko_client: "글로벌 완성차 그룹", en_client: "Global Automotive Group",
    ko_role: "Sales · 설계", en_role: "Sales · Design", scale: "약 14억원 규모", en_scale: "≈ KRW 1.4B",
    tags: ["iOS NFC (ISO7816)", "타사 S/W Integration", "Wiegand"],
    ko_outcome: "여의도 1.5배 연구소에 iOS NFC 모바일 출입 도입.",
    en_outcome: "Brought iOS-NFC mobile access to a research campus 1.5× Yeouido.",
    ko_title: "글로벌 완성차 R&D · 모바일 출입",
    en_title: "Automotive R&D · Mobile access",
  },
  {
    id: 5, cat: "Sales", ko_cat: "Sales", en_cat: "Sales",
    ko_client: "국내 최대 로펌", en_client: "Korea's Largest Law Firm",
    ko_role: "Sales · 설계", en_role: "Sales · Design", scale: "약 9억원 규모", en_scale: "≈ KRW 0.9B",
    tags: ["BLE · NFC", "PKI", "클라우드 발급"],
    ko_outcome: "BLE·NFC 기반 모바일 사원증의 국내 초기 레퍼런스.",
    en_outcome: "Early Korean reference for BLE/NFC mobile employee badges.",
    ko_title: "국내 최대 로펌 · 모바일출입카드 최초 도입",
    en_title: "Top law firm · First mobile credential",
  },
  {
    id: 6, cat: "Sales", ko_cat: "Sales", en_cat: "Sales",
    ko_client: "정부 종합청사", en_client: "Government Complex",
    ko_role: "Sales · 설계", en_role: "Sales · Design", scale: "약 28억원 규모", en_scale: "≈ KRW 2.8B",
    tags: ["모바일공무원증 BLE", "얼굴인식 워크스루", "스피드게이트"],
    ko_outcome: "BLE 사전 얼굴 템플릿 로드로 워크스루 출입 구현.",
    en_outcome: "BLE-prefetched face templates enabling walk-through access.",
    ko_title: "정부 종합청사 모바일공무원증 출입",
    en_title: "Government complex · Mobile civil-servant ID", featured: true,
  },
  {
    id: 7, cat: "Sales", ko_cat: "Global Sales", en_cat: "Global Sales",
    ko_client: "글로벌 투자은행 외투법인", en_client: "Global Investment Banks",
    ko_role: "Global Sales", en_role: "Global Sales", scale: "28개소 운영", en_scale: "28 sites operated",
    tags: ["Global Security Standard", "이중 보안", "유지보수"],
    ko_outcome: "글로벌 표준에 따른 금융권 보안 설계·운영.",
    en_outcome: "Designed & operated under global IB security standards.",
    ko_title: "글로벌 투자은행 외투법인 · 보안 표준 운영",
    en_title: "Global IB subsidiaries · Security standards",
  },
  {
    id: 8, cat: "Sales", ko_cat: "Sales", en_cat: "Sales",
    ko_client: "대형 시중은행", en_client: "Major Commercial Bank",
    ko_role: "Sales · 설계", en_role: "Sales · Design", scale: "본사 + 지점", en_scale: "HQ + branches",
    tags: ["딥러닝 얼굴인식", "O2O ID 일원화", "워크스루"],
    ko_outcome: "온·오프라인 ID를 하나로 잇는 얼굴인식 출입.",
    en_outcome: "Unifying online & offline ID via face-based access.",
    ko_title: "대형 시중은행 · 얼굴인식 O2O",
    en_title: "Commercial bank · Face-O2O access",
  },
];

export function Projects() {
  const { t } = useLang();
  const [filter, setFilter] = useState<"All" | "PM" | "Sales" | "Mobile">("All");
  const filters = [
    { k: "All" as const, ko: "전체", en: "All" },
    { k: "PM" as const, ko: "PM", en: "PM" },
    { k: "Sales" as const, ko: "Sales", en: "Sales" },
    { k: "Mobile" as const, ko: "모바일·얼굴", en: "Mobile · Face" },
  ];
  const filtered = PROJECTS.filter((p) => {
    if (filter === "All") return true;
    if (filter === "Mobile") return p.tags.some((tag) => /mobile|모바일|얼굴|face|nfc|ble/i.test(tag));
    return p.cat === filter;
  });

  return (
    <section id="projects" className="section">
      <div className="container">
        <SectionHeading
          no="03 / PROJECTS"
          eyebrowKo="Signature Projects" eyebrowEn="대표 프로젝트"
          titleKo={<span><span className="text-grad">익명화</span>된 실제 프로젝트 8선</span>}
          titleEn={<span>Eight <span className="text-grad">anonymized</span> signature projects</span>}
          descKo="고객사 정보 보호를 위해 산업군·등급으로 표기합니다. 금액은 라운딩된 규모감입니다."
          descEn="Clients are anonymized by industry/grade per NDA. Figures are rounded scale indicators."
        />

        <div className="proj-filters">
          {filters.map((f) => (
            <button key={f.k} className={`proj-filter ${filter === f.k ? "active" : ""}`} onClick={() => setFilter(f.k)}>
              {t(f.ko, f.en)}
            </button>
          ))}
          <span className="proj-count">{filtered.length} <span className="muted">/ {PROJECTS.length}</span></span>
        </div>

        <div className="proj-grid">
          {filtered.map((p, i) => (
            <Reveal key={p.id} delay={i * 60}>
              <article className={`proj-card glass ${p.featured ? "featured" : ""}`}>
                <div className="proj-card-top">
                  <span className="sec-no">PROJECT · 0{p.id}</span>
                  <span className={`chip ${p.cat === "PM" ? "accent" : ""}`}>{t(p.ko_cat, p.en_cat)}</span>
                </div>
                <div className="proj-client">{t(p.ko_client, p.en_client)}</div>
                <h3 className="h3 proj-title">{t(p.ko_title, p.en_title)}</h3>
                <p className="proj-outcome">{t(p.ko_outcome, p.en_outcome)}</p>
                <div className="proj-tags">
                  {p.tags.map((tag) => <span key={tag} className="chip">{tag}</span>)}
                </div>
                <div className="proj-foot">
                  <div className="proj-foot-cell">
                    <div className="proj-foot-lbl">{t("역할", "Role")}</div>
                    <div className="proj-foot-val">{t(p.ko_role, p.en_role)}</div>
                  </div>
                  <div className="proj-foot-cell">
                    <div className="proj-foot-lbl">{t("규모", "Scale")}</div>
                    <div className="proj-foot-val accent-num">{t(p.scale, p.en_scale)}</div>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <div className="proj-note">
          <span className="sec-no">※ NDA</span>
          <span className="muted" style={{ marginLeft: 12, fontSize: 13 }}>
            {t(
              "전체 고객사명·기관명·정확한 금액은 비공개입니다. 산업군/등급으로 표기하며 금액은 라운딩된 규모입니다.",
              "Full client names and exact figures are not disclosed. Industry / grade only; figures rounded."
            )}
          </span>
        </div>
      </div>
    </section>
  );
}
