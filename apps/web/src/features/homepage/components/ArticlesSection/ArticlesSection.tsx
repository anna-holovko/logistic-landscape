"use client";

import Image from "next/image";
import styles from "./ArticlesSection.module.css";

const featuredArticle = {
  badge: "Featured",
  title: "Small Truck Load, explained",
  description:
    "Why a whole new category grew up between LTL and full truckload — and what it means for shippers who don't fit either box.",
  readTime: "10 min read",
  image: "/assets/preview/rectangle-3.png",
};

const articles = [
  {
    category: "Analysis",
    title: "Why LTL pricing is so hard to predict",
    readTime: "6 min read",
  },
  {
    category: "Market",
    title: "Inside ocean freight rate cycles",
    readTime: "7 min read",
  },
  {
    category: "Landscape",
    title: "How carrier networks actually work",
    readTime: "10 min read",
  },
];

export function ArticlesSection() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <p className={styles.eyebrow}>How does it work?</p>
          <h2 className={styles.heading}>
            Understand the industry, not just the headlines.
          </h2>
        </div>

        {/* Featured Article */}
        <article className={styles.featuredArticle}>
          <div className={styles.featuredContent}>
            <div className={styles.badge}>{featuredArticle.badge}</div>
            <h3 className={styles.featuredTitle}>{featuredArticle.title}</h3>
            <p className={styles.featuredDescription}>
              {featuredArticle.description}
            </p>
            <div className={styles.readTimeLink}>
              <span>{featuredArticle.readTime}</span>
              <Image
                src="/assets/preview/arrow-right-2.svg"
                alt="Read more"
                width={16}
                height={16}
              />
            </div>
          </div>
          <div className={styles.featuredImage}>
            <Image
              src={featuredArticle.image}
              alt={featuredArticle.title}
              width={200}
              height={150}
              priority
            />
          </div>
        </article>

        {/* Articles List */}
        <div className={styles.articlesList}>
          {articles.map((article, index) => (
            <article key={index} className={styles.articleRow}>
              <div className={styles.articleContent}>
                <p className={styles.category}>{article.category}</p>
                <h3 className={styles.articleTitle}>{article.title}</h3>
              </div>
              <div className={styles.readTimeLink}>
                <span>{article.readTime}</span>
                <Image
                  src="/assets/preview/arrow-right-2.svg"
                  alt="Read article"
                  width={16}
                  height={16}
                />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
