"use client";

import GridFloor from "@/components/grid";
import Icon from "@mdi/react";
import { mdiMoonWaningCrescent, mdiWhiteBalanceSunny } from "@mdi/js";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Actor from "@/components/actor/actor";
import Section from "@/components/section/section";
import clsx from "clsx";

// app/page.tsx or wherever your homepage is
export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentSection, setCurrentSection] = useState<string | null>(null);
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

  const sections = ["section1", "section2", "section3"] as const;
  const sectionRefs = Object.fromEntries(
    sections.map((id) => [id, useRef<HTMLElement>(null)])
  );
  useEffect(() => {
    const rootEl = containerRef.current;
    if (!rootEl) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setCurrentSection(entry.target.id);
          }
        });
      },
      {
        root: rootEl, // ← watch visibility *inside* your scroll container
        threshold: 0.5, // 50% of the section must be visible
      }
    );

    // observe all sections
    Object.values(sectionRefs).forEach((ref) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => {
      Object.values(sectionRefs).forEach((ref) => {
        if (ref.current) observer.unobserve(ref.current);
      });
      observer.disconnect();
    };
  }, [sectionRefs, containerRef.current]);

  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  const progress = Math.min(scrollY / 1500, 1);
  const evTransform = `translateX(${progress * 200}px)`;
  const evseTransform = `translateX(${-progress * 200}px)`;
  const saOpacity = progress > 0.5 ? 1 : 0;

  const sectionTitles: Record<string, string> = {
    section1: "EV",
    section2: "EVSE",
    section3: "CSMS",
  };

  return (
    <main
      className={`relative h-dvh overflow-hidden ${darkMode ? "dark" : ""}`}
    >
      <div className="fixed top-2 left-2">Parent: {scrollY}</div>

      {/* Theme Toggle */}
      <button
        onClick={toggleDarkMode}
        aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
        className="fixed top-4 right-4 z-100 w-10 h-10 flex items-center justify-center cursor-pointer rounded-full shadow-md transition-colors duration-200 bg-white dark:bg-gray-800"
      >
        <Icon
          path={darkMode ? mdiWhiteBalanceSunny : mdiMoonWaningCrescent}
          size={1}
          aria-hidden="true" // hide it from assistive tech
          title={undefined} // suppress the <title> entirely
        />
      </button>

      <div className="fixed top-0 right-0 dark:bg-black z-0 h-[100vh] w-[100vw] pointer-events-none"></div>

      {darkMode && (
        <div>
          <GridFloor scrollY={scrollY} />
        </div>
      )}

      <div className="fixed left-4 top-1/2 z-50 -translate-y-1/2 flex flex-col items-center space-y-4 pointer-events-auto">
        {Object.entries(sectionRefs).map(([key, ref]) => (
          <button
            key={key}
            onClick={() => ref.current?.scrollIntoView({ behavior: "smooth" })}
            className={clsx(
              // base sizing & shape
              "w-48 px-6 py-3 rounded-lg font-semibold text-base transition-all duration-200 active:scale-95",
              // suppress tap flash
              "touch-action-manipulation [-webkit-tap-highlight-color:transparent]",
              // light mode styles
              key === currentSection
                ? "bg-green-600 text-white"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300 active:bg-gray-400",
              // dark mode styles
              key === currentSection
                ? "dark:bg-[#00b8d9] dark:text-black dark:[box-shadow:0_0_4px_#00b8d9]"
                : "dark:bg-[#2a263f] dark:text-[#e0aaff] dark:active:bg-[#3e3455] [@media(pointer:fine)]:hover:dark:bg-[#433a5a]"
            )}
          >
            {sectionTitles[key] ?? key}
          </button>
        ))}
      </div>

      <div
        ref={containerRef}
        className="relative z-20 h-screen overflow-y-scroll snap-y snap-mandatory transition-colors duration-300 text-black dark:text-white"
      >
        <Section
          ref={sectionRefs.section1}
          id="section1"
          title="EV Charging Infrastructure"
        >
          <div className="absolute bottom-0 left-0">
            BOOP {currentSection}
            {/* Car Image */}
            <div className="container w-[100vw] mx-auto px-4 py-8 flex flex-wrap justify-between gap-6">
              <Actor name="EVSE" />
              <Actor name="EV" />
              <Actor name="CSMS" />
              <Actor name="CSMS" />
              <Actor name="CSMS" />
              <Actor name="CSMS" />
            </div>
            <Image
              className="relative w-[50vw] h-auto z-19"
              src={darkMode ? "/car_synth.png" : "/car_line.png"}
              alt="Synthwave styled car"
              width={1536}
              height={1024}
            />
            {/* EVSE Image – positioned slightly higher and left */}
            {darkMode && (
              <div className="absolute bottom-[10%] left-[5%] z-21">
                <Image
                  className="w-[15vw] h-auto z-20"
                  src="/evse_synth.png"
                  alt="Synthwave styled EVSE"
                  width={512}
                  height={1024}
                />
              </div>
            )}
          </div>

          <div className="z-10 text-center">
            <h1 className="text-5xl font-bold">EV Charging Infrastructure</h1>
            <p className="mt-4 text-lg">
              Building the future with vanishing-point grids.
            </p>
          </div>
        </Section>
        <Section
          ref={sectionRefs.section2}
          id="section2"
          title="EV Charging Infrastructure"
        >
          <div className="text-center">
            <h1 className="text-5xl font-bold">EV Charging Infrastructure</h1>
            <p className="mt-4 text-lg">
              Building the future with vanishing-point grids.
            </p>
          </div>
        </Section>

        <Section
          ref={sectionRefs.section3}
          id="section3"
          title="EV Charging Infrastructure"
        >
          <div className="text-center">
            <h1 className="text-5xl font-bold">EV Charging Infrastructure</h1>
            <p className="mt-4 text-lg">
              Building the future with vanishing-point grids.
            </p>
          </div>
        </Section>
      </div>
    </main>
  );
}
