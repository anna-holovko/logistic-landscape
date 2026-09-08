'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Hook to animate numbers counting up from 0 to target value.
 * Triggers when element enters viewport.
 *
 * Usage:
 * const [displayValue, ref] = useNumberCounter(12000, 2000);
 * return <div ref={ref}>{displayValue.toLocaleString()}</div>
 *
 * @param targetValue - The final number to count to
 * @param duration - Animation duration in milliseconds (default 2000ms)
 * @returns [displayValue, ref]
 */
export function useNumberCounter(targetValue: number, duration: number = 2000) {
  const [displayValue, setDisplayValue] = useState(0);
  const elementRef = useRef<HTMLDivElement>(null);
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element || hasAnimatedRef.current) return;

    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      // Show final value immediately
      setDisplayValue(targetValue);
      hasAnimatedRef.current = true;
      return;
    }

    // Create intersection observer to trigger animation on scroll
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimatedRef.current) {
            hasAnimatedRef.current = true;

            // Animate the counter
            const startTime = Date.now();
            const startValue = 0;

            const animate = () => {
              const currentTime = Date.now();
              const elapsed = currentTime - startTime;
              const progress = Math.min(elapsed / duration, 1);

              // Use easing function (ease-out cubic)
              const easeProgress = 1 - Math.pow(1 - progress, 3);

              const currentValue = Math.floor(
                startValue + (targetValue - startValue) * easeProgress
              );

              setDisplayValue(currentValue);

              if (progress < 1) {
                requestAnimationFrame(animate);
              } else {
                // Ensure final value is exact
                setDisplayValue(targetValue);
              }
            };

            requestAnimationFrame(animate);
            observer.unobserve(element);
          }
        });
      },
      {
        threshold: 0.5,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [targetValue, duration]);

  return [displayValue, elementRef] as const;
}
