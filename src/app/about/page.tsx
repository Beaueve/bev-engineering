"use client";

import Actor from "@/components/actor/actor";
import GridFloor from "@/components/grid";
import Section from "@/components/section/section";
import clsx from "clsx";
import Link from "next/link";
import Image from "next/image";
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
      <div
        className="        
				w-full pb-20
        flex flex-col
        sm:flex-row sm:h-svh sm:justify-between sm:items-center
        sm:w-[70%] sm:mx-auto"
      >
        <div className="p-4 min-w-[30svw]">
          <Image
            src="/me.jpg"
            alt="EV Charging"
            layout="responsive"
            width={600}
            height={400}
            className="rounded-lg shadow-lg"
          />{" "}
        </div>
        <div className="p-4 mt-4 sm:mt-0">
          <div className=" ">
            <h1 className="text-4xl font-bold mb-4">Beau Everaert</h1>
            <p className="text-lg">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum. Why do we use it? It is a long established fact that
              a reader will be distracted by the readable content of a page when
              looking at its layout. The point of using Lorem Ipsum is that it
              has a more-or-less normal distribution of letters, as opposed to
              using 'Content here, content here', making it look like readable
              English. Many desktop publishing packages and web page editors now
              use Lorem Ipsum as their default model text, and a search for
              'lorem ipsum' will uncover many web sites still in their infancy.
              It uses a dictionary of over 200 Latin words, combined with a
              handful of model sentence structures, to generate Lorem Ipsum
              which looks reasonable. The generated Lorem Ipsum is therefore
              always free from repetition, injected humour, or
              non-characteristic words etc.{" "}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
