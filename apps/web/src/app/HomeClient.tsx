"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { AnimatedLogo } from "./AnimatedLogo";
import { NewsletterForm } from "@/features/newsletter";

type AnimationState = "intro" | "logoEntrance" | "logoAnimation" | "transition" | "formEntrance" | "complete";

export default function HomeClient() {
  const [animationState, setAnimationState] = useState<AnimationState>("intro");

  useEffect(() => {
    const timeline = {
      intro: 0,
      logoEntrance: 100,
      logoAnimation: 200,
      transition: 2795,
      formEntrance: 3295,
      complete: 3872,
    };

    const timers = Object.entries(timeline).map(([state, delay]) =>
      setTimeout(() => setAnimationState(state as AnimationState), delay)
    );

    return () => timers.forEach(clearTimeout);
  }, []);

  const showForm = animationState === "formEntrance" || animationState === "complete";
  const logoInViewport = animationState !== "complete" && animationState !== "transition" && animationState !== "formEntrance";

  return (
    <main className="page-newsletter">
      <section className="newsletter-section">
        {/* Overlay */}
        <div className="newsletter-overlay" />

        {/* Intro Logo - Centered on Viewport */}
        {logoInViewport && (
          <div className="newsletter-logo-intro" data-state={animationState}>
            <AnimatedLogo />
          </div>
        )}

        {/* Main Content Container */}
        <motion.div
          className="newsletter-container"
          initial={{ opacity: 0, y: 100 }}
          animate={{
            opacity: animationState === "complete" ? 1 : 0,
            y: animationState === "complete" ? 0 : 100,
          }}
          transition={{
            opacity: {
              duration: 0.6,
              delay: 3.1,
              ease: "easeOut",
            },
            y: {
              duration: 0.8,
              delay: 3.0,
              ease: [0.25, 0.46, 0.45, 0.94],
            },
          }}
        >
          <div className="newsletter-content">
            {/* Animated Logo in Final Position */}
            {!logoInViewport && <AnimatedLogo />}

            {/* Main Content Wrapper (40px gap from logo, 40px gap to form) */}
            <div className="newsletter-main-content">
              {/* Header Text (20px gap between h1 and p) */}
              <div className="newsletter-header">
                <h1>Logistics, decoded.</h1>

                <p>
                  A monthly newsletter for logistics professionals navigating the U.S. &amp; Global
                  markets. Understand how the logistics landscape really works: from transportation
                  modes and technologies to the companies shaping the industry.
                </p>
              </div>

              {/* Sign Up Form and Footer */}
              {showForm && (
                <>
                  <NewsletterForm />

                  {/* Footer Links */}
                  <footer className="newsletter-footer">
                    <a href="/terms">Terms &amp; Conditions</a>
                    <a href="/privacy">Privacy Policy</a>
                    <a href="/cookies">Cookie Policy</a>
                  </footer>
                </>
              )}
            </div>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
