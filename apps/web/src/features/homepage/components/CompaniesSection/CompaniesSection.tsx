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
                  <defs>
                    <polygon id="radar-bg" points="100,30 160,70 140,140 60,140 40,70" fill="#b8a874" opacity="0.3" />
                  </defs>
                  <use href="#radar-bg" />
                  <polygon points="100,30 160,70 140,140 60,140 40,70" fill="none" stroke="#b8a874" strokeWidth="2" />

                  <line x1="100" y1="100" x2="100" y2="30" stroke="#999" strokeWidth="1" opacity="0.3" />
                  <line x1="100" y1="100" x2="160" y2="70" stroke="#999" strokeWidth="1" opacity="0.3" />
                  <line x1="100" y1="100" x2="140" y2="140" stroke="#999" strokeWidth="1" opacity="0.3" />
                  <line x1="100" y1="100" x2="60" y2="140" stroke="#999" strokeWidth="1" opacity="0.3" />
                  <line x1="100" y1="100" x2="40" y2="70" stroke="#999" strokeWidth="1" opacity="0.3" />

                  <text x="100" y="18" textAnchor="middle" fontSize="11" fill="#fff">Parcel</text>
                  <text x="165" y="75" fontSize="11" fill="#fff">LTL</text>
                  <text x="140" y="158" fontSize="11" fill="#fff">FTL</text>
                  <text x="55" y="158" fontSize="11" fill="#fff">Cold Chain</text>
                  <text x="25" y="75" fontSize="11" fill="#fff">STL</text>
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
