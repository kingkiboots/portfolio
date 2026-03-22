# Design Guideline

이 문서는 포트폴리오 프로젝트의 디자인 가이드라인을 정리합니다.
전체 톤앤매너는 **미니멀하고 차분한(calm & peaceful)** 느낌을 추구합니다.

---

## 1. 컬러 시스템

Tailwind CSS 4의 `@theme` 디렉티브로 CSS 변수를 선언하고, 다크모드는 `prefers-color-scheme: dark`에서 `:root` 오버라이드로 전환합니다.

### 포인트 컬러

| 이름 | Light | Dark | 용도 |
|------|-------|------|------|
| **Primary** (Blue) | `#2563eb` | `#3b82f6` | CTA, 링크, 포커스 링, 선택 영역 |
| **Secondary** (Green) | `#10b981` | `#34d399` | 성공 상태, 보조 강조 |
| **Warning** (Orange) | `#f97316` | `#fb923c` | 주의, 경고 강조 |

각 포인트 컬러는 `light`, `dark` 변형을 가집니다 (예: `primary-light`, `primary-dark`).
다크모드에서는 전체적으로 한 단계 밝은 값으로 시프트합니다.

### 배경 & 표면

| 토큰 | Light | Dark | 용도 |
|------|-------|------|------|
| `background` | `#ffffff` | `#0a0a0a` | 페이지 배경 |
| `surface` | `#ffffff` | `#141414` | 카드, 사이드바 배경 |
| `surface-elevated` | `#fafafa` | `#1a1a1a` | 섹션 배경 (짝수 섹션 교차용) |

### 텍스트 계층

| 토큰 | Light | Dark | 용도 |
|------|-------|------|------|
| `foreground` | `#0f0f0f` | `#fafafa` | 제목, 강조 텍스트 |
| `subtle` | `#64748b` (slate-500) | `#94a3b8` (slate-400) | 본문, 부가 설명 |
| `tertiary` | `#94a3b8` (slate-400) | `#64748b` (slate-500) | 플레이스홀더, 카피라이트, 비활성 아이콘 |
| `muted` | `#cbd5e1` (slate-300) | `#475569` (slate-600) | disabled 상태 |

텍스트 계층은 쿨톤(slate) 계열로 통일하여 차분한 느낌을 유지합니다.

### 보더

| 토큰 | Light | Dark |
|------|-------|------|
| `border` | `#e5e5e5` | `#262626` |
| `border-light` | `#f5f5f5` | `#1a1a1a` |

---

## 2. 타이포그래피

### 폰트 스택

```
Inter (영문) → Pretendard (한글) → system-ui → sans-serif
```

- **Inter**: Google Fonts CDN, `--font-inter` CSS 변수
- **Pretendard**: 로컬 woff2 (400, 500, 600, 700), `--font-pretendard` CSS 변수, `display: swap`

### 기본 설정

| 속성 | 값 |
|------|-----|
| 기본 font-weight | 400 |
| line-height | 1.6 |
| letter-spacing | -0.01em |
| antialiasing | `antialiased` (Tailwind) |

### 텍스트 크기 용도

| 크기 | 용도 |
|------|------|
| `text-xs` (12px) | 태그, +more 카운트, 캡션 |
| `text-sm` (14px) | 부가 정보, 링크, 메타데이터 |
| `text-base` (16px) | 본문, 카드 제목 (sm) |
| `text-lg` (18px) | 카드 제목 (featured) |
| `text-xl` ~ `text-2xl` | 섹션 부제목, MDX h3 |
| `text-3xl` ~ `text-5xl` | 페이지 제목 (반응형) |

---

## 3. 간격 & 레이아웃

### 간격 토큰

| 토큰 | 값 | 용도 |
|------|-----|------|
| `--spacing-section` | `6rem` (96px) | 섹션 간 상하 패딩 |
| `--spacing-container` | `1.5rem` (24px) | 컨테이너 좌우 패딩 |

