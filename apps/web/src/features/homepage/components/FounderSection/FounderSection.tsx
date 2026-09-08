"use client";

import Image from "next/image";
import { useNumberCounter } from "@/shared/hooks/useNumberCounter";
import { useScrollReveal } from "@/shared/hooks/useScrollReveal";
import { FounderCard } from "../FounderCard";
import styles from "./FounderSection.module.css";

export function FounderSection() {
  const scrollRevealRef = useScrollReveal();

  // Counter component for numeric values
  function StatItem({ value, label, isNumeric }: { value: number | string; label: string; isNumeric?: boolean }) {
    const [displayValue, ref] = useNumberCounter(
      typeof value === 'number' ? value : parseInt(value.toString()),
      1500
    );

    const displayText = isNumeric && typeof value === 'number'
      ? displayValue.toLocaleString()
      : value;

    return (
      <div ref={ref} className={`${styles.statItem} stat-container`}>
        <div className={styles.statValue}>
          {displayText}
          {isNumeric && typeof value === 'number' && value > 100 ? '+' : ''}
        </div>
        <div className={styles.statLabel}>{label}</div>
      </div>
    );
  }

  return (
    <section className={styles.section} ref={scrollRevealRef}>
      <div className={styles.container}>
        <h2 className={`${styles.heading} scroll-reveal`}>Built from inside the industry</h2>

        <div className={`${styles.grid} scroll-reveal-group`}>
          <div className="scroll-reveal-stagger">
            <FounderCard
              name="Max Drozhzhin"
              title="Founder and CEO, Expedite All"
              imageSrc="/assets/preview/frame-15.png"
              imageAlt="Max Drozhzhin"
            />
          </div>

          <div className={styles.statsGrid}>
            <StatItem value={12000} label="GPS-Monitored Trucks" isNumeric />
            <StatItem value={11600} label="LinkedIn Community" isNumeric />
            <StatItem value="CEO" label="Founder of Expedite All" isNumeric={false} />
            <StatItem value="US + EU" label="Companies built across North America & Europe" isNumeric={false} />
          </div>
        </div>

        <div className={`${styles.description} scroll-reveal`}>
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
