import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { motion } from 'framer-motion';
import styled from 'styled-components';

type DataPoint = {
  x: number | string;
  y: number;
  category?: string;
};

type Props = {
  width?: number;
  height?: number;
  theme?: 'light' | 'dark';
};

const DataVisualizationHero: React.FC<Props> = ({
  width = 1400,
  height = 500,
  theme = 'dark',
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Sample data
  const lineData: DataPoint[] = [
    { x: 'Jan', y: 120 },
    { x: 'Feb', y: 200 },
    { x: 'Mar', y: 150 },
    { x: 'Apr', y: 320 },
    { x: 'May', y: 280 },
    { x: 'Jun', y: 390 },
    { x: 'Jul', y: 450 },
    { x: 'Aug', y: 400 },
    { x: 'Sep', y: 520 },
    { x: 'Oct', y: 600 },
    { x: 'Nov', y: 750 },
    { x: 'Dec', y: 900 },
  ];

  const barData: DataPoint[] = [
    { x: 'Product A', y: 35, category: 'Sales' },
    { x: 'Product B', y: 72, category: 'Sales' },
    { x: 'Product C', y: 48, category: 'Sales' },
    { x: 'Product D', y: 90, category: 'Sales' },
    { x: 'Service A', y: 65, category: 'Services' },
    { x: 'Service B', y: 85, category: 'Services' },
  ];

  const pieData = [
    { label: 'Desktop', value: 45 },
    { label: 'Mobile', value: 30 },
    { label: 'Tablet', value: 15 },
    { label: 'Other', value: 10 },
  ];

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove(); // Clear previous renders

    // Set up dimensions and margins
    const margin = { top: 80, right: 60, bottom: 100, left: 60 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // Create grid containers
    const gridContainer = svg
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`)
      .attr('class', 'grid-container');

    // Create separate containers for each chart
    const lineContainer = gridContainer
      .append('g')
      .attr('class', 'line-chart-container');

    const barContainer = gridContainer
      .append('g')
      .attr('class', 'bar-chart-container');

    const pieContainer = gridContainer
      .append('g')
      .attr('class', 'pie-chart-container');

    // Color scales
    const colorScale = d3
      .scaleOrdinal<string>()
      .domain(['Sales', 'Services'])
      .range(['#4f46e5', '#10b981']);

    const pieColor = d3
      .scaleOrdinal<string>()
      .domain(pieData.map(d => d.label))
      .range(['#6366f1', '#8b5cf6', '#a855f7', '#d946ef']);

    // ======================
    // LINE CHART (Left)
    // ======================
    const lineChartWidth = innerWidth * 0.35;
    const lineChartHeight = innerHeight * 0.7;

    // Position line chart container
    lineContainer.attr('transform', `translate(0,0)`);

    // Set up scales for line chart
    const xScale = d3
      .scaleBand()
      .domain(lineData.map(d => d.x.toString()))
      .range([0, lineChartWidth])
      .padding(0.2);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(lineData, d => d.y) as number])
      .nice()
      .range([lineChartHeight, 0]);

    // Add line chart
    const line = d3
      .line<DataPoint>()
      .x(d => (xScale(d.x.toString()) as number) + xScale.bandwidth() / 2)
      .y(d => yScale(d.y))
      .curve(d3.curveMonotoneX);

    lineContainer.append('path')
      .datum(lineData)
      .attr('fill', 'none')
      .attr('stroke', '#3b82f6')
      .attr('stroke-width', 3)
      .attr('d', line)
      .attr('opacity', 0)
      .transition()
      .duration(1000)
      .attr('opacity', 1);

    // Add area under line
    const area = d3
      .area<DataPoint>()
      .x(d => (xScale(d.x.toString()) as number) + xScale.bandwidth() / 2)
      .y0(lineChartHeight)
      .y1(d => yScale(d.y))
      .curve(d3.curveMonotoneX);

    lineContainer.append('path')
      .datum(lineData)
      .attr('fill', 'url(#areaGradient)')
      .attr('opacity', 0.7)
      .attr('d', area)
      .attr('opacity', 0)
      .transition()
      .duration(1000)
      .attr('opacity', 0.7);

    // Add circles for data points
    lineContainer.selectAll('.data-point')
      .data(lineData)
      .enter()
      .append('circle')
      .attr('class', 'data-point')
      .attr('cx', d => (xScale(d.x.toString()) as number) + xScale.bandwidth() / 2)
      .attr('cy', d => yScale(d.y))
      .attr('r', 0)
      .attr('fill', '#ffffff')
      .attr('stroke', '#3b82f6')
      .attr('stroke-width', 2)
      .transition()
      .delay((d, i) => i * 100)
      .duration(500)
      .attr('r', 5);

    // Add axes for line chart
    const xAxis = d3.axisBottom(xScale).tickSizeOuter(0);
    const yAxis = d3.axisLeft(yScale).ticks(5);

    lineContainer.append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(0,${lineChartHeight})`)
      .call(xAxis)
      .selectAll('text')
      .attr('fill', theme === 'dark' ? '#94a3b8' : '#64748b')
      .attr('font-size', '12px');

    lineContainer.append('g')
      .attr('class', 'y-axis')
      .call(yAxis)
      .selectAll('text')
      .attr('fill', theme === 'dark' ? '#94a3b8' : '#64748b')
      .attr('font-size', '12px');

    // Add grid lines for line chart
    lineContainer.append('g')
      .attr('class', 'grid')
      .call(
        d3
          .axisLeft(yScale)
          .ticks(5)
          .tickSize(-lineChartWidth)
          .tickFormat(() => '')
      )
      .attr('opacity', 0.1);

    // Add line chart title
    lineContainer.append('text')
      .attr('x', lineChartWidth / 2)
      .attr('y', -40)
      .attr('text-anchor', 'middle')
      .attr('fill', theme === 'dark' ? '#ffffff' : '#1e293b')
      .attr('font-size', '14px')
      .attr('font-weight', 'bold')
      .text('Monthly Revenue');

    // ======================
    // BAR CHART (Middle)
    // ======================
    const barChartWidth = innerWidth * 0.35;
    const barChartHeight = innerHeight * 0.7;
    
    // Position bar chart container with padding
    const barXOffset = lineChartWidth + 60;
    barContainer.attr('transform', `translate(${barXOffset},0)`);

    // Set up scales for bar chart
    const barXScale = d3
      .scaleBand()
      .domain(barData.map(d => d.x.toString()))
      .range([0, barChartWidth])
      .padding(0.3);

    const barYScale = d3
      .scaleLinear()
      .domain([0, d3.max(barData, d => d.y) as number])
      .nice()
      .range([barChartHeight, 0]);

    // Add bars
    barContainer.selectAll('.bar')
      .data(barData)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', d => barXScale(d.x.toString()) as number)
      .attr('y', barChartHeight)
      .attr('width', barXScale.bandwidth())
      .attr('height', 0)
      .attr('fill', d => colorScale(d.category as string))
      .attr('rx', 4)
      .attr('ry', 4)
      .transition()
      .delay((d, i) => i * 150)
      .duration(800)
      .attr('y', d => barYScale(d.y))
      .attr('height', d => barChartHeight - barYScale(d.y));

    // Add bar chart axes
    const barXAxis = d3.axisBottom(barXScale).tickSizeOuter(0);
    const barYAxis = d3.axisLeft(barYScale).ticks(5);

    barContainer.append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(0,${barChartHeight})`)
      .call(barXAxis)
      .selectAll('text')
      .attr('fill', theme === 'dark' ? '#94a3b8' : '#64748b')
      .attr('font-size', '12px')
      .attr('transform', 'rotate(-45)')
      .attr('text-anchor', 'end')
      .attr('dx', '-0.8em')
      .attr('dy', '0.15em');

    barContainer.append('g')
      .attr('class', 'y-axis')
      .call(barYAxis)
      .selectAll('text')
      .attr('fill', theme === 'dark' ? '#94a3b8' : '#64748b')
      .attr('font-size', '12px');

    // Add bar chart title
    barContainer.append('text')
      .attr('x', barChartWidth / 2)
      .attr('y', -40)
      .attr('text-anchor', 'middle')
      .attr('fill', theme === 'dark' ? '#ffffff' : '#1e293b')
      .attr('font-size', '14px')
      .attr('font-weight', 'bold')
      .text('Product Performance');

    // Add legend for bar chart
    const legend = barContainer.append('g')
      .attr('transform', `translate(${barChartWidth - 100},${barChartHeight + 30})`);

    legend.selectAll('.legend-item')
      .data(['Sales', 'Services'])
      .enter()
      .append('g')
      .attr('class', 'legend-item')
      .attr('transform', (d, i) => `translate(0,${i * 20})`)
      .each(function (d) {
        d3.select(this)
          .append('rect')
          .attr('x', 0)
          .attr('y', 0)
          .attr('width', 12)
          .attr('height', 12)
          .attr('fill', colorScale(d))
          .attr('rx', 2)
          .attr('ry', 2);

        d3.select(this)
          .append('text')
          .attr('x', 20)
          .attr('y', 10)
          .attr('fill', theme === 'dark' ? '#e2e8f0' : '#334155')
          .attr('font-size', '10px')
          .text(d);
      });

    // ======================
    // PIE CHART (Right)
    // ======================
    const pieChartWidth = innerWidth * 0.25;
    const pieChartHeight = innerHeight;
    
    // Position pie chart container with padding
    const pieXOffset = barXOffset + barChartWidth + 40;
    pieContainer.attr('transform', `translate(${pieXOffset},0)`);

    const pieRadius = Math.min(pieChartWidth, pieChartHeight * 0.7) / 2;
    const pieY = pieChartHeight * 0.4;

    const pie = d3.pie<{ label: string; value: number }>().value(d => d.value);
    const pieArc = d3.arc<d3.PieArcDatum<{ label: string; value: number }>>()
      .innerRadius(0)
      .outerRadius(pieRadius);

    // Add pie slices
    pieContainer
      .selectAll('.pie-slice')
      .data(pie(pieData))
      .enter()
      .append('path')
      .attr('class', 'pie-slice')
      .attr('d', pieArc)
      .attr('fill', d => pieColor(d.data.label))
      .attr('stroke', theme === 'dark' ? '#1e293b' : '#ffffff')
      .attr('stroke-width', 2)
      .attr('transform', `translate(0,${pieY})`)
      .attr('opacity', 0)
      .transition()
      .delay((d, i) => i * 200)
      .duration(600)
      .attr('opacity', 1);

    // Add animated donut in the center of pie
    const donutArc = d3
      .arc<d3.PieArcDatum<{ label: string; value: number }>>()
      .innerRadius(pieRadius * 0.6)
      .outerRadius(pieRadius * 0.8);

    pieContainer
      .append('path')
      .datum(pie(pieData)[0])
      .attr('d', donutArc)
      .attr('fill', '#ffffff')
      .attr('opacity', 0.2)
      .attr('transform', `translate(0,${pieY})`)
      .transition()
      .duration(2000)
      .attrTween('d', function (d) {
        const interpolate = d3.interpolate(
          { startAngle: 0, endAngle: 0 },
          { startAngle: 0, endAngle: 2 * Math.PI }
        );
        return t => donutArc(interpolate(t)) as string;
      });

    // Add pie chart title
    pieContainer.append('text')
      .attr('x', 0)
      .attr('y', pieY - pieRadius - 25)
      .attr('text-anchor', 'middle')
      .attr('fill', theme === 'dark' ? '#ffffff' : '#1e293b')
      .attr('font-size', '14px')
      .attr('font-weight', 'bold')
      .text('Device Distribution');

    // Add pie chart legend
    const pieLegend = pieContainer.append('g')
      .attr('transform', `translate(${-pieRadius},${pieY + pieRadius + 20})`);

    pieLegend.selectAll('.pie-legend-item')
      .data(pieData)
      .enter()
      .append('g')
      .attr('class', 'pie-legend-item')
      .attr('transform', (d, i) => `translate(${(i % 2) * 120},${Math.floor(i / 2) * 20})`)
      .each(function (d) {
        d3.select(this)
          .append('rect')
          .attr('x', 0)
          .attr('y', 0)
          .attr('width', 12)
          .attr('height', 12)
          .attr('fill', pieColor(d.label))
          .attr('rx', 2)
          .attr('ry', 2);

        d3.select(this)
          .append('text')
          .attr('x', 20)
          .attr('y', 10)
          .attr('fill', theme === 'dark' ? '#e2e8f0' : '#334155')
          .attr('font-size', '10px')
          .text(`${d.label} (${d.value}%)`);
      });

    // Add gradient for area chart
    const defs = svg.append('defs');
    const areaGradient = defs.append('linearGradient').attr('id', 'areaGradient');

    areaGradient
      .append('stop')
      .attr('offset', '0%')
      .attr('stop-color', '#3b82f6')
      .attr('stop-opacity', 0.3);

    areaGradient
      .append('stop')
      .attr('offset', '100%')
      .attr('stop-color', '#3b82f6')
      .attr('stop-opacity', 0);

    // Main dashboard title
    svg.append('text')
      .attr('x', width / 2)
      .attr('y', margin.top / 2)
      .attr('text-anchor', 'middle')
      .attr('fill', theme === 'dark' ? '#ffffff' : '#1e293b')
      .attr('font-size', '18px')
      .attr('font-weight', 'bold')
      .text('Business Performance Dashboard');
  }, [width, height, theme]);

  return (
    <VisualizationContainer ref={containerRef} theme={theme}>
      <svg
        ref={svgRef}
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
      />
      
      {/* Floating metrics with animations */}
      <MetricsContainer>
        <MetricCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          theme={theme}
        >
          <MetricValue>87%</MetricValue>
          <MetricLabel>Adoption Rate</MetricLabel>
        </MetricCard>
        
        <MetricCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          theme={theme}
        >
          <MetricValue>3.2x</MetricValue>
          <MetricLabel>ROI Increase</MetricLabel>
        </MetricCard>
        
        <MetricCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          theme={theme}
        >
          <MetricValue>24/7</MetricValue>
          <MetricLabel>Real-time Analytics</MetricLabel>
        </MetricCard>
      </MetricsContainer>
    </VisualizationContainer>
  );
};

// Styled components
const VisualizationContainer = styled.div<{ theme: 'light' | 'dark' }>`
  position: relative;
  width: 100%;
  background: ${props => (props.theme === 'dark' ? '#0f172a' : '#f8fafc')};
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
`;

const MetricsContainer = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  display: flex;
  gap: 16px;
  z-index: 10;
`;

const MetricCard = styled(motion.div)<{ theme: 'light' | 'dark' }>`
  padding: 12px 20px;
  background: ${props =>
    props.theme === 'dark' ? 'rgba(15, 23, 42, 0.8)' : 'rgba(255, 255, 255, 0.9)'};
  backdrop-filter: blur(8px);
  border-radius: 12px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  border: 1px solid
    ${props => (props.theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)')};
`;

const MetricValue = styled.div`
  font-size: 20px;
  font-weight: 700;
  color: #3b82f6;
  margin-bottom: 4px;
`;

const MetricLabel = styled.div<{ theme?: 'light' | 'dark' }>`
  font-size: 12px;
  color: ${props => (props.theme === 'dark' ? '#94a3b8' : '#64748b')};
`;

export default DataVisualizationHero;