### 컨테이너

```
max-width: 1200px, 좌우 auto margin, padding: 1.5rem
```

### 그리드 시스템 (프로젝트 섹션)

```
grid-cols-1 → md:grid-cols-3, gap-6, auto-rows-fr
```

- `size: "sm"` → `col-span-1` (1x1)
- `size: "md"` → `md:col-span-2 md:row-span-2` (2x2, featured)

---

## 4. 모서리 둥글기 (Border Radius)

| 토큰 | 값 | 용도 |
|------|-----|------|
| `radius-xs` | 4px | 인라인 코드 |
| `radius-sm` | 6px | 태그 |
| `radius-md` | 8px | 입력 필드 |
| `radius-lg` | 10px | 작은 카드 |
| `radius-xl` | 12px | 프로젝트 카드, 이미지 컨테이너 |
| `radius-2xl` | 16px | 모달, 큰 카드 |

---

## 5. 그림자 (Shadows)

라이트 모드는 낮은 불투명도(3~15%), 다크모드는 높은 불투명도(10~40%)로 설정합니다.

| 토큰 | 용도 |
|------|------|
| `shadow-xs` | 미세한 분리감 |
| `shadow-sm` | 기본 카드 |
| `shadow-md` | 호버 전 중간 강조 |
| `shadow-lg` | 헤더, 호버된 카드 |
| `shadow-xl` | 프로젝트 카드 호버 |
| `shadow-2xl` | 모달, 오버레이 |

---

## 6. 전환 효과 (Transitions)

| 토큰 | 값 | 용도 |
|------|-----|------|
| `duration-fast` | 150ms ease | 아이콘 색상, 링크 hover |
| `duration-normal` | 250ms ease | 카드 hover, 배경 전환 |
| `duration-slow` | 350ms ease | 이미지 확대, GIF 크로스페이드 |

**Easing**: 기본 `ease`, 스크롤 애니메이션은 `cubic-bezier(0.16, 1, 0.3, 1)` (Apple 스타일 decelerate)

---

## 7. 인터랙션 패턴

### 프로젝트 카드 호버

```
hover:scale-[1.02]           /* 살짝 확대 */
hover:shadow-xl              /* 그림자 강조 */
hover:border-primary/30      /* 보더에 primary 틴트 */
hover:shadow-primary/10      /* primary 컬러 글로우 */
```

- **GIF 없을 때**: 썸네일 이미지 `scale-105` 확대 (transition-transform)
- **GIF 있을 때**: 정적 이미지 → GIF 크로스페이드 (transition-opacity)
- **모바일**: GIF 직접 재생 (호버 불가 환경)
- "View Project" 텍스트: `text-primary` 전환 + 화살표 `translate-x-1`

### 기술 스택 아이콘

- **기본 상태**: `text-tertiary` 색상으로 통일 (톤앤매너 일관성)
  - devicon (img): CSS `mask-image`로 `bg-tertiary` 단색 적용
  - react-icons (svg): `text-tertiary` 클래스
- **호버 상태**: 원본 브랜드 컬러로 전환
  - devicon: 숨겨둔 원본 이미지 `opacity-100`으로 노출
  - react-icons: CSS 변수 `--brand-color`로 색상 전환

### 헤더

- 스크롤 감지 기반 show/hide (히어로 영역 50% 이후부터)
- 배경 불투명도: 스크롤 위치에 비례하여 0→1 (liquid-glass 효과)
- 모바일: Radix Dialog 기반 풀스크린 메뉴

### 스크롤 등장 애니메이션

Intersection Observer 기반 `scroll-fade-in` 클래스:

| 클래스 | 이동 거리 | 지속 시간 | 용도 |
|--------|-----------|-----------|------|
| `scroll-fade-in-fast` | 40px | 0.8s | 작은 요소 |
| `scroll-fade-in` | 50px | 1.2s | 기본 섹션 |
| `scroll-fade-in-slow` | 70px | 1.5s | 큰 블록 |

