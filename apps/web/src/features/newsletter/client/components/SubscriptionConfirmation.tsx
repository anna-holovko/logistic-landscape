"use client";

import { motion } from "motion/react";
import "./subscription-confirmation.css";

export interface SubscriptionConfirmationProps {
  title?: string;
  subtitle?: string;
  ctaLink?: string;
  ctaText?: string;
}

export function SubscriptionConfirmation({
  title = "Thanks for subscribing!",
  subtitle = "Your first issue lands in your inbox this week. Keep an eye out.",
  ctaLink = "/articles",
  ctaText = "Browse recent articles",
}: SubscriptionConfirmationProps = {}) {
  return (
    <>
      {/* Backdrop */}
      <motion.div
        className="subscription-confirmation-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />

      {/* Modal Card */}
      <motion.div
        className="subscription-confirmation-modal"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
      >
        <div className="subscription-confirmation-card">
          <div className="subscription-confirmation-content">
            {/* Text Group */}
            <div className="subscription-confirmation-text-group">
              <p className="subscription-confirmation-title">
                {title}
              </p>
              <p className="subscription-confirmation-subtitle">
                {subtitle}
              </p>
            </div>

            {/* Browse Link */}
            <a
              href={ctaLink}
              className="subscription-confirmation-link"
            >
              {ctaText}
            </a>
          </div>
        </div>
      </motion.div>
    </>
  );
}
