"use client";
// import { useRef, useEffect, useState } from "react";

interface GridFloorProps {
  scrollY: number;
}

export default function GridFloor({ scrollY }: GridFloorProps) {
  return (
    <div
      className=" myGrid inset-0 fixed z-50 pointer-events-none perspective-near perspective-origin-center flex items-center justify-center"
      style={
        {
          // <-- translateZ first, then rotateX
          // transform: `rotateZ(30deg)`,
          // transform: `rotateX(75deg) translateY(${-scrollY * 1}px)`,
          // transformOrigin: "top center",
        }
      }
    >
      <div className="w-[200vw] h-[100vh] bg-grid  opacity-100   transform-3d origin-center rotate-x-20 transform-gpu " />
    </div>
  );
}
