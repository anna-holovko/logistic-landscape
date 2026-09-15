'use client';

import { motion } from "motion/react";
import { AnimatedLogo } from "../AnimatedLogo";
import { NewsletterForm } from "@/features/newsletter";

export default function NewsletterPage() {
  return (
    <main className="page-newsletter">
      <section className="newsletter-section" suppressHydrationWarning>
        <div className="newsletter-loop-mask" />
        <div className="newsletter-overlay" />

        <div className="newsletter-content-wrapper">
          {/* Logo Animation */}
          <motion.div
            className="newsletter-logo-center"
            initial={{ scaleX: 0, scaleY: 0, y: 280 }}
            animate={{ scaleX: [0, 1, 1], scaleY: [0, 1, 1], y: [280, 280, 0, 0] }}
            transition={{
              scaleX: { duration: 3.872, times: [0, 0.0759, 1], ease: [[0.5, 0, 0.5, 1], "linear"] },
              scaleY: { duration: 3.872, times: [0, 0.0759, 1], ease: [[0.5, 0, 0.5, 1], "linear"] },
              y: { duration: 3.872, times: [0, 0.6767, 0.7335, 1], ease: ["linear", [0, 0, 0.414, 1], "linear"] },
            }}
          >
            <AnimatedLogo />
          </motion.div>

          {/* Main Content Animation */}
          <motion.div
            className="newsletter-form-container"
            initial={{ opacity: 0, scaleX: 0, scaleY: 0, y: 231 }}
            animate={{ opacity: [0, 0, 1, 1], scaleX: [0, 0, 1, 1], scaleY: [0, 0, 1, 1], y: [231, 231, 0, 0] }}
            transition={{
              opacity: { duration: 3.872, times: [0, 0.7686, 0.8352, 1], ease: ["linear", [0.5, 0, 0.5, 1], "linear"] },
              scaleX: { duration: 3.872, times: [0, 0.7206, 0.8352, 1], ease: ["linear", [0.5, 0, 0.5, 1], "linear"] },
              scaleY: { duration: 3.872, times: [0, 0.7206, 0.8352, 1], ease: ["linear", [0.5, 0, 0.5, 1], "linear"] },
              y: { duration: 3.872, times: [0, 0.7206, 0.8352, 1], ease: "linear" },
            }}
          >
            <div className="newsletter-header">
              <h1>Logistics, decoded.</h1>
              <p>
                A monthly newsletter for logistics professionals navigating the U.S. &amp; Global
                markets. Understand how the logistics landscape really works: from transportation
                modes and technologies to the companies shaping the industry.
              </p>
            </div>

            <NewsletterForm />
          </motion.div>
        </div>

        {/* Footer */}
        <footer className="newsletter-footer">
          <a href="/terms">Terms &amp; Conditions</a>
          <a href="/privacy">Privacy Policy</a>
          <a href="/cookies">Cookie Policy</a>
        </footer>
      </section>
    </main>
  );
}
