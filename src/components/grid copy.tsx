"use client";
// import { useRef, useEffect, useState } from "react";

interface GridFloorProps {
  scrollY: number;
}

export default function GridFloor({ scrollY }: GridFloorProps) {
  return (
    <div>
      <div className=" z-1 [perspective:1000px] perspective-origin-[50%_50%] pointer-events-none">
        <div
          className="fixed pointer-events-none transform-3d transform-gpu"
          style={{
            // <-- translateZ first, then rotateX
            // transform: `rotateX(30deg)`,
            // transform: `rotateX(75deg) translateY(${-scrollY * 1}px)`,
            // transformOrigin: "top center",

          }}
        >
          <div className="w-[100vw] h-[50vh] bg-grid bg-[length:40px_40px] opacity-100 translate-z-200 rotate-x-90" />
        </div>
      </div>
    </div>
  );
}
