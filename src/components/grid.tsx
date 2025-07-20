import { useRef, useEffect } from "react";
import * as d3 from "d3";

interface GridFloorProps {
  scrollY: number;
}

export default function GridFloor({ scrollY }: GridFloorProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;
    const svg = d3.select(svgRef.current);

    // clear old content
    svg.selectAll("*").remove();

    const width = 600;
    const height = 600;
    const gridColor = `rgb(140,30,255)`;

    // --- defs: gradient + mask ---
    const defs = svg.append("defs");

    const grad = defs
      .append("linearGradient")
      .attr("id", "fadeGrad")
      // ensure the gradient coords are in SVG pixels, not 0–1
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

    // make the mask span 600×600 in user space
    const mask = defs
      .append("mask")
      .attr("id", "fadeMask")
      .attr("maskUnits", "userSpaceOnUse");

    mask
      .append("rect")
      .attr("width", width)
      .attr("height", height)
      .attr("fill", "url(#fadeGrad)");

    // wrap all your lines in a masked <g>
    const gridLayer = svg.append("g").attr("mask", "url(#fadeMask)");

    // --- radial spokes ---
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
      const deg = (d.angle * 180) / Math.PI; // rad → deg
      return { angle: ((180 - deg) * Math.PI) / 180 }; // back to rad
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

    // --- horizontal grid lines ---
    const numHoriz = 15;
    const logScale = d3
      .scaleLog()
      .domain([1, numHoriz])
      .range([height, height / 2])
      .clamp(true);

    const step = Math.abs(logScale(2) - logScale(1));

    const offset = ((scrollY /10  % step) + step) % step;

    // generate your y’s on the fly, shifted by offset
    const horizData = d3.range(1, numHoriz + 1).map((i) => ({
      y: logScale(i) + offset,
    }));

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
    <div className="fixed inset-0 z-0 pointer-events-none">
      <svg
        ref={svgRef}
        viewBox="0 0 600 600"
        preserveAspectRatio="xMidYMid slice"
        className="w-screen h-screen"
      />
    </div>
  );
}
