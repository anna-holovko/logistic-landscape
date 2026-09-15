import { NewsletterSection } from "@/features/homepage/components/NewsletterSection";

export const metadata = {
  title: "Newsletter | Logistic Landscape",
  description: "Subscribe to our weekly newsletter for logistics industry insights.",
};

export default function NewsletterPage() {
  return (
    <div style={{ minHeight: "100vh", padding: "40px 20px", background: "#1a1a1a" }}>
      <h1 style={{ color: "#EFE6D3", textAlign: "center", marginBottom: "20px", fontSize: "48px" }}>
        Logistics, decoded.
      </h1>
      <p style={{ color: "#EFE6D3", textAlign: "center", maxWidth: "600px", margin: "0 auto 40px", fontSize: "16px" }}>
        A monthly newsletter for logistics professionals navigating the U.S. &amp; Global markets.
        Understand how the logistics landscape really works: from transportation modes and technologies
        to the companies shaping the industry.
      </p>
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        <NewsletterSection />
      </div>
    </div>
  );
}
