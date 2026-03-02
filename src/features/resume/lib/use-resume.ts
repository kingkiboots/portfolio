import { getResumeUrl } from "../model/get-resume-url";

export function useResume() {
  const resumeUrl = getResumeUrl();
  const hasResume = Boolean(resumeUrl);

  return { resumeUrl, hasResume };
}
