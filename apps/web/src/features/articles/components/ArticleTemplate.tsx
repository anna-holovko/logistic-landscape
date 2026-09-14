import Image from "next/image";
import { Article } from "../types";
import { ArticleBlockRenderer } from "./ArticleBlockRenderer";
import { Header } from "@/features/homepage/components/Header";
import { Footer } from "@/features/homepage/components/Footer";
import styles from "./ArticleTemplate.module.css";

interface ArticleTemplateProps {
  article: Article;
}

export function ArticleTemplate({ article }: ArticleTemplateProps) {
  return (
    <div className={styles.article}>
      <Header />

      {/* Article Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroBg} />
        <div className={styles.heroGradient} />

        <div className={styles.heroContent}>
          <div className={styles.heroMeta}>
            {article.readTime && (
              <span className={styles.readTime}>{article.readTime} read</span>
            )}
            {article.publishedAt && (
              <span className={styles.publishDate}>
                Updated {new Date(article.publishedAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </span>
            )}
          </div>

          <h1 className={styles.heroTitle}>{article.title}</h1>

          {article.excerpt && (
            <p className={styles.heroExcerpt}>{article.excerpt}</p>
          )}

          {article.tags && article.tags.length > 0 && (
            <div className={styles.tagsList}>
              {article.tags.map((tag) => (
                <span key={tag} className={styles.tag}>{tag}</span>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Article Body */}
      <div className={styles.bodyWrapper}>
        <ArticleBlockRenderer blocks={article.blocks} />
      </div>

      <Footer />
    </div>
  );
}
