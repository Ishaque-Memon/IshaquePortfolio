import React from "react";

/**
 * Simple SVG Bar Chart
 * @param {Array<{ label: string, value: number, color?: string }>} data
 * @param {number} [height=180]
 * @param {number} [barWidth=32]
 */
const BarChart = ({ data, height = 180, barWidth = 32 }) => {
  if (!data || data.length === 0) return <div className="text-neutral-400 text-center">No data</div>;
  const max = Math.max(...data.map(d => d.value), 1);
  const width = data.length * (barWidth + 16);

  return (
    <svg width={width} height={height} className="w-full h-auto">
      {data.map((d, i) => {
        const barHeight = Math.round((d.value / max) * (height - 40));
        return (
          <g key={d.label}>
            <rect
              x={i * (barWidth + 16)}
              y={height - barHeight - 24}
              width={barWidth}
              height={barHeight}
              rx={6}
              fill={d.color || "#6366f1"}
              className="transition-all duration-300"
            />
            <text
              x={i * (barWidth + 16) + barWidth / 2}
              y={height - 8}
              textAnchor="middle"
              fontSize={12}
              fill="#888"
            >
              {d.label}
            </text>
            <text
              x={i * (barWidth + 16) + barWidth / 2}
              y={height - barHeight - 32}
              textAnchor="middle"
              fontSize={14}
              fill="#222"
              className="font-bold"
            >
              {d.value}
            </text>
          </g>
        );
      })}
    </svg>
  );
};

export default BarChart;