---

## 8. 글래스모피즘 (Liquid Glass)

iOS 위젯 스타일의 유리 효과:

```css
backdrop-filter: blur(50px) saturate(200%);
border: 1px solid rgba(255, 255, 255, 0.5);     /* Light */
border: 1px solid rgba(255, 255, 255, 0.2);     /* Dark */
box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1),
            inset 0 1px 0 rgba(255, 255, 255, 0.4);
```

- `.liquid-glass`: 기본 유리 효과 (헤더 등)
- `.liquid-glass-primary`: Primary 컬러 틴트 유리 효과

---

## 9. 그라데이션 텍스트

| 클래스 | 방향 | 컬러 | 용도 |
|--------|------|------|------|
| `text-gradient` | 135deg | primary → secondary | 범용 강조 |
| `text-gradient-primary` | 90deg | foreground → primary-dark → primary → primary-light | 히어로 타이틀 |

다크모드에서 `text-gradient-primary`는 밝은 → 어두운 순서를 반전하여 가독성을 유지합니다.

---

## 10. MDX 콘텐츠 타이포그래피

`.mdx-content` 래퍼 안에서의 스타일:

| 요소 | 스타일 |
|------|--------|
| `h2` | `text-2xl font-bold`, 하단 `border-border`, `mt-12 mb-4` |
| `h3` | `text-xl font-semibold`, `mt-8 mb-3` |
| `p` | `text-subtle`, `leading-relaxed`, `my-4` |
| `ul/ol` | `list-disc/decimal`, `pl-6`, `space-y-2` |
| `a` | `text-primary`, `underline decoration-primary/30`, 외부 링크 `target="_blank"` |
| `blockquote` | `border-l-4 border-primary/30`, `italic text-subtle` |
| `code` (인라인) | `bg-foreground/5`, `rounded`, `font-mono text-sm` |
| `pre` | `border border-border`, `bg-surface-elevated`, `rounded-lg` |
| `table` | `border-collapse`, `text-sm`, thead `font-semibold text-foreground` |

### 커스텀 MDX 컴포넌트

| 컴포넌트 | 용도 | 변형 |
|----------|------|------|
| `HighlightBox` | 강조 박스 | `info` (primary), `warning` (warning), `success` (secondary) |
| `ArchitectureImage` | 다이어그램 이미지 + 캡션 | — |
| `ResultCard` | 성과 수치 강조 카드 | — |
| `MermaidDiagram` | Mermaid 다이어그램 → SVG | — |

---

## 11. 반응형 브레이크포인트

Tailwind CSS 기본 브레이크포인트를 사용하며, JS에서는 `useBreakpoint` 훅으로 접근합니다.

| 브레이크포인트 | 값 | 주요 변화 |
|----------------|------|-----------|
| `sm` | 640px | — |
| `md` | 768px | 그리드 3열, GIF 호버 활성화, 기술 아이콘 6개 |
| `lg` | 1024px | 상세 페이지 3열 그리드 (본문 2:사이드바 1) |
| `xl` | 1280px | — |

### 기술 스택 아이콘 표시 개수

| 화면 | sm 카드 | md (featured) 카드 |
|------|---------|---------------------|
| < md | 3개 | 3개 |
| >= md | 3개 | 6개 |

---

## 12. 접근성

- `::selection`: primary 컬러 배경 + 흰색 텍스트
- `:focus-visible`: 2px solid primary, offset 2px
- `SkipLink`: 키보드 네비게이션용 콘텐츠 건너뛰기 링크
- `aria-label`, `aria-hidden`: 장식 요소와 인터랙티브 요소 구분
- `role="region"`, `role="list"`: 시맨틱 역할 명시
- 이미지: `alt` 텍스트, `loading="lazy"`
