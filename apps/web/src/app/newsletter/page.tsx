"use client";

import { AnimatedLogo } from "@/app/AnimatedLogo";
import { NewsletterForm } from "@/features/newsletter";

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

          <div
            className="newsletter-header"
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              padding: "0",
              opacity: 1,
              visibility: "visible",
            }}
          >
            <h1 style={{ margin: 0, fontSize: "80px", fontWeight: 600, color: "#EFE6D3", textAlign: "center" }}>
              Logistics, decoded.
            </h1>
            <p style={{ margin: 0, maxWidth: "800px", fontSize: "20px", fontWeight: 400, color: "#EFE6D3", textAlign: "center", lineHeight: "30px" }}>
              A monthly newsletter for logistics professionals navigating the U.S. &amp; Global
              markets. Understand how the logistics landscape really works: from transportation
              modes and technologies to the companies shaping the industry.
            </p>
          </div>

          <div className="newsletter-form-container">
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
