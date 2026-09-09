"use client";

import Image from "next/image";
import styles from "./CompaniesSection.module.css";

export function CompaniesSection() {
  const companies = [
    {
      name: "FedEx Custom Critical",
      subtitle: "Expedited / Nationwide",
    },
    {
      name: "Panther Premium Logistics",
      subtitle: "Expedited / Time-critical",
    },
    {
      name: "Landstar",
      subtitle: "FTL / Network",
    },
  ];

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.label}>Who operates here?</div>
          <h2 className={styles.heading}>Companies on the landscape</h2>
          <p className={styles.subtitle}>
            Explore who does what, how they operate, and where they fit in the
            industry.
          </p>
        </div>

        <div className={styles.grid}>
          {/* Featured Company */}
          <div className={styles.featuredCompany}>
            <div className={styles.companyBg} />
            <div className={styles.companyContent}>
              <div className={styles.companyHeader}>
                <div className={styles.badge}>Featured Company</div>
                <h3 className={styles.title}>Expedite All</h3>
              </div>

              <div className={styles.attributesRow}>
                <div className={styles.attributes}>
                  <div className={styles.attribute}>
                    <div className={styles.attributeLabel}>Mode</div>
                    <div className={styles.attributeValue}>
                      Small Truck Load
                    </div>
                  </div>
                  <div className={styles.attribute}>
                    <div className={styles.attributeLabel}>Model</div>
                    <div className={styles.attributeValue}>
                      Carrier Network
                    </div>
                  </div>
                  <div className={styles.attribute}>
                    <div className={styles.attributeLabel}>Shipments</div>
                    <div className={styles.attributeValue}>1-14 pallets</div>
                  </div>
                </div>

                <svg className={styles.radarChart} viewBox="0 0 200 200">
                  {/* Concentric hexagon grid rings */}
                  <polygon points="100,30 160,70 140,140 60,140 40,70" fill="none" stroke="#5a8fa0" strokeWidth="1.2" opacity="0.6" />
                  <polygon points="100,45 140,60 130,120 70,120 60,60" fill="none" stroke="#5a8fa0" strokeWidth="1.2" opacity="0.6" />
                  <polygon points="100,60 120,75 115,105 85,105 80,75" fill="none" stroke="#5a8fa0" strokeWidth="1.2" opacity="0.6" />

                  {/* Radial grid lines */}
                  <line x1="100" y1="100" x2="100" y2="30" stroke="#5a8fa0" strokeWidth="1.2" opacity="0.6" />
                  <line x1="100" y1="100" x2="160" y2="70" stroke="#5a8fa0" strokeWidth="1.2" opacity="0.6" />
                  <line x1="100" y1="100" x2="140" y2="140" stroke="#5a8fa0" strokeWidth="1.2" opacity="0.6" />
                  <line x1="100" y1="100" x2="60" y2="140" stroke="#5a8fa0" strokeWidth="1.2" opacity="0.6" />
                  <line x1="100" y1="100" x2="40" y2="70" stroke="#5a8fa0" strokeWidth="1.2" opacity="0.6" />

                  {/* Filled data polygon */}
                  <polygon points="100,45 135,68 118,112 82,112 65,68" fill="#c79a3e" opacity="0.5" />

                  {/* Outer polygon border */}
                  <polygon points="100,30 160,70 140,140 60,140 40,70" fill="none" stroke="#86918c" strokeWidth="2" />

                  {/* Vertex dots */}
                  <circle cx="100" cy="30" r="3.5" fill="#f4ede0" />
                  <circle cx="160" cy="70" r="3.5" fill="#f4ede0" />
                  <circle cx="140" cy="140" r="3.5" fill="#f4ede0" />
                  <circle cx="60" cy="140" r="3.5" fill="#f4ede0" />
                  <circle cx="40" cy="70" r="3.5" fill="#f4ede0" />

                  {/* Labels */}
                  <text x="100" y="16" textAnchor="middle" fontSize="12" fill="#f4ede0" fontWeight="500">Parcel</text>
                  <text x="172" y="75" fontSize="12" fill="#f4ede0" fontWeight="500">LTL</text>
                  <text x="150" y="160" fontSize="12" fill="#f4ede0" fontWeight="500">FTL</text>
                  <text x="50" y="160" fontSize="12" fill="#f4ede0" fontWeight="500">Cold Chain</text>
                  <text x="20" y="75" fontSize="12" fill="#f4ede0" fontWeight="500">STL</text>
                </svg>
              </div>

              <div className={styles.description}>
                <p>
                  Logistic Landscape was founded by Max Drozhzhin, CEO of
                  Expedite All and an operator who has built and scaled
                  logistics companies across North America and Europe.
                </p>
                <div className={styles.link}>
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

          {/* Company Cards */}
          <div className={styles.companiesList}>
            {companies.map((company) => (
              <div key={company.name} className={styles.companyCard}>
                <div className={styles.cardHeader}>
                  <h4>{company.name}</h4>
                  <p>{company.subtitle}</p>
                </div>
                <div className={styles.link}>
                  <span>View Profile</span>
                  <Image
                    src="/assets/preview/arrow-right-2.svg"
                    alt="Arrow"
                    width={16}
                    height={16}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
