"use client";

import { useState } from "react";
import Image from "next/image";
import { SubscribeButton } from "@/features/newsletter/client/components/SubscribeButton";
import styles from "./Footer.module.css";

export function Footer() {
  const companyLinks = ["Company", "Articles", "Newsletter"];
  const legalLinks = ["Contact Us", "Privacy Policy", "Terms & Conditions"];

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* Logo Section */}
        <div className={styles.logoSection}>
          <div className={styles.logoGroup}>
            <div className={styles.logoIcon}>
              <Image
                src="/assets/preview/frame-83-light.svg"
                alt="Logo"
                width={34}
                height={34}
              />
            </div>
            <Image
              src="/assets/preview/logistic-landscape-light.svg"
              alt="Logistic Landscape"
              width={242}
              height={28}
            />
          </div>
        </div>

        {/* Newsletter Section */}
        <div className={styles.newsletterSection}>
          <h3 className={styles.newsletterTitle}>Never miss an update</h3>
          <p className={styles.newsletterDescription}>
            Get weekly logistics articles, videos, and company insights straight to your inbox with our newsletter.
          </p>

          <div className={styles.newsletterCta}>
            <SubscribeButton className={styles.subscribeButton}>
              Subscribe
            </SubscribeButton>
          </div>
        </div>

        {/* Links Section */}
        <div className={styles.linksSection}>
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
