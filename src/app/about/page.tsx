"use client";

import GridFloor from "@/components/grid";
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

  // Detect system dark mode
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const updateDarkMode = (e: MediaQueryListEvent) => setDarkMode(e.matches);
    setDarkMode(mediaQuery.matches);
    mediaQuery.addEventListener("change", updateDarkMode);
    return () => mediaQuery.removeEventListener("change", updateDarkMode);
  }, []);

  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  const progress = Math.min(scrollY / 1500, 1);
  const evTransform = `translateX(${progress * 200}px)`;
  const evseTransform = `translateX(${-progress * 200}px)`;
  const saOpacity = progress > 0.5 ? 1 : 0;

  return (
    <main className="relative min-h-screen bg-black text-white overflow-hidden">
      <div className="fixed top-2 left-2">Parent: {scrollY}</div>
      <GridFloor scrollY={scrollY} />

      {/* Theme Toggle */}
      <button
        onClick={toggleDarkMode}
        aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
        className="fixed top-4 right-4 z-50 w-10 h-10 flex items-center justify-center cursor-pointer rounded-full shadow-md transition-colors duration-200 bg-white dark:bg-gray-800"
      >
        {darkMode ? "☀️" : "🌙"}
      </button>

			
      <div
        ref={containerRef}
        className="relative h-screen overflow-y-scroll snap-y snap-mandatory transition-colors duration-300"
      >
        <section className="h-screen snap-start flex items-center justify-center px-8">
          <h1 className="text-5xl font-bold">EV Charging Infrastructure</h1>
          <p className="mt-4 text-lg">
            Building the future with vanishing-point grids.
          </p>
        </section>
        <section className="h-screen snap-start flex items-center justify-center px-8">
          <h1 className="text-5xl font-bold">EV Charging Infrastructure</h1>
          <p className="mt-4 text-lg">
            Building the future with vanishing-point grids.
          </p>
        </section>
        <section className="h-screen snap-start flex items-center justify-center px-8">
          <h1 className="text-5xl font-bold">EV Charging Infrastructure</h1>
          <p className="mt-4 text-lg">
            Building the future with vanishing-point grids.
          </p>
        </section>
      </div>
    </main>
  );
}
