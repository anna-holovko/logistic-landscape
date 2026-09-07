"use client";

import styles from "./TopicsSection.module.css";

export function TopicsSection() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.heading}>Explore what shapes logistics</h2>

        <div className={styles.topicsWrapper}>
          <p className={styles.customsClearance}>Customs clearance</p>
          <p className={styles.warehousing}>Warehousing</p>
          <p className={styles.lastMile}>Last mile</p>
          <p className={styles.ai}>AI</p>
          <p className={styles.freightBrokerage}>Freight Brokerage</p>
          <p className={styles.oceanFreight}>Ocean Freight</p>
          <p className={styles.ltl}>LTL</p>
          <p className={styles.crossBorder}>Cross-border</p>
          <p className={styles.intermodal}>Intermodal</p>
          <p className={styles.drayage}>Drayage</p>
          <p className={styles.coldChain}>Cold chain</p>
        </div>
      </div>
    </section>
  );
}
