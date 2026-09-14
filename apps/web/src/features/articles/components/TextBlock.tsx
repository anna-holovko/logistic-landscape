import { TextBlock as TextBlockType } from "../types";
import styles from "./blocks.module.css";

interface TextBlockProps {
  block: TextBlockType;
}

export function TextBlock({ block }: TextBlockProps) {
  return (
    <p className={styles.textBlock}>
      {block.content}
    </p>
  );
}
