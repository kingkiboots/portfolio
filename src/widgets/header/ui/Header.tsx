import Link from "next/link";
import React, { memo } from "react";

export const Header = memo(() => {
  return (
    <header className="sm:display-none bg-background sticky top-0 flex h-24 items-center justify-between px-8">
      <Link href="/">Logo</Link>
      <nav className="hidden items-center gap-x-12 lg:flex">
        <ul className="flex items-center gap-12">
          <li>
            <Link className="hover:text-tertiary rounded px-6 py-3" href="#">
              About
            </Link>
          </li>
          <li>
            <Link className="rounded px-6 py-3" href="#">
              Work
            </Link>
          </li>
          <li>
            <Link className="rounded px-6 py-3" href="#">
              Projects
            </Link>
          </li>
          <li>
            <Link className="rounded px-6 py-3" href="#">
              Experiences
            </Link>
          </li>
          <li>
            <button
              type="button"
              className="btn bg-primary text-text-primary cursor-pointer rounded px-6 py-3 font-bold"
            >
              Resume
            </button>
          </li>
        </ul>
      </nav>
      <button className="btn-mobile-nav lg:hidden">Hamburger</button>
    </header>
  );
});
Header.displayName = "Header";
