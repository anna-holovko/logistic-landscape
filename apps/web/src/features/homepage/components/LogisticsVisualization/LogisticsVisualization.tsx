"use client";

import styles from "./LogisticsVisualization.module.css";

interface WordCloudItem {
  text: string;
  fontSize: number;
  fontWeight: "normal" | "600" | "700";
  color: string;
  left: number;
  top: number;
  fontStyle?: "italic" | "normal";
}

const wordCloudItems: WordCloudItem[] = [
  { text: "Customs clearance", fontSize: 30.555, fontWeight: "normal", color: "#1e3c45", left: 195.07, top: 52, fontStyle: "normal" },
  { text: "Warehousing", fontSize: 39.721, fontWeight: "normal", color: "#1e3c45", left: 178.75, top: 221.52 },
  { text: "Last mile", fontSize: 45.832, fontWeight: "700", color: "#be5b3f", left: 592.76, top: 135.97 },
  { text: "AI", fontSize: 100.902, fontWeight: "700", color: "#be5b3f", left: 209.3, top: 35.14 },
  { text: "Freight Brokerage", fontSize: 58.054, fontWeight: "700", color: "#1e3c45", left: 342.21, top: 48.89 },
  { text: "Ocean Freight", fontSize: 67.221, fontWeight: "700", color: "#86918c", left: 119.16, top: 131.39 },
  { text: "LTL", fontSize: 58.278, fontWeight: "700", color: "#c79a3e", left: 456.8, top: 212.36 },
  { text: "Cross-border", fontSize: 33.61, fontWeight: "600", color: "#1e3c45", left: 346.8, top: 0 },
  { text: "Intermodal", fontSize: 25.972, fontWeight: "normal", color: "#1e3c45", left: 577.49, top: 209.3 },
  { text: "Drayage", fontSize: 24.444, fontWeight: "normal", color: "#1e3c45", left: 577.49, top: 13.75 },
  { text: "Cold chain", fontSize: 24.444, fontWeight: "normal", color: "#1e3c45", left: 195.55, top: 10.69 },
];

export function LogisticsVisualization() {
  return (
    <section className={styles.section}>
      <div className={styles.backgroundPattern} />
      <div className={styles.backgroundOverlay} />

      <div className={styles.container}>
        <h2 className={styles.title}>Explore what shapes logistics</h2>

        <div className={styles.wordCloud}>
          {wordCloudItems.map((item, idx) => (
            <p
              key={idx}
              className={styles.wordCloudItem}
              style={{
                fontSize: `${item.fontSize}px`,
                fontWeight: item.fontWeight,
                color: item.color,
                left: `${item.left}px`,
                top: `${item.top}px`,
                fontStyle: item.fontStyle,
              }}
            >
              {item.text}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
