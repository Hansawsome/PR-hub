# PLAN.md — 구현 계획 (Hans Personal PR Homepage)

> [Design.md](Design.md)를 기준으로 한 단계별 구현 계획.
> **현재 단계**: 디자인 확정 완료 → 사용자가 Claude Design으로 프로토타입/피드백 진행 예정.
> 피드백 반영 후 아래 Phase 1부터 구현 착수.

---

## Phase 0 — 프로젝트 스캐폴딩
1. Vite + React + TypeScript 생성 (`npm create vite@latest . -- --template react-ts`).
2. Tailwind CSS 설치 + 설정 (`tailwind.config.ts`, `postcss`, `index.css`).
3. `@` path alias 설정 (`tsconfig.json` + `vite.config.ts`의 `resolve.alias`).
4. shadcn 초기화 (`npx shadcn@latest init`) → `components.json`, `lib/utils.ts(cn)`.
5. **getdesign 베이스 적용**: `npx getdesign@latest add hp` → 출력 토큰을 `styles/index.css`에 통합, 다크 테마 토큰(§Design 2.1)을 `--brand-*`로 오버레이.
6. 의존성 설치: `@splinetool/runtime @splinetool/react-spline framer-motion lucide-react clsx tailwind-merge class-variance-authority`.

**검증**: `npm run dev` 기동, Tailwind 클래스 적용 확인, `@/` 임포트 동작 확인.

## Phase 1 — 통합 컴포넌트 & 디자인 토대
1. `/components/ui`에 `card.tsx`, `splite.tsx`(SplineScene), `spotlight.tsx`(aceternity 버전) 배치.
2. `tailwind.config`에 `animate-spotlight` 키프레임 + 컬러/폰트 토큰 등록.
3. `loader` 스피너 CSS(Spline fallback) 추가.
4. 공통 컴포넌트: `Logo.tsx`("Hans" SVG 워드마크+마크), `Reveal.tsx`(Framer Motion 스크롤 진입), `SectionHeading.tsx`, `CountUp.tsx`.
5. 폰트 로딩(Pretendard/Space Grotesk/JetBrains Mono/Inter).

**검증**: Spline 씬 렌더, Spotlight 애니메이션, 로고 표시, reduced-motion 폴백.

## Phase 2 — i18n & 데이터
1. `i18n/`: `LanguageProvider`(context) + `useT()` 훅 + `ko.ts`/`en.ts`.
2. `data/projects.ts`, `career.ts`, `expertise.ts` — **§Design 6 익명화 매핑 준수**.
3. KO/EN 토글(헤더) + `localStorage` 영속.

**검증**: 토글 시 전 섹션 텍스트 전환, 새로고침 후 언어 유지.

## Phase 3 — 섹션 구현 (순서대로)
1. `Header` / `Footer` (sticky glass, 모바일 메뉴, 앵커 네비).
2. `Hero` (Spline + Spotlight + CTA).
3. `About` (인트로 + 3대 강점 + 자격 뱃지).
4. `CareerJourney` (scroll-linked 3막 타임라인).
5. `Projects` (익명화 카드 그리드 + 선택적 필터).
6. `Expertise` (3그룹 매트릭스).
7. `Impact` (카운트업 스탯).
8. `Vision` (4 전략 카드).
9. `Contact` (폼 — `mailto:` 또는 Formspree, honeypot).

**검증(섹션별)**: 데스크톱/모바일 레이아웃, 스크롤 모션, 접근성(포커스/명암비).

## Phase 4 — 마감 & 최적화
1. 파비콘/OG 이미지(`H` 모노그램 SVG) + `<head>` 메타.
2. 반응형 QA(`/qa` 또는 gstack 브라우저)로 sm~xl 점검.
3. 성능: Spline lazy/모바일 폴백, 폰트 preload, LCP < 2.5s.
4. 접근성 패스(WCAG AA), `prefers-reduced-motion`.
5. 빌드(`npm run build`) + 프리뷰 확인.

---

## 구현 전 확정 필요 (Design.md §9)
- [ ] 공개 이메일 주소 + 문의폼 전송 방식
- [ ] 본인 이력 회사명 노출 수준 (실명 vs "국내 대형 물리보안 기업")
- [ ] 인물 사진 사용 여부
- [ ] Hero Spline 씬 최종본 (초기 placeholder로 진행)

## 위험 & 대응
- **NDA/보안**: 익명화 매핑표 위반 금지, 도면 이미지 게시 금지. (최우선)
- **Spline 성능**: 모바일/저사양 정적 폴백 필수.
- **getdesign hp 토큰 충돌**: hp 유지 + brand 네임스페이스 오버레이로 격리.
