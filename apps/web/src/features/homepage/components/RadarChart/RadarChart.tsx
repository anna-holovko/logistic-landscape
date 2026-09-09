"use client";

interface RadarChartData {
  parcel?: number;
  ftl?: number;
  coldChain?: number;
  stl?: number;
  ltl?: number;
}

interface RadarChartProps {
  data?: RadarChartData | number[];
  labels?: string[];
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
  // Default labels matching Figma clockwise order: Parcel → FTL → Cold Chain → STL → LTL
  const defaultLabels = ["Parcel", "FTL", "Cold Chain", "STL", "LTL"];
  const chartLabels = labels || defaultLabels;

  // Convert data object or array to normalized array
  let dataArray: number[] = [];
  if (Array.isArray(data)) {
    dataArray = data;
  } else if (data && typeof data === "object") {
    // Map data object to array in correct order: Parcel, FTL, Cold Chain, STL, LTL
    dataArray = [
      data.parcel ?? 0,
      data.ftl ?? 0,
      data.coldChain ?? 0,
      data.stl ?? 0,
      data.ltl ?? 0,
    ];
  } else {
    // Default values if no data provided
    dataArray = [80, 75, 70, 85, 65];
  }

  const points = chartLabels.length;
  const center = size / 2;
  const radius = (size / 2) * 0.65;
  const angleSlice = (Math.PI * 2) / points;

  // FIGMA GEOMETRY (STATIC):
  // - Chart is rendered in a 251x251px viewBox
  // - Center at (125, 125)
  // - Outer radius approximately 95px
  // - Axes point at angles: -90° (top), then +72° for each subsequent axis
  // - Grid: 3 concentric rings at 75%, 50%, 25% of radius
  // - Labels positioned at ~115% of radius from center

  // DATA NORMALIZATION:
  // Values are normalized to 0-1 range based on maxValue
  // Radius of data polygon = normalized_value * radius
  const normalizeValue = (value: number) => {
    return Math.min(Math.max(value / maxValue, 0), 1);
  };

  // Calculate polygon points - clockwise from top
  // DYNAMIC: based on data values
  const polygonPoints = dataArray
    .map((value, i) => {
      // Clockwise rotation: -90° for top, then +angle for each subsequent point
      const angle = -Math.PI / 2 + angleSlice * i;
      const normalizedValue = normalizeValue(value);
      const r = normalizedValue * radius;
      const x = center + r * Math.cos(angle);
      const y = center + r * Math.sin(angle);
      return `${x},${y}`;
    })
    .join(" ");

  // Calculate grid ring points
  // STATIC: fixed geometry matching Figma
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
  // STATIC: fixed positions matching Figma design
  const labelPositions = chartLabels.map((_, i) => {
    const angle = -Math.PI / 2 + angleSlice * i;
    const r = radius * 1.15; // Label offset from center
    const x = center + r * Math.cos(angle);
    const y = center + r * Math.sin(angle);
    return { x, y, label: chartLabels[i] };
  });

  // Calculate vertex points
  // STATIC: outer radius points matching Figma grid intersections
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
