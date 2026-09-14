/**
 * Article Content Types
 *
 * These types define the structure of articles and their content blocks.
 * This allows content sources (database, CMS, API, etc.) to be replaced
 * without changing the Article Template or block components.
 */

export type ArticleBlockType =
  | "text"
  | "heading"
  | "image"
  | "quote"
  | "summary"
  | "table"
  | "list"
  | "numbered-list"
  | "companies"
  | "grid"
  | "newsletter"
  | "cta";

export interface TextBlock {
  type: "text";
  content: string;
}

export interface HeadingBlock {
  type: "heading";
  level: 1 | 2 | 3 | 4;
  content: string;
}

export interface ImageBlock {
  type: "image";
  src: string;
  alt: string;
  caption?: string;
}

export interface QuoteBlock {
  type: "quote";
  content: string;
  author?: string;
}

export interface SummaryBlock {
  type: "summary";
  title: string;
  items: Array<{
    number: string;
    content: string;
  }>;
}

export interface TableBlock {
  type: "table";
  title?: string;
  headers: string[];
  rows: Array<Record<string, string>>;
}

export interface ListBlock {
  type: "list";
  items: string[];
}

export interface NumberedListBlock {
  type: "numbered-list";
  items: Array<{
    number: number;
    title: string;
    description: string;
  }>;
}

export interface CompanyBlock {
  type: "companies";
  title: string;
  companies: Array<{
    id: string;
    name: string;
    category: string;
    description: string;
    link?: string;
  }>;
}

export interface GridBlock {
  type: "grid";
  items: Array<{
    id: string;
    title: string;
    category: string;
    description: string;
    link?: string;
  }>;
}

export interface NewsletterBlock {
  type: "newsletter";
  title: string;
  description: string;
  placeholder?: string;
}

export interface CTABlock {
  type: "cta";
  title: string;
  description: string;
  buttonLabel?: string;
  buttonHref?: string;
}

export type ArticleBlock =
  | TextBlock
  | HeadingBlock
  | ImageBlock
  | QuoteBlock
  | SummaryBlock
  | TableBlock
  | ListBlock
  | NumberedListBlock
  | CompanyBlock
  | GridBlock
  | NewsletterBlock
  | CTABlock;

export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt?: string;
  category?: string;
  author?: string;
  publishedAt?: string;
  updatedAt?: string;
  readTime?: string;
  featuredImage?: string;
  featuredImageAlt?: string;
  tags?: string[];
  blocks: ArticleBlock[];
}
