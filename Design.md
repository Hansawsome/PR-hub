# Design.md — Hans · Personal PR Homepage

> 한성혁(Hans) 개인 PR 홈페이지의 **디자인 영속성(Single Source of Truth)** 문서.
> 이 문서 하나로 Claude Design 프로토타이핑과 구현이 모두 가능하도록 자족적으로 작성됨.

---

## 0. 프로젝트 개요 (Brief)

| 항목 | 결정 |
|---|---|
| **목적** | 종합 퍼스널 브랜딩 (전문성 + 인사이트 + 네트워킹의 균형) |
| **타겟** | 채용 담당자·헤드헌터, 업계 동료, 컨퍼런스/협업 제안자 |
| **언어** | 한·영 토글 (KO / EN) — 기본값 KO |
| **개인정보** | 이메일 + 문의폼만 공개. **전화·주소·연봉·생년월일 비공개** |
| **고객사** | **전부 익명화** (산업군/등급으로 표기 — 아래 §6 매핑표 준수) |
| **톤** | 화려하고 다이내믹 · 전문적 · 미래지향적 |
| **스택** | React + Vite + TypeScript + Tailwind CSS + shadcn/ui |
| **베이스 CSS** | `npx getdesign@latest add hp` 토큰 위에 다크 테마 오버레이 |
| **3D/모션** | Spline 3D (Hero) · Framer Motion · Spotlight 마우스추적 |

### ⚠️ 보안/NDA 원칙 (최우선)
원본 PDF에는 모든 페이지에 **"외부 유출 금지"** disclaimer가 있다.
- **실제 고객사명·기관명·금액의 직접 노출 금지.** §6 매핑표대로 익명화한다.
- 시스템 구성도·망구성도 등 도면 이미지는 게시하지 않는다.
- 수주 금액은 "규모감"을 전달하되 익명 기관과 1:1 매칭이 추적되지 않도록 라운딩/범위 표기를 권장 (예: "약 20억원 규모").

---

## 1. 브랜드 & 로고

### 1.1 로고 — "Hans" 워드마크
- **콘셉트**: 보안 전문가 정체성을 담아, 알파벳 **H**를 모티프로 한 모노그램 + "Hans" 워드마크.
- **마크(아이콘)**: `H`의 두 기둥을 살짝 기울여 **방패(shield)** 실루엣을 암시. 가운데 가로획은 회로/연결선 느낌의 가는 라인.
- **컬러**: 시안→블루 그라데이션 (`#00E5FF → #0066FF`), 다크 배경 위.
- **타입**: 워드마크는 지오메트릭 산세리프(Space Grotesk / Sora 계열), 약간의 자간(letter-spacing).
- **변형**: ① 풀 로고(마크+워드마크, 헤더) ② 마크 단독(파비콘·모바일).

### 1.2 파비콘
- `H` 모노그램(방패형)을 SVG로 제작 → `favicon.svg` + 폴백 `favicon.ico`(32×32, 16×16).
- 다크 배경(`#0A0E1A`)에 시안 글로우. `apple-touch-icon` 180×180 포함.
- OG 이미지(1200×630): 다크 배경 + Hans 로고 + "Security Professional" 카피 + 시안 글로우.

---

## 2. 디자인 시스템

### 2.1 컬러 토큰 (다크 테마 기준)

```css
/* Base */
--bg-base:        #0A0E1A;   /* 페이지 배경 (딥 네이비) */
--bg-elevated:    #11182B;   /* 카드/패널 */
--bg-glass:       rgba(255,255,255,0.04); /* 글래스모피즘 표면 */
--border-subtle:  rgba(255,255,255,0.08);
--border-glow:    rgba(0,229,255,0.35);

/* Text */
--text-primary:   #F2F6FF;
--text-secondary: #A6B2CC;
--text-muted:     #5C6A85;

/* Accent (electric cyan/blue) */
--accent:         #00E5FF;   /* 메인 액센트 */
--accent-2:       #0066FF;   /* 그라데이션 끝 */
--accent-glow:    rgba(0,229,255,0.45);

/* Semantic */
--success:        #2DD4A7;
--gradient-hero:  linear-gradient(135deg,#00E5FF 0%,#0066FF 60%,#7B5CFF 100%);
--gradient-text:  linear-gradient(180deg,#F2F6FF 0%,#A6B2CC 100%);
```

