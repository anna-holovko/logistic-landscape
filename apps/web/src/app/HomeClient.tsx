"use client";

import { useState, useEffect } from "react";
import { AnimatedLogo } from "./AnimatedLogo";
import { NewsletterForm } from "@/features/newsletter";

type AnimationState = "intro" | "logoEntrance" | "logoAnimation" | "transition" | "formEntrance" | "complete";

export default function HomeClient() {
  const [animationState, setAnimationState] = useState<AnimationState>("intro");

  useEffect(() => {
    const timeline = {
      intro: 0,
      logoEntrance: 300,
      logoAnimation: 2300,
      transition: 2800,
      formEntrance: 3300,
      complete: 3800,
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
        <div className={`newsletter-container ${animationState === "complete" ? "visible" : ""}`}>
          <div className="newsletter-content">
            {/* Animated Logo in Final Position */}
            {!logoInViewport && <AnimatedLogo />}

            <h1>Logistics, decoded.</h1>

            <p>
              A monthly newsletter for logistics professionals navigating the U.S. &amp; Global
              markets. Understand how the logistics landscape really works: from transportation
              modes and technologies to the companies shaping the industry.
            </p>

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
      </section>
    </main>
  );
}
