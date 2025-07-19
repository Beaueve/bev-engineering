"use client";
// import { useRef, useEffect, useState } from "react";

interface GridFloorProps {
  scrollY: number;
}

export default function GridFloor({ scrollY }: GridFloorProps) {
  return (
    <div className="[perspective:1500px]">
      <div
        className="fixed inset-1 z-50 pointer-events-none"
        style={{
          transform: `rotateX(60deg) translateY(${-scrollY * 0.5}px)`,
        }}
      >
        {/* <div className="fixed top-2 right-2">Scroll {scrollY}</div> */}
        <div className="w-[200vw] h-[500vh] bg-grid bg-[length:40px_40px] opacity-40" />
      </div>
    </div>
  );
}
