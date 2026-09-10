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

    ctx.font = `${fontSize}px Petrona, serif`;
    const metrics = ctx.measureText(text);
    // account for the 0.02em letter-spacing applied in CSS, which
    // canvas measureText does not include, plus a safety margin for
    // metric differences if Petrona hasn't finished loading yet
    const letterSpacing = fontSize * 0.02 * text.length;
    const safetyMargin = (metrics.width + letterSpacing) * 0.1;

    return {
      width: Math.ceil(metrics.width + letterSpacing + safetyMargin),
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
  max: number = 72
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

  // Sort by font size (largest first) so the visually dominant words
  // (which may be short but very tall, e.g. "AI") claim space before
  // narrower but wider ones, instead of being squeezed into whatever is
  // left over once every wide word has already been placed
  const sorted = [...sizes].sort((a, b) => b.fontSize - a.fontSize);

  const positioned: PositionedTopic[] = [];
  const usedAreas: Array<{ x: number; y: number; w: number; h: number }> = [];

  const padding = 14;
  const topicAreaTop = titleHeight;
  const topicAreaHeight = containerHeight - topicAreaTop;
  const availableWidth = containerWidth - padding * 2;
  const availableHeight = topicAreaHeight - padding;

  // Place each topic
  for (const item of sorted) {
    let bestX = padding;
    let bestY = topicAreaTop + padding;
    let found = false;

    // Try grid positions (fine-grained so tightly-sized words can still
    // find a free, non-colliding slot instead of falling back to naive
    // stacking, which does not check collisions at all)
    const gridStepX = 6;
    const gridStepY = 6;

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
