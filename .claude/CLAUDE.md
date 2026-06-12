# CLAUDE.md

## 프로젝트

Next.js 15 / TypeScript / Tailwind CSS 4 기반 개인 포트폴리오. GitHub Pages 정적 배포.
배포: https://kingkiboots.github.io/portfolio/

## 명령어

```bash
pnpm dev      # 개발 서버 (Turbopack)
pnpm build    # 정적 빌드 → out/
pnpm lint     # ESLint (FSD 레이어 규칙 포함)
```

## 아키텍처

Feature-Sliced Design (FSD). 레이어 의존은 단방향: `app → views → widgets → features → entities → shared`.
같은 레이어 간 import 금지. 위반 시 lint 에러 발생.
→ 상세: [agent_docs/architecture.md](agent_docs/architecture.md)

## 콘텐츠 구조

프로젝트 추가·수정 시 건드릴 파일 목록.
→ 상세: [agent_docs/content-structure.md](agent_docs/content-structure.md)

## 커밋 컨벤션

형식: `<type>(<scope>): <한글 설명>`

| 타입 | 설명 |
|------|------|
| `feat` | 기능 추가 |
| `fix` | 버그 수정 |
| `refactor` | 리팩토링 |
| `chore` | 설정·콘텐츠 변경 |
| `docs` | 문서 수정 |

scope는 변경 대상 슬라이스명 또는 영역명 (예: `feat(project):`, `fix(ui):`).
**push는 명시적 요청 시에만 실행.**

## 실행 권한

자동 허용: `git status/diff/log/add/commit`, `pnpm lint/build/dev`, `find/ls/grep`
확인 필요: `git push`, `git reset`, `pnpm install/add/remove`, 파일 삭제

## 이 파일 수정 시

**CLAUDE.md는 반드시 사용자 승인 후에만 수정한다.**
