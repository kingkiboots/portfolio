import type { MDXRemoteProps } from "next-mdx-remote/rsc";
import React from "react";

type MDXComponents = NonNullable<MDXRemoteProps["components"]>;
import { HighlightBox } from "./HighlightBox";
import { ArchitectureImage } from "./ArchitectureImage";
import { ResultCard } from "./ResultCard";
import { MermaidDiagram } from "./MermaidDiagram";

export { HighlightBox, ArchitectureImage, ResultCard, MermaidDiagram };

export const mdxComponents: MDXComponents = {
  // Custom components
  HighlightBox,
  ArchitectureImage,
  ResultCard,
  MermaidDiagram,

  // HTML tag overrides for consistent typography
  h2: ({ children, ...props }) => (
    <h2
      className="mt-12 mb-4 border-b border-border pb-2 text-2xl font-bold text-foreground"
      {...props}
    >
      {children}
    </h2>
  ),
  h3: ({ children, ...props }) => (
    <h3
      className="mt-8 mb-3 text-xl font-semibold text-foreground"
      {...props}
    >
      {children}
    </h3>
  ),
  h4: ({ children, ...props }) => (
    <h4
      className="mt-6 mb-2 text-lg font-semibold text-foreground"
      {...props}
    >
      {children}
    </h4>
  ),
  p: ({ children, ...props }) => (
    <p className="my-4 leading-relaxed text-subtle" {...props}>
      {children}
    </p>
  ),
  ul: ({ children, ...props }) => (
    <ul
      className="my-4 list-disc space-y-2 pl-6 text-subtle"
      {...props}
    >
      {children}
    </ul>
  ),
  ol: ({ children, ...props }) => (
    <ol
      className="my-4 list-decimal space-y-2 pl-6 text-subtle"
      {...props}
    >
      {children}
    </ol>
  ),
  li: ({ children, ...props }) => (
    <li className="leading-relaxed" {...props}>
      {children}
    </li>
  ),
  a: ({ children, href, ...props }) => (
    <a
      href={href}
      className="font-medium text-primary underline decoration-primary/30 underline-offset-2 transition-colors duration-fast hover:decoration-primary"
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
      {...props}
    >
      {children}
    </a>
  ),
  strong: ({ children, ...props }) => (
    <strong className="font-semibold text-foreground" {...props}>
      {children}
    </strong>
  ),
  blockquote: ({ children, ...props }) => (
    <blockquote
      className="my-6 border-l-4 border-primary/30 pl-4 italic text-subtle"
      {...props}
    >
      {children}
    </blockquote>
  ),
  hr: (props) => <hr className="my-8 border-border" {...props} />,
  code: ({ children, ...props }) => {
    const isInline = typeof children === "string";
    if (isInline) {
      return (
        <code
          className="rounded bg-foreground/5 px-1.5 py-0.5 text-sm font-mono text-foreground"
          {...props}
        >
          {children}
        </code>
      );
    }
    return <code {...props}>{children}</code>;
  },
  pre: ({ children, ...props }) => (
    <pre
      className="my-6 overflow-x-auto rounded-lg border border-border bg-surface-elevated p-4 text-sm"
      {...props}
    >
      {children}
    </pre>
  ),
};
