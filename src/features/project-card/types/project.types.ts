export interface Project {
  id: string;
  title: string;
  description: string;
  period: string;
  tags: string[];
  thumbnail?: string;
  links?: {
    demo?: string;
    website?: string;
    github?: string;
  };
}
