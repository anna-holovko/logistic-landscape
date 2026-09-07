import Image from "next/image";
import styles from "./Hero.module.css";

export function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.sectionBg} />
      <div className={`container ${styles.heroContent}`}>
        <div className={styles.topSection}>
          <h1 className={styles.heading}>What do you want to understand?</h1>
          <div className={styles.searchBox}>
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
          <p className={styles.description}>
            Companies, business models, transportation modes, technologies, and the connections between them — explained in plain English.
          </p>
          <a href="https://test-logistics-landscape.com.pl/" target="_blank" rel="noopener noreferrer" className={styles.subscribeButton}>
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
