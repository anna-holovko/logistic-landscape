import { ArticleBlock } from "../types";
import { TextBlock } from "./TextBlock";
import { HeadingBlock } from "./HeadingBlock";
import { QuoteBlock } from "./QuoteBlock";
import { SummaryBlock } from "./SummaryBlock";
import { NumberedListBlock } from "./NumberedListBlock";
import { CompanyBlock } from "./CompanyBlock";
import { GridBlock } from "./GridBlock";
import { ListBlock } from "./ListBlock";
import { TableBlock } from "./TableBlock";
import styles from "./blocks.module.css";

interface ArticleBlockRendererProps {
  blocks: ArticleBlock[];
}

export function ArticleBlockRenderer({ blocks }: ArticleBlockRendererProps) {
  return (
    <div className={styles.blocksContainer}>
      {blocks.map((block, index) => {
        switch (block.type) {
          case "text":
            return <TextBlock key={index} block={block} />;

          case "heading":
            return <HeadingBlock key={index} block={block} />;

          case "quote":
            return <QuoteBlock key={index} block={block} />;

          case "summary":
            return <SummaryBlock key={index} block={block} />;

          case "numbered-list":
            return <NumberedListBlock key={index} block={block} />;

          case "companies":
            return <CompanyBlock key={index} block={block} />;

          case "grid":
            return <GridBlock key={index} block={block} />;

          case "list":
            return <ListBlock key={index} block={block} />;

          case "table":
            return <TableBlock key={index} block={block} />;

          default:
            return null;
        }
      })}
    </div>
  );
}
