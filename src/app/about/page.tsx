"use client";

import Actor from "@/components/actor/actor";
import GridFloor from "@/components/grid";
import Section from "@/components/section/section";
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
    <>
      <Section id="section1" title="EV Charging Infrastructure">
        <div className="container mx-auto px-4 py-8 flex flex-wrap justify-between gap-6">
          <Actor name="EVSE" />
          <Actor name="EV" />
          <Actor name="CSMS" />
          <Actor name="CSMS" />
          <Actor name="CSMS" />
          <Actor name="CSMS" />
        </div>
        <div className="text-center">
          <h1 className="text-5xl font-bold">EV Charging Infrastructure</h1>
          <p className="mt-4 text-lg">
            Building the future with vanishing-point grids.
          </p>
        </div>
      </Section>
    </>
  );
}
