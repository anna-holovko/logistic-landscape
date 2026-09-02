"use client";

import { useEffect, useRef } from "react";

export function TopographicBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();
  const startTimeRef = useRef<number>(Date.now());

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const updateCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    updateCanvasSize();

    const handleResize = () => updateCanvasSize();
    window.addEventListener("resize", handleResize);

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Generate topographic contours using Perlin-like noise
    const generateContours = () => {
      const contours: Array<{ x: number; y: number }[]> = [];
      const numContours = 15;
      const noiseScale = 0.005;

      for (let contourIdx = 0; contourIdx < numContours; contourIdx++) {
        const yBase = (canvas.height / numContours) * (contourIdx + 1);
        const points: Array<{ x: number; y: number }> = [];

        for (let x = 0; x < canvas.width; x += 20) {
          // Organic noise-based variation
          const noiseValue = Math.sin(x * noiseScale + contourIdx * 0.5) *
            Math.cos(yBase * noiseScale) * 40;
          const yVariation = Math.sin(x * 0.01 + contourIdx * 0.8) * 30;

          points.push({
            x,
            y: yBase + noiseValue + yVariation,
          });
        }

        contours.push(points);
      }

      return contours;
    };

    const contours = generateContours();

    // Generate data nodes at various positions
    const generateNodes = () => {
      const nodes: Array<{
        x: number;
        y: number;
        delay: number;
        duration: number;
      }> = [];

      for (let i = 0; i < 20; i++) {
        const contourIdx = Math.floor(Math.random() * contours.length);
        const contour = contours[contourIdx];
        if (!contour) continue;

        const pointIdx = Math.floor(Math.random() * contour.length);
        const point = contour[pointIdx];
        if (!point) continue;

        nodes.push({
          x: point.x,
          y: point.y,
          delay: Math.random() * 2000,
          duration: 1000 + Math.random() * 500,
        });
      }

      return nodes;
    };

    const nodes = generateNodes();

    // Animation loop
    const animate = () => {
      const now = Date.now();
      const elapsed = now - startTimeRef.current;

      // Clear canvas with dark background
      ctx.fillStyle = "rgba(21, 42, 49, 1)"; // Navy dark background
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw contours with progressive reveal
      const revealDuration = 3000;
      const revealProgress = prefersReducedMotion
        ? 1
        : Math.min(elapsed / revealDuration, 1);

      contours.forEach((contour, idx) => {
        if (!contour || contour.length === 0) return;

        // Stagger the reveal of each contour
        const contourDelay = (idx / contours.length) * revealDuration * 0.5;
        const contourProgress = Math.max(
          0,
          Math.min(1, (elapsed - contourDelay) / (revealDuration * 0.8))
        );

        if (contourProgress > 0) {
          // Draw contour line with gradient glow
          const gradient = ctx.createLinearGradient(0, contour[0]!.y - 20, 0, contour[0]!.y + 20);
          gradient.addColorStop(0, "rgba(79, 172, 187, 0)");
          gradient.addColorStop(0.5, `rgba(79, 172, 187, ${0.15 * contourProgress})`);
          gradient.addColorStop(1, "rgba(79, 172, 187, 0)");

          ctx.strokeStyle = `rgba(79, 172, 187, ${0.3 * contourProgress})`;
          ctx.lineWidth = 1.5;
          ctx.lineCap = "round";
          ctx.lineJoin = "round";

          // Draw only the revealed portion
          const visibleLength = Math.floor(
            contour.length * contourProgress
          );

          ctx.beginPath();
          if (visibleLength > 0) {
            ctx.moveTo(contour[0]!.x, contour[0]!.y);
            for (let i = 1; i < visibleLength; i++) {
              ctx.lineTo(contour[i]!.x, contour[i]!.y);
            }
            ctx.stroke();
          }

          // Add subtle glow effect
          ctx.strokeStyle = gradient;
          ctx.lineWidth = 3;
          ctx.globalAlpha = 0.1;
          if (visibleLength > 0) {
            ctx.beginPath();
            ctx.moveTo(contour[0]!.x, contour[0]!.y);
            for (let i = 1; i < visibleLength; i++) {
              ctx.lineTo(contour[i]!.x, contour[i]!.y);
            }
            ctx.stroke();
          }
          ctx.globalAlpha = 1;
        }
      });

      // Draw data nodes
      nodes.forEach((node) => {
        const nodeDelay = revealDuration + node.delay;
        const nodeAge = Math.max(0, elapsed - nodeDelay);
        const nodeProgress = Math.min(nodeAge / node.duration, 1);

        if (nodeProgress > 0) {
          // Fade in and subtle pulse
          const pulseScale = 1 + Math.sin(nodeAge * 0.005) * 0.1;
          const opacity = prefersReducedMotion ? 1 : nodeProgress;

          ctx.fillStyle = `rgba(79, 172, 187, ${opacity * 0.6})`;
          const radius = 3 * pulseScale;
          ctx.beginPath();
          ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);
          ctx.fill();

          // Outer glow
          ctx.strokeStyle = `rgba(79, 172, 187, ${opacity * 0.2})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(node.x, node.y, radius + 4, 0, Math.PI * 2);
          ctx.stroke();
        }
      });

      // Continue animation
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{
        background: "linear-gradient(135deg, rgba(21, 42, 49, 1) 0%, rgba(15, 28, 35, 1) 100%)",
      }}
    />
  );
}
