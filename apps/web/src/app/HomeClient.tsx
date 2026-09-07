"use client";

import Image from "next/image";
import "./homepage.css";

export default function HomeClient() {
  return (
    <div className="homepage">
      {/* Menu */}
      <header className="header">
        <div className="container">
          <div className="logo-group">
            <div className="logo-icon">
              <Image
                src="/assets/preview/frame-83.svg"
                alt="Logo"
                width={24}
                height={24}
                priority
              />
            </div>
            <Image
              src="/assets/preview/logistic-landscape.svg"
              alt="Logistic Landscape"
              width={173}
              height={20}
            />
          </div>
          <nav className="menu">
            <div className="menu-item">Company</div>
            <div className="menu-item">dfsf</div>
            <div className="menu-item">Company</div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="section-bg" />
        <div className="container hero-content">
          <h1 className="h1">What do you want to understand?</h1>
          <div className="search-box">
            <input
              type="text"
              placeholder="Search companies, topics and terms"
              className="search-input"
            />
            <div className="search-icon">
              <Image
                src="/assets/preview/search-icon.svg"
                alt="Search"
                width={24}
                height={24}
              />
            </div>
          </div>
          <div className="newsletter-link">
            <span>Subscribe to our weekly landscape</span>
            <Image
              src="/assets/preview/arrow-right.svg"
              alt="Arrow"
              width={16}
              height={16}
            />
          </div>
        </div>
      </section>

      {/* Built from inside the industry */}
      <section className="founder">
        <div className="container">
          <h2 className="h2">Built from inside the industry</h2>
          <div className="founder-grid">
            <div className="founder-card">
              <Image
                src="/assets/preview/frame-15.png"
                alt="Max Drozhzhin"
                width={184}
                height={184}
              />
              <div className="founder-info">
                <h3>Max Drozhzhin</h3>
                <p>Founder and CEO, Expedite All</p>
              </div>
            </div>
            <div className="stats-grid">
              <div className="stat-item">
                <div className="stat-value">12,000+</div>
                <div className="stat-label">GPS-Monitored Trucks</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">11,6k+</div>
                <div className="stat-label">LinkedIn Community</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">CEO</div>
                <div className="stat-label">Founder of Expedite All</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">US + EU</div>
                <div className="stat-label">
                  Companies built across North America & Europe
                </div>
              </div>
            </div>
          </div>
          <div className="founder-description">
            <p>
              Logistic Landscape was founded by Max Drozhzhin, CEO of Expedite
              All and an operator who has built and scaled logistics companies
              across North America and Europe. His work spans a nationwide
              network of 12,000+ GPS-monitored trucks, giving Logistic Landscape
              a practical view of how logistics businesses actually operate —
              not just how they describe themselves.
            </p>
            <div className="link">
              <span>About Max</span>
              <Image
                src="/assets/preview/arrow-right-2.svg"
                alt="Arrow"
                width={16}
                height={16}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Companies on the landscape */}
      <section className="companies">
        <div className="container">
          <div className="section-header">
            <h2 className="h2">Companies on the landscape</h2>
            <p className="subtitle">
              Explore who does what, how they operate, and where they fit in the
              industry.
            </p>
          </div>

          <div className="companies-grid">
            <div className="featured-company">
              <div className="company-bg" />
              <div className="company-content">
                <div className="company-header">
                  <div className="company-badge">Featured Company</div>
                  <h3 className="company-title">Expedite All</h3>
                </div>

                <div className="company-attributes">
                  <div className="attribute">
                    <div className="attribute-label">Modes</div>
                    <div className="attribute-value">
                      Small Truck Load (STL)
                    </div>
                    <div className="attribute-value">
                      Less than Truck Load (LTL)
                    </div>
                  </div>
                  <div className="attribute">
                    <div className="attribute-label">Model</div>
                    <div className="attribute-value">
                      Carrier Network
                    </div>
                  </div>
                  <div className="attribute">
                    <div className="attribute-label">Shipments</div>
                    <div className="attribute-value">1-14 pallets</div>
                  </div>
                </div>

                <div className="company-description">
                  <p>
                    Logistic Landscape was founded by Max Drozhzhin, CEO of
                    Expedite All and an operator who has built and scaled
                    logistics companies across North America and Europe.
                  </p>
                  <div className="link">
                    <span>Read more about Expedite All</span>
                    <Image
                      src="/assets/preview/arrow-right.svg"
                      alt="Arrow"
                      width={16}
                      height={16}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="companies-list">
              <div className="company-card">
                <h4>FedEx Custom Critical</h4>
                <p>Expedited / Nationwide</p>
                <div className="link">
                  <span>View Profile</span>
                  <Image
                    src="/assets/preview/arrow-right-2.svg"
                    alt="Arrow"
                    width={16}
                    height={16}
                  />
                </div>
              </div>
              <div className="company-card">
                <h4>Panther Premium Logistics</h4>
                <p>Expedited / Time-critical</p>
                <div className="link">
                  <span>View Profile</span>
                  <Image
                    src="/assets/preview/arrow-right-2.svg"
                    alt="Arrow"
                    width={16}
                    height={16}
                  />
                </div>
              </div>
              <div className="company-card">
                <h4>Landstar</h4>
                <p>FTL / Network</p>
                <div className="link">
                  <span>View Profile</span>
                  <Image
                    src="/assets/preview/arrow-right-2.svg"
                    alt="Arrow"
                    width={16}
                    height={16}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Understand the industry */}
      <section className="articles">
        <div className="container">
          <h2 className="h2">Understand the industry, not just the headlines.</h2>

          <div className="featured-article">
            <div className="article-image">
              <Image
                src="/assets/preview/rectangle-3.png"
                alt="Featured article"
                width={200}
                height={150}
              />
            </div>
            <div className="article-content">
              <div className="article-badge">Featured</div>
              <h3>Small Truck Load, explained</h3>
              <p>
                Why a whole new category grew up between LTL and full truckload
                — and what it means for shippers who don't fit either box.
              </p>
            </div>
          </div>

          <div className="articles-grid">
            <div className="article-card">
              <div className="article-label">Analysis</div>
              <p>Why LTL pricing is so hard to predict</p>
            </div>
            <div className="article-card">
              <div className="article-label">Market</div>
              <p>Inside ocean freight rate cycles</p>
            </div>
            <div className="article-card">
              <div className="article-label">Landscape</div>
              <p>How carrier networks actually work</p>
            </div>
            <div className="article-card">
              <div className="article-label">Landscape</div>
              <p>How carrier networks actually work</p>
            </div>
          </div>
        </div>
      </section>

      {/* Explore topics */}
      <section className="topics">
        <div className="container">
          <h2 className="h2">Explore what shapes logistics</h2>

          <div className="topics-grid">
            <div className="topic-card">
              <h3>Cross-border</h3>
              <p>Customs, duties, moving freight across the line</p>
            </div>
            <div className="topic-card topic-lg">
              <h3>LTL</h3>
              <p>How it works, who operates in it</p>
            </div>
            <div className="topic-card topic-xl">
              <h3>Ocean</h3>
              <p>Carriers, rates, and the cycles that move them</p>
            </div>
            <div className="topic-card">
              <h3>Warehousing</h3>
              <p>Storage, fulfillment, and the space between</p>
            </div>
            <div className="topic-card topic-highlight">
              <h3>AI</h3>
              <p>Where automation is actually changing logistics</p>
            </div>
            <div className="topic-card topic-lg2">
              <h3>Freight Brokerage</h3>
              <p>The middle layer that keeps freight moving</p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="newsletter">
        <div className="container">
          <div className="newsletter-content">
            <h2 className="h2">Keep reading the landscape.</h2>
            <p>
              One email a week — new companies, useful explanations, market
              shifts, and the context behind them.
            </p>

            <div className="newsletter-form">
              <input
                type="email"
                placeholder="email.example@gmail.com"
                className="newsletter-input"
              />
              <button className="newsletter-button">Subscribe</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
