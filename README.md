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

## 프로젝트 콘텐츠 구조

프로젝트 하나를 추가하려면 아래 4곳을 수정/추가합니다.

| 역할 | 경로 |
|------|------|
| 프로젝트 목록 데이터 | `src/features/project-card/data/projects.ts` |
| 상세 페이지 콘텐츠 | `src/content/projects/<slug>.mdx` |
| 썸네일 · 이미지 | `public/resources/img/projects/<slug>/` |
| 기술 스택 아이콘 | `src/entities/project/lib/tech-icons.ts` |

### projects.ts 필드

```typescript
{
  slug: string;          // URL 식별자 (MDX 파일명 · 이미지 폴더명과 일치)
  title: string;
  description: string;   // 카드 한 줄 요약
  detail?: string;       // MDX 없을 때 상세 페이지 대체 텍스트
  period: string;        // 예: "2023.03 ~ 현재"
  role?: string;         // 예: "프론트엔드 개발"
  thumbnail?: string;    // public/ 기준 경로
  gif?: string;          // 호버 시 재생되는 GIF
  size: "md" | "sm";     // 홈 그리드 카드 크기
  tags: string[];        // tech-icons.ts에 등록된 키와 일치해야 아이콘 표시
  links: { website?, github?, demo? };
}
```

### 이미지 경로 규칙

```
public/
└── resources/img/projects/
    └── <slug>/
        ├── <slug>_scr.png        # 썸네일 (thumbnail 필드에 지정)
        └── *.png / *.gif         # MDX 내부에서 참조하는 이미지
```

MDX 내부에서 이미지를 참조할 때는 `/resources/img/projects/<slug>/파일명` 형태로 작성합니다.
GitHub Pages 배포 시 `basePath`가 자동으로 붙습니다 (`CommonImage` 컴포넌트가 처리).

---

## MDX 구현

프로젝트 상세 페이지의 본문은 `src/content/projects/<slug>.mdx` 파일로 관리합니다.
MDX 파일이 없으면 `projects.ts`의 `detail` 필드를 폴백으로 표시합니다.

### 관련 파일

| 파일 | 역할 |
|------|------|
| `src/shared/lib/mdx.ts` | `gray-matter`로 MDX 파일 읽기 (frontmatter + 본문 분리) |
| `app/projects/[slug]/page.tsx` | 라우트 셸 — slug로 데이터 리졸브 후 뷰에 위임 |
| `src/views/project-detail/ui/ProjectDetailPage.tsx` | `MDXRemote`로 본문 렌더링, 플러그인 파이프라인 정의 |
| `src/shared/ui/mdx-components/index.tsx` | 커스텀 컴포넌트 · HTML 태그 오버라이드 등록 |

### 렌더링 흐름

```
MDX 파일
  └─ gray-matter (frontmatter 파싱)
       └─ MDXRemote (next-mdx-remote/rsc — React Server Component)
            ├─ remark-gfm          # GitHub Flavored Markdown 지원
            ├─ rehypePreprocessCode # mermaid 코드블록 사전 추출 (커스텀)
            ├─ rehype-pretty-code   # shiki 기반 코드 신택스 하이라이팅
            └─ rehype-slug          # 헤딩에 id 자동 부여
```

### 코드 하이라이팅

`rehype-pretty-code` + `shiki`로 처리하며, light/dark 테마를 CSS 변수로 동시에 주입합니다.

```typescript
theme: { dark: "github-dark", light: "github-light" }
```

shiki가 주입하는 인라인 `background-color` 스타일은 Tailwind 클래스로 제어하기 위해 `transformers`에서 제거합니다.

### Mermaid 다이어그램

````md
```mermaid
graph TD
  A --> B
```
````

위처럼 작성하면 클라이언트에서 SVG로 렌더링됩니다. 처리 과정:

1. `rehypePreprocessCode` (커스텀 rehype 플러그인): HAST 트리를 순회하며 `language-mermaid` 코드블록의 소스를 `<pre data-mermaid-source="...">` 속성으로 저장하고, `language-mermaid` 클래스를 제거해 `rehype-pretty-code`가 건드리지 않도록 함
2. `mdxComponents`의 `pre` 오버라이드: `data-mermaid-source` 속성이 있으면 `<MermaidDiagram>` 렌더링
3. `MermaidDiagram` (Client Component): `mermaid` 라이브러리를 동적 import해 SVG를 생성, 모듈 레벨 싱글톤으로 초기화를 한 번만 수행

### 커스텀 MDX 컴포넌트

MDX 파일 내에서 아래 컴포넌트를 별도 import 없이 바로 사용할 수 있습니다.

#### `<HighlightBox>`

강조 박스 (info / warning / success / error).

```mdx
<HighlightBox type="info" title="참고">
  내용을 여기에 작성합니다.
</HighlightBox>
```

#### `<ArchitectureImage>`

아키텍처 다이어그램 이미지. `isFullWidthString` 기본값은 `"true"`.

```mdx
<ArchitectureImage
  src="/resources/img/projects/my-project/architecture.png"
  caption="시스템 아키텍처"
  isFullWidthString="false"
/>
```

#### `<ResultCard>`

수치 지표 카드 (info / warning / success / error).

```mdx
<ResultCard type="success" title="빌드 시간 단축" value="68%" description="Turborepo Remote Caching 적용 후" />
```

---

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
