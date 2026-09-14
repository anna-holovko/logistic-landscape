import { CompanyBlock as CompanyBlockType } from "../types";
import styles from "./blocks.module.css";

interface CompanyBlockProps {
  block: CompanyBlockType;
}

export function CompanyBlock({ block }: CompanyBlockProps) {
  return (
    <div className={styles.companyBlockContainer}>
      <h2 className={styles.companyBlockTitle}>{block.title}</h2>
      <div className={styles.companiesList}>
        {block.companies.map((company) => (
          <div key={company.id} className={styles.companyItem}>
            <div className={styles.companyInfo}>
              <h3 className={styles.companyName}>{company.name}</h3>
              <p className={styles.companyCategory}>{company.category}</p>
              <p className={styles.companyDescription}>{company.description}</p>
            </div>
            {company.link && (
              <a href={company.link} className={styles.companyLink}>
                View Profile
                <span className={styles.arrowIcon}>→</span>
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
