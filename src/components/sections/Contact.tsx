import { useState } from "react";
import { SectionHeading } from "@/components/common/common";
import { useLang } from "@/i18n/LanguageProvider";

const EMAIL = "kidsland@kakao.com";

export function Contact() {
  const { t } = useLang();
  const [form, setForm] = useState({ name: "", email: "", message: "", hp: "" });
  const [sent, setSent] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.hp) return; // honeypot
    const subject = encodeURIComponent(`[Hans 홈페이지] ${form.name}님 문의`);
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`);
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <section id="contact" className="section contact-section">
      <div className="container contact-grid">
        <div>
          <SectionHeading
            no="08 / CONTACT"
            eyebrowKo="Contact" eyebrowEn="문의"
            titleKo={<span>함께 만들 보안의<br /><span className="text-grad">다음 단계</span>를 이야기해요.</span>}
            titleEn={<span>Let's talk about<br /><span className="text-grad">what's next</span> in security.</span>}
          />
          <div className="contact-channels">
            <a href={`mailto:${EMAIL}`} className="contact-channel glass">
              <div>
                <div className="contact-channel-lbl">{t("이메일", "Email")}</div>
                <div className="contact-channel-val">{EMAIL}</div>
              </div>
              <span className="arrow">→</span>
            </a>
            <a href="https://www.linkedin.com/in/sunghyoukhan/" target="_blank" rel="noopener noreferrer" className="contact-channel glass">
              <div>
                <div className="contact-channel-lbl">LinkedIn</div>
                <div className="contact-channel-val">in/sunghyoukhan</div>
              </div>
              <span className="arrow">→</span>
            </a>
          </div>
        </div>

        <form className="contact-form glass" onSubmit={onSubmit}>
          <div className="form-row">
            <label>
              <span className="form-lbl">{t("이름", "Name")}</span>
              <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder={t("홍길동", "Your name")} required />
            </label>
            <label>
              <span className="form-lbl">{t("이메일", "Email")}</span>
              <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@company.com" required />
            </label>
          </div>
          <label>
            <span className="form-lbl">{t("메시지", "Message")}</span>
            <textarea rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
              placeholder={t("프로젝트 / 협업 / 컨퍼런스 등 자유롭게 적어주세요.", "Tell me about your project or proposal.")} required />
          </label>
          <input type="text" tabIndex={-1} autoComplete="off" value={form.hp}
            onChange={(e) => setForm({ ...form, hp: e.target.value })}
            style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }} aria-hidden="true" />
          <div className="form-foot">
            <span className="muted" style={{ fontSize: 12 }}>{t("제출 시 메일 클라이언트가 열립니다.", "Submitting opens your mail client.")}</span>
            <button type="submit" className="btn btn-primary">
              {sent ? t("보냈습니다", "Sent") : t("보내기", "Send")} <span className="arrow">→</span>
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
