import { Topic } from "./types";

/**
 * Test scenarios for TopicsSection component
 * Each scenario tests different article count distributions
 */

export const SCENARIO_BALANCED: Topic[] = [
  { id: "1", name: "Topic A", articleCount: 10, colorVariant: "water" },
  { id: "2", name: "Topic B", articleCount: 11, colorVariant: "brick" },
  { id: "3", name: "Topic C", articleCount: 9, colorVariant: "water" },
  { id: "4", name: "Topic D", articleCount: 12, colorVariant: "gold" },
  { id: "5", name: "Topic E", articleCount: 8, colorVariant: "gray" },
];

export const SCENARIO_ONE_DOMINANT: Topic[] = [
  { id: "1", name: "Major Topic", articleCount: 55, colorVariant: "brick" },
  { id: "2", name: "Secondary A", articleCount: 12, colorVariant: "water" },
  { id: "3", name: "Secondary B", articleCount: 10, colorVariant: "water" },
  { id: "4", name: "Minor A", articleCount: 5, colorVariant: "gray" },
  { id: "5", name: "Minor B", articleCount: 3, colorVariant: "gold" },
];

export const SCENARIO_MULTIPLE_HIGH: Topic[] = [
  { id: "1", name: "High Priority 1", articleCount: 45, colorVariant: "brick" },
  { id: "2", name: "High Priority 2", articleCount: 38, colorVariant: "gold" },
  { id: "3", name: "High Priority 3", articleCount: 35, colorVariant: "brick" },
  { id: "4", name: "Medium", articleCount: 15, colorVariant: "water" },
  { id: "5", name: "Low", articleCount: 4, colorVariant: "gray" },
];

export const SCENARIO_LOW_COUNTS: Topic[] = [
  { id: "1", name: "Item 1", articleCount: 2, colorVariant: "water" },
  { id: "2", name: "Item 2", articleCount: 3, colorVariant: "water" },
  { id: "3", name: "Item 3", articleCount: 1, colorVariant: "brick" },
  { id: "4", name: "Item 4", articleCount: 4, colorVariant: "gold" },
  { id: "5", name: "Item 5", articleCount: 2, colorVariant: "gray" },
];

export const SCENARIO_FEW_TOPICS: Topic[] = [
  { id: "1", name: "Main", articleCount: 25, colorVariant: "brick" },
  { id: "2", name: "Supporting", articleCount: 12, colorVariant: "water" },
  { id: "3", name: "Detail", articleCount: 5, colorVariant: "gold" },
];

export const SCENARIO_MANY_TOPICS: Topic[] = [
  { id: "1", name: "Freight Brokerage", articleCount: 42, colorVariant: "water" },
  { id: "2", name: "Ocean Freight", articleCount: 31, colorVariant: "gray" },
  { id: "3", name: "AI", articleCount: 26, colorVariant: "brick" },
  { id: "4", name: "Last mile", articleCount: 18, colorVariant: "brick" },
  { id: "5", name: "LTL", articleCount: 14, colorVariant: "gold" },
  { id: "6", name: "Cross-border", articleCount: 9, colorVariant: "water" },
  { id: "7", name: "Customs clearance", articleCount: 8, colorVariant: "water" },
  { id: "8", name: "Warehousing", articleCount: 7, colorVariant: "water" },
  { id: "9", name: "Intermodal", articleCount: 6, colorVariant: "water" },
  { id: "10", name: "Drayage", articleCount: 5, colorVariant: "water" },
  { id: "11", name: "Cold chain", articleCount: 4, colorVariant: "water" },
  { id: "12", name: "Supply Chain", articleCount: 3, colorVariant: "gold" },
  { id: "13", name: "Logistics Tech", articleCount: 2, colorVariant: "brick" },
  { id: "14", name: "Sustainability", articleCount: 2, colorVariant: "water" },
  { id: "15", name: "Emerging", articleCount: 1, colorVariant: "gray" },
];

/**
 * Scenario descriptions for testing checklist
 */
export const SCENARIO_DESCRIPTIONS = {
  BALANCED:
    "All topics have similar article counts (8-12). Expected: Even distribution, smaller uniform sizes.",
  ONE_DOMINANT:
    "One topic has 55 articles, others 3-12. Expected: Large dominant topic, smaller supporting topics.",
  MULTIPLE_HIGH:
    "3-4 topics with 35+ articles, others lower. Expected: Multiple large topics, balanced layout.",
  LOW_COUNTS:
    "All topics have 1-4 articles. Expected: All at minimum font size, compact layout.",
  FEW_TOPICS:
    "Only 3 topics. Expected: Adequate spacing, readable sizes.",
  MANY_TOPICS:
    "15 topics with varied counts. Expected: Efficient packing, no overlaps.",
};

/**
 * Validation tests for each scenario
 */
export const VALIDATION_TESTS = [
  {
    name: "Title Visibility",
    check: "Heading 'Explore what shapes logistics' is fully visible",
  },
  {
    name: "No Topic Overlaps",
    check: "Topics do not overlap each other",
  },
  {
    name: "No Title Overlaps",
    check: "Topics do not overlap the heading",
  },
  {
    name: "Container Bounds",
    check: "All topics fit within the container",
  },
  {
    name: "Font Size Hierarchy",
    check: "Larger article counts result in larger font sizes",
  },
  {
    name: "Color Variety",
    check: "Different color variants are applied correctly",
  },
  {
    name: "Typography Readability",
    check: "Text remains readable at all calculated sizes",
  },
  {
    name: "Responsive Desktop",
    check: "Layout works correctly at desktop width (1024px+)",
  },
  {
    name: "Responsive Tablet",
    check: "Layout recalculates correctly at tablet width (768-1024px)",
  },
  {
    name: "Responsive Mobile",
    check: "Layout recalculates correctly at mobile width (<768px), no horizontal scroll",
  },
  {
    name: "Determinism",
    check: "Same data produces same layout on page reload",
  },
];
