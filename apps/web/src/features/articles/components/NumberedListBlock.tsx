import { NumberedListBlock as NumberedListBlockType } from "../types";
import styles from "./blocks.module.css";

interface NumberedListBlockProps {
  block: NumberedListBlockType;
}

export function NumberedListBlock({ block }: NumberedListBlockProps) {
  return (
    <div className={styles.numberedListContainer}>
      {block.items.map((item, idx) => (
        <div key={idx} className={styles.numberedListItem}>
          <span className={styles.numberedListNumber}>{item.number}</span>
          <div className={styles.numberedListContent}>
            <h3 className={styles.numberedListTitle}>{item.title}</h3>
            <p className={styles.numberedListDescription}>{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
