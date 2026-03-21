import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  getAllProjectSlugs,
  getProjectBySlug,
} from "@/features/project-card";
import { getPostBySlug, getAllPostSlugs } from "@/shared/lib/mdx";
import ProjectDetailPage from "@/views/project-detail";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  const projectSlugs = getAllProjectSlugs();
  const postSlugs = getAllPostSlugs();
  const allSlugs = [...new Set([...projectSlugs, ...postSlugs])];
  return allSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};

  return {
    title: `${project.title} | 김기현 포트폴리오`,
    description: project.description,
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  const post = getPostBySlug(slug);

  if (!project) notFound();

  return <ProjectDetailPage project={project} post={post} />;
}
