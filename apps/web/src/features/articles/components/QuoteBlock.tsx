import { QuoteBlock as QuoteBlockType } from "../types";
import styles from "./blocks.module.css";

interface QuoteBlockProps {
  block: QuoteBlockType;
}

export function QuoteBlock({ block }: QuoteBlockProps) {
  return (
    <blockquote className={styles.quoteBlock}>
      <p className={styles.quoteContent}>{block.content}</p>
      {block.author && <cite className={styles.quoteAuthor}>{block.author}</cite>}
    </blockquote>
  );
}
