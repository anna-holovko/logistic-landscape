"use client";

import Image from "next/image";
import styles from "./LogisticsVisualization.module.css";

export function LogisticsVisualization() {
  return (
    <section className={styles.section}>
      <div className={`container ${styles.container}`}>
        <div className={styles.header}>
          <h2 className={styles.title}>
            See how the different parts of logistics fit together.
          </h2>
          <p className={styles.subtitle}>
            One shipment touches more of the landscape than it looks like from the outside.
          </p>
        </div>

        <div className={styles.visualization}>
          {/* Background vectors and decorative elements */}
          <div className={styles.vectorContainer}>
            <svg
              className={styles.vector}
              style={{ left: "8px", top: "331.54px", width: "549px", height: "121.244px" }}
              viewBox="0 0 549 121.244"
            >
              <image href="/assets/preview/vector-70.svg" width="100%" height="100%" />
            </svg>

            <svg
              className={styles.vector}
              style={{
                left: "556px",
                top: "272.88px",
                width: "549px",
                height: "121.244px",
                transform: "scaleX(-1)",
              }}
              viewBox="0 0 549 121.244"
            >
              <image href="/assets/preview/vector-71.svg" width="100%" height="100%" />
            </svg>
          </div>

          {/* Gradient overlays */}
          <div
            className={styles.gradientOverlay}
            style={{
              left: "0",
              top: "249px",
              width: "262px",
              height: "285px",
              background:
                "linear-gradient(89.99999639235622deg, rgb(30, 60, 69) 18.511%, rgba(30, 60, 69, 0) 100%), linear-gradient(89.99999639235622deg, rgb(27, 67, 72) 18.511%, rgba(27, 67, 72, 0) 100%)",
            }}
          />
          <div
            className={styles.gradientOverlay}
            style={{
              left: "853px",
              top: "148px",
              width: "262px",
              height: "285px",
              background:
                "linear-gradient(to right, #1e3c45 18.511%, rgba(30, 60, 69, 0) 100%)",
              transform: "scaleX(-1)",
            }}
          />

          {/* Ellipse decorative elements */}
          <div className={styles.ellipseContainer} style={{ left: "546px", top: "322px" }}>
            <Image
              src="/assets/preview/ellipse-29.svg"
              alt=""
              width={19}
              height={19}
              className={styles.ellipse}
            />
          </div>

          <div className={styles.ellipseContainer} style={{ left: "455px", top: "249px", width: "202px", height: "166px" }}>
            <Image
              src="/assets/preview/ellipse-30.svg"
              alt=""
              width={202}
              height={166}
              className={styles.ellipse}
            />
          </div>

          <div
            className={styles.rotatedContainer}
            style={{
              left: "329.02px",
              top: "105.02px",
              width: "453.963px",
              height: "453.963px",
              transform: "rotate(-45deg)",
            }}
          >
            <Image
              src="/assets/preview/ellipse-31.svg"
              alt=""
              width={276}
              height={366}
              className={styles.rotatedEllipse}
            />
          </div>

          <div
            className={styles.rotatedContainer}
            style={{
              left: "320.96px",
              top: "53.49px",
              width: "472.016px",
              height: "557.022px",
              transform: "rotate(165.51deg)",
            }}
          >
            <Image
              src="/assets/preview/ellipse-32.svg"
              alt=""
              width={363.089}
              height={481.487}
              className={styles.rotatedEllipse}
            />
          </div>

          <div
            className={styles.rotatedContainer}
            style={{
              left: "246px",
              top: "0",
              width: "619.84px",
              height: "663.249px",
              transform: "rotate(-11.92deg) scaleY(-1)",
            }}
          >
            <Image
              src="/assets/preview/ellipse-33.svg"
              alt=""
              width={513.299}
              height={569.531}
              className={styles.rotatedEllipse}
            />
          </div>

          {/* Small accent dots */}
          {[
            { left: "534px", top: "404px" },
            { left: "735px", top: "338px" },
            { left: "455px", top: "171px" },
            { left: "291px", top: "277px" },
          ].map((pos, idx) => (
            <div key={idx} className={styles.dotLarge} style={pos}>
              <Image
                src="/assets/preview/ellipse-34.svg"
                alt=""
                width={20}
                height={20}
                className={styles.dot}
              />
            </div>
          ))}

          {/* Tiny accent dots */}
          {[
            { left: "762px", top: "344px" },
            { left: "482px", top: "177px" },
            { left: "497px", top: "177px" },
            { left: "512px", top: "177px" },
          ].map((pos, idx) => (
            <div key={idx} className={styles.dotSmall} style={pos}>
              <Image
                src="/assets/preview/ellipse-38.svg"
                alt=""
                width={8}
                height={8}
                className={styles.dot}
              />
            </div>
          ))}

          {/* Another tiny dot */}
          <div className={styles.dotSmall} style={{ left: "777px", top: "344px" }}>
            <Image
              src="/assets/preview/ellipse-39.svg"
              alt=""
              width={8}
              height={8}
              className={styles.dot}
            />
          </div>

          {/* Info Cards */}
          <div className={styles.card} style={{ left: "795px", top: "294px" }}>
            <div className={styles.cardHeader}>
              <div className={styles.cardDot}>
                <Image
                  src="/assets/preview/ellipse-28.svg"
                  alt=""
                  width={11}
                  height={11}
                />
              </div>
              <h3 className={styles.cardTitle}>Broker</h3>
            </div>
            <div className={styles.cardContent}>
              <p className={styles.goldText}>3PL</p>
              <p className={styles.whiteText}>Warehousing</p>
            </div>
          </div>

          <div className={styles.card} style={{ left: "341px", top: "113px" }}>
            <div className={styles.cardHeader}>
              <div className={styles.cardDot}>
                <Image
                  src="/assets/preview/ellipse-28.svg"
                  alt=""
                  width={11}
                  height={11}
                />
              </div>
              <h3 className={styles.cardTitle}>Carrier</h3>
            </div>
            <div className={styles.cardContent}>
              <p className={styles.goldText}>LTL</p>
              <p className={styles.goldText}>STL</p>
              <p className={styles.goldText}>FTL</p>
            </div>
          </div>

          <div className={styles.card} style={{ left: "170px", top: "262px" }}>
            <div className={styles.cardHeader}>
              <div className={styles.cardDot}>
                <Image
                  src="/assets/preview/ellipse-28.svg"
                  alt=""
                  width={11}
                  height={11}
                />
              </div>
              <h3 className={styles.cardTitle}>Shipper</h3>
            </div>
          </div>

          <div className={styles.card} style={{ left: "564px", top: "389px" }}>
            <div className={styles.cardHeader}>
              <div className={styles.cardDot}>
                <Image
                  src="/assets/preview/ellipse-28.svg"
                  alt=""
                  width={11}
                  height={11}
                />
              </div>
              <h3 className={styles.cardTitle}>Consignee</h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
