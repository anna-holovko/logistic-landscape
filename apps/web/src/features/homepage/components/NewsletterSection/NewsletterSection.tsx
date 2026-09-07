"use client";

import styles from "./NewsletterSection.module.css";

export function NewsletterSection() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h2 className={styles.heading}>Keep reading the landscape.</h2>
          <p className={styles.description}>
            One email a week — new companies, useful explanations, market
            shifts, and the context behind them.
          </p>

          <div className={styles.form}>
            <input
              type="email"
              placeholder="email.example@gmail.com"
              className={styles.input}
              aria-label="Email subscription"
            />
            <button className={styles.button}>Subscribe</button>
          </div>
        </div>
      </div>
    </section>
  );
}
