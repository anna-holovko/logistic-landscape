"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence } from "motion/react";
import { useNewsletterForm } from "@/features/newsletter/client/hooks/useNewsletterForm";
import { SubscriptionConfirmation } from "@/features/newsletter/client/components/SubscriptionConfirmation";
import styles from "./Footer.module.css";

export function Footer() {
  const { email, setEmail, success, submit } = useNewsletterForm();
  const [isOpen, setIsOpen] = useState(false);
  const companyLinks = ["Company", "Articles", "Newsletter"];
  const legalLinks = ["Contact Us", "Privacy Policy", "Terms & Conditions"];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await submit(email);
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

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

          <form className={styles.newsletterForm} onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="email.example@gmail.com"
              className={styles.emailInput}
              aria-label="Email for newsletter subscription"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" className={styles.subscribeButton}>Subscribe</button>
          </form>
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

      <AnimatePresence>
        {isOpen && success && (
          <div onClick={handleCloseModal}>
            <SubscriptionConfirmation />
          </div>
        )}
      </AnimatePresence>
    </footer>
  );
}
