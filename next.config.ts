import type { NextConfig } from "next";
import path from "path";

// GitHub Pages 배포 시 레포 이름으로 basePath 설정 필요
// 로컬 개발: GITHUB_ACTIONS 환경변수 없음 → basePath 없음
// GitHub Actions: GITHUB_ACTIONS=true → basePath 설정
const isGithubPages = process.env.GITHUB_ACTIONS === "true";
const repoName = "portfolio";

const nextConfig: NextConfig = {
  // SSG: 정적 사이트로 export (out/ 폴더에 생성)
  output: "export",

  // NEXT_PUBLIC_ 접두사 없이도 클라이언트 번들에서 환경변수 접근 가능하도록 설정
  env: {
    EMAIL: process.env.EMAIL,
    URL_GITHUB: process.env.URL_GITHUB,
    URL_LINKEDIN: process.env.URL_LINKEDIN,
    URL_BLOG: process.env.URL_BLOG,
    RESUME_URL: process.env.RESUME_URL,
  },

  // GitHub Pages 배포 시 basePath 설정
  basePath: isGithubPages ? `/${repoName}` : "",
  assetPrefix: isGithubPages ? `/${repoName}/` : "",

  // 워크스페이스 루트 명시 (multiple lockfiles 경고 해결)
  outputFileTracingRoot: path.join(__dirname, "./"),

  // 이미지 최적화는 서버가 필요하므로 정적 export에서는 unoptimized 사용
  images: {
    unoptimized: true,
  },

  // trailing slash 추가 (정적 호스팅 호환성 향상)
  trailingSlash: true,
};

export default nextConfig;
