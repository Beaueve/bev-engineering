"use client";
import { useEffect, useState, useRef } from "react";

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

  // Detect system color‐scheme and listen for changes
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const updateDarkMode = (e: MediaQueryListEvent) => setDarkMode(e.matches);
    setDarkMode(mediaQuery.matches);
    mediaQuery.addEventListener("change", updateDarkMode);
    return () => mediaQuery.removeEventListener("change", updateDarkMode);
  }, []);

  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  // Normalize scrollY into a 0–1 progress for animations
  const progress = Math.min(scrollY / 1500, 1);
  const evTransform = `translateX(${progress * 200}px)`;
  const evseTransform = `translateX(${-progress * 200}px)`;
  const saOpacity = progress > 0.5 ? 1 : 0;

  return (
    <div
      ref={containerRef}
      className={`h-screen overflow-y-scroll snap-y snap-mandatory transition-colors duration-300 ${
        darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-800"
      }`}
    >
      {/* Theme toggle */}
      <button
        onClick={toggleDarkMode}
        aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
        className="fixed top-4 right-4 z-50 w-10 h-10 flex items-center justify-center rounded-full shadow-md transition-colors duration-200 bg-white dark:bg-gray-800"
      >
        {darkMode ? "☀️" : "🌙"}
      </button>

      {/* Fixed overlay actors */}
      <div className="fixed inset-0 flex justify-center items-center pointer-events-none z-10">
        <div
          className="absolute top-1/3 left-1/4 w-32 h-32 bg-blue-500 text-white rounded-lg flex items-center justify-center shadow-xl transition-transform duration-500"
          style={{ transform: evTransform }}
        >
          EV
        </div>
        <div
          className="absolute top-1/3 right-1/4 w-32 h-32 bg-green-500 text-white rounded-lg flex items-center justify-center shadow-xl transition-transform duration-500"
          style={{ transform: evseTransform }}
        >
          EVSE
        </div>
        <div
          className="absolute bottom-20 left-1/2 w-32 h-32 bg-yellow-500 text-white rounded-lg flex items-center justify-center shadow-xl -translate-x-1/2 transition-opacity duration-700"
          style={{ opacity: saOpacity }}
        >
          SA
        </div>
        <div className="absolute top-10 left-1/2 w-32 h-32 bg-purple-500 text-white rounded-lg flex items-center justify-center shadow-xl -translate-x-1/2">
          PKI
        </div>
      </div>

      {/* Snap sections */}
      <section className="h-screen snap-start flex items-center justify-center px-8">
        <div className="max-w-xl">
          <h2 className="text-3xl font-bold mb-6">Step 1: EV ↔ EVSE</h2>
          <p className="mb-20">
            Initial communication is established between the electric vehicle and the charging station.
          </p>
        </div>
      </section>

      <section className="h-screen snap-start flex items-center justify-center px-8">
        <div className="max-w-xl">
          <h2 className="text-3xl font-bold mb-6">Step 2: EVSE ↔ Secondary Actor</h2>
          <p>
            The EVSE contacts backend systems to authorize, start charging, or perform billing actions.
          </p>
        </div>
      </section>
    </div>
  );
}
