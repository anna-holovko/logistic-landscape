"use client";

import styles from "./TopicsSection.module.css";

export function TopicsSection() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.heading}>Explore what shapes logistics</h2>

        <div className={styles.grid}>
          <div className={styles.card}>
            <h3>Cross-border</h3>
            <p>Customs, duties, moving freight across the line</p>
          </div>
          <div className={`${styles.card} ${styles.lg}`}>
            <h3>LTL</h3>
            <p>How it works, who operates in it</p>
          </div>
          <div className={`${styles.card} ${styles.xl}`}>
            <h3>Ocean</h3>
            <p>Carriers, rates, and the cycles that move them</p>
          </div>
          <div className={styles.card}>
            <h3>Warehousing</h3>
            <p>Storage, fulfillment, and the space between</p>
          </div>
          <div className={`${styles.card} ${styles.highlight}`}>
            <h3>AI</h3>
            <p>Where automation is actually changing logistics</p>
          </div>
          <div className={`${styles.card} ${styles.lg2}`}>
            <h3>Freight Brokerage</h3>
            <p>The middle layer that keeps freight moving</p>
          </div>
        </div>
      </div>
    </section>
  );
}
