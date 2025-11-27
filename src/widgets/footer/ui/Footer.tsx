import React, { memo } from "react";

export const Footer = memo(() => {
  return (
    <footer className="bg-background grid grid-cols-2 items-center gap-4 px-8 py-20">
      <div className="flex">
        <div>github</div>
        <div>linkedin</div>
        <div>t-story</div>
      </div>
      <div>
        Loosely Designed in <em>Freeform</em> and coded in <em>Cursor</em> by
        yours truly. Build with <em>Next.js</em> and <em>Tailwind CSS</em>,
        deployed with []. All text is set in the
        <em>Inter, Pretendard</em> typfaces.
      </div>
    </footer>
  );
});

Footer.displayName = "Footer";
