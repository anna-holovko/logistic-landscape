import { ListBlock as ListBlockType } from "../types";
import styles from "./blocks.module.css";

interface ListBlockProps {
  block: ListBlockType;
}

export function ListBlock({ block }: ListBlockProps) {
  return (
    <ul className={styles.listBlock}>
      {block.items.map((item, idx) => (
        <li key={idx} className={styles.listItem}>
          {item}
        </li>
      ))}
    </ul>
  );
}
