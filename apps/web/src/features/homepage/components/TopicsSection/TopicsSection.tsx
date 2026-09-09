"use client";

import { useState, useEffect } from "react";
import { Topic } from "./types";
import { useTopicCompositionLayout } from "./useTopicCompositionLayout";
import styles from "./TopicsSection.module.css";

const EXAMPLE_TOPICS: Topic[] = [
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
];

interface TopicsSectionProps {
  topics?: Topic[];
}

export function TopicsSection({ topics = EXAMPLE_TOPICS }: TopicsSectionProps) {
  const [isClient, setIsClient] = useState(false);
  const { containerRef, positions } = useTopicCompositionLayout({ topics });

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <section className={styles.section}>
        <div className={styles.container}>
          <h2 className={styles.heading}>Explore what shapes logistics</h2>
          <div className={styles.topicsWrapper} />
        </div>
      </section>
    );
  }

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
                position: "absolute",
                left: `${positioned.x}px`,
                top: `${positioned.y}px`,
                width: `${positioned.width}px`,
                height: `${positioned.height}px`,
                fontSize: `${positioned.fontSize}px`,
                fontWeight:
                  positioned.fontSize > 50 ? "bold" : positioned.fontSize > 30 ? "600" : "400",
                margin: 0,
                whiteSpace: "nowrap",
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
