import { Metadata } from "next";
import { AnimatedLogo } from "./AnimatedLogo";
import { NewsletterForm } from "@/features/newsletter";
import { getHomepageSeo } from "@/lib/seo/homepage-seo";

export const metadata: Metadata = (() => {
  const seo = getHomepageSeo();
  return {
    title: seo.title,
    description: seo.description,
    canonical: seo.canonical,
    robots: seo.robots,
    openGraph: {
      type: seo.ogType as "website" | "article",
      title: seo.ogTitle || seo.title,
      description: seo.ogDescription || seo.description,
      url: seo.canonical,
      images: seo.ogImage ? [{ url: seo.ogImage }] : undefined,
      siteName: seo.siteName,
    },
    twitter: {
      card: seo.twitterCard as "summary" | "summary_large_image" | "app" | "player",
      title: seo.twitterTitle,
      description: seo.twitterDescription,
      images: seo.twitterImage ? [seo.twitterImage] : undefined,
    },
  };
})();

export default function Home() {
  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getHomepageSeo().structuredData),
        }}
      />

      <main className="page-newsletter">
        <section className="newsletter-section">
          {/* Overlay Gradient */}
          <div className="newsletter-overlay" />

          <div className="newsletter-container">
            <div className="newsletter-content">
              {/* Animated Logo */}
              <AnimatedLogo />

              <h1>Logistics, decoded.</h1>

              <p>
                A monthly newsletter for logistics professionals navigating the U.S. &amp; Global
                markets. Understand how the logistics landscape really works: from transportation
                modes and technologies to the companies shaping the industry.
              </p>

              <NewsletterForm />

              {/* Footer Links */}
              <footer className="newsletter-footer">
                <a href="/terms">Terms &amp; Conditions</a>
                <a href="/privacy">Privacy Policy</a>
                <a href="/cookies">Cookie Policy</a>
              </footer>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
