interface ResultCardProps {
  type?: "info" | "warning" | "success" | "error";
  title: string;
  value: string;
  description?: string;
}

const styles = {
  info: "text-primary",
  warning: "text-warning",
  success: "text-secondary",
  error: "text-error",
} as const;

export function ResultCard({
  type = "info",
  title,
  value,
  description,
}: ResultCardProps) {
  return (
    <div className="border-border bg-surface-elevated my-6 inline-flex flex-col items-center rounded-lg border p-6 text-center shadow-sm">
      <span className={`${styles[type]} text-3xl font-bold`}>{value}</span>
      <span className="text-foreground mt-1 text-sm font-semibold">
        {title}
      </span>
      {description && (
        <span className="text-tertiary mt-1 text-xs">{description}</span>
      )}
    </div>
  );
}
