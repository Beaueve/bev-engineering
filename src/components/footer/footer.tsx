"use client";

import {
  mdiArrowLeftCircle,
  mdiInformationOutline,
  mdiMoonWaningCrescent,
  mdiTypewriter,
  mdiWhiteBalanceSunny,
} from "@mdi/js";
import Icon from "@mdi/react";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Footer() {
  const [isDark, setIsDark] = useState(false);

  const path = usePathname();

  // decide what the button should say and where it should go
  const isOnAbout = path === "/about";
  const buttonLabel = isOnAbout ? "Home" : "About";
  const buttonHref = isOnAbout ? "/" : "/about";

  const isOnBlog = path === "/blog";
  const secondButtonLabel = isOnBlog ? "Home" : "Blog";
  const secondButtonHref = isOnBlog ? "/" : "/blog";

  // 1. On mount, read stored preference (or fallback to system)
  useEffect(() => {
    const stored = localStorage.getItem("theme");
    if (stored === "dark") setIsDark(true);
    else if (stored === "light") setIsDark(false);
    else setIsDark(window.matchMedia("(prefers-color-scheme: dark)").matches);
  }, []);

  // 2. Whenever `isDark` changes, toggle the .dark class on <html> and persist
  useEffect(() => {
    const html = document.documentElement;
    if (isDark) html.classList.add("dark");
    else html.classList.remove("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);

  return (
    <footer
      className={clsx(
        "fixed bottom-0 left-0 w-full h-[10svh] z-50 flex items-center justify-center"
        // mobile: full-width bar
        // desktop: align under sidebar
        // "md:left-48 md:w-[calc(100%-12rem)] md:h-12"
      )}
    >
      {/* Theme Toggle */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setIsDark((d) => !d)}
          aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
          // className="z-100 w-10 h-10 flex items-center justify-center cursor-pointer rounded-full shadow-md transition-colors duration-200 bg-white dark:bg-gray-800"
          className={clsx("chip-button", "cursor-pointer")}
        >
          <Icon
            path={isDark ? mdiWhiteBalanceSunny : mdiMoonWaningCrescent}
            size={1}
            aria-hidden="true" // hide it from assistive tech
            title={undefined} // suppress the <title> entirely
          />
        </button>
        <Link href={buttonHref} className={clsx("chip-button", "px-10 w-40")}>
          <Icon
            path={isOnAbout ? mdiArrowLeftCircle : mdiInformationOutline}
            size={1}
            aria-hidden="true"
          />
          <span>{buttonLabel}</span>
        </Link>

        <Link
          href={secondButtonHref}
          className={clsx("chip-button", "px-10 w-40")}
        >
          <Icon
            path={isOnBlog ? mdiArrowLeftCircle : mdiTypewriter}
            size={1}
            aria-hidden="true"
          />
          <span>{secondButtonLabel}</span>
        </Link>
      </div>
    </footer>
  );
}
