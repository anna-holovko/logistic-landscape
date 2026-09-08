'use client';

import { useEffect, useRef } from 'react';

/**
 * Hook to animate text elements (headings and paragraphs) as they enter the viewport.
 * Applies the 'visible' class which triggers CSS animations with proper staggering.
 *
 * Features:
 * - Smooth fade-in + upward movement for all text
 * - Staggered timing for related elements
 * - Respects prefers-reduced-motion
 * - Triggers animations once as elements enter viewport
 *
 * Usage:
 * const ref = useTextAnimation();
 * return <div ref={ref}>...</div>
 */
export function useTextAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      // If user prefers reduced motion, show everything immediately without animation
      const allText = container.querySelectorAll('h1, h2, h3, h4, h5, h6, p');
      allText.forEach((el) => {
        el.classList.add('visible');
      });
      return;
    }

    // Create intersection observer with group-based staggering
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target as HTMLElement;

            // Calculate stagger based on element position within section
            // Find parent section or container
            const section = target.closest('section') || target.closest('[class*="container"]');
            if (section) {
              const textElements = Array.from(
                section.querySelectorAll('h1, h2, h3, h4, h5, h6, p')
              );
              const index = textElements.indexOf(target);

              // Apply staggered animation delay
              if (index >= 0) {
                const baseDelay = 0;
                const staggerDelay = index * 50; // 50ms between each element
                const computedDelay = baseDelay + staggerDelay;

                // Override animation delay via inline style (takes precedence)
                (target as HTMLElement).style.animationDelay = `${computedDelay}ms`;
              }
            }

            // Add visible class to trigger animation
            target.classList.add('visible');

            // Unobserve after animation is applied (animations run only once)
            observer.unobserve(target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px', // Trigger when element is 100px below viewport bottom
      }
    );

    // Observe all text elements
    const allText = container.querySelectorAll('h1, h2, h3, h4, h5, h6, p');
    allText.forEach((el) => {
      observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return containerRef;
}
