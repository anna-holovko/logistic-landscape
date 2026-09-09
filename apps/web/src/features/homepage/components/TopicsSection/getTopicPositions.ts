import { Topic } from "./types";

/**
 * Calculate dynamic font sizes based on article count
 * Uses logarithmic scaling to preserve visual hierarchy
 */
export function calculateDynamicFontSize(
  articleCount: number,
  allCounts: number[],
  minSize: number = 20,
  maxSize: number = 100
): number {
  if (allCounts.length === 0) return minSize;

  const minCount = Math.min(...allCounts);
  const maxCount = Math.max(...allCounts);

  if (minCount === maxCount) {
    return (minSize + maxSize) / 2;
  }

  // Logarithmic scaling
  const logMin = Math.log(minCount + 1);
  const logMax = Math.log(maxCount + 1);
  const logValue = Math.log(articleCount + 1);

  const normalized = (logValue - logMin) / (logMax - logMin);
  const clamped = Math.max(0, Math.min(1, normalized));

  return minSize + clamped * (maxSize - minSize);
}

/**
 * Calculate approximate width of text
 * Returns estimated pixel width based on font size and character count
 */
export function estimateTextWidth(text: string, fontSize: number): number {
  // Approximate character width as 55% of font size for Petrona font
  return Math.ceil(text.length * fontSize * 0.55);
}

/**
 * Get topic positions for desktop layout (834px width)
 * Returns array of positions with inline style values
 */
export function getTopicPositions(topics: Topic[]) {
  const allCounts = topics.map((t) => t.articleCount);
  const minCount = Math.min(...allCounts);
  const maxCount = Math.max(...allCounts);

  return topics.map((topic) => {
    const fontSize = calculateDynamicFontSize(topic.articleCount, allCounts);

    // Estimate dimensions
    const width = estimateTextWidth(topic.name, fontSize);
    const height = Math.ceil(fontSize * 1.3);

    return {
      topic,
      fontSize,
      width,
      height,
    };
  });
}
