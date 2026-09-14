import { HeadingBlock as HeadingBlockType } from "../types";
import styles from "./blocks.module.css";

interface HeadingBlockProps {
  block: HeadingBlockType;
}

export function HeadingBlock({ block }: HeadingBlockProps) {
  const Tag = `h${block.level}` as keyof JSX.IntrinsicElements;

  return (
    <Tag className={styles[`heading${block.level}`]}>
      {block.content}
    </Tag>
  );
}
