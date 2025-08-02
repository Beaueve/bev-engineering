"use client";

import {
  mdiArrowLeftCircle,
  mdiEvStation,
  mdiInformationOutline,
  mdiMoonWaningCrescent,
  mdiTypewriter,
  mdiWhiteBalanceSunny,
} from "@mdi/js";
import Icon from "@mdi/react";
import clsx from "clsx";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
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

  const pages: { name: string; href: string; icon: string }[] = [
    { name: "Home", href: "/", icon: mdiEvStation },
    { name: "About", href: "/about", icon: mdiInformationOutline },
    { name: "Blog", href: "/blog", icon: mdiTypewriter },
  ];

  const pathname = usePathname() || "/";
  const router = useRouter();

  const isActive = (href: string) => {
    // Simple equality; adjust if you want prefix matching or params
    return pathname === href;
  };
  return (
    <footer
      className={clsx(
        "fixed bottom-0 left-0 w-full mb-5 z-50 flex gap-2 items-center justify-center"
        // mobile: full-width bar
        // desktop: align under sidebar
        // "md:left-48 md:w-[calc(100%-12rem)] md:h-12"
      )}
    >
      {/* Layout: on small screens, first button full-width on its own row, others in a 3-col row below.
          On md+ screens, all four sit in a row. */}
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
      {pages.map((p) => (
        <button
          key={p.href}
          onClick={() => router.push(p.href)}
          aria-current={isActive(p.href) ? "page" : undefined}
          className={`
           chip-button px-10 w-1/4 sm:w-40 items-center justify-center cursor-pointer
            ${
              isActive(p.href)
                ? "bg-gray-600 text-white dark:bg-[#00b8d9] dark:text-black dark:[box-shadow:0_0_4px_#00b8d9]"
                : ""
            }
          `}
        >
          {" "}
          <Icon path={p.icon} size={1} aria-hidden="true" />
          <span>{p.name}</span>
        </button>
      ))}
      {/* Theme Toggle */}
      {/* <div className="flex items-center gap-2">
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
          className={clsx("chip-button", "")}
        >
          <Icon
            path={isOnBlog ? mdiArrowLeftCircle : mdiTypewriter}
            size={1}
            aria-hidden="true"
          />
          <span>{secondButtonLabel}</span>
        </Link>
      </div> */}
    </footer>
  );
}
