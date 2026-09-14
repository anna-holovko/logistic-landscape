import { GridBlock as GridBlockType } from "../types";
import styles from "./blocks.module.css";

interface GridBlockProps {
  block: GridBlockType;
}

export function GridBlock({ block }: GridBlockProps) {
  return (
    <div className={styles.gridContainer}>
      {block.items.map((item) => (
        <div key={item.id} className={styles.gridItem}>
          <h3 className={styles.gridItemTitle}>{item.title}</h3>
          <p className={styles.gridItemCategory}>{item.category}</p>
          <p className={styles.gridItemDescription}>{item.description}</p>
          {item.link && (
            <a href={item.link} className={styles.gridItemLink}>
              View Profile
              <span className={styles.arrowIcon}>→</span>
            </a>
          )}
        </div>
      ))}
    </div>
  );
}
