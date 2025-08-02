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

  const blogPosts = [
    {
      id: "1",
      title: "The Future of EV Charging",
      summary:
        "Explore upcoming trends and technology breakthroughs in electric vehicle charging infrastructure.",
      image: "/images/ev-future.jpg", // Ensure images exist or remove images
      href: "/blog/future-of-ev-charging",
    },
    {
      id: "2",
      title: "How Smart Grids Enable Fast Charging",
      summary:
        "A look at how smart grids are revolutionizing the speed, availability, and reliability of EV charging.",
      image: "/images/smart-grid.jpg",
      href: "/blog/smart-grid-fast-charging",
    },
    {
      id: "3",
      title: "Top 10 EV Charging Stations in Europe",
      summary:
        "A curated list of Europe’s top public charging points and what makes them unique.",
      image: "/images/europe-charging.jpg",
      href: "/blog/top-10-europe-charging",
    },
    {
      id: "4",
      title: "The Future of EV Charging",
      summary:
        "Explore upcoming trends and technology breakthroughs in electric vehicle charging infrastructure.",
      image: "/images/ev-future.jpg", // Ensure images exist or remove images
      href: "/blog/future-of-ev-charging",
    },
    {
      id: "5",
      title: "How Smart Grids Enable Fast Charging",
      summary:
        "A look at how smart grids are revolutionizing the speed, availability, and reliability of EV charging.",
      image: "/images/smart-grid.jpg",
      href: "/blog/smart-grid-fast-charging",
    },
    {
      id: "6",
      title: "Top 10 EV Charging Stations in Europe",
      summary:
        "A curated list of Europe’s top public charging points and what makes them unique.",
      image: "/images/europe-charging.jpg",
      href: "/blog/top-10-europe-charging",
    },
    {
      id: "11",
      title: "The Future of EV Charging",
      summary:
        "Explore upcoming trends and technology breakthroughs in electric vehicle charging infrastructure.",
      image: "/images/ev-future.jpg", // Ensure images exist or remove images
      href: "/blog/future-of-ev-charging",
    },
    {
      id: "12",
      title: "How Smart Grids Enable Fast Charging",
      summary:
        "A look at how smart grids are revolutionizing the speed, availability, and reliability of EV charging.",
      image: "/images/smart-grid.jpg",
      href: "/blog/smart-grid-fast-charging",
    },
    {
      id: "13",
      title: "Top 10 EV Charging Stations in Europe",
      summary:
        "A curated list of Europe’s top public charging points and what makes them unique.",
      image: "/images/europe-charging.jpg",
      href: "/blog/top-10-europe-charging",
    },
    {
      id: "14",
      title: "The Future of EV Charging",
      summary:
        "Explore upcoming trends and technology breakthroughs in electric vehicle charging infrastructure.",
      image: "/images/ev-future.jpg", // Ensure images exist or remove images
      href: "/blog/future-of-ev-charging",
    },
    {
      id: "15",
      title: "How Smart Grids Enable Fast Charging",
      summary:
        "A look at how smart grids are revolutionizing the speed, availability, and reliability of EV charging.",
      image: "/images/smart-grid.jpg",
      href: "/blog/smart-grid-fast-charging",
    },
    {
      id: "16",
      title: "Top 10 EV Charging Stations in Europe",
      summary:
        "A curated list of Europe’s top public charging points and what makes them unique.",
      image: "/images/europe-charging.jpg",
      href: "/blog/top-10-europe-charging",
    },
    // Add more posts...
  ];
  return (
    <>
      {/* <Section id="section1" title="EV Charging Infrastructure"> */}

      <div className="grid   sm:grid-cols-1 lg:grid-cols-3 gap-8 py-10 pb-20 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {blogPosts.map((post) => (
          <Link href={post.href} key={post.id} className="group">
            <div className="overflow-hidden rounded-lg shadow-lg dark:bg-zinc-900/70  transform transition-transform group-hover:scale-105 border border-gray-200 dark:border-gray-700">
              <div className="relative">
                <img
                  className="w-full transition-transform duration-200 ease-in-out transform group-hover:scale-110"
                  src={post.image}
                  alt={post.title}
                />
              </div>

              <div className="p-5">
                <h3 className="text-2xl mb-2 font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition">
                  {post.title}
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  {post.summary}
                </p>
                <span className="mt-4 inline-block text-blue-500 underline group-hover:text-blue-700 dark:group-hover:text-blue-300">
                  Read More →
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
      {/* </Section> */}
    </>
  );
}
