import { Topic } from "./types";

export interface Dimensions {
  width: number;
  height: number;
}

export interface LayoutConstraints {
  containerWidth: number;
  containerHeight: number;
  titleHeight: number;
  minFontSize: number;
  maxFontSize: number;
  padding: number;
}

export interface TopicWithSize {
  topic: Topic;
  fontSize: number;
  dimensions: Dimensions;
}

export interface PositionedTopic {
  topic: Topic;
  fontSize: number;
  x: number;
  y: number;
  width: number;
  height: number;
  colorVariant: string;
}

interface BoundingBox {
  left: number;
  top: number;
  right: number;
  bottom: number;
}

interface PreferredPosition {
  topicId: string;
  relX: number;
  relY: number;
}

// Calculate font size based on article count using logarithmic scaling
export function calculateTopicFontSize(
  articleCount: number,
  allCounts: number[],
  minFontSize: number,
  maxFontSize: number
): number {
  if (allCounts.length === 0) return minFontSize;

  const minCount = Math.min(...allCounts);
  const maxCount = Math.max(...allCounts);

  if (minCount === maxCount) {
    return (minFontSize + maxFontSize) / 2;
  }

  // Logarithmic scaling
  const logMin = Math.log(minCount + 1);
  const logMax = Math.log(maxCount + 1);
  const logValue = Math.log(articleCount + 1);

  const normalized = (logValue - logMin) / (logMax - logMin);
  const clamped = Math.max(0, Math.min(1, normalized));

  return minFontSize + clamped * (maxFontSize - minFontSize);
}

// Measure text using canvas (client-side only)
export function measureText(
  text: string,
  fontSize: number,
  fontFamily: string = "Petrona, serif",
  fontStyle: string = "italic"
): Dimensions {
  // Server-side fallback estimation
  if (typeof document === "undefined") {
    return estimateTextDimensions(text, fontSize);
  }

  try {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return estimateTextDimensions(text, fontSize);

    ctx.font = `${fontStyle} ${fontSize}px ${fontFamily}`;
    const metrics = ctx.measureText(text);

    const ascent = fontSize * 0.8;
    const descent = fontSize * 0.2;

    return {
      width: Math.ceil(metrics.width),
      height: Math.ceil(ascent + descent),
    };
  } catch {
    return estimateTextDimensions(text, fontSize);
  }
}

// Estimate text dimensions as fallback
function estimateTextDimensions(text: string, fontSize: number): Dimensions {
  // Approximate width based on average character width
  const charWidth = fontSize * 0.5;
  return {
    width: Math.ceil(text.length * charWidth),
    height: Math.ceil(fontSize * 1.2),
  };
}

// Preferred positions based on Figma design (normalized to 0-1 range)
const PREFERRED_POSITIONS: Record<string, { x: number; y: number }> = {
  "Freight Brokerage": { x: 0.5, y: 0.5 },
  "Ocean Freight": { x: 0.6, y: 0.55 },
  "AI": { x: 0.5, y: 0.45 },
  "Last mile": { x: 0.65, y: 0.5 },
  "LTL": { x: 0.6, y: 0.65 },
  "Cross-border": { x: 0.35, y: 0.35 },
  "Customs clearance": { x: 0.3, y: 0.45 },
  "Warehousing": { x: 0.5, y: 0.65 },
  "Intermodal": { x: 0.65, y: 0.7 },
  "Drayage": { x: 0.55, y: 0.75 },
  "Cold chain": { x: 0.2, y: 0.25 },
};

// Get preferred position for a topic
function getPreferredPosition(
  topicName: string,
  containerWidth: number,
  containerHeight: number,
  topicAreaTop: number
): { x: number; y: number } {
  const preferred = PREFERRED_POSITIONS[topicName];

  if (preferred) {
    const topicAreaHeight = containerHeight - topicAreaTop;
    return {
      x: containerWidth * preferred.x,
      y: topicAreaTop + topicAreaHeight * preferred.y,
    };
  }

  // Default to center if not in preferred positions
  return {
    x: containerWidth / 2,
    y: topicAreaTop + (containerHeight - topicAreaTop) / 2,
  };
}

// Check if two bounding boxes collide with padding
function boxesCollide(box1: BoundingBox, box2: BoundingBox, padding: number = 12): boolean {
  return !(
    box1.right + padding < box2.left ||
    box2.right + padding < box1.left ||
    box1.bottom + padding < box2.top ||
    box2.bottom + padding < box1.top
  );
}

// Check if box is within container
function isWithinContainer(
  box: BoundingBox,
  containerWidth: number,
  containerHeight: number,
  padding: number = 8
): boolean {
  return (
    box.left >= padding &&
    box.right <= containerWidth - padding &&
    box.top >= padding &&
    box.bottom <= containerHeight - padding
  );
}

