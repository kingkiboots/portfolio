# CLAUDE.md

이 파일은 Claude Code가 이 프로젝트에서 작업할 때 참조하는 가이드입니다.

## 프로젝트 개요

Next.js 15 기반 개인 포트폴리오 사이트. GitHub Pages에 정적으로 배포됩니다.
배포 주소: https://kingkiboots.github.io/portfolio/

## 기술 스택

| 분류 | 기술 |
|------|------|
| Framework | Next.js 15 (App Router, Static Export) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 4 |
| UI | React 19, Radix UI |
| Linter | ESLint 10 + eslint-plugin-boundaries |
| Formatter | Prettier + prettier-plugin-tailwindcss |
| Package Manager | pnpm |
| Deploy | GitHub Pages (GitHub Actions) |
| MDX | next-mdx-remote, rehype-pretty-code |
| Animation | GSAP |

## 개발 명령어

```bash
pnpm dev        # 개발 서버 (Turbopack)
pnpm build      # 정적 빌드 → out/
pnpm preview    # 빌드 결과 로컬 미리보기
pnpm lint       # ESLint (FSD 레이어 규칙 포함)
```

## 아키텍처: Feature-Sliced Design (FSD)

```
src/
├── app/        # Next.js App Router (라우트 셸, 레이아웃, 프로바이더)
├── views/      # 페이지 단위 컴포넌트
├── widgets/    # 독립적인 UI 블록 (Header, Footer, Section 등)
├── features/   # 사용자 인터랙션 및 비즈니스 기능
├── entities/   # 비즈니스 엔티티
└── shared/     # 공용 UI, 유틸리티, 환경변수
```

### 레이어 의존 방향 (단방향, 위반 시 lint 에러)

```
app → views → widgets → features → entities → shared
```

- 같은 레이어 간 import 금지
- 하위에서 상위 레이어 import 금지
- `eslint-plugin-boundaries`로 자동 강제

### App Router + FSD 결합 원칙

- `app/*/page.tsx`: 라우트 셸 — 데이터 리졸브 + 뷰 렌더링 위임
- `src/views/*/ui/*.tsx`: 순수 뷰 컴포넌트 — props만으로 동작

### Public API 규칙

```typescript
// O — 슬라이스 index.ts를 통해 import
import { useOgImage } from "@/features/project-card";

// X — 내부 세그먼트 직접 import (lint error: boundaries/entry-point)
import { useOgImage } from "@/features/project-card/lib/use-og-image";
```

슬라이스 단위로만 `index.ts`를 두고 export. 레이어 단위 barrel export 없음.

## 슬라이스 세그먼트 구조

| 세그먼트 | 용도 |
|---------|------|
| `ui/` | React 컴포넌트 |
| `lib/` | 커스텀 훅 (`use-*.ts`) |
| `model/` | 비즈니스 로직 (순수 함수) |
| `types/` | 타입 정의 |
| `data/` | 정적 데이터 |

## 파일 네이밍 컨벤션

| 유형 | 케이스 | 예시 |
|------|--------|------|
| 컴포넌트 | PascalCase | `ProjectCard.tsx` |
| 커스텀 훅 | kebab-case | `use-og-image.ts` |
| 일반 함수 | kebab-case | `get-project-url.ts` |
| 타입 정의 | kebab-case + `.types.ts` | `project.types.ts` |

## 커밋 컨벤션

Conventional Commits 형식, **메시지는 한글**로 작성.

```
<type>(<scope>): <subject>
```

### 타입

| 타입 | 설명 |
|------|------|
| `feat` | 새로운 기능 추가 |
| `fix` | 버그 수정 |
| `refactor` | 리팩토링 (기능 변경 없음) |
| `style` | 코드 포맷팅, 세미콜론 등 |
| `docs` | 문서 수정 |
| `chore` | 빌드, 설정, 콘텐츠(MDX·이미지) 변경 |

### scope 규칙

- 변경 대상 슬라이스명 사용: `feat(project):`, `fix(career):`
- 특정 파일/영역 변경: `feat(tech-icons):`, `fix(ui):`
- 설정·인프라·문서 전반은 생략: `chore:`, `docs:`

### 커밋 분리 기준

- 기능 추가와 버그 수정은 분리
- 동일 목적의 여러 파일 변경은 하나로 묶음
- MDX 콘텐츠·이미지 추가는 `chore:`
- 타입/데이터 구조 변경은 `refactor:`

### 실제 예시

```
feat(project): ho-eat & game-matching-site 프로젝트 추가 및 id 필드 제거
feat(tech-icons): Spring Boot, Websocket 아이콘 추가 및 Spring 분리
chore: kbank-admin-portal Module-Federation 아키텍처 다이어그램 추가
fix: trailing whitespace 제거 및 코드 스타일 정리
feat(career): responsibilities 필드 추가 및 CareerCard UI 개선
fix(ui): ProjectThumbnail 세로로 길면 가로 다차고 확대되는 현상 수정
```

### push 정책

커밋은 자유롭게 수행하되, **push는 반드시 사용자가 직접 또는 명시적으로 요청한 경우에만** 실행한다.

## 코드 품질 원칙

- 조건부 렌더링: `&&` 대신 ternary(`? :`) 사용
- 이전 상태 기반 업데이트: functional `setState` 사용
- `useEffect` dependency: primitive 값 우선
- 불필요한 연산 방지: early return 패턴 적용
- 이벤트 리스너: `{ passive: true }` 적용 (preventDefault 미사용 시)

## 프로젝트 콘텐츠 구조

- 프로젝트 목록: `src/features/project-card/data/projects.ts`
- 프로젝트 상세 MDX: `src/content/projects/<slug>.mdx`
- 프로젝트 썸네일/이미지: `public/resources/img/projects/<slug>/`
- 아이콘 매핑: `src/entities/project/lib/tech-icons.ts`

## 배포

GitHub Actions를 통해 `main` 브랜치 push 시 자동 빌드 및 GitHub Pages 배포.

---

## Claude 실행 권한

`.claude/settings.local.json`에 등록된 허용 목록 기준.

### 확인 없이 자동 실행 가능

| 명령 | 용도 |
|------|------|
| `git status / diff / log` | 변경사항 조회 |
| `git add <파일>` | 스테이징 |
| `git commit -m "..."` | 커밋 (push 제외) |
| `pnpm lint` | ESLint 검사 |
| `pnpm build` | 정적 빌드 |
| `pnpm dev` | 개발 서버 실행 |
| `find`, `ls`, `grep` | 파일 탐색 및 검색 |

### 반드시 사용자 확인 후 실행

| 명령 | 이유 |
|------|------|
| `git push` | 원격 반영 — 되돌리기 어려움 |
| `git reset / checkout` | 로컬 변경사항 손실 위험 |
| `pnpm install / add / remove` | 의존성 변경 |
| 파일 삭제 (`rm`) | 복구 불가 |
