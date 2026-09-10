"use client";

import { useEffect, useRef, useState } from "react";
import { Topic } from "./types";
import { positionTopics } from "./positionTopics";
import styles from "./TopicsSection.module.css";

const EXAMPLE_TOPICS: Topic[] = [
  { id: "1", name: "Freight Brokerage", articleCount: 15, colorVariant: "water" },
  { id: "2", name: "Ocean Freight", articleCount: 26, colorVariant: "gray" },
  { id: "3", name: "AI", articleCount: 45, colorVariant: "brick" },
  { id: "4", name: "Last mile", articleCount: 10, colorVariant: "brick" },
  { id: "5", name: "LTL", articleCount: 16, colorVariant: "gold" },
  { id: "6", name: "Cross-border", articleCount: 5, colorVariant: "water" },
  { id: "7", name: "Customs clearance", articleCount: 4, colorVariant: "water" },
  { id: "8", name: "Warehousing", articleCount: 7, colorVariant: "water" },
  { id: "9", name: "Intermodal", articleCount: 3, colorVariant: "water" },
  { id: "10", name: "Drayage", articleCount: 2, colorVariant: "water" },
  { id: "11", name: "Cold chain", articleCount: 2, colorVariant: "water" },
];

interface TopicsSectionProps {
  topics?: Topic[];
}

export function TopicsSection({ topics = EXAMPLE_TOPICS }: TopicsSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [positions, setPositions] = useState<ReturnType<typeof positionTopics>>([]);
  // Below desktop, .topicsWrapper switches to static/inline-flow (see
  // TopicsSection.module.css) so words wrap naturally instead of being
  // absolutely packed into a fixed box; inline position/left/top would
  // otherwise always win over that CSS regardless of viewport
  const [isDesktopLayout, setIsDesktopLayout] = useState(true);

  useEffect(() => {
    const mql = window.matchMedia("(min-width: 1025px)");
    setIsDesktopLayout(mql.matches);
    const handleChange = (e: MediaQueryListEvent) => setIsDesktopLayout(e.matches);
    mql.addEventListener("change", handleChange);
    return () => mql.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    const compute = () => {
      if (!containerRef.current) return;
      const width = containerRef.current.offsetWidth || 834;
      const height = containerRef.current.offsetHeight || 400;

      // Calculate positions (no title offset: the heading is a separate
      // sibling above this box, spaced via the flex gap, not inside it)
      const positioned = positionTopics(topics, width, height, 0);
      setPositions(positioned);
    };

    compute();

    // Recompute once the real Petrona font is loaded: measuring text
    // width with a fallback font produces inaccurate positions/collisions
    if (typeof document !== "undefined" && "fonts" in document) {
      document.fonts.ready.then(compute);
    }
  }, [topics]);

  // Also recalculate on resize
  useEffect(() => {
    const handleResize = () => {
      if (!containerRef.current) return;
      const width = containerRef.current.offsetWidth || 834;
      const height = containerRef.current.offsetHeight || 400;
      const positioned = positionTopics(topics, width, height, 0);
      setPositions(positioned);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [topics]);

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.heading}>Explore what shapes logistics</h2>
        <div className={styles.topicsWrapper} ref={containerRef}>
          {positions.map((positioned) => (
            <p
              key={positioned.topic.id}
              className={`${styles.topic} ${styles[`color-${positioned.colorVariant}`]}`}
              style={{
                ...(isDesktopLayout
                  ? {
                      position: "absolute",
                      left: `${positioned.x}px`,
                      top: `${positioned.y}px`,
                      margin: 0,
                      whiteSpace: "nowrap",
                    }
                  : {}),
                fontSize: `${positioned.fontSize}px`,
                fontWeight:
                  positioned.fontSize > 42
                    ? "bold"
                    : positioned.fontSize > 27
                      ? "600"
                      : "400",
              }}
            >
              {positioned.topic.name}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
