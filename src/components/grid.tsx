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

    // remove old lines
    svg.selectAll("line").remove();

    // logical drawing dimensions
    const width = 600;
    const height = 600;

    // --- radial spokes ---
    const numLines = 18;
    const radius = 10000;
    const centerX = width / 2;
    const centerY = height / 2;
    const gridColor = `rgb(140,30,255)`;

    const radialData = d3.range(numLines).map((i) => ({
      // i/(numLines-1) goes from 0 to 1, so the last value is 1*π = π
      angle: (i / (numLines - 1)) * Math.PI,
    }));

    svg
      .selectAll(".spoke")
      .data(radialData)
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

    const horizData = d3.range(numHoriz).map((i) => ({
      y: logScale(i),
    }));

    svg
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
