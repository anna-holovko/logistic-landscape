"use client";

import { motion } from "motion/react";

export function AnimatedLogo() {
  const DURATION = 3.872;

  return (
    <motion.div
      className="newsletter-logo"
      initial={{ scaleX: 0, scaleY: 0, y: 280 }}
      animate={{ scaleX: [0, 1, 1], scaleY: [0, 1, 1], y: [280, 280, 0, 0] }}
      transition={{
        scaleX: {
          duration: DURATION,
          times: [0, 0.0759, 1],
          ease: [[0.5, 0, 0.5, 1], "linear"],
        },
        scaleY: {
          duration: DURATION,
          times: [0, 0.0759, 1],
          ease: [[0.5, 0, 0.5, 1], "linear"],
        },
        y: {
          duration: DURATION,
          times: [0, 0.6767, 0.7335, 1],
          ease: ["linear", [0, 0, 0.414, 1], "linear"],
        },
      }}
    >
      <video
        autoPlay
        muted
        playsInline
        style={{
          width: "100px",
          height: "100px",
          borderRadius: "31.406px",
          display: "block",
          objectFit: "cover",
          overflow: "hidden",
        }}
      >
        <source src="/assets/logo-animation.mp4" type="video/mp4" />
      </video>
    </motion.div>
  );
}
