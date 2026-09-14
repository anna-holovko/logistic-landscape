import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Header } from "@/features/homepage/components/Header";
import { Footer } from "@/features/homepage/components/Footer";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Articles | Logistic Landscape",
  description: "Explore logistics industry insights and analysis",
};

const articles = [
  {
    slug: "small-truck-load-explained",
    category: "Featured",
    title: "Small Truck Load, explained",
    description: "Why a whole new category grew up between LTL and full truckload — and what it means for shippers who don't fit either box.",
    readTime: "10 min read",
    image: "/assets/preview/rectangle-3.png",
  },
  {
    slug: "ltl-pricing",
    category: "Analysis",
    title: "Why LTL pricing is so hard to predict",
    description: "",
    readTime: "6 min read",
    image: null,
  },
  {
    slug: "ocean-freight-rates",
    category: "Market",
    title: "Inside ocean freight rate cycles",
    description: "",
    readTime: "7 min read",
    image: null,
  },
  {
    slug: "carrier-networks",
    category: "Landscape",
    title: "How carrier networks actually work",
    description: "",
    readTime: "10 min read",
    image: null,
  },
];

export default function ArticlesPage() {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <section className={styles.section}>
          <div className={styles.container}>
            <h1 className={styles.heading}>Articles</h1>
            <p className={styles.subtitle}>Understand the industry, not just the headlines.</p>

            <div className={styles.articlesList}>
              {articles.map((article, index) => (
                <Link
                  key={index}
                  href={`/articles/${article.slug}`}
                  className={`${styles.articleCard} ${article.category === "Featured" ? styles.featured : ""}`}
                >
                  {article.image && (
                    <div className={styles.imageWrapper}>
                      <Image
                        src={article.image}
                        alt={article.title}
                        width={200}
                        height={150}
                        className={styles.image}
                      />
                    </div>
                  )}
                  <div className={styles.content}>
                    <span className={styles.category}>{article.category}</span>
                    <h2 className={styles.title}>{article.title}</h2>
                    {article.description && <p className={styles.description}>{article.description}</p>}
                    <span className={styles.readTime}>{article.readTime}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
