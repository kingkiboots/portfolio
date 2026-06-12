# 아키텍처

## FSD 레이어 구조

```
src/
├── app/        # Next.js App Router (라우트 셸, 레이아웃)
├── views/      # 페이지 단위 컴포넌트
├── widgets/    # 독립적인 UI 블록
├── features/   # 사용자 인터랙션 및 비즈니스 기능
├── entities/   # 비즈니스 엔티티
└── shared/     # 공용 UI, 유틸리티
```

## 슬라이스 세그먼트

| 세그먼트 | 용도 |
|---------|------|
| `ui/` | React 컴포넌트 |
| `lib/` | 커스텀 훅 (`use-*.ts`) |
| `model/` | 비즈니스 로직 (순수 함수) |
| `types/` | 타입 정의 |
| `data/` | 정적 데이터 |

각 슬라이스는 `index.ts`(Public API)를 통해서만 외부에 노출한다.
내부 세그먼트 직접 import 금지 (`lint error: boundaries/entry-point`).

## App Router + FSD 결합 원칙

`app/*/page.tsx`는 라우트 셸 역할만 한다 — 데이터 리졸브 후 `src/views/`에 위임.
`src/views/*/ui/*.tsx`는 props만으로 동작하는 순수 뷰 컴포넌트.

참고 구현: `app/projects/[slug]/page.tsx`, `src/views/project-detail/ui/ProjectDetailPage.tsx`
