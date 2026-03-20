import React from "react";

interface HighlightBoxProps {
  type?: "info" | "warning" | "success";
  title?: string;
  children: React.ReactNode;
}

const styles = {
  info: "border-primary/30 bg-primary/5",
  warning: "border-warning/30 bg-warning/5",
  success: "border-secondary/30 bg-secondary/5",
};

const iconColors = {
  info: "text-primary",
  warning: "text-warning",
  success: "text-secondary",
};

export function HighlightBox({
  type = "info",
  title,
  children,
}: HighlightBoxProps) {
  return (
    <aside
      className={`my-6 rounded-lg border-l-4 p-5 ${styles[type]}`}
      role="note"
    >
      {title && (
        <p className={`mb-2 text-sm font-semibold ${iconColors[type]}`}>
          {title}
        </p>
      )}
      <div className="text-subtle text-sm leading-relaxed [&>ul]:mt-2 [&>ul]:list-disc [&>ul]:pl-5 [&>ul]:space-y-1">
        {children}
      </div>
    </aside>
  );
}