> getdesign `hp` 베이스의 토큰명과 충돌하면, **hp 토큰을 유지**하고 위 값들을 `--brand-*` 네임스페이스로 매핑해 다크 테마 레이어에서 오버라이드한다.

### 2.2 타이포그래피
- **Display/Heading**: Space Grotesk (또는 Sora) — 미래지향 지오메트릭.
- **Body**: Pretendard (한글 가독성 최상) / Inter (영문).
- **Mono(스탯·코드 느낌)**: JetBrains Mono — 숫자 카운트업, 라벨.
- 스케일: `display 56–80px / h2 36–44px / h3 24–28px / body 16–18px / caption 13–14px`. clamp()로 반응형.

### 2.3 스페이싱 & 레이아웃
- 컨테이너 max-width `1200px`, 좌우 패딩 `clamp(20px, 5vw, 80px)`.
- 섹션 세로 패딩 `clamp(80px, 12vh, 160px)`.
- 8px 그리드. 카드 radius `16–20px`. 글래스 카드엔 `backdrop-blur(16px)` + 1px 보더.

### 2.4 모션 원칙
- 스크롤 진입: `opacity 0→1`, `y 24→0`, `duration 0.6s`, `ease [0.22,1,0.36,1]`, stagger 0.08s.
- 호버: 카드 lift(`y-4`) + 보더 글로우. 버튼 시안 글로우 펄스.
- Hero: Spline 3D 인터랙티브 + Spotlight 마우스추적.
- `prefers-reduced-motion` 존중: 모션 최소화 폴백 필수.
- 성능: Spline은 `lazy + Suspense`, 모바일에서는 정적 폴백(포스터 이미지/CSS 그라데이션 오브) 옵션.

---

## 3. 정보 구조 (Sitemap)

싱글 페이지 + 스크롤 내러티브. 상단 고정 헤더에 앵커 네비 + KO/EN 토글.

```
Header (sticky, glass)  ── Logo · Nav(About/Career/Projects/Expertise/Vision/Contact) · KO|EN · "Get in touch"
1. Hero
2. About (핵심역량 · 자격)
3. Career Journey (3막 타임라인)
4. Signature Projects (익명화 카드 그리드)
5. Expertise (기술 스택 매트릭스)
6. Impact (카운트업 스탯)
7. Vision (미래지향 SI 방향성)
8. Contact (이메일 + 문의폼)
Footer (로고 · 카피라이트 · 맨위로)
```

---

## 4. 섹션별 스펙 & 콘텐츠 (KO / EN)

> 모든 텍스트는 i18n 리소스로 분리(`/src/i18n/ko.ts`, `en.ts`). 아래는 초안 카피.

