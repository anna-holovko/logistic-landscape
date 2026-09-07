"use client";

import Image from "next/image";
import styles from "./ArticlesSection.module.css";

export function ArticlesSection() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.heading}>
          Understand the industry, not just the headlines.
        </h2>

        <div className={styles.featuredArticle}>
          <div className={styles.articleImage}>
            <Image
              src="/assets/preview/rectangle-3.png"
              alt="Featured article"
              width={200}
              height={150}
            />
          </div>
          <div className={styles.articleContent}>
            <div className={styles.badge}>Featured</div>
            <h3>Small Truck Load, explained</h3>
            <p>
              Why a whole new category grew up between LTL and full truckload
              — and what it means for shippers who don't fit either box.
            </p>
          </div>
        </div>

        <div className={styles.articlesGrid}>
          {[
            {
              label: "Analysis",
              title: "Why LTL pricing is so hard to predict",
            },
            {
              label: "Market",
              title: "Inside ocean freight rate cycles",
            },
            {
              label: "Landscape",
              title: "How carrier networks actually work",
            },
            {
              label: "Landscape",
              title: "How carrier networks actually work",
            },
          ].map((article, index) => (
            <div key={index} className={styles.articleCard}>
              <div className={styles.label}>{article.label}</div>
              <p>{article.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
