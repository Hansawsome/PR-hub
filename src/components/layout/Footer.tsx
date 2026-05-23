import { Logo } from "@/components/common/common";
import { useLang } from "@/i18n/LanguageProvider";

export function Footer() {
  const { t } = useLang();
  return (
    <footer className="site-footer">
      <div className="container footer-row">
        <div className="footer-left">
          <Logo />
          <span className="muted" style={{ fontSize: 13, marginLeft: 18 }}>© 2026 Hans. All rights reserved.</span>
        </div>
        <div className="footer-right">
          <a href="#top" className="back-top">{t("맨위로", "Top")} ↑</a>
        </div>
      </div>
    </footer>
  );
}
