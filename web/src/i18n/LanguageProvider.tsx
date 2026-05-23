import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "ko" | "en";

type LangContext = {
  lang: Lang;
  setLang: (l: Lang) => void;
  /** pick a value by current language */
  t: <T>(ko: T, en: T) => T;
};

const Ctx = createContext<LangContext | null>(null);

const STORAGE_KEY = "hans-lang";

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    if (typeof window === "undefined") return "ko";
    const saved = window.localStorage.getItem(STORAGE_KEY);
    return saved === "en" ? "en" : "ko";
  });

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, lang);
    document.documentElement.lang = lang;
  }, [lang]);

  const value: LangContext = {
    lang,
    setLang: setLangState,
    t: (ko, en) => (lang === "ko" ? ko : en),
  };

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useLang(): LangContext {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useLang must be used within LanguageProvider");
  return ctx;
}
