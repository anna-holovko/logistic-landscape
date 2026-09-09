"use client";

interface RadarChartProps {
  data: number[];
  labels: string[];
  size?: number;
  maxValue?: number;
  fillColor?: string;
  strokeColor?: string;
  gridColor?: string;
}

export function RadarChart({
  data,
  labels,
  size = 160,
  maxValue = 100,
  fillColor = "#c79a3e",
  strokeColor = "#86918c",
  gridColor = "#5a8fa0",
}: RadarChartProps) {
  const points = data.length;
  const center = size / 2;
  const radius = (size / 2) * 0.65;
  const angleSlice = (Math.PI * 2) / points;

  // Calculate polygon points - clockwise from top
  const polygonPoints = data
    .map((value, i) => {
      // Clockwise rotation: -90° for top, then +angle for each subsequent point
      const angle = -Math.PI / 2 + angleSlice * i;
      const r = (value / maxValue) * radius;
      const x = center + r * Math.cos(angle);
      const y = center + r * Math.sin(angle);
      return `${x},${y}`;
    })
    .join(" ");

  // Calculate grid ring points
  const gridRings = [0.75, 0.5, 0.25].map((scale) => {
    const ringPoints = Array.from({ length: points })
      .map((_, i) => {
        const angle = -Math.PI / 2 + angleSlice * i;
        const r = radius * scale;
        const x = center + r * Math.cos(angle);
        const y = center + r * Math.sin(angle);
        return `${x},${y}`;
      })
      .join(" ");
    return ringPoints;
  });

  // Calculate label positions
  const labelPositions = labels.map((_, i) => {
    const angle = -Math.PI / 2 + angleSlice * i;
    const r = radius * 1.15;
    const x = center + r * Math.cos(angle);
    const y = center + r * Math.sin(angle);
    return { x, y, label: labels[i] };
  });

  // Calculate vertex points
  const vertexPoints = Array.from({ length: points })
    .map((_, i) => {
      const angle = -Math.PI / 2 + angleSlice * i;
      const x = center + radius * Math.cos(angle);
      const y = center + radius * Math.sin(angle);
      return { x, y };
    });

  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      style={{ display: "block", width: "100%", height: "100%" }}
    >
      {/* Grid rings */}
      {gridRings.map((points, i) => (
        <polygon
          key={`grid-${i}`}
          points={points}
          fill="none"
          stroke={gridColor}
          strokeWidth="0.8"
          opacity="0.5"
        />
      ))}

      {/* Radial lines */}
      {vertexPoints.map((point, i) => (
        <line
          key={`radial-${i}`}
          x1={center}
          y1={center}
          x2={point.x}
          y2={point.y}
          stroke={gridColor}
          strokeWidth="0.8"
          opacity="0.5"
        />
      ))}

      {/* Filled polygon */}
      <polygon
        points={polygonPoints}
        fill={fillColor}
        opacity="0.45"
      />

      {/* Outer border */}
      <polygon
        points={polygonPoints}
        fill="none"
        stroke={strokeColor}
        strokeWidth="1.2"
      />

      {/* Vertex dots */}
      {vertexPoints.map((point, i) => (
        <circle
          key={`dot-${i}`}
          cx={point.x}
          cy={point.y}
          r="3.5"
          fill="#f4ede0"
        />
      ))}

      {/* Labels */}
      {labelPositions.map((pos, i) => (
        <text
          key={`label-${i}`}
          x={pos.x}
          y={pos.y}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="11"
          fill="#f4ede0"
          fontWeight="400"
          opacity="0.8"
        >
          {pos.label}
        </text>
      ))}
    </svg>
  );
}
