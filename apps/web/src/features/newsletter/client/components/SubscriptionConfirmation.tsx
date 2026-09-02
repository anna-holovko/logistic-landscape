"use client";

import { motion } from "motion/react";
import "./subscription-confirmation.css";

export function SubscriptionConfirmation() {
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
                Thanks for subscribing!
              </p>
              <p className="subscription-confirmation-subtitle">
                Your first issue lands in your inbox this week. Keep an eye out.
              </p>
            </div>

            {/* Browse Link */}
            <a
              href="/articles"
              className="subscription-confirmation-link"
            >
              Browse recent articles
            </a>
          </div>
        </div>
      </motion.div>
    </>
  );
}
