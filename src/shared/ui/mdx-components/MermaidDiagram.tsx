"use client";

import { useEffect, useState } from "react";

// 모듈 레벨에서 mermaid를 한 번만 로드/초기화
let mermaidPromise: Promise<typeof import("mermaid")["default"]> | null = null;

function loadMermaid() {
  if (!mermaidPromise) {
    mermaidPromise = import("mermaid").then((m) => {
      m.default.initialize({
        startOnLoad: false,
        theme: "neutral",
        fontFamily: "inherit",
        suppressErrorRendering: true,
      });
      return m.default;
    });
  }
  return mermaidPromise;
}

let uidCounter = 0;

interface MermaidDiagramProps {
  chart: string;
  caption?: string;
}

export function MermaidDiagram({ chart, caption }: MermaidDiagramProps) {
  const [svg, setSvg] = useState<string>("");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const safeChart = (chart ?? "").trim();
    if (!safeChart) {
      setError("mermaid 차트 내용이 비어 있습니다.");
      return;
    }

    let cancelled = false;
    setSvg("");
    setError("");

    // effect 실행마다 고유한 ID 생성 (StrictMode 이중 실행 대응)
    const id = `mermaid-${++uidCounter}`;

    loadMermaid()
      .then((mermaid) => mermaid.render(id, safeChart))
      .then(({ svg: rendered }) => {
        if (!cancelled) setSvg(rendered);
      })
      .catch((e: unknown) => {
        if (!cancelled) setError(String(e));
      });

    return () => {
      cancelled = true;
    };
  }, [chart]);

  return (
    <figure className="my-8">
      <div className="overflow-x-auto rounded-lg border border-border bg-surface p-4 [&>svg]:mx-auto">
        {error ? (
          <pre className="text-xs text-red-500 whitespace-pre-wrap">{error}</pre>
        ) : svg ? (
          <div dangerouslySetInnerHTML={{ __html: svg }} />
        ) : (
          <div className="flex h-16 items-center justify-center text-sm text-subtle">
            렌더링 중...
          </div>
        )}
      </div>
      {caption && (
        <figcaption className="mt-3 text-center text-sm text-tertiary">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
