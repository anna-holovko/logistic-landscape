"use client";

import Image from "next/image";
import styles from "./Footer.module.css";

export function Footer() {
  const companyLinks = ["Company", "Articles", "Newsletter"];
  const legalLinks = ["Contact Us", "Privacy Policy", "Terms & Conditions"];

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* Left Section: Logo + Newsletter */}
        <div className={styles.leftSection}>
          <div className={styles.logoGroup}>
            <div className={styles.logoIcon}>
              <Image
                src="/assets/preview/frame-83.svg"
                alt="Logo"
                width={34}
                height={34}
              />
            </div>
            <Image
              src="/assets/preview/logistic-landscape.svg"
              alt="Logistic Landscape"
              width={242}
              height={28}
            />
          </div>

          <div className={styles.newsletterSection}>
            <h3 className={styles.newsletterTitle}>Never miss an update</h3>
            <p className={styles.newsletterDescription}>
              Get weekly logistics articles, videos, and company insights straight to your inbox with our newsletter.
            </p>

            <div className={styles.newsletterForm}>
              <input
                type="email"
                placeholder="email.example@gmail.com"
                className={styles.emailInput}
                aria-label="Email for newsletter subscription"
              />
              <button className={styles.subscribeButton}>Subscribe</button>
            </div>
          </div>
        </div>

        {/* Right Section: Menu Links */}
        <div className={styles.rightSection}>
          <nav className={styles.menuColumn}>
            {companyLinks.map((link) => (
              <a key={link} href="#" className={styles.menuLink}>
                {link}
              </a>
            ))}
          </nav>

          <nav className={styles.menuColumn}>
            {legalLinks.map((link) => (
              <a key={link} href="#" className={styles.menuLink}>
                {link}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
