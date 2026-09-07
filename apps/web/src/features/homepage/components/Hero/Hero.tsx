"use client";

import { useState } from "react";
import Image from "next/image";
import { NewsletterForm } from "@/features/newsletter/client/components/NewsletterForm";
import styles from "./Hero.module.css";

export function Hero() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubscribeClick = () => {
    setIsModalOpen(true);
  };

  const handleSubscribeSuccess = () => {
    setIsModalOpen(false);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <>
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
            <button className={styles.subscribeButton} onClick={handleSubscribeClick}>
              <span>Subscribe to our weekly landscape</span>
              <Image
                src="/assets/preview/arrow-right.svg"
                alt="Arrow"
                width={16}
                height={16}
              />
            </button>
          </div>
        </div>
      </section>

      {isModalOpen && (
        <div className={styles.modalOverlay} onClick={handleModalClose}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.modalClose} onClick={handleModalClose}>
              ×
            </button>
            <NewsletterForm onSuccess={handleSubscribeSuccess} />
          </div>
        </div>
      )}
    </>
  );
}
