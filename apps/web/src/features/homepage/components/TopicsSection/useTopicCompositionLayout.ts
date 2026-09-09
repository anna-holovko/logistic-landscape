"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { Topic } from "./types";
import { calculateTopicLayout, PositionedTopic, LayoutConstraints } from "./topicLayout";

interface UseTopicCompositionLayoutProps {
  topics: Topic[];
}

interface ResponsiveBreakpoints {
  desktop: LayoutConstraints;
  tablet: LayoutConstraints;
  mobile: LayoutConstraints;
}

const BREAKPOINTS: ResponsiveBreakpoints = {
  desktop: {
    containerWidth: 834,
    containerHeight: 400,
    titleHeight: 80,
    minFontSize: 16,
    maxFontSize: 80,
    padding: 12,
  },
  tablet: {
    containerWidth: 700,
    containerHeight: 350,
    titleHeight: 70,
    minFontSize: 14,
    maxFontSize: 60,
    padding: 10,
  },
  mobile: {
    containerWidth: 300,
    containerHeight: 500,
    titleHeight: 60,
    minFontSize: 12,
    maxFontSize: 40,
    padding: 8,
  },
};

function getConstraintsForWidth(width: number): LayoutConstraints {
  if (width < 768) {
    return BREAKPOINTS.mobile;
  }
  if (width < 1024) {
    return BREAKPOINTS.tablet;
  }
  return BREAKPOINTS.desktop;
}

export function useTopicCompositionLayout({
  topics,
}: UseTopicCompositionLayoutProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [positions, setPositions] = useState<PositionedTopic[]>([]);
  const [containerWidth, setContainerWidth] = useState(834);

  // Recalculate layout
  const recalculateLayout = useCallback(() => {
    let width = 834; // Default desktop width

    // Try to get actual width from ref
    if (typeof document !== "undefined" && containerRef.current) {
      const actualWidth = containerRef.current.offsetWidth;
      if (actualWidth > 0) {
        width = actualWidth;
      }
    }

    setContainerWidth(width);
    const constraints = getConstraintsForWidth(width);
    console.log("[TopicsSection] Layout constraints:", constraints);
    console.log("[TopicsSection] Topics count:", topics.length);

    try {
      const newPositions = calculateTopicLayout(topics, constraints);
      console.log("[TopicsSection] Calculated positions:", newPositions.length, "topics");
      if (newPositions.length > 0 && newPositions[0]) {
        console.log("[TopicsSection] First position:", newPositions[0].topic.name, newPositions[0].x, newPositions[0].y);
      }
      setPositions(newPositions);
    } catch (error) {
      console.error("[TopicsSection] Layout calculation error:", error);
    }
  }, [topics]);

  // Initial layout calculation with delay to ensure DOM is ready
  useEffect(() => {
    const timer = setTimeout(() => {
      recalculateLayout();
    }, 100);

    return () => clearTimeout(timer);
  }, [recalculateLayout]);

  // Setup ResizeObserver for responsive recalculation
  useEffect(() => {
    if (typeof window === "undefined") return;

    const container = containerRef.current;
    if (!container) return;

    const observer = new ResizeObserver(() => {
      recalculateLayout();
    });

    observer.observe(container);

    return () => {
      observer.disconnect();
    };
  }, [recalculateLayout]);

  return {
    containerRef,
    positions,
    containerWidth,
  };
}
