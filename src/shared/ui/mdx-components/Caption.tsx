interface CaptionProps {
  children: React.ReactNode;
}

export function Caption({ children }: CaptionProps) {
  return (
    <figcaption className="text-tertiary mt-3 text-center text-sm wrap-break-word break-all">
      {children}
    </figcaption>
  );
}
