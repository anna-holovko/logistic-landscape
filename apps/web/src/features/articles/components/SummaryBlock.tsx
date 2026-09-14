import { SummaryBlock as SummaryBlockType } from "../types";
import styles from "./blocks.module.css";

interface SummaryBlockProps {
  block: SummaryBlockType;
}

export function SummaryBlock({ block }: SummaryBlockProps) {
  return (
    <div className={styles.summaryContainer}>
      <h2 className={styles.summaryTitle}>{block.title}</h2>
      {block.items.map((item, idx) => (
        <div key={idx} className={styles.summaryItem}>
          <span className={styles.summaryNumber}>{item.number}</span>
          <p className={styles.summaryContent}>{item.content}</p>
        </div>
      ))}
    </div>
  );
}
