import type { MDXRemoteProps } from "next-mdx-remote/rsc";
import React from "react";
import { CommonImage } from "@/shared/ui";

type MDXComponents = NonNullable<MDXRemoteProps["components"]>;

function extractText(children: unknown): string {
  if (typeof children === "string") return children;
  if (Array.isArray(children)) return children.map(extractText).join("");
  return "";
}
import { HighlightBox } from "./HighlightBox";
import { ArchitectureImage } from "./ArchitectureImage";
import { ResultCard } from "./ResultCard";
import { MermaidDiagram } from "./MermaidDiagram";

export { HighlightBox, ArchitectureImage, ResultCard };

export const mdxComponents: MDXComponents = {
  // Custom components
  HighlightBox,
  ArchitectureImage,
  ResultCard,

  // img override: basePath prefix + error fallback
  img: ({ src, alt, ...props }) => (
    <CommonImage
      src={src || ""}
      alt={alt || ""}
      className="my-6 w-full rounded-lg"
      {...props}
    />
  ),

  // HTML tag overrides for consistent typography
  h2: ({ children, ...props }) => (
    <h2
      className="border-border text-foreground mt-12 mb-4 border-b pb-2 text-2xl font-bold"
      {...props}
    >
      {children}
    </h2>
  ),
  h3: ({ children, ...props }) => (
    <h3 className="text-foreground mt-8 mb-3 text-xl font-semibold" {...props}>
      {children}
    </h3>
  ),
  h4: ({ children, ...props }) => (
    <h4 className="text-foreground mt-6 mb-2 text-lg font-semibold" {...props}>
      {children}
    </h4>
  ),
  p: ({ children, ...props }) => (
    <p className="text-foreground my-4 leading-relaxed" {...props}>
      {children}
    </p>
  ),
  ul: ({ children, ...props }) => (
    <ul className="text-foreground my-4 list-disc space-y-2 pl-6" {...props}>
      {children}
    </ul>
  ),
  ol: ({ children, ...props }) => (
    <ol className="text-foreground my-4 list-decimal space-y-2 pl-6" {...props}>
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
      className="text-primary decoration-primary/30 duration-fast hover:decoration-primary font-medium underline underline-offset-2 transition-colors"
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
      {...props}
    >
      {children}
    </a>
  ),
  strong: ({ children, ...props }) => (
    <strong className="text-foreground font-semibold" {...props}>
      {children}
    </strong>
  ),
  blockquote: ({ children, ...props }) => (
    <blockquote
      className="border-primary/30 text-subtle my-6 border-l-4 pl-4 italic"
      {...props}
    >
      {children}
    </blockquote>
  ),
  hr: (props) => <hr className="border-border my-8" {...props} />,
  code: ({ children, ...props }) => {
    const isInline = typeof children === "string";
    if (isInline) {
      return (
        <code
          className="bg-foreground/5 text-foreground rounded px-1.5 py-0.5 font-mono text-sm"
          {...props}
        >
          {children}
        </code>
      );
    }
    return <code {...props}>{children}</code>;
  },
  pre: ({ children, ...props }) => {
    // React.Children.only 대신 toArray로 안전하게 탐색
    // (MDX가 code 앞뒤에 whitespace text node를 끼워넣을 수 있음)
    const codeEl = React.Children.toArray(children).find(
      (
        child,
      ): child is React.ReactElement<{
        className?: string;
        children?: unknown;
      }> =>
        React.isValidElement(child) &&
        typeof (child.props as { className?: string }).className === "string" &&
        (child.props as { className?: string }).className!.includes(
          "language-mermaid",
        ),
    );

    if (codeEl) {
      const chart = extractText(codeEl.props.children);
      return <MermaidDiagram chart={chart} />;
    }

    return (
      <pre
        className="border-border bg-surface-elevated my-6 overflow-x-auto rounded-lg border p-4 text-sm"
        {...props}
      >
        {children}
      </pre>
    );
  },
};
