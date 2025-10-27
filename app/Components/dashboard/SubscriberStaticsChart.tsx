"use client";

import {
  BarChart,
  Bar,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type Row = { name: string; value: number; year: number };

const data: Row[] = [
  { name: "Jan", value: 12, year: 2025 },
  { name: "Feb", value: 14, year: 2025 },
  { name: "Mar", value: 22, year: 2025 },
  { name: "Apr", value: 10, year: 2025 },
  { name: "May", value: 13, year: 2025 },
  { name: "Jun", value: 8, year: 2025 },
  { name: "Jul", value: 11, year: 2025 },
  { name: "Aug", value: 20, year: 2025 }, // highlighted in your example
  { name: "Sep", value: 15, year: 2025 },
  { name: "Oct", value: 12, year: 2025 },
  { name: "Nov", value: 9, year: 2025 },
  { name: "Dec", value: 13, year: 2025 },
];

// ---- Custom tooltip (Month + Year + value text) ----
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload?.length) {
    const row = payload[0].payload as Row;
    return (
      <div className="rounded-lg bg-white/95 shadow-md border border-gray-100 px-3 py-2">
        <div className="text-sm font-semibold text-gray-800">
          {label} {row.year}
        </div>
        <div className="text-sm text-gray-500">
          This Month :{" "}
          <span className="text-blue-600 font-medium">
            {row.value} Subscription
          </span>
        </div>
      </div>
    );
  }
  return null;
};

// ---- Active bar shape: blue bar + behind it a soft blue strip (from bar top to x-axis only) ----
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ActiveBarShape = (props: any) => {
  const { x, y, width, height } = props;
  const barRadius = 10;
  const glowWidth = Math.max(width, width); // a bit wider than the bar

  const glowX = x + width / 2 - glowWidth / 2;
  const glowY = y; // start at bar top
  const glowH = height; // end at x-axis (no overflow)

  return (
    <g>
      {/* soft vertical strip behind the active bar */}
      <rect
        x={glowX}
        y={glowY}
        width={glowWidth}
        height={glowH}
        rx={barRadius}
        fill="url(#barGlow)"
      />
      {/* actual active bar */}
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        rx={barRadius}
        fill="url(#barFill)"
      />
    </g>
  );
};

export default function SubscribersBar() {
  const CHART_HEIGHT = 260;

  return (
    <div className="w-full">
      <ResponsiveContainer width="100%" height={CHART_HEIGHT}>
        <BarChart
          data={data}
          margin={{ top: 16, right: 16, left: 8, bottom: 12 }}
        >
          {/* Gradients (one for the bar fill, one for the soft strip) */}
          <defs>
            {/* deep blue bar */}
            <linearGradient id="barFill" x1="0" y1="1" x2="0" y2="0">
              <stop offset="0%" stopColor="#0B4CFF" />
              <stop offset="100%" stopColor="#2B6BFF" />
            </linearGradient>
            {/* soft blue vertical strip */}
            <linearGradient id="barGlow" x1="0" y1="1" x2="0" y2="0">
              <stop offset="0%" stopColor="rgba(56,97,251,0.18)" />
              <stop offset="100%" stopColor="rgba(56,97,251,0.06)" />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey="name"
            className="font-normal text-[10px]"
            tickLine={false}
            axisLine={{ stroke: "#E5E7EB" }}
          />
          <Tooltip cursor={false} content={<CustomTooltip />} />

          {/* Default bars = light grey; on hover, use our ActiveBarShape */}
          <Bar
            dataKey="value"
            barSize={28}
            radius={[10, 10, 10, 10]}
            fill="rgba(56,97,251,0.15)" // pale bars like your screenshot
            activeBar={<ActiveBarShape />}
            isAnimationActive={false}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
