"use client";

export function AnimatedLogo() {
  return (
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
  );
}
