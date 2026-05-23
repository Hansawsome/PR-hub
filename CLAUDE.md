# CLAUDE.md — Hans Personal PR Homepage

> 이 저장소는 **한성혁(Hans)의 개인 PR 홈페이지** 프로젝트입니다.
> 담당 에이전트 별칭: **PR부장**. 사용자를 "부장님"으로 호칭.

## ⭐ 작업 방식 (가장 중요)

- **PR부장의 주 스킬은 `superpowers`다.** 새로운 기능·페이지·큰 변경을 시작할 때는
  **항상 먼저 `superpowers:brainstorming`으로 의도를 정리하고, 그 다음 `superpowers:writing-plans`로 계획을 세운다.**
  바로 코딩부터 들어가지 않는다.
- 디자인 단계에서는 산출물(`Design.md`, `PLAN.md`)을 먼저 만들고, **사용자가 직접 Claude Design으로 프로토타입/피드백**을 준 뒤 구현에 착수한다.
- 다중 단계 작업은 TodoWrite로 추적한다.

## 🔒 NDA / 보안 원칙 (최우선·타협 불가)

원본 이력서/포트폴리오 PDF(`source/`)에는 모든 페이지에 **"외부 유출 금지"** disclaimer가 있다.
- **고객사·기관·정확한 금액을 직접 노출하지 않는다.** 전부 익명화한다.
- 익명화 매핑표는 `Design.md §6`. 예: 청와대→"국가 주요기관", 국정원→"국가정보기관",
  카카오→"대형 IT 플랫폼", 현대차→"글로벌 완성차 그룹", 김앤장→"국내 최대 로펌",
  하나은행→"대형 시중은행", 세종청사→"정부 종합청사", BoA/Morgan Stanley 등→"글로벌 투자은행".
- 금액은 라운딩("약 N억원 규모"). 시스템 구성도/망구성도 등 도면 이미지는 게시 금지.

## 결정 사항 (확정)

| 항목 | 값 |
|---|---|
| 목적 | 종합 퍼스널 브랜딩 |
| 언어 | 한·영 토글 (기본 KO, localStorage 영속) |
| 개인정보 공개 | **이메일 + 문의폼만**. 전화·주소·연봉·생년월일 비공개 |
| 공개 이메일 | `kidsland@kakao.com` |
| 톤 | 화려·다이내믹·전문적·미래지향 (다크 네이비 + 일렉트릭 시안) |

## 기술 스택

- **Vite + React 18 + TypeScript** (앱 루트: `web/`)
- **Tailwind CSS v3** + **shadcn 구조**(`src/components/ui/`)
- **getdesign hp** 디자인 가이드는 `web/GETDESIGN-hp-reference.md`로 보관(HP 라이트테마 참고용). 실제 브랜드는 다크+시안으로 오버레이.
- **Spline 3D**(`@splinetool/react-spline`, lazy + ErrorBoundary 폴백) · **Framer Motion 미사용**(현재는 CSS/IO 기반 reveal) · **Spotlight**(aceternity) · **lucide 미사용**(인라인 SVG 아이콘)
- 폰트: Space Grotesk(display) / Pretendard(KO) / Inter(EN) / JetBrains Mono(mono)

> 참고: 모션은 현재 IntersectionObserver 기반 `.reveal` + CSS 키프레임으로 구현. framer-motion은 설치만 되어 있고 필요 시 도입.

## 디렉터리

```
/                      ← 프로젝트 루트
├─ Design.md           ← 디자인 SSOT (브랜드/토큰/섹션/익명화 매핑)
├─ PLAN.md             ← 단계별 구현 계획
├─ CLAUDE.md           ← (이 파일)
├─ source/             ← 원본 이력서/포트폴리오 PDF (NDA — 비공개 원본)
└─ web/                ← 실제 사이트
   ├─ index.html       ← 폰트·메타·OG·favicon
   ├─ public/          ← favicon.svg(Hans H-shield), hans-profile.jpg, hans-headshot.png
   └─ src/
      ├─ App.tsx, main.tsx, index.css
      ├─ styles/        ← tokens.css(토큰·base), layout.css(섹션 레이아웃)
      ├─ i18n/          ← LanguageProvider (useLang().t(ko,en))
      ├─ lib/utils.ts   ← cn()
      ├─ components/ui/  ← card, splite(SplineScene), spotlight  (shadcn 경로)
      ├─ components/common/  ← Reveal, CountUp, Logo, SectionHeading
      ├─ components/layout/  ← Header(KO/EN 토글·모바일메뉴), Footer
      └─ components/sections/ ← Hero, About, Career, Projects, Expertise, Impact, Vision, Contact
```

## 실행

```bash
cd web
npm install
npm run dev      # http://localhost:5179  (포트 5179 고정 — strictPort)
npm run build    # tsc -b && vite build
```

## 콘텐츠 / 섹션

Hero → About → Career(3막 타임라인) → Projects(익명화 8선) → Expertise(3그룹) → Impact(카운트업) → Vision(미래지향 4) → Contact(mailto 폼).
- Hero: Spline 3D 백드롭 + **듀오톤 캐릭터화 포트레이트** + 강화된 그라데이션 헤드라인 + 스탯카드 + 마퀴. 모바일/reduced-motion에서는 3D 대신 SVG 네트워크 폴백.

## 사진 (프로필 이미지)

- `web/public/hans-profile.jpg` = **ISEC 전시회 AI 객체탐지("Cellphone detected") 사진**(원본 루트 `375caac2...JPG`). Hero 좌측·About에서 사용. 듀오톤+스캔라인 처리와 "OBJECT DETECTED" 태그가 사진의 탐지 오버레이와 잘 어울림.
- 교체 시 같은 경로에 덮어쓰면 자동 반영(코드 수정 불필요).

## 섹션 구성 (현재)

Hero → About → Career → Projects → Expertise → Impact → Vision → **Growth(07)** → Contact(08).

- **Hero**(`.hero-stage`): 중앙 Spline 로봇 + 그 위 타이틀 오버레이(130% 확대 `.hero-headline-xl`, 로봇 기준 `translateY(30%)`로 30% 하향). 포트레이트·하단 마퀴 제거됨, 하단 패딩 축소로 About을 위로 당김. 모바일/reduced-motion은 세로 스택+로봇 숨김(네트워크 폴백). 우하단 스탯카드.
- **About**: 좌측 인트로/인용 + **우측 프로필 포트레이트**(`ProfilePortrait`, 듀오톤+스캔+OBJECT DETECTED 태그, 폭 ~180px/50%). 강점 3카드는 하단 풀폭 행.
- **Growth**(신규): 리더십을 **도표로** 표현 — 팀 매출 CAGR 막대그래프(`CagrChart` SVG), 팀 기술교육 12모듈 커리큘럼, 인사이드 세일즈 프로세스 흐름(CRM·PowerBI·ERP) + 강연/자기계발 2카드 → "AI로 짓는다·바이브코딩" AI 카드 4개(AI 뱃지) → **보안 매체 기고** 블록(보안뉴스/슈프리마 뉴스룸, 외부 링크). `ProfilePortrait`는 `common.tsx` 공유 컴포넌트.

## 열린 이슈

- [ ] Hero용 보안 테마 Spline 씬 최종본 (현재 placeholder URL)
- [ ] 본인 이력 회사명 노출 수준 (현재 보수적 익명화: "글로벌 IT 서비스 / 국내 대형 물리보안 / 글로벌 생체인식 보안기업")
- [ ] OG 이미지(`web/public/og.png`) 제작
