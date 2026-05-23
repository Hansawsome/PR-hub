import { Reveal, SectionHeading } from "@/components/common/common";
import { useLang } from "@/i18n/LanguageProvider";

const GROUPS = [
  {
    no: "G1", ko_t: "통합 물리보안 솔루션", en_t: "Integrated Physical Security",
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.6">
        <rect x="3" y="11" width="18" height="9" rx="2" /><path d="M7 11V7a5 5 0 0110 0v4" />
      </svg>
    ),
    items: [
      { ko_k: "차량통제", en_k: "Vehicle", v: "LPR · Bollard · Tire Killer" },
      { ko_k: "출입통제", en_k: "Access", v: "Biometric · Card · Mobile" },
      { ko_k: "영상감시", en_k: "Video", v: "VMS · Video Analytics" },
      { ko_k: "침입감지", en_k: "Intrusion", v: "PIDS · Microwave" },
      { ko_k: "사전검색", en_k: "Screening", v: "X-Ray · Walk-through" },
    ],
  },
  {
    no: "G2", ko_t: "보안 설계 역량", en_t: "Security Design",
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M3 3h7v7H3zM14 3h7v4h-7zM14 11h7v10h-7zM3 14h7v7H3z" />
      </svg>
    ),
    items: [
      { ko_k: "권한 등급", en_k: "Access Grade", v: "Access Grade Architecture" },
      { ko_k: "보안 동선", en_k: "Secure Flow", v: "Secure Flow / Pathing" },
      { ko_k: "이중화", en_k: "Redundancy", v: "Redundancy & HA" },
      { ko_k: "CEPTED", en_k: "CEPTED", v: "Crime Prevention Design" },
      { ko_k: "암호화", en_k: "Crypto", v: "TLS · AES · PKI" },
    ],
  },
  {
    no: "G3", ko_t: "차세대 · 융합 기술", en_t: "Next-Gen & Convergence", highlight: true,
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.6">
        <rect x="6" y="2" width="12" height="20" rx="2" /><circle cx="12" cy="18" r="1" /><path d="M9 6h6" />
      </svg>
    ),
    items: [
      { ko_k: "Mobile Credential", en_k: "Mobile Credential", v: "BLE · NFC · iOS NFC" },
      { ko_k: "Face Recognition", en_k: "Face Recognition", v: "Walk-through · Templates" },
      { ko_k: "O2O ID", en_k: "O2O ID", v: "Online ↔ Offline" },
      { ko_k: "App Dev", en_k: "App Dev", v: "SDK · API Integration" },
      { ko_k: "ESG · 무인화", en_k: "ESG · Unmanned", v: "Energy · Unattended Ops" },
    ],
  },
];

export function Expertise() {
  const { t } = useLang();
  return (
    <section id="expertise" className="section">
      <div className="container">
        <SectionHeading
          no="04 / EXPERTISE"
          eyebrowKo="Expertise" eyebrowEn="기술 역량"
          titleKo={<span>물리보안의 깊이,<br /><span className="text-grad">융합의 폭</span>까지</span>}
          titleEn={<span>Depth in physical security,<br /><span className="text-grad">breadth in convergence</span></span>}
        />
        <div className="expertise-grid">
          {GROUPS.map((g, gi) => (
            <Reveal key={g.no} delay={gi * 100}>
              <div className={`expertise-card glass ${g.highlight ? "highlight" : ""}`}>
                <div className="expertise-head">
                  <div className="expertise-icon">{g.icon}</div>
                  <span className="sec-no">{g.no}</span>
                </div>
                <h3 className="h3 expertise-title">{t(g.ko_t, g.en_t)}</h3>
                <ul className="expertise-list">
                  {g.items.map((it) => (
                    <li key={it.en_k}>
                      <span className="exp-k">{t(it.ko_k, it.en_k)}</span>
                      <span className="exp-v font-mono">{it.v}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
