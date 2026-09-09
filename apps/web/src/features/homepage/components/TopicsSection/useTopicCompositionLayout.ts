"use client";

import { useEffect, useRef, useState } from "react";
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
  const recalculateLayout = () => {
    if (!containerRef.current) return;

    let width = containerRef.current.offsetWidth;
    if (width === 0) {
      width = 834;
    }

    setContainerWidth(width);
    const constraints = getConstraintsForWidth(width);
    const newPositions = calculateTopicLayout(topics, constraints);
    setPositions(newPositions);
  };

  // Initial layout calculation
  useEffect(() => {
    // Calculate immediately on client
    recalculateLayout();
  }, [topics]);

  // Setup ResizeObserver
  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new ResizeObserver(() => {
      recalculateLayout();
    });

    observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
    };
  }, [topics]);

  return {
    containerRef,
    positions,
    containerWidth,
  };
}
