import { type IconType } from "react-icons";
import { SiRecoil, SiReactquery, SiSocket, SiSpringboot } from "react-icons/si";

const DEVICON_BASE =
  "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons";

interface TechIcon {
  type: "img";
  url: string;
  hoverUrl?: string;
}

interface TechSvg {
  type: "icon";
  icon: IconType;
  color: string;
}

export type TechEntry = TechIcon | TechSvg;

export const techMap: Record<string, TechEntry> = {
  Android: {
    type: "img",
    url: `${DEVICON_BASE}/android/android-plain.svg`,
    hoverUrl: `${DEVICON_BASE}/android/android-original.svg`,
  },
  "Android Studio": {
    type: "img",
    url: `${DEVICON_BASE}/androidstudio/androidstudio-plain.svg`,
    hoverUrl: `${DEVICON_BASE}/androidstudio/androidstudio-original.svg`,
  },
  React: { type: "img", url: `${DEVICON_BASE}/react/react-original.svg` },
  Typescript: {
    type: "img",
    url: `${DEVICON_BASE}/typescript/typescript-plain.svg`,
    hoverUrl: `${DEVICON_BASE}/typescript/typescript-original.svg`,
  },
  TypeScript: {
    type: "img",
    url: `${DEVICON_BASE}/typescript/typescript-plain.svg`,
    hoverUrl: `${DEVICON_BASE}/typescript/typescript-original.svg`,
  },
  Javascript: {
    type: "img",
    url: `${DEVICON_BASE}/javascript/javascript-plain.svg`,
    hoverUrl: `${DEVICON_BASE}/javascript/javascript-original.svg`,
  },
  JavaScript: {
    type: "img",
    url: `${DEVICON_BASE}/javascript/javascript-plain.svg`,
    hoverUrl: `${DEVICON_BASE}/javascript/javascript-original.svg`,
  },
  Vite: {
    type: "img",
    url: `${DEVICON_BASE}/vitejs/vitejs-plain.svg`,
    hoverUrl: `${DEVICON_BASE}/vitejs/vitejs-original.svg`,
  },
  "Tailwind CSS": {
    type: "img",
    url: `${DEVICON_BASE}/tailwindcss/tailwindcss-original.svg`,
  },
  Storybook: {
    type: "img",
    url: `${DEVICON_BASE}/storybook/storybook-original.svg`,
  },
  Docker: { type: "img", url: `${DEVICON_BASE}/docker/docker-plain.svg` },
  Django: { type: "img", url: `${DEVICON_BASE}/django/django-plain.svg` },
  Git: { type: "img", url: `${DEVICON_BASE}/git/git-original.svg` },
  Figma: { type: "img", url: `${DEVICON_BASE}/figma/figma-original.svg` },
  Webpack: { type: "img", url: `${DEVICON_BASE}/webpack/webpack-original.svg` },
  Gulp: { type: "img", url: `${DEVICON_BASE}/gulp/gulp-plain.svg` },
  Spring: {
    type: "img",
    url: `${DEVICON_BASE}/spring/spring-original.svg`,
  },
  "Spring Boot": {
    type: "icon",
    icon: SiSpringboot,
    color: "#6DB33F",
  },
  Java: {
    type: "img",
    url: `${DEVICON_BASE}/java/java-plain.svg`,
    hoverUrl: `${DEVICON_BASE}/java/java-original.svg`,
  },
  Kotlin: {
    type: "img",
    url: `${DEVICON_BASE}/kotlin/kotlin-plain.svg`,
    hoverUrl: `${DEVICON_BASE}/kotlin/kotlin-original.svg`,
  },
  PostgreSQL: {
    type: "img",
    url: `${DEVICON_BASE}/postgresql/postgresql-plain.svg`,
  },
  Python: {
    type: "img",
    url: `${DEVICON_BASE}/python/python-original.svg`,
  },
  Maven: { type: "img", url: `${DEVICON_BASE}/maven/maven-original.svg` },
  "Google Analytics": {
    type: "img",
    url: `${DEVICON_BASE}/google/google-original.svg`,
  },
  "Gitlab CI/CD": {
    type: "img",
    url: `${DEVICON_BASE}/gitlab/gitlab-original.svg`,
  },
  SVN: {
    type: "img",
    url: `${DEVICON_BASE}/subversion/subversion-original.svg`,
  },
  Bootstrap: {
    type: "img",
    url: `${DEVICON_BASE}/bootstrap/bootstrap-original.svg`,
  },
  "Styled-Component": {
    type: "img",
    url: `${DEVICON_BASE}/css3/css3-original.svg`,
  },
  Puppeteer: {
    type: "img",
    url: `${DEVICON_BASE}/puppeteer/puppeteer-original.svg`,
  },
  Vitest: { type: "img", url: `${DEVICON_BASE}/vitest/vitest-original.svg` },
  Turborepo: { type: "img", url: `${DEVICON_BASE}/turbo/turbo-original.svg` },
  Recoil: { type: "icon", icon: SiRecoil, color: "#3578E5" },
  "TanStack-Query": { type: "icon", icon: SiReactquery, color: "#da3f4c" },
  Zustand: {
    type: "img",
    url: `${DEVICON_BASE}/zustand/zustand-plain.svg`,
    hoverUrl: `${DEVICON_BASE}/zustand/zustand-original.svg`,
  },
  Swift: {
    type: "img",
    url: `${DEVICON_BASE}/swift/swift-plain.svg`,
    hoverUrl: `${DEVICON_BASE}/swift/swift-original.svg`,
  },
  Websocket: { type: "icon", icon: SiSocket, color: "#000000" },
  Xcode: {
    type: "img",
    url: `${DEVICON_BASE}/xcode/xcode-plain.svg`,
    hoverUrl: `${DEVICON_BASE}/xcode/xcode-original.svg`,
  },
};
