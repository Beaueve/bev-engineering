"use client";
import { useRef, useEffect, useState } from "react";
import * as d3 from "d3";
export default function GridFloor() {
  const svgRef = useRef<SVGSVGElement>(null);

  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const scrollEl = document.querySelector(".main-content");
    if (!scrollEl) return;

    const handler = () => {
      setScrollY((scrollEl as HTMLElement).scrollTop);
    };
    scrollEl.addEventListener("scroll", handler);
    handler();
    return () => scrollEl.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    if (!svgRef.current) return;
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();
    const width = 600;
    const height = 600;
    const gridColor = `rgb(140,30,255)`;
    const defs = svg.append("defs");
    const grad = defs
      .append("linearGradient")
      .attr("id", "fadeGrad")
      .attr("gradientUnits", "userSpaceOnUse")
      .attr("x1", 0)
      .attr("y1", 0)
      .attr("x2", 0)
      .attr("y2", height);
    grad
      .append("stop")
      .attr("offset", "50%")
      .attr("stop-color", "white")
      .attr("stop-opacity", 0);
    grad
      .append("stop")
      .attr("offset", "100%")
      .attr("stop-color", "white")
      .attr("stop-opacity", 1);
    const mask = defs
      .append("mask")
      .attr("id", "fadeMask")
      .attr("maskUnits", "userSpaceOnUse");
    mask
      .append("rect")
      .attr("width", width)
      .attr("height", height)
      .attr("fill", "url(#fadeGrad)");
    const gridLayer = svg.append("g").attr("mask", "url(#fadeMask)");
    const numLines = 25;
    const radius = 10000;
    const centerX = width / 2;
    const centerY = height / 2;
    const angleScale = d3
      .scaleLog()
      .domain([numLines, 1])
      .range([0, Math.PI / 2]);
    const radialDataRight = d3.range(1, numLines + 1).map((i) => ({
      angle: angleScale(i),
    }));
    const radialDataLeft = [...radialDataRight].reverse().map((d) => {
      const deg = (d.angle * 180) / Math.PI;
      return { angle: ((180 - deg) * Math.PI) / 180 };
    });
    gridLayer
      .selectAll(".spoke")
      .data([...radialDataLeft, ...radialDataRight])
      .enter()
      .append("line")
      .attr("class", "spoke")
      .attr("x1", centerX)
      .attr("y1", centerY)
      .attr("x2", (d) => centerX + radius * Math.cos(d.angle))
      .attr("y2", (d) => centerY + radius * Math.sin(d.angle))
      .attr("stroke", gridColor)
      .attr("stroke-width", 1);
    const numHoriz = 15;
    function generateLogShiftedPoints(
      y: number,
      n: number = 10,
      min: number = 1,
      max: number = Math.E,
      reverse: boolean = false
    ) {
      const cycleLen = n - 1;
      const frac = y - Math.floor(y);
      const offset = (frac % 1) * cycleLen;
      const logScale = d3
        .scaleLog<number, number>()
        .domain([min, max])
        .range([0, 1]);
      return Array.from({ length: n }, (_, i) => {
        const raw = (i + offset) % cycleLen;
        const tNorm = raw / cycleLen;
        const value = reverse
          ? min + (max - min) * (1 - Math.pow(1 - tNorm, 2))
          : logScale.invert(tNorm);
        return { y: value };
      });
    }
    const horizData = generateLogShiftedPoints(
      scrollY / 3000,
      numHoriz,
      height,
      height / 2,
      true
    );
    gridLayer
      .selectAll(".hline")
      .data(horizData)
      .enter()
      .append("line")
      .attr("class", "hline")
      .attr("x1", 0)
      .attr("y1", (d) => d.y)
      .attr("x2", width)
      .attr("y2", (d) => d.y)
      .attr("stroke", gridColor)
      .attr("stroke-width", 1);
  }, [scrollY]);

  return (
    <div className="bg-black">
      <div className="absolute top-0 left-0 text-white">scrollY: {scrollY}</div>
      <svg
        ref={svgRef}
        viewBox="0 0 600 600"
        preserveAspectRatio="xMidYMid slice"
        className="w-screen h-screen"
      />
    </div>
  );
}
