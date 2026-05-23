import { Reveal, SectionHeading, CountUp } from "@/components/common/common";
import { useLang } from "@/i18n/LanguageProvider";

const STATS = [
  { num: 20, suffix: "+", ko: "년 경력", en: "years of experience" },
  { num: 300, suffix: "억+", ko: "원 규모 SI 수주", en: "KRW won in SI deals" },
  { num: 28, suffix: "", ko: "개소 글로벌 사이트", en: "global sites operated" },
  { num: 40, suffix: "%+", ko: "팀 매출 CAGR", en: "team revenue CAGR" },
  { num: 5, suffix: "", ko: "전문 자격", en: "professional certs" },
];

export function Impact() {
  const { t } = useLang();
  return (
    <section id="impact" className="section impact-section">
      <div className="container">
        <SectionHeading
          no="05 / IMPACT"
          eyebrowKo="Impact" eyebrowEn="성과"
          titleKo={<span>숫자로 보는 <span className="text-grad">20년</span></span>}
          titleEn={<span>Twenty years, <span className="text-grad">in numbers</span></span>}
          descKo="모든 수치는 NDA 준수를 위해 라운딩된 안전 값입니다."
          descEn="All figures are conservatively rounded for NDA compliance."
        />
        <div className="impact-grid">
          {STATS.map((s, i) => (
            <Reveal key={i} delay={i * 80}>
              <div className="impact-card glass">
                <div className="impact-num"><CountUp to={s.num} suffix={s.suffix} /></div>
                <div className="impact-lbl">{t(s.ko, s.en)}</div>
                <div className="impact-corner">0{i + 1}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
