"use client";

import { useState, useEffect } from "react";

const MICROLINK_API = "https://api.microlink.io";

interface OgImageResult {
  ogImage: string | null;
  loading: boolean;
}

export function useOgImage(url: string | null): OgImageResult {
  const [ogImage, setOgImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!url) return;

    let cancelled = false;
    setLoading(true);

    fetch(`${MICROLINK_API}?url=${encodeURIComponent(url)}&meta=true`)
      .then((res) => res.json())
      .then((data) => {
        if (cancelled) return;

        if (data.status === "success") {
          setOgImage(
            data.data?.image?.url || data.data?.logo?.url || null,
          );
        }
      })
      .catch(() => {})
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [url]);

  return { ogImage, loading };
}
