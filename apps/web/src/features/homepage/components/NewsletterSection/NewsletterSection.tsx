"use client";

import { useState } from "react";
import { AnimatePresence } from "motion/react";
import { useNewsletterForm } from "@/features/newsletter/client/hooks/useNewsletterForm";
import { SubscriptionConfirmation } from "@/features/newsletter/client/components/SubscriptionConfirmation";
import styles from "./NewsletterSection.module.css";

export function NewsletterSection() {
  const { email, setEmail, success, submit } = useNewsletterForm();
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await submit(email);
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h2 className={styles.heading}>Keep reading the landscape.</h2>
          <p className={styles.description}>
            One email a week — new companies, useful explanations, market
            shifts, and the context behind them.
          </p>

          <form className={styles.form} onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="email.example@gmail.com"
              className={styles.input}
              aria-label="Email subscription"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" className={styles.button}>Subscribe</button>
          </form>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && success && (
          <div onClick={handleCloseModal}>
            <SubscriptionConfirmation />
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
