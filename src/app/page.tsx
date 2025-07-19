"use client";

import LikeButton from "@/components/button";
import GridFloor from "@/components/grid";
import Image from "next/image";
import Link from "next/link";
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
    <main className="relative isolate overflow-hidden [webkit-overflow-scrolling:touch]">
      {/* Grid behind everything - ONLY render in dark mode */}
      {/* {darkMode && />} */}
      { darkMode && <GridFloor scrollY={scrollY} />}
			
      {/* Scrollable container */}
      <div
        ref={containerRef}
        className={`relative h-screen overflow-y-scroll snap-y snap-mandatory transition-colors duration-300 ${
          darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-800"
        }`}
      >
        {/* Theme Toggle */}
        <button
          onClick={toggleDarkMode}
          aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          className="fixed top-4 right-4 z-50 w-10 h-10 flex items-center justify-center cursor-pointer rounded-full shadow-md transition-colors duration-200 bg-white dark:bg-gray-800"
        >
          {darkMode ? "☀️" : "🌙"}
        </button>

        {/* Overlay EV actors
        <div className="fixed inset-0 z-10 flex items-center justify-center pointer-events-none">
          <div
            className="absolute top-1/3 left-1/4 w-32 h-32 text-white flex items-center justify-center transition-transform duration-500"
            style={{ transform: evTransform }}
          >
            <Image
              src="/car.png"
              width={1536}
              height={1024}
              alt="Electric Vehicle"
            />
          </div>

          <div
            className="absolute top-1/3 right-1/4 w-32 h-32 bg-green-500 text-white flex items-center justify-center shadow-xl transition-transform duration-500"
            style={{ transform: evseTransform }}
          >
            EVSE
          </div>

          <div
            className="absolute bottom-20 left-1/2 w-32 h-32 bg-yellow-500 text-white flex items-center justify-center shadow-xl -translate-x-1/2 transition-opacity duration-700"
            style={{ opacity: saOpacity }}
          >
            SA
          </div>

          <div className="absolute top-10 left-1/2 w-32 h-32 bg-purple-500 text-white flex items-center justify-center shadow-xl -translate-x-1/2">
            PKI
          </div>
        </div> */}
				<div className="fixed top-2 right-2 z-50"></div>"

        {/* Scroll Snap Sections */}
        {[
          {
            title: "Step 1: EV ↔ EVSE",
            text: "Initial communication is established between the electric vehicle and the charging station.",
          },
          {
            title: "Step 2: EVSE ↔ Secondary Actor",
            text: "The EVSE contacts backend systems to authorize, start charging, or perform billing actions.",
          },
          {
            title: "Step 3: Billing Finalization",
            text: "Final settlement and data synchronization are performed between backend and EVSE.",
          },
        ].map((section, idx) => (
          <section
            key={idx}
            className="h-screen snap-start flex items-center justify-center px-8"
          >
            <div className="max-w-xl">
              <h2 className="text-3xl font-bold mb-6">{section.title}</h2>
              <p className="mb-8">{section.text}</p>
              {idx === 0 && (
                <div className="space-y-4">
                  <p>{scrollY}</p>

                  <button
                    className="z-50 cursor-pointer px-4 py-2 bg-blue-600 text-white rounded-md"
                    onClick={() => console.log("Clicked")}
                  >
                    Learn More
                  </button>
                  <LikeButton />
                  <Link
                    href="/about"
                    className="inline-block rounded-md px-4 py-2 text-sm font-medium hover:bg-sky-100 hover:text-blue-600"
                  >
                    More Info
                  </Link>
                </div>
              )}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
