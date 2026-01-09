import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // SSG: 정적 사이트로 export (out/ 폴더에 생성)
  output: "export",

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
