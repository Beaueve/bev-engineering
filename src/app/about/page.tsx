"use client";

import Actor from "@/components/actor/actor";
import GridFloor from "@/components/grid";
import clsx from "clsx";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";

// app/page.tsx or wherever your homepage is
export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);
  const [darkMode, setDarkMode] = useState(false);

  // Track scroll on the container
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const handleScroll = () => setScrollY(el.scrollTop);
    el.addEventListener("scroll", handleScroll);
    return () => el.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main
      className={`relative h-dvh overflow-hidden ${darkMode ? "dark" : ""}`}
    >
      <div className="w-40">
        <Link className="chip-button" href="/">
          Back
        </Link>
      </div>
    </main>
  );
}
