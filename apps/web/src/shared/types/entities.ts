/**
 * Entity Types
 *
 * Core domain entities for Logistic Landscape.
 * Entities are the foundation for SEO and structured data.
 */

export type EntityType =
  | "company"
  | "article"
  | "media"
  | "location"
  | "industry"
  | "service"
  | "event";

export interface Entity {
  id: string;
  type: EntityType;
  slug: string;
  title: string;
  description: string;
  content?: string;
  canonicalUrl: string;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
  indexable: boolean;
  author?: {
    id: string;
    name: string;
    url?: string;
  };
  relationships?: EntityRelationship[];
}

export interface EntityRelationship {
  type: RelationType;
  targetId: string;
  targetType: EntityType;
  targetSlug: string;
}

export type RelationType =
  | "belongs_to"
  | "contains"
  | "mentions"
  | "authored_by"
  | "published_by"
  | "related_to"
  | "located_in";

// Newsletter-specific types
export interface NewsletterSubscriber {
  id: string;
  email: string;
  subscribedAt: string;
  status: "active" | "unsubscribed" | "bounced";
}
