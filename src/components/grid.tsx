"use client";
// import { useRef, useEffect, useState } from "react";

interface GridFloorProps {
  scrollY: number;
}

export default function GridFloor({ scrollY }: GridFloorProps) {
		const maxScrollY = document.documentElement.scrollHeight - window.innerHeight;

  return (
    // <div style={{perspective: `${80const maxScrollY = document.documentElement.scrollHeight - window.innerHeight;0 - scrollY * -.2}px`}}>

    <div style={{ perspective: `${700}px` }}>
      <div
        className="absolute inset-0 z-0 pointer-events-none bg-gradient-to-r from-blue-500"
        style={{
          transform: `rotateX(${70}deg) translateY(${-scrollY * 0.5}px)`,
        }}
      >
        {/* <div className="fixed top-2 right-2">Scroll {scrollY}</div> */}
        <div className="w-[200vw] h-[500vh] bg-grid bg-[length:40px_40px] opacity-50" />
      </div>
    </div>
  );
}
