const basePath = process.env.BASE_PATH ?? "";

/**
 * `/`로 시작하는 로컬 절대경로에 basePath prefix를 추가합니다.
 * 외부 URL(http://, https://)이나 빈 문자열은 그대로 반환합니다.
 */
export function getAssetPath(src: string): string {
  if (!src || !src.startsWith("/")) return src;
  return `${basePath}${src}`;
}
