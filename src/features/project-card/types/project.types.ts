export interface Project {
  id: string;
  slug: string;
  title: string;
  description: string;
  detail?: string;
  period: string;
  role?: string;
  tags: string[];
  thumbnail?: string;
  gif?: string;
  size?: "sm" | "md";
  links?: {
    demo?: string;
    website?: string;
    github?: string;
  };
}
