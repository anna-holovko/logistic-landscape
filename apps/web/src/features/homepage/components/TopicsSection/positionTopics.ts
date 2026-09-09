import { Topic } from "./types";

export interface PositionedTopic {
  topic: Topic;
  fontSize: number;
  x: number;
  y: number;
  width: number;
  height: number;
  colorVariant: string;
}

interface TextDimensions {
  width: number;
  height: number;
}

// Measure text with canvas
function measureTextDimensions(text: string, fontSize: number): TextDimensions {
  if (typeof document === "undefined") {
    // Server-side estimation
    return {
      width: Math.ceil(text.length * fontSize * 0.55),
      height: Math.ceil(fontSize * 1.2),
    };
  }

  try {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("No canvas context");

    ctx.font = `italic ${fontSize}px Petrona, serif`;
    const metrics = ctx.measureText(text);

    return {
      width: Math.ceil(metrics.width),
      height: Math.ceil(fontSize * 1.2),
    };
  } catch {
    return {
      width: Math.ceil(text.length * fontSize * 0.55),
      height: Math.ceil(fontSize * 1.2),
    };
  }
}

// Calculate font size from article count
function calculateFontSize(
  articleCount: number,
  allCounts: number[],
  min: number = 16,
  max: number = 80
): number {
  const minCount = Math.min(...allCounts);
  const maxCount = Math.max(...allCounts);

  if (minCount === maxCount) return (min + max) / 2;

  const logMin = Math.log(minCount + 1);
  const logMax = Math.log(maxCount + 1);
  const logVal = Math.log(articleCount + 1);

  const norm = (logVal - logMin) / (logMax - logMin);
  return min + Math.max(0, Math.min(1, norm)) * (max - min);
}

// Check if boxes collide with padding
function boxesCollide(
  x1: number,
  y1: number,
  w1: number,
  h1: number,
  x2: number,
  y2: number,
  w2: number,
  h2: number,
  padding: number = 16
): boolean {
  return !(
    x1 + w1 + padding < x2 ||
    x2 + w2 + padding < x1 ||
    y1 + h1 + padding < y2 ||
    y2 + h2 + padding < y1
  );
}

export function positionTopics(
  topics: Topic[],
  containerWidth: number,
  containerHeight: number,
  titleHeight: number = 100
): PositionedTopic[] {
  if (topics.length === 0) return [];

  const allCounts = topics.map((t) => t.articleCount);

  // Calculate sizes for all topics
  const sizes = topics.map((topic) => {
    const fontSize = calculateFontSize(topic.articleCount, allCounts);
    const dimensions = measureTextDimensions(topic.name, fontSize);

    return {
      topic,
      fontSize,
      ...dimensions,
    };
  });

  // Sort by width (largest first)
  const sorted = [...sizes].sort((a, b) => b.width - a.width);

  const positioned: PositionedTopic[] = [];
  const usedAreas: Array<{ x: number; y: number; w: number; h: number }> = [];

  const padding = 12;
  const topicAreaTop = titleHeight;
  const topicAreaHeight = containerHeight - topicAreaTop;
  const availableWidth = containerWidth - padding * 2;
  const availableHeight = topicAreaHeight - padding;

  // Place each topic
  for (const item of sorted) {
    let bestX = padding;
    let bestY = topicAreaTop + padding;
    let found = false;

    // Try grid positions
    const gridStepX = Math.max(40, availableWidth / 6);
    const gridStepY = Math.max(40, availableHeight / 4);

    for (let gridY = 0; gridY < availableHeight; gridY += gridStepY) {
      for (let gridX = 0; gridX < availableWidth; gridX += gridStepX) {
        const testX = padding + gridX;
        const testY = topicAreaTop + padding + gridY;

        // Check bounds
        if (
          testX + item.width + padding > containerWidth ||
          testY + item.height + padding > containerHeight
        ) {
          continue;
        }

        // Check collisions
        let collides = false;
        for (const used of usedAreas) {
          if (
            boxesCollide(
              testX,
              testY,
              item.width,
              item.height,
              used.x,
              used.y,
              used.w,
              used.h,
              padding
            )
          ) {
            collides = true;
            break;
          }
        }

        if (!collides) {
          bestX = testX;
          bestY = testY;
          found = true;
          break;
        }
      }

      if (found) break;
    }

    // If no grid position found, place in available row space
    if (!found && usedAreas.length > 0) {
      const lastArea = usedAreas[usedAreas.length - 1];
      if (lastArea) {
        bestX = lastArea.x + lastArea.w + padding;
        bestY = lastArea.y;

        if (bestX + item.width + padding > containerWidth) {
          bestX = padding;
          bestY = lastArea.y + lastArea.h + padding;
        }
      }
    }

    usedAreas.push({
      x: bestX,
      y: bestY,
      w: item.width,
      h: item.height,
    });

    positioned.push({
      topic: item.topic,
      fontSize: item.fontSize,
      x: bestX,
      y: bestY,
      width: item.width,
      height: item.height,
      colorVariant: item.topic.colorVariant || "water",
    });
  }

  return positioned;
}
