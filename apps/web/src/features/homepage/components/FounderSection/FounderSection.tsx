"use client";

import Image from "next/image";
import { FounderCard } from "../FounderCard";
import styles from "./FounderSection.module.css";

export function FounderSection() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.heading}>Built from inside the industry</h2>

        <div className={styles.grid}>
          <FounderCard
            name="Max Drozhzhin"
            title="Founder and CEO, Expedite All"
            imageSrc="/assets/preview/frame-15.png"
            imageAlt="Max Drozhzhin"
          />

          <div className={styles.statsGrid}>
            <div className={styles.statItem}>
              <div className={styles.statValue}>12,000+</div>
              <div className={styles.statLabel}>GPS-Monitored Trucks</div>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statValue}>11,6k+</div>
              <div className={styles.statLabel}>LinkedIn Community</div>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statValue}>CEO</div>
              <div className={styles.statLabel}>Founder of Expedite All</div>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statValue}>US + EU</div>
              <div className={styles.statLabel}>
                Companies built across North America & Europe
              </div>
            </div>
          </div>
        </div>

        <div className={styles.description}>
          <p>
            Logistic Landscape was founded by Max Drozhzhin, CEO of Expedite
            All and an operator who has built and scaled logistics companies
            across North America and Europe. His work spans a nationwide
            network of 12,000+ GPS-monitored trucks, giving Logistic Landscape
            a practical view of how logistics businesses actually operate —
            not just how they describe themselves.
          </p>
          <div className={styles.link}>
            <span>About Max</span>
            <Image
              src="/assets/preview/arrow-right-2.svg"
              alt="Arrow"
              width={16}
              height={16}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