### 4.1 Hero
- **레이아웃**: 좌측 카피 + 우측 Spline 3D 씬. 배경 다크 + Spotlight. 상단 작은 eyebrow.
- **컴포넌트**: `SplineScene`(우측), `Spotlight`(배경), CTA 버튼 2개.
- **콘텐츠**
  - eyebrow — KO: `보안 전문가 · 15년+` / EN: `Security Professional · 15+ yrs`
  - H1 — KO: `물리·정보보안을 잇는\n융합 SI 전문가` / EN: `Bridging Physical & Cyber Security\nas a Convergence SI Expert`
  - sub — KO: `CISSP 보유. 설계(PM)부터 수주(Sales)까지, 통합 보안 시스템을 끝까지 책임집니다.` / EN: `CISSP-certified. From design (PM) to deal (Sales), I own integrated security systems end to end.`
  - CTA1 — KO `프로젝트 보기` / EN `View Projects` (→ #projects)
  - CTA2 — KO `연락하기` / EN `Get in touch` (→ #contact)
- **Spline 씬**: 추상 기하/네트워크 노드 형태(보안·연결 메타포). 기본 placeholder `https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode` 사용, 추후 보안 테마 씬으로 교체.

### 4.2 About
- **레이아웃**: 좌측 인트로 단락 + 우측 3대 강점 카드. 하단 자격 뱃지 행.
- **인트로** — KO: `안녕하세요, 한성혁(Hans)입니다. 물리보안과 정보보안의 경계를 넘나들며, 대규모 통합 보안 시스템을 설계하고 수주해 온 15년 차 전문가입니다. 현장 PM과 글로벌 영업을 모두 경험했기에, 고객의 언어로 기술을 설명하고 기술의 언어로 사업을 설계합니다.` / EN: `I'm Hans. For 15+ years I've designed and won large-scale integrated security systems, working across the line between physical and cyber security. Having served as both an on-site PM and a global sales lead, I explain technology in the customer's language and design business in the language of technology.`
- **3대 강점 카드**
  1. KO `PM × Sales 융합` / `설계 현장과 수주 영업을 모두 책임진 흔치 않은 이력` — EN `PM × Sales` / `A rare track record owning both delivery and the deal`
  2. KO `시스템 통합 설계` / `출입통제·영상·침입감지·모바일을 하나로 엮는 Integration` — EN `Systems Integration` / `Weaving access, video, intrusion & mobile into one`
  3. KO `글로벌 역량` / `글로벌 투자은행 외투법인 대상 영어 영업·표준 설계` — EN `Global Reach` / `English-language sales & standard design for global IB clients`
- **자격 뱃지**: CISSP · CCNA · 무선설비기사 · 정보처리기사 · 인터넷정보검색사 1급 · 숭실대 IT융합대학원 석사 · TOEIC 800 / OPIC IM.
  - lucide-react 아이콘(ShieldCheck, Network, GraduationCap, Languages) 활용.

### 4.3 Career Journey (3막 타임라인)
- **레이아웃**: 세로 타임라인(데스크톱: 좌우 교차, 모바일: 단일 컬럼). 스크롤에 따라 라인이 시안으로 채워짐(scroll-linked progress).
- **노드(익명화 유지 — 회사명은 실명 사용 가능 여부는 §6 참고: 본인 소속사는 노출 가능)**
  - **Act I — IT 인프라의 출발 (2006–2007)**: 글로벌 IT 서비스 기업(해외) 인턴. 인도에서 네트워크 인프라 운영 L3, BCP/DRP 경험. KO `세계로 나가 IT 인프라의 기본을 배우다`.
  - **Act II — PM에서 글로벌 영업으로 (2008–2015)**: 국내 대형 물리보안 기업. ① 솔루션팀 PM(통합보안 구축, 국가 주요기관 다수) ② 글로벌어카운트 영업(글로벌 투자은행 외투법인 28개소). KO `현장을 설계하고, 세계를 영업하다`.
  - **Act III — 융합보안 사업을 이끌다 (2015–현재)**: 글로벌 생체인식 보안기업. Enterprise 사업팀장(팀원 6) + 영업지원팀장 겸직. 모바일출입카드·얼굴인식·O2O SI를 주도, 팀 매출 CAGR 40%+. KO `모바일과 얼굴인식으로, 출입의 미래를 만들다`.
- 각 노드: 연도 · 역할 · 1줄 요약 · 핵심 키워드 칩.

### 4.4 Signature Projects (익명화 카드 그리드)
- **레이아웃**: 3열(데스크톱) 글래스 카드 그리드. 카드 호버 시 lift + 글로우 + 핵심 메트릭 강조.
- **카드 스키마**: `{ 분류, 익명 고객, 역할, 규모, 핵심기술[], 한줄성과 }`
- **카드 목록 (익명화 — §6 준수)**
  1. **국가 주요기관 외곽 감시 통합 구축** · PM · 약 9억원 규모 · `IP영상화 첫 도입 / RGB Matrix 종합상황실 / PIDS` · KO `아날로그 CCTV를 IP 기반으로 전환한 대형 통합 프로젝트`
  2. **국가정보기관 출입통제·대테러 시스템** · PM · 약 14억원 규모 · `LPR / 볼라드·타이어킬러 / 외곽침입감지 / 시스템 Integration` · KO `차량 테러 방어부터 출입통제까지 다계층 보안 설계`
  3. **대형 IT 플랫폼 본사(판교) 출입통제** · Sales/설계 · 약 20억원 규모 · `모바일출입카드 / 얼굴인식 / 스피드게이트 / LDAP 연동` · KO `5,000명 규모 캠퍼스의 모바일·얼굴인식 통합`
  4. **글로벌 완성차 그룹 모바일 출입** · Sales/설계 · 약 14억원 규모 · `iOS NFC(ISO7816) / 타사 S/W Integration / Wiegand` · KO `여의도 1.5배 연구소에 iOS NFC 모바일 출입 도입`
  5. **국내 최대 로펌 모바일출입카드 최초 도입** · Sales/설계 · 약 9억원 규모 · `BLE/NFC / PKI / 클라우드 발급` · KO `BLE·NFC 기반 모바일 사원증의 국내 초기 레퍼런스`
  6. **정부 종합청사 모바일공무원증 출입** · Sales/설계 · 약 28억원 규모 · `모바일공무원증 BLE / 얼굴인식 워크스루 / 스피드게이트` · KO `BLE 사전 얼굴 템플릿 로드로 워크스루 출입 구현`
  7. **글로벌 투자은행 외투법인 보안 표준** · Global Sales · 28개소 운영 · `Global Security Standard / 이중 보안 / 유지보수` · KO `글로벌 표준에 따른 금융권 보안 설계·운영`
  8. **대형 시중은행 얼굴인식 O2O** · Sales/설계 · 본사+지점 · `딥러닝 얼굴인식 / O2O ID 일원화 / 워크스루` · KO `온·오프라인 ID를 하나로 잇는 얼굴인식 출입`
- **필터(선택)**: `전체 / PM / Sales / 모바일·얼굴인식`.

### 4.5 Expertise (기술 스택 매트릭스)
- **레이아웃**: 3그룹 카드. 각 그룹 내 항목은 칩/리스트.
  1. **통합 물리보안 솔루션** — 차량통제(LPR/Bollard/Tire Killer), 출입통제(Biometric/Card/Mobile), 영상감시(VMS/VA), 침입감지(PIDS/Microwave), 사전검색(X-Ray/문형탐지기).
  2. **보안 설계 역량** — 출입권한 등급 설계, 동선(보안동선) 설계, 이중화 안정화, **CEPTED**(범죄예방환경설계), 네트워크/암호화(TLS·AES·PKI) 설계.
  3. **차세대·융합 기술** — 모바일출입카드(BLE/NFC, iOS NFC), 얼굴인식·워크스루, O2O ID 통합, SDK/API 응용개발, 무인화, ESG/에너지 절감 연계.
- 아이콘: lucide-react (Car, Fingerprint, Video, Radar, ScanLine, ShieldCheck, Route, Network, Smartphone, ScanFace, Cpu).

### 4.6 Impact (카운트업 스탯)
- **레이아웃**: 4–5개 큰 숫자 + 라벨. 뷰포트 진입 시 카운트업.
- **스탯 (라운딩/안전 표기)**
  - `15+` 경력 연수 (KO `년 경력` / EN `years`)
  - `100억+` 누적 수주 규모 (KO `원 규모 SI 수주` / EN `KRW won in SI deals`) — 안전 라운딩
  - `28` 글로벌 외투법인 운영 (KO `개소 글로벌 사이트` / EN `global sites`)
  - `40%+` 팀 매출 CAGR (KO `사업 성장률` / EN `team revenue CAGR`)
  - `5` 보유 자격증 (KO `전문 자격` / EN `certifications` — CISSP 외)

### 4.7 Vision (미래지향 SI 방향성)
- **레이아웃**: 4개 전략 카드(가로 스크롤 또는 2×2). 미래지향 비주얼(글로우 라인/그리드 배경).
- **콘텐츠**
  1. KO `통합 보안 설계` / `Smart Building 트렌드를 반영한 통합 보안 설계` — EN `Integrated Security Design`
  2. KO `O2O ID 통합` / `Online-to-Offline ID 통합 및 DID 블록체인 응용` — EN `O2O Identity & DID`
  3. KO `응용개발 (SDK·API)` / `통합 시스템을 위한 Integration·API 설계` — EN `App Dev (SDK·API)`
  4. KO `무인화 전략` / `얼굴인식·모바일 크레덴셜 기반 비대면·무인 출입` — EN `Unmanned Operations`
- 인용 톤 한 줄(섹션 헤더): KO `4차 산업혁명 첨단기술 기반의 시스템 통합` / EN `Systems integration powered by frontier technology`.

### 4.8 Contact
- **레이아웃**: 좌측 카피 + 우측 폼(글래스 카드). 배경 Spotlight 약하게.
- **공개 정보**: 이메일만(예: 표시용 — 실제 주소는 구현 시 사용자 확인). 전화·주소·연봉 **비공개**.
- **폼 필드**: 이름 · 이메일 · 메시지. (백엔드 미정 → 초기엔 `mailto:` 또는 Formspree 류 정적 폼 서비스. 구현 계획에서 확정)
- 카피 — KO `함께 만들 보안의 다음 단계를 이야기해요.` / EN `Let's talk about what's next in security.`
- 스팸 방지: honeypot 필드 + 간단한 검증.

### 4.9 Header / Footer
- Header: sticky, 스크롤 시 글래스 + 보더 글로우 강화. 모바일은 햄버거 → 풀스크린 오버레이 메뉴.
- KO/EN 토글: 헤더 우측. 선택값 `localStorage` 저장.
- Footer: 로고 · `© 2026 Hans. All rights reserved.` · 맨위로 버튼. (실명·연락처 미노출)

---

## 5. 컴포넌트 아키텍처

```
src/
├─ main.tsx
├─ App.tsx
├─ i18n/                # ko.ts, en.ts, LanguageProvider(context) + useT()
├─ lib/
│  └─ utils.ts          # cn() (shadcn)
├─ components/
│  ├─ ui/               # shadcn + 통합 컴포넌트 (필수 경로)
│  │  ├─ splite.tsx     # SplineScene (lazy)
│  │  ├─ spotlight.tsx  # Spotlight (aceternity 버전 — fill prop)
│  │  ├─ card.tsx       # shadcn Card
│  │  └─ button.tsx, badge.tsx ...
│  ├─ layout/
│  │  ├─ Header.tsx     # nav + LangToggle
│  │  └─ Footer.tsx
│  ├─ sections/
│  │  ├─ Hero.tsx
│  │  ├─ About.tsx
│  │  ├─ CareerJourney.tsx
│  │  ├─ Projects.tsx
│  │  ├─ Expertise.tsx
│  │  ├─ Impact.tsx
│  │  ├─ Vision.tsx
│  │  └─ Contact.tsx
│  └─ common/
│     ├─ Logo.tsx       # "Hans" 워드마크 + 마크 (SVG)
│     ├─ SectionHeading.tsx
│     ├─ CountUp.tsx
│     └─ Reveal.tsx     # Framer Motion 스크롤 진입 래퍼
├─ data/
│  ├─ projects.ts       # 익명화된 프로젝트 데이터 (KO/EN)
│  ├─ career.ts
│  └─ expertise.ts
└─ styles/
   └─ index.css         # getdesign hp 베이스 + Tailwind + 다크 토큰
```

> **`/components/ui` 경로가 필수인 이유**: shadcn CLI와 통합 컴포넌트(SplineScene/Spotlight/Card)가 `@/components/ui/*` 임포트 경로를 가정한다. 이 경로를 지키면 shadcn `add`로 받은 컴포넌트와 외부 제공 컴포넌트가 충돌 없이 함께 동작하고, `@` alias(`tsconfig` + `vite.config`)만 맞추면 복붙 코드가 그대로 빌드된다.

### 통합할 외부 컴포넌트 (요청받음)
- `splite.tsx` (SplineScene, lazy + Suspense) — Hero 우측.
- `spotlight.tsx` — **aceternity 버전**(SVG, `fill` prop) 채택. Hero·Contact 배경. (ibelick 마우스추적 버전은 호버 스포트라이트가 필요한 카드에 선택적으로 사용 가능)
- `card.tsx` — shadcn Card.
- npm 의존성: `@splinetool/runtime`, `@splinetool/react-spline`, `framer-motion`, `lucide-react`, `clsx`, `tailwind-merge`, `class-variance-authority`.
- `animate-spotlight` 키프레임을 Tailwind config에 추가해야 Spotlight 애니메이션 동작.

---

## 6. 익명화 매핑표 (구현 시 반드시 준수)

| 원본(비공개) | 사이트 표기 KO | 사이트 표기 EN |
|---|---|---|
| 청와대 | 국가 주요기관 | National Critical Facility |
| 국정원 | 국가정보기관 | National Intelligence Agency |
| 카카오(판교) | 대형 IT 플랫폼 기업 | Major IT Platform Company |
| 현대자동차그룹 | 글로벌 완성차 그룹 | Global Automotive Group |
| 김앤장 | 국내 최대 로펌 | Korea's Largest Law Firm |
| 하나은행 | 대형 시중은행 | Major Commercial Bank |
| 세종 정부청사 | 정부 종합청사 | Government Complex |
| BoA·Morgan Stanley·JP Morgan·Barclays 등 | 글로벌 투자은행 | Global Investment Banks |
| Facebook·Adobe·IBM | 글로벌 테크 기업 | Global Tech Firms |
| 빙그레·한국철강 | 국내 대기업 제조사 | Major Korean Manufacturers |

- **본인 소속/이력 회사**(Satyam=글로벌 IT 서비스 기업, ADT캡스/SK쉴더스, 슈프리마)는 본인 경력이므로 노출 가능하나, 보수적으로 가려면 "국내 대형 물리보안 기업" 등으로 표기 가능 — **구현 시 사용자 최종 확인**.
- 금액은 모두 라운딩("약 N억원 규모") 또는 합산 범위로.

---

## 7. 반응형 & 접근성

- 브레이크포인트: `sm 640 / md 768 / lg 1024 / xl 1280`.
- 모바일: Hero 세로 스택(3D는 상단 또는 정적 폴백), 타임라인 단일 컬럼, 프로젝트 1열.
- 접근성: 명암비 WCAG AA, 포커스 링(시안), `prefers-reduced-motion` 폴백, Spline 영역에 대체 텍스트/스킵, 시맨틱 랜드마크.
- 성능 목표: LCP < 2.5s. Spline·폰트 lazy/preload 전략, 이미지 최적화.

---

## 8. 에셋

- 인물 사진: 사용자 제공 전까지 실루엣/추상 플레이스홀더. (포트폴리오 사진 사용 여부 — 구현 시 확인)
- 배경/텍스처: CSS 그라데이션 + 노이즈, Spline 3D, SVG 그리드. (외부 이미지는 Unsplash 검증 URL만, 도면류 금지)
- 아이콘: lucide-react.
- 폰트: Pretendard(웹), Space Grotesk·JetBrains Mono(Google Fonts), Inter.

---

## 9. 오픈 이슈 (구현 전 확정 필요)
1. 공개 이메일 주소 표기값 (문의폼 전송 백엔드 포함).
2. 본인 이력 회사명 노출 수준(실명 vs "국내 대형 물리보안 기업").
3. 인물 사진 사용 여부.
4. Hero용 보안 테마 Spline 씬 최종본(초기엔 placeholder).
```
