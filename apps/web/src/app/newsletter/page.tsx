"use client";

import { useState } from "react";

export default function NewsletterPage() {
  const [email, setEmail] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) {
      setError("Please agree to terms");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (data.success) {
        setSuccess(true);
        setEmail("");
        setAgreed(false);
      } else {
        setError(data.message || "Subscription failed");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", padding: "40px 20px", background: "#1a1a1a", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      <h1 style={{ color: "#EFE6D3", textAlign: "center", marginBottom: "20px", fontSize: "48px", fontWeight: "600" }}>
        Logistics, decoded.
      </h1>
      <p style={{ color: "#EFE6D3", textAlign: "center", maxWidth: "600px", margin: "0 auto 40px", fontSize: "16px" }}>
        A monthly newsletter for logistics professionals navigating the U.S. &amp; Global markets.
        Understand how the logistics landscape really works: from transportation modes and technologies
        to the companies shaping the industry.
      </p>

      {success && (
        <div style={{ color: "#4ade80", textAlign: "center", marginBottom: "20px", padding: "15px", background: "#1e3a1e", borderRadius: "8px" }}>
          ✅ Thanks for subscribing! Check your email.
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ maxWidth: "500px", width: "100%", display: "flex", flexDirection: "column", gap: "20px" }}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={loading}
          style={{
            padding: "12px 16px",
            border: "1px solid #EFE6D3",
            background: "transparent",
            color: "#EFE6D3",
            fontSize: "16px",
            borderRadius: "4px",
          }}
        />

        <label style={{ display: "flex", gap: "10px", color: "#EFE6D3", fontSize: "14px", alignItems: "flex-start" }}>
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            disabled={loading}
            style={{ marginTop: "4px" }}
          />
          <span>I agree to receive marketing emails. <a href="/privacy" style={{ color: "#EFE6D3", textDecoration: "underline" }}>Privacy Policy</a></span>
        </label>

        {error && <div style={{ color: "#ff6b6b", fontSize: "14px" }}>❌ {error}</div>}

        <button
          type="submit"
          disabled={loading || !email || !agreed}
          style={{
            padding: "12px 40px",
            background: "#BE5B3F",
            color: "white",
            border: "none",
            borderRadius: "4px",
            fontSize: "16px",
            fontWeight: "600",
            cursor: loading ? "wait" : "pointer",
            opacity: loading ? 0.7 : 1,
          }}
        >
          {loading ? "SUBSCRIBING..." : "SUBSCRIBE"}
        </button>
      </form>

      <footer style={{ marginTop: "60px", display: "flex", gap: "30px", justifyContent: "center", color: "#EFE6D3", fontSize: "14px" }}>
        <a href="/terms" style={{ color: "#EFE6D3", textDecoration: "none" }}>Terms &amp; Conditions</a>
        <a href="/privacy" style={{ color: "#EFE6D3", textDecoration: "none" }}>Privacy Policy</a>
        <a href="/cookies" style={{ color: "#EFE6D3", textDecoration: "none" }}>Cookie Policy</a>
      </footer>
    </div>
  );
}
