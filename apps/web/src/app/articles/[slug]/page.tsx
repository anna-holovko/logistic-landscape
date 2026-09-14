import type { Metadata } from "next";
import { ArticleTemplate } from "@/features/articles/components";
import { getArticleBySlug, getAllArticles } from "@/features/articles/data";
import { notFound } from "next/navigation";

interface ArticlePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata(
  { params }: ArticlePageProps,
): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    return {
      title: "Article not found",
    };
  }

  return {
    title: article.title,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article",
      publishedTime: article.publishedAt,
      authors: article.author ? [article.author] : undefined,
      tags: article.tags,
    },
  };
}

export async function generateStaticParams() {
  const articles = getAllArticles();
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export default async function ArticlePage({
  params,
}: ArticlePageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  return <ArticleTemplate article={article} />;
}
