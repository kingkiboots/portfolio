# 콘텐츠 구조

## 프로젝트 추가 시 수정할 파일

| 역할 | 경로 |
|------|------|
| 프로젝트 목록 데이터 | `src/features/project-card/data/projects.ts` |
| 상세 페이지 본문 | `src/content/projects/<slug>.mdx` |
| 썸네일·이미지 | `public/resources/img/projects/<slug>/` |
| 기술 스택 아이콘 | `src/entities/project/lib/tech-icons.ts` |

## projects.ts 주요 필드

- `slug`: URL 식별자. MDX 파일명·이미지 폴더명과 반드시 일치해야 함
- `size`: `"md"` (홈 그리드 대형 카드) / `"sm"` (소형 카드)
- `tags`: `tech-icons.ts`에 등록된 키와 일치해야 아이콘이 표시됨
- `thumbnail`: `public/` 기준 경로 (`/resources/img/projects/<slug>/...`)
- MDX 파일이 없으면 `detail` 필드가 상세 페이지 폴백으로 표시됨

## MDX 작성

이미지 경로는 `/resources/img/projects/<slug>/파일명` 형태로 작성.
GitHub Pages `basePath`는 `CommonImage` 컴포넌트가 자동 처리.

### 사용 가능한 커스텀 컴포넌트

별도 import 없이 MDX 내에서 바로 사용 가능.

- `<HighlightBox type="info|warning|success|error" title="...">` — 강조 박스
- `<ArchitectureImage src="..." caption="..." isFullWidthString="true|false" />` — 다이어그램 이미지
- `<ResultCard type="..." title="..." value="..." description="..." />` — 수치 지표 카드
- ` ```mermaid ``` ` — Mermaid 다이어그램 (클라이언트에서 SVG 렌더링)

구현 위치: `src/shared/ui/mdx-components/`
