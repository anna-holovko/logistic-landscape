"use client";

import dynamic from "next/dynamic";
import { AnimatedLogo } from "../AnimatedLogo";

const NewsletterForm = dynamic(
  () => import("@/features/newsletter").then((mod) => mod.NewsletterForm),
  {
    ssr: false,
    loading: () => <div style={{ minHeight: "400px" }} />
  }
);

export default function NewsletterPage() {
  return (
    <main className="page-newsletter">
      <section className="newsletter-section">
        <div className="newsletter-loop-mask" />
        <div className="newsletter-overlay" />

        <div className="newsletter-content-wrapper">
          <div className="newsletter-logo-center">
            <AnimatedLogo />
          </div>

          <div className="newsletter-form-container">
            <div className="newsletter-header">
              <h1>Logistics, decoded.</h1>
              <p>
                A monthly newsletter for logistics professionals navigating the U.S. &amp; Global
                markets. Understand how the logistics landscape really works: from transportation
                modes and technologies to the companies shaping the industry.
              </p>
            </div>

            <NewsletterForm />
          </div>
        </div>

        <footer className="newsletter-footer">
          <a href="/terms">Terms &amp; Conditions</a>
          <a href="/privacy">Privacy Policy</a>
          <a href="/cookies">Cookie Policy</a>
        </footer>
      </section>
    </main>
  );
}
