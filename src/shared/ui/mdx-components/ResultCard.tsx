interface ResultCardProps {
  title: string;
  value: string;
  description?: string;
}

export function ResultCard({ title, value, description }: ResultCardProps) {
  return (
    <div className="my-6 inline-flex flex-col items-center rounded-lg border border-border bg-surface-elevated p-6 text-center shadow-sm">
      <span className="text-3xl font-bold text-primary">{value}</span>
      <span className="mt-1 text-sm font-semibold text-foreground">
        {title}
      </span>
      {description && (
        <span className="mt-1 text-xs text-tertiary">{description}</span>
      )}
    </div>
  );
}
