'use client';

import { useEffect, useRef } from 'react';

/**
 * Hook to reveal elements via scroll-triggered animations.
 * Adds 'in-view' class when element enters viewport.
 *
 * Usage:
 * const ref = useScrollReveal();
 * return <div ref={ref} className="scroll-reveal">...</div>
 */
export function useScrollReveal() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      // Show all elements immediately if reduced motion is enabled
      const allElements = container.querySelectorAll('.scroll-reveal, .scroll-reveal-stagger, .stat-container');
      allElements.forEach((el) => {
        el.classList.add('in-view');
      });
      return;
    }

    // Create intersection observer for scroll-triggered reveals
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            // Unobserve after animation triggers (run once per scroll through)
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -100px 0px', // Trigger when 100px from bottom of viewport
      }
    );

    // Observe all scroll-reveal elements
    const revealElements = container.querySelectorAll('.scroll-reveal, .scroll-reveal-stagger, .stat-container');
    revealElements.forEach((el) => {
      observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return containerRef;
}
