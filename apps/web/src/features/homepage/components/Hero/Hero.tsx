import Image from "next/image";
import styles from "./Hero.module.css";

export function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.sectionBg} />
      <div className={styles.heroContent}>
        <div className={styles.topSection}>
          <h1 className={`${styles.heading} hero-heading`}>What do you want to understand?</h1>
          <div className={`${styles.searchBox} hero-search`}>
            <input
              type="text"
              placeholder="Search companies, topics and terms"
              className={styles.searchInput}
            />
            <div className={styles.searchIcon}>
              <Image
                src="/assets/preview/search-icon.svg"
                alt="Search"
                width={24}
                height={24}
              />
            </div>
          </div>
        </div>

        <div className={styles.descriptionSection}>
          <p className={`${styles.description} hero-description`}>
            Companies, business models, transportation modes, technologies, and the connections between them — explained in plain English.
          </p>
          <a href="https://logistic-landscape-9nb27hrod-annaholovko-3090.vercel.app/#newsletter" target="_blank" rel="noopener noreferrer" className={`${styles.subscribeButton} hero-cta`}>
            <span>Subscribe to our weekly landscape</span>
            <Image
              src="/assets/preview/arrow-right.svg"
              alt="Arrow"
              width={16}
              height={16}
            />
          </a>
        </div>
      </div>
    </section>
  );
}
