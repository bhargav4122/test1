import { useEffect, useRef } from "react";
import * as d3 from "d3";
import { motion } from "framer-motion";

type GraphData = {
  month: string;
  value: number;
};

type InteractiveGraphProps = {
  data: GraphData[];
  activeMetric: "revenue" | "users" | "engagement";
  width?: number;
  height?: number;
  onHover?: (data: GraphData | null) => void;
};

// Default data to use when none is provided
const   DEFAULT_DATA: GraphData[] = [
  { month: "Jan", value: 0 },
  { month: "Feb", value: 0 },
  { month: "Mar", value: 0 },
  { month: "Apr", value: 0 },
  { month: "May", value: 0 },
  { month: "Jun", value: 0 },
];


export const InteractiveGraph = ({
  data = DEFAULT_DATA,
  activeMetric,
  width = 500,
  height = 300,
  onHover,
}: InteractiveGraphProps) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

      const displayData = data?.length ? data : DEFAULT_DATA;
    const maxValue = d3.max(displayData, d => d.value) || 1; // Ensure we don't divide by zero
    const margin = { top: 30, right: 30, bottom: 50, left: 50 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // Create scales
    const x = d3
      .scaleBand()
      .domain(data.map(d => d.month))
      .range([margin.left, width - margin.right])
      .padding(0.3);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, d => d.value) as number])
      .nice()
      .range([height - margin.bottom, margin.top]);

    // Add gradients
    const defs = svg.append("defs");
    
    // Area gradient
    const areaGradient = defs
      .append("linearGradient")
      .attr("id", "area-gradient")
      .attr("x1", "0%")
      .attr("y1", "0%")
      .attr("x2", "0%")
      .attr("y2", "100%");

    areaGradient
      .append("stop")
      .attr("offset", "0%")
      .attr("stop-color", "#3b82f6")
      .attr("stop-opacity", 0.3);

    areaGradient
      .append("stop")
      .attr("offset", "100%")
      .attr("stop-color", "#3b82f6")
      .attr("stop-opacity", 0);

    // Bar gradient
    const barGradient = defs
      .append("linearGradient")
      .attr("id", "bar-gradient")
      .attr("x1", "0%")
      .attr("y1", "0%")
      .attr("x2", "0%")
      .attr("y2", "100%");

    barGradient
      .append("stop")
      .attr("offset", "0%")
      .attr("stop-color", "#6366f1")
      .attr("stop-opacity", 0.8);

    barGradient
      .append("stop")
      .attr("offset", "100%")
      .attr("stop-color", "#8b5cf6")
      .attr("stop-opacity", 0.8);

    // Draw bars
    svg
      .selectAll(".bar")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", d => x(d.month) as number)
      .attr("y", height - margin.bottom)
      .attr("width", x.bandwidth())
      .attr("height", 0)
      .attr("rx", 4)
      .attr("ry", 4)
      .attr("fill", "url(#bar-gradient)")
      .on("mouseover", (event, d) => onHover?.(d))
      .on("mouseout", () => onHover?.(null))
      .transition()
      .delay((d, i) => i * 100)
      .duration(500)
      .attr("y", d => y(d.value))
      .attr("height", d => height - margin.bottom - y(d.value));

    // Draw line and area
    const line = d3
      .line<GraphData>()
      .x(d => (x(d.month) as number) + x.bandwidth() / 2)
      .y(d => y(d.value))
      .curve(d3.curveCatmullRom.alpha(0.5));

    const area = d3
      .area<GraphData>()
      .x(d => (x(d.month) as number) + x.bandwidth() / 2)
      .y0(y(0))
      .y1(d => y(d.value))
      .curve(d3.curveCatmullRom.alpha(0.5));

    svg
      .append("path")
      .datum(data)
      .attr("fill", "url(#area-gradient)")
      .attr("d", area)
      .attr("opacity", 0)
      .transition()
      .duration(800)
      .attr("opacity", 1);

    svg
      .append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "#3b82f6")
      .attr("stroke-width", 3)
      .attr("d", line)
      .attr("opacity", 0)
      .transition()
      .duration(800)
      .attr("opacity", 1);

    // Draw data points
    svg
      .selectAll(".data-point")
      .data(data)
      .enter()
      .append("circle")
      .attr("class", "data-point")
      .attr("cx", d => (x(d.month) as number) + x.bandwidth() / 2)
      .attr("cy", d => y(d.value))
      .attr("r", 0)
      .attr("fill", "white")
      .attr("stroke", "#3b82f6")
      .attr("stroke-width", 2)
      .on("mouseover", (event, d) => {
        onHover?.(d);
        d3.select(event.currentTarget).attr("r", 6);
      })
      .on("mouseout", () => {
        onHover?.(null);
        d3.select(event.currentTarget).attr("r", 4);
      })
      .transition()
      .delay((d, i) => i * 100)
      .duration(500)
      .attr("r", 4);

    // Add axes
    const xAxis = (g: d3.Selection<SVGGElement, unknown, null, undefined>) =>
      g
        .attr("transform", `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(x).tickSizeOuter(0))
        .selectAll("text")
        .attr("fill", "#64748b");

    const yAxis = (g: d3.Selection<SVGGElement, unknown, null, undefined>) =>
      g
        .attr("transform", `translate(${margin.left},0)`)
        .call(d3.axisLeft(y).ticks(5))
        .selectAll("text")
        .attr("fill", "#64748b");

    svg.append("g").call(xAxis);
    svg.append("g").call(yAxis);

    // Add grid lines
    svg
      .append("g")
      .attr("class", "grid")
      .call(
        d3
          .axisLeft(y)
          .ticks(5)
          .tickSize(-width + margin.left + margin.right)
          .tickFormat(() => "")
      )
      .attr("stroke", "#e2e8f0")
      .attr("stroke-dasharray", "2,2")
      .attr("opacity", 0.5);

    // Add title
    svg
      .append("text")
      .attr("x", width / 2)
      .attr("y", 20)
      .attr("text-anchor", "middle")
      .attr("fill", "#1e293b")
      .attr("font-weight", "bold")
      .text(
        activeMetric === "revenue"
          ? "Revenue Growth ($)"
          : activeMetric === "users"
          ? "User Growth"
          : "Engagement Rate (%)"
      );
  }, [data, activeMetric, width, height, onHover]);

  return (
    <div className="relative h-full w-full">
      <svg ref={svgRef} width={width} height={height} viewBox={`0 0 ${width} ${height}`} />
    </div>
  );
};