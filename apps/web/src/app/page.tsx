import { Metadata } from "next";
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
          <div className="newsletter-container">
            <div className="newsletter-content">
              {/* Logo */}
              <div className="newsletter-logo">
                <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M32 8C19.3 8 9 18.3 9 31C9 43.7 19.3 54 32 54C44.7 54 55 43.7 55 31C55 18.3 44.7 8 32 8Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                  />
                  <path
                    d="M32 18C26.5 18 22 22.5 22 28C22 33.5 26.5 38 32 38C37.5 38 42 33.5 42 28C42 22.5 37.5 18 32 18Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                  />
                </svg>
              </div>

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