// Check if box collides with title area
function collidesWithTitle(box: BoundingBox, titleAreaHeight: number, padding: number = 12): boolean {
  return box.top < titleAreaHeight + padding;
}

// Find collision-free position for a topic
function findPosition(
  preferredX: number,
  preferredY: number,
  width: number,
  height: number,
  constraints: LayoutConstraints,
  placedBoxes: BoundingBox[],
  topicAreaTop: number
): { x: number; y: number } | null {
  // Try preferred position first
  let x = preferredX - width / 2;
  let y = preferredY - height / 2;

  // Clamp to bounds
  x = Math.max(constraints.padding, Math.min(x, constraints.containerWidth - width - constraints.padding));
  y = Math.max(
    topicAreaTop + constraints.padding,
    Math.min(y, constraints.containerHeight - height - constraints.padding)
  );

  let box: BoundingBox = {
    left: x,
    top: y,
    right: x + width,
    bottom: y + height,
  };

  // Check if preferred position is valid
  if (
    isWithinContainer(box, constraints.containerWidth, constraints.containerHeight, constraints.padding) &&
    !collidesWithTitle(box, topicAreaTop, constraints.padding) &&
    !placedBoxes.some((existing) => boxesCollide(box, existing, constraints.padding))
  ) {
    return { x, y };
  }

  // Spiral search from preferred position
  const step = 20;
  const maxDistance = Math.max(constraints.containerWidth, constraints.containerHeight);

  for (let distance = step; distance <= maxDistance; distance += step) {
    const circumference = 2 * Math.PI * distance;
    const numPoints = Math.max(4, Math.ceil(circumference / step));

    for (let i = 0; i < numPoints; i++) {
      const angle = (i / numPoints) * 2 * Math.PI;
      const candidateX = preferredX + distance * Math.cos(angle);
      const candidateY = preferredY + distance * Math.sin(angle);

      let posX = candidateX - width / 2;
      let posY = candidateY - height / 2;

      // Clamp to bounds
      posX = Math.max(constraints.padding, Math.min(posX, constraints.containerWidth - width - constraints.padding));
      posY = Math.max(
        topicAreaTop + constraints.padding,
        Math.min(posY, constraints.containerHeight - height - constraints.padding)
      );

      const candidateBox: BoundingBox = {
        left: posX,
        top: posY,
        right: posX + width,
        bottom: posY + height,
      };

      if (
        isWithinContainer(candidateBox, constraints.containerWidth, constraints.containerHeight, constraints.padding) &&
        !collidesWithTitle(candidateBox, topicAreaTop, constraints.padding) &&
        !placedBoxes.some((existing) => boxesCollide(candidateBox, existing, constraints.padding))
      ) {
        return { x: posX, y: posY };
      }
    }
  }

  return null;
}

// Main layout calculation
export function calculateTopicLayout(
  topics: Topic[],
  constraints: LayoutConstraints
): PositionedTopic[] {
  const results: PositionedTopic[] = [];

  if (topics.length === 0) {
    return results;
  }

  // Calculate font sizes
  const articleCounts = topics.map((t) => t.articleCount);

  const topicsWithSizes: TopicWithSize[] = topics.map((topic) => {
    const fontSize = calculateTopicFontSize(topic.articleCount, articleCounts, constraints.minFontSize, constraints.maxFontSize);
    const dimensions = measureText(topic.name, fontSize);

    return {
      topic,
      fontSize,
      dimensions,
    };
  });

  // Sort by size (largest first) for deterministic placement
  const sorted = [...topicsWithSizes].sort((a, b) => b.dimensions.width - a.dimensions.width);

  const topicAreaTop = constraints.titleHeight;
  const placedBoxes: BoundingBox[] = [];

  for (const item of sorted) {
    const { width, height } = item.dimensions;

    const preferredPos = getPreferredPosition(
      item.topic.name,
      constraints.containerWidth,
      constraints.containerHeight,
      topicAreaTop
    );

    const position = findPosition(
      preferredPos.x,
      preferredPos.y,
      width,
      height,
      constraints,
      placedBoxes,
      topicAreaTop
    );

    if (position) {
      const box: BoundingBox = {
        left: position.x,
        top: position.y,
        right: position.x + width,
        bottom: position.y + height,
      };
      placedBoxes.push(box);

      results.push({
        topic: item.topic,
        fontSize: item.fontSize,
        x: position.x,
        y: position.y,
        width,
        height,
        colorVariant: item.topic.colorVariant || "water",
      });
    }
  }

  return results;
}
