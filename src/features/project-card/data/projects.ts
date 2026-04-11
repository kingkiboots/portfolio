import { type Project } from "../types/project.types";

export const projects: Project[] = [
  {
    id: "1",
    slug: "kbank-admin-portal",
    title: "케이뱅크 서비스 관리자포털 구축",
    description: "케이뱅크의 SPA 관리자 페이지를 구축하고 있습니다.",
    detail:
      "케이뱅크의 서비스 관리를 위한 어드민 포털을 처음부터 설계하고 구축하는 프로젝트입니다. Turborepo 기반 모노레포로 구성하여 여러 패키지의 코드 공유와 빌드 최적화를 달성했습니다. MUI 기반 디자인 시스템과 Storybook을 활용한 컴포넌트 개발, Plop을 통한 코드 자동 생성, Vitest 기반 테스트 환경을 구축했습니다.",
    period: "2025.12 - 현재",
    role: "프론트엔드 개발",
    thumbnail:
      "https://www.kbanknow.com/resource/img/bim/adm_kbank_og_default_2025.png",
    size: "sm",
    tags: [
      "React",
      "Typescript",
      "Turborepo",
      "Vite",
      "TanStack-Query",
      "Zustand",
      "Module-Federation",
      "MUI",
      "Storybook",
      "Plop",
      "FSD",
      "Vitest",
      "Gitlab CI/CD",
      "Docker",
      "Git",
      "Figma",
    ],
    links: {},
  },
  {
    id: "2",
    slug: "lotte-hotel-renewal",
    title: "롯데호텔 채널시스템 리뉴얼",
    description:
      "글로벌 호텔 이용객을 대상으로 한 롯데호텔 홈페이지를 리뉴얼했습니다. 다국어 지원, 호텔 예약 시스템, 호텔 정보 제공 등 다양한 기능을 제공합니다.",
    detail:
      "롯데호텔의 글로벌 채널 시스템을 완전히 리뉴얼한 대규모 프로젝트입니다. 다국어(i18n) 지원, 호텔 예약 시스템, SEO 최적화(react-helmet), Puppeteer 기반 프리렌더링, Google Analytics 연동 등 다양한 기능을 구현했습니다. FSD 아키텍처를 도입하여 코드의 유지보수성과 확장성을 확보했습니다.",
    period: "2024.04 - 2025.05",
    role: "프론트엔드 리드",
    thumbnail:
      "https://img.lottehotel.com/cms/asset/2025/04/16/26521/link_img.webp",
    gif: "/resources/img/projects/lotte-hotel-renewal/pc1.gif",
    size: "md",
    tags: [
      "React",
      "Typescript",
      "Vite",
      "TanStack-Query",
      "Zustand",
      "Storybook",
      "FSD",
      "i18n",
      "react-helmet",
      "Puppeteer",
      "Google Analytics",
      "SVN",
    ],
    links: {
      website: "https://www.lottehotel.com",
    },
  },
  {
    id: "3",
    slug: "e4net-homepage-renewal",
    title: "이포넷 홈페이지 리뉴얼",
    description:
      "회사 홈페이지를 리뉴얼하는 프로젝트입니다. 다국어와 백엔드 통합 빌드를 지원합니다.",
    detail:
      "이포넷 회사 홈페이지를 React 기반으로 리뉴얼한 프로젝트입니다. 다국어(i18n) 지원과 Spring Boot 백엔드와의 통합 빌드를 구현했으며, Maven을 활용한 프론트/백 통합 빌드 파이프라인과 Gitlab CI/CD 자동 배포 환경을 구축했습니다.",
    period: "2023.10 - 2023.11",
    role: "프론트엔드 개발",
    size: "sm",
    tags: [
      "React",
      "Typescript",
      "Vite",
      "Context API",
      "i18n",
      "react-helmet",
      "Spring Boot",
      "Maven",
      "Git",
      "Gitlab CI/CD",
    ],
    thumbnail: "https://www.e4net.net/assets/img/custom/E4NET-CI.png",
    gif: "/resources/img/projects/e4-renewal/pc.gif",
    links: {
      website: "https://www.e4net.net",
    },
  },
  {
    id: "4",
    slug: "admin-typescript-migration",
    title: "관리자 페이지 Typescript 마이그레이션",
    description:
      "프로젝트마다 사용되는 관리자 페이지를 TypeScript로 마이그레이션하여 코드 품질과 유지보수성을 향상시키며 성능최적화를 진행했습니다.",
    detail:
      "기존 JavaScript로 작성된 관리자 페이지를 TypeScript로 전환하는 마이그레이션 프로젝트입니다. 타입 안정성 확보를 통해 런타임 에러를 줄이고, 코드 자동완성과 리팩토링 용이성을 크게 개선했습니다. 동시에 번들 사이즈 최적화와 렌더링 성능 개선도 진행했습니다.",
    period: "2023.10 - 2023.10",
    role: "프론트엔드 개발",
    size: "sm",
    tags: [
      "React",
      "TypeScript",
      "Recoil",
      "Bootstrap",
      "Styled-Component",
      "Git",
    ],
    links: {},
  },
  {
    id: "5",
    slug: "sectanine-pay2",
    title: "섹타나인 pay2.0 시스템 개발",
    description:
      "해피포인트 머니/카드의 대고객 웹뷰와 관리자 페이지를 개발했습니다.",
    detail:
      "해피포인트 머니/카드 서비스의 대고객 웹뷰와 관리자 페이지를 개발한 프로젝트입니다. 결제 시스템과 연동되는 프론트엔드 인터페이스를 구현하고, Webpack과 Gulp을 활용한 빌드 환경을 구성했습니다. Bootstrap과 Styled-Component를 활용한 반응형 UI를 개발했습니다.",
    period: "2023.01 - 2023.07",
    role: "프론트엔드 개발",
    thumbnail:
      "https://front.happypointcard.com/ha/resources/api/images_renewal/event/event-share-default.png",
    size: "sm",
    tags: [
      "React",
      "Javascript",
      "Webpack",
      "Recoil",
      "Gulp",
      "Bootstrap",
      "Styled-Component",
      "Git",
      "Figma",
    ],
    links: {
      website:
        "https://napi.happypointcard.com/page/gate/happypay-money.spc?returl=%252Fgateway.html%253Fview%253Dmain.html",
    },
  },
  {
    id: "6",
    slug: "e4-edu-ios",
    title: "E4.카드결제시스템실습프로젝트-IOS",
    description: "SwiftUI 기반의 카드결제시스템 실습 프로젝트를 진행했습니다.",
    detail:
      "Spring Boot를 통해 백엔드 서버를 구축하고, React.js를 통해 프론트엔드 애플리케이션을 개발했습니다. 선불 머니 충전, 상품 결제, 상품 판매 등의 기능이 구현되어 있습니다. Android와 SwiftUI를 통해 로그인과 회원가입을 구현하였고 그 외 기능은 Webview를 통해 구현했습니다.",
    period: "2022.12 - 2023.01",
    role: "풀스택 개발",
    thumbnail: "/resources/img/projects/e4-edu-ios/thumbnail.png",
    gif: "/resources/img/projects/e4-edu-ios/ios.gif",
    size: "sm",
    tags: ["Swift", "Xcode", "Git"],
    links: {
      github: "https://github.com/kingkiboots/e4_edu/tree/KIMKIHYEON",
    },
  },
  {
    id: "7",
    slug: "e4-edu-aos",
    title: "E4.카드결제시스템실습프로젝트-AOS",
    description: "Android 기반의 카드결제시스템 실습 프로젝트를 진행했습니다.",
    detail:
      "Spring Boot를 통해 백엔드 서버를 구축하고, React.js를 통해 프론트엔드 애플리케이션을 개발했습니다. 선불 머니 충전, 상품 결제, 상품 판매 등의 기능이 구현되어 있습니다. Android와 SwiftUI를 통해 로그인과 회원가입을 구현하였고 그 외 기능은 Webview를 통해 구현했습니다.",
    period: "2022.12",
    role: "풀스택 개발",
    thumbnail: "/resources/img/projects/e4-edu-aos/join_scr.png",
    gif: "/resources/img/projects/e4-edu-aos/aos.gif",
    size: "sm",
    tags: ["Java", "Kotlin", "Android Studio", "Git"],
    links: {
      github: "https://github.com/kingkiboots/e4_edu/tree/KIMKIHYEON",
    },
  },
  {
    id: "8",
    slug: "e4-edu-web",
    title: "E4.카드결제시스템실습프로젝트-web",
    description:
      "Spring Boot, React.js 기반의 카드결제시스템 실습 프로젝트를 진행했습니다.",
    detail:
      "Spring Boot를 통해 백엔드 서버를 구축하고, React.js를 통해 프론트엔드 애플리케이션을 개발했습니다. 선불 머니 충전, 상품 결제, 상품 판매 등의 기능이 구현되어 있습니다. Android와 SwiftUI를 통해 로그인과 회원가입을 구현하였고 그 외 기능은 Webview를 통해 구현했습니다.",
    period: "2022.11",
    role: "풀스택 개발",
    thumbnail: "/resources/img/projects/e4-edu-web/main.png",
    size: "sm",
    tags: [
      "Spring Boot",
      "React",
      "PostgreSQL",
      "Docker",
      "Java",
      "JPA",
      "Javascript",
      "Bootstrap",
      "Styled-Component",
      "Git",
    ],
    links: {
      github: "https://github.com/kingkiboots/e4_edu/tree/KIMKIHYEON",
    },
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getAllProjectSlugs(): string[] {
  return projects.map((p) => p.slug);
}
