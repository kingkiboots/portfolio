import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { type Project } from "@/features/project-card";
import { type MdxPost } from "@/shared/lib/mdx";
import { Tag } from "@/shared/ui";
import { mdxComponents } from "@/shared/ui/mdx-components";

interface ProjectDetailPageProps {
  project: Project;
  post: MdxPost | null;
}

export default function ProjectDetailPage({
  project,
  post,
}: ProjectDetailPageProps) {
  return (
    <main className="min-h-screen pt-28 pb-20">
      <article className="container mx-auto px-6">
        {/* Back link */}
        <Link
          href="/#projects"
          className="group text-subtle duration-fast hover:text-primary mb-10 inline-flex items-center gap-2 text-sm font-medium transition-colors"
        >
          <svg
            className="duration-fast h-4 w-4 transition-transform group-hover:-translate-x-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 16l-4-4m0 0l4-4m-4 4h18"
            />
          </svg>
          Back to Projects
        </Link>

        {/* Hero image */}
        {project.thumbnail && (
          <div className="mb-10 overflow-hidden rounded-xl shadow-lg">
            <img
              src={project.thumbnail}
              alt={project.title}
              className="h-auto w-full object-cover"
            />
          </div>
        )}

        {/* Header */}
        <div className="mb-10">
          <h1 className="text-foreground text-3xl font-bold sm:text-4xl lg:text-5xl">
            {project.title}
          </h1>

          <div className="text-subtle mt-4 flex flex-wrap items-center gap-4 text-sm">
            <span className="inline-flex items-center gap-1.5">
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              {project.period}
            </span>
            {project.role && (
              <span className="inline-flex items-center gap-1.5">
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                {project.role}
              </span>
            )}
          </div>
        </div>

        {/* Content grid */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          {/* Main content */}
          <div className="lg:col-span-2">
            {post ? (
              <div className="mdx-content text-foreground">
                <MDXRemote
                  source={post.content}
                  components={mdxComponents}
                  options={{
                    mdxOptions: {
                      remarkPlugins: [remarkGfm],
                    },
                  }}
                />
              </div>
            ) : (
              <section>
                <h2 className="text-foreground mb-4 text-xl font-semibold">
                  Overview
                </h2>
                <p className="text-subtle text-base leading-relaxed">
                  {project.detail ?? project.description}
                </p>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-28 space-y-8">
              {/* Tech stack */}
              <div className="border-border bg-surface rounded-lg border p-6">
                <h3 className="text-tertiary mb-4 text-sm font-semibold tracking-wider uppercase">
                  Tech Stack
                </h3>
                <ul className="flex flex-wrap gap-2" role="list">
                  {project.tags.map((tag) => (
                    <li key={tag}>
                      <Tag variant="primary" size="sm">
                        {tag}
                      </Tag>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Links */}
              {(project.links?.website ||
                project.links?.github ||
                project.links?.demo) && (
                <div className="border-border bg-surface rounded-lg border p-6">
                  <h3 className="text-tertiary mb-4 text-sm font-semibold tracking-wider uppercase">
                    Links
                  </h3>
                  <div className="flex flex-col gap-3">
                    {project.links.website && (
                      <a
                        href={project.links.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary duration-fast hover:text-primary-dark inline-flex items-center gap-2 text-sm font-medium transition-colors"
                      >
                        <svg
                          className="h-4 w-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          />
                        </svg>
                        웹사이트 방문
                      </a>
                    )}
                    {project.links.demo && (
                      <a
                        href={project.links.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary duration-fast hover:text-primary-dark inline-flex items-center gap-2 text-sm font-medium transition-colors"
                      >
                        <svg
                          className="h-4 w-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                          />
                        </svg>
                        데모 보기
                      </a>
                    )}
                    {project.links.github && (
                      <a
                        href={project.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary duration-fast hover:text-primary-dark inline-flex items-center gap-2 text-sm font-medium transition-colors"
                      >
                        <svg
                          className="h-4 w-4"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                        GitHub 저장소
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          </aside>
        </div>
      </article>
    </main>
  );
}
