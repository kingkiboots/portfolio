import { ENV } from "@/shared/env";

export function getResumeUrl(): string {
  return ENV.RESUME_URL;
}
