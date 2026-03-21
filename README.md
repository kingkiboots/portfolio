# Portfolio

Next.js 기반 개인 포트폴리오 사이트입니다.
링크: https://kingkiboots.github.io/portfolio/

## 기술 스택

| 분류 | 기술 |
|------|------|
| Framework | Next.js 15 (App Router, Static Export) |
| Language | TypeScript 5 |
| UI | React 19, Radix UI |
| Styling | Tailwind CSS 4 |
| Linter | ESLint 10 + eslint-plugin-boundaries (FSD 레이어 규칙 강제) |
| Formatter | Prettier + prettier-plugin-tailwindcss |
| Package Manager | pnpm |
| Deploy | GitHub Pages (GitHub Actions) |

## 시작하기

```bash
pnpm install
pnpm dev           # 개발 서버 (Turbopack)
pnpm build         # 정적 빌드 (out/)
pnpm preview       # 빌드 결과 미리보기
pnpm lint          # ESLint (FSD 레이어 규칙 포함)
```

## 아키텍처

[Feature-Sliced Design (FSD)](https://feature-sliced.design/) 아키텍처를 따릅니다.

```
src/
├── app/              # Next.js App Router (진입점, 레이아웃, 프로바이더)
├── views/            # 페이지 단위 컴포넌트
├── widgets/          # 독립적인 UI 블록 (Header, Footer, Section 등)
├── features/         # 사용자 인터랙션 및 비즈니스 기능
├── entities/         # 비즈니스 엔티티
└── shared/           # 공용 UI 컴포넌트, 유틸리티, 환경변수
```

### 레이어 의존 방향

```
app → views → widgets → features → entities → shared
```

상위 레이어는 하위 레이어만 import할 수 있습니다. 같은 레이어 간 import는 금지입니다.
이 규칙은 `eslint-plugin-boundaries`로 강제되며, 위반 시 lint 에러가 발생합니다.

### 슬라이스 구조

각 슬라이스는 다음 세그먼트로 구성됩니다:

```
features/project-card/          # 슬라이스
├── index.ts                    # Public API (슬라이스 단위 export)
├── lib/                        # 커스텀 훅
│   ├── use-og-image.ts
│   └── use-text-clamp.ts
├── model/                      # 비즈니스 로직 (일반 함수)
│   └── get-project-url.ts
└── types/                      # 타입 정의
    └── project.types.ts
```

| 세그먼트 | 용도 | 예시 |
|---------|------|------|
| `ui/` | 컴포넌트 | `ProjectCard.tsx` |
| `lib/` | 커스텀 훅 | `use-og-image.ts` |
| `model/` | 비즈니스 로직 (일반 함수) | `get-project-url.ts` |
| `types/` | 타입 정의 | `project.types.ts` |

### App Router와 FSD의 결합

Next.js App Router는 `app/` 디렉토리에서 파일 기반 라우팅을 강제합니다.
FSD는 `src/` 하위에서 레이어 기반 구조를 요구합니다.
두 시스템을 함께 사용하기 위해 다음과 같은 규칙을 적용합니다.

**원칙: `app/` 디렉토리는 라우트 셸, `src/` 디렉토리는 실제 구현**

```
app/                              # Next.js가 요구하는 라우트 진입점
├── page.tsx                      # → src/views/home 렌더링 위임
├── projects/[slug]/page.tsx      # → src/views/project-detail 렌더링 위임
├── layout.tsx                    # 전역 레이아웃 (폰트, 프로바이더)
└── globals.css                   # 전역 스타일

src/
├── views/                        # FSD views 레이어 (페이지 단위 UI)
│   ├── home/
│   │   └── ui/HomePage.tsx       # 홈 페이지 뷰 컴포넌트
│   └── project-detail/
│       └── ui/ProjectDetailPage.tsx  # 프로젝트 상세 뷰 컴포넌트
├── widgets/                      # 독립적인 UI 블록
├── features/                     # 사용자 인터랙션 및 비즈니스 기능
├── entities/                     # 비즈니스 엔티티
└── shared/                       # 공용 유틸리티, 컴포넌트
```

| 관심사 | 위치 | 역할 |
|--------|------|------|
| 라우팅 | `app/*/page.tsx` | `generateStaticParams`, `generateMetadata`, 데이터 리졸브, 뷰 렌더링 위임 |
| 페이지 UI | `src/views/*/ui/*.tsx` | props로 주입받은 데이터를 기반으로 UI 렌더링 |
| 레이아웃 | `app/layout.tsx` | 폰트, 전역 프로바이더, HTML 구조 |

`app/` 파일은 "**어떤 데이터로 어떤 뷰를 보여줄지**" 결정하고,
`src/views/` 파일은 "**받은 데이터를 어떻게 보여줄지**"에 집중합니다.

```typescript
// app/projects/[slug]/page.tsx — 라우트 셸 (데이터 리졸브 + 뷰 위임)
import ProjectDetailPage from "@/views/project-detail";

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  const post = getPostBySlug(slug);
  if (!project) notFound();
  return <ProjectDetailPage project={project} post={post} />;
}
```

```typescript
// src/views/project-detail/ui/ProjectDetailPage.tsx — 순수 뷰 컴포넌트
interface ProjectDetailPageProps {
  project: Project;
  post: MdxPost | null;
}

export default function ProjectDetailPage({ project, post }: ProjectDetailPageProps) {
  return <main>...</main>;
}
```

이렇게 분리하면:
- **뷰 컴포넌트의 재사용·테스트가 용이**: 라우트 의존성 없이 props만으로 동작
- **라우트 변경이 뷰에 영향 없음**: URL 구조 변경 시 `app/` 파일만 수정
- **FSD 의존 규칙 유지**: views → widgets → features → shared 방향 준수

### Public API

- **슬라이스 단위**로만 `index.ts`를 두고 export합니다.
- 레이어 단위 barrel export 파일은 사용하지 않습니다.
- 외부에서는 반드시 슬라이스의 Public API를 통해 import합니다.

```typescript
// O — 슬라이스 Public API를 통해 import
import { useOgImage } from "@/features/project-card";

// X — 내부 세그먼트 직접 import 금지 (lint error: boundaries/entry-point)
import { useOgImage } from "@/features/project-card/lib/use-og-image";

// X — 하위에서 상위 레이어 import 금지 (lint error: boundaries/element-types)
// features에서 widgets를 import하면 에러
import { ProjectCard } from "@/widgets/home";
```

## 파일 네이밍 컨벤션

| 유형 | 케이스 | 예시 |
|------|--------|------|
| 컴포넌트 | PascalCase | `ProjectCard.tsx`, `HeroSection.tsx` |
| 커스텀 훅 | kebab-case | `use-og-image.ts`, `use-text-clamp.ts` |
| 일반 함수 | kebab-case | `get-project-url.ts` |
| 타입 정의 | kebab-case + `.types.ts` | `project.types.ts` |

## 커밋 컨벤션

[Conventional Commits](https://www.conventionalcommits.org/)를 따릅니다. 메시지는 한글로 작성합니다.

```
<type>(<scope>): <subject>

<body>
```

| 타입 | 설명 |
|------|------|
| `feat` | 새로운 기능 추가 |
| `fix` | 버그 수정 |
| `refactor` | 리팩토링 (기능 변경 없음) |
| `style` | 코드 포맷팅, 세미콜론 누락 등 |
| `docs` | 문서 수정 |
| `chore` | 빌드, 설정 파일 변경 |

## 코드 품질

[Vercel React Best Practices](https://vercel.com/blog/how-we-made-the-vercel-dashboard-twice-as-fast)를 기반으로 다음 원칙을 준수합니다:

- 조건부 렌더링에 `&&` 대신 ternary(`? :`) 사용
- 이전 상태 기반 업데이트 시 functional `setState` 사용
- `useEffect` dependency는 primitive 값 우선
- 불필요한 연산을 피하기 위한 early return 패턴
- 이벤트 리스너에 `{ passive: true }` 적용 (preventDefault 미사용 시)
