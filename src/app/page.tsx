"use client";

import GridFloor from "@/components/grid";
import Icon from "@mdi/react";
import {
  mdiInformationOutline,
  mdiMoonWaningCrescent,
  mdiWhiteBalanceSunny,
} from "@mdi/js";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Actor from "@/components/actor/actor";
import Section from "@/components/section/section";
import clsx from "clsx";
import Link from "next/link";

// app/page.tsx or wherever your homepage is
export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentSection, setCurrentSection] = useState<string>("");
  const [scrollY, setScrollY] = useState(0);

  // Track scroll on the container
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const handleScroll = () => setScrollY(el.scrollTop);
    el.addEventListener("scroll", handleScroll);
    return () => el.removeEventListener("scroll", handleScroll);
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
    <div>
      {/* <div className="fixed top-0 left-0 w-[50vw] h-[50vh] bg-green landscape:bg-white  pointer-events-none"></div> */}
      <div className="flex h-svh">
        <nav className={clsx("sidebar-nav")}>
          {Object.entries(sectionRefs).map(([key, ref]) => (
            <button
              key={key}
              onClick={() =>
                ref.current?.scrollIntoView({ behavior: "smooth" })
              }
              className={clsx(
                // ─── Universal base ───
                "transition-all cursor-pointer duration-200 active:scale-95 w-auto font-semibold touch-action-manipulation [-webkit-tap-highlight-color:transparent]",

                // ─── Mobile (default) ───

                // light mode mobile
                key === currentSection
                  ? "bg-gray-600 text-white"
                  : "bg-gray-200 text-gray-800 active:bg-gray-300",
                // dark mode mobile
                key === currentSection
                  ? "dark:bg-[#00b8d9] dark:text-black dark:[box-shadow:0_0_4px_#00b8d9]"
                  : "dark:bg-[#2a263f] dark:text-[#e0aaff] dark:active:bg-[#3e3455] [@media(pointer:fine)]:hover:dark:bg-[#433a5a]",

                // ─── Tablet & up ───
                // "sm:w-48 sm:px-6 sm:py-3 sm:text-base sm:rounded-lg",
                // light mode desktop hover
                key !== currentSection && "sm:hover:bg-gray-300"
                // active on desktop already covered by active:scale-95 and active:bg-*
              )}
            >
              {sectionTitles[key] ?? key}
            </button>
          ))}
        </nav>

        <div
          ref={containerRef}
          className={clsx(
            "flex-1 overflow-y-scroll snap-y snap-mandatory",
            "text-black dark:text-white"
          )}
        >
          <Section
            ref={sectionRefs.section1}
            id="section1"
            title="EV Charging Infrastructure"
          >
            <div className="relative bottom-0 left-0">
              <div className="container mx-auto px-4 py-8 flex flex-wrap justify-between gap-6">
                <Actor name="EVSE" />
                <Actor name="EV" />
                <Actor name="CSMS" />
                <Actor name="CSMS" />
                <Actor name="CSMS" />
                <Actor name="CSMS" />
              </div>
            </div>

            <div className="text-center">
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
      </div>
    </div>
  );
}
