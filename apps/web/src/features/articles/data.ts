/**
 * Article Mock Data
 *
 * This is temporary development data. In production, articles would be fetched from:
 * - A CMS (Contentful, Sanity, etc.)
 * - A database (Supabase, PostgreSQL, etc.)
 * - An API endpoint
 * - User uploads
 *
 * The Article interface remains the same regardless of the data source.
 */

import { Article } from "./types";

export const smallTruckLoadArticle: Article = {
  id: "stl-explained",
  slug: "small-truck-load-explained",
  title: "Small Truck Load (STL), explained",
  excerpt: "Small Truck Load sits between traditional LTL and full truckload, giving shippers a dedicated transportation option for freight that doesn't need an entire trailer. Here's how it works, when it makes sense, and where it fits in the freight market.",
  category: "Small Truck Load",
  author: undefined,
  publishedAt: "2026-08-01",
  readTime: "8 min",
  tags: ["Small Truck Load", "LTL", "FTL", "Dedicated Freight"],
  blocks: [
    {
      type: "summary",
      title: "Quick summary",
      items: [
        {
          number: "01",
          content: "STL typically serves shipments too large or sensitive for traditional LTL but too small to justify a full truckload."
        },
        {
          number: "02",
          content: "Unlike LTL, freight typically stays on one vehicle rather than moving through multiple terminals."
        },
        {
          number: "03",
          content: "Fewer touches can reduce handling risk and create more predictable transit times."
        },
        {
          number: "04",
          content: "STL isn't automatically cheaper than LTL — the right choice depends on shipment size, urgency, handling requirements and lane."
        },
        {
          number: "05",
          content: "The category overlaps with LTL, expedited freight and dedicated transportation rather than replacing any one of them."
        }
      ]
    },
    {
      type: "heading",
      level: 2,
      content: "What is Small Truck Load?"
    },
    {
      type: "text",
      content: "Small Truck Load (STL) is a transportation model for shipments that don't require the capacity of a full truck but benefit from dedicated handling."
    },
    {
      type: "text",
      content: "Unlike traditional less-than-truckload shipping, where freight from multiple customers is consolidated and transferred between terminals, STL shipments can travel directly from pickup to delivery on a dedicated vehicle."
    },
    {
      type: "text",
      content: "That puts STL somewhere between traditional LTL and full truckload in the transportation landscape."
    },
    {
      type: "heading",
      level: 2,
      content: "Where STL fits"
    },
    {
      type: "text",
      content: "There is no universal shipment size at which LTL becomes STL or STL becomes FTL."
    },
    {
      type: "text",
      content: "Weight, pallet count, dimensions, distance, urgency, equipment availability and freight characteristics can all influence the decision."
    },
    {
      type: "text",
      content: "Typical STL shipments might include several pallets of freight that would otherwise require significant LTL capacity but still leave much of a full-size trailer unused."
    },
    {
      type: "heading",
      level: 2,
      content: "How STL works"
    },
    {
      type: "numbered-list",
      items: [
        {
          number: 1,
          title: "A shipment is quoted",
          description: "The shipper or broker provides the shipment details, including origin, destination, dimensions, weight and timing."
        },
        {
          number: 2,
          title: "The right vehicle is matched",
          description: "Depending on the shipment, this might be a cargo van, box truck or straight truck."
        },
        {
          number: 3,
          title: "Freight is picked up",
          description: "The vehicle collects the shipment directly from the shipper."
        },
        {
          number: 4,
          title: "The shipment moves directly",
          description: "Unlike a traditional LTL network, the freight generally doesn't need to pass through a sequence of consolidation terminals."
        },
        {
          number: 5,
          title: "Delivery is completed",
          description: "The same dedicated movement takes the shipment to its destination."
        }
      ]
    },
    {
      type: "heading",
      level: 2,
      content: "STL vs. LTL"
    },
    {
      type: "table",
      headers: ["", "LTL", "STL"],
      rows: [
        {
          "": "Vehicle space",
          "LTL": "Shared",
          "STL": "Typically dedicated"
        },
        {
          "": "Terminal transfers",
          "LTL": "Common",
          "STL": "Usually avoided"
        },
        {
          "": "Handling",
          "LTL": "Multiple touches possible",
          "STL": "Fewer touches"
        },
        {
          "": "Transit",
          "LTL": "Network-dependent",
          "STL": "More direct"
        },
        {
          "": "Best suited for",
          "LTL": "Smaller, flexible freight",
          "STL": "Larger, sensitive or time-critical freight"
        }
      ]
    },
    {
      type: "heading",
      level: 2,
      content: "When does STL make sense?"
    },
    {
      type: "text",
      content: "STL may be worth considering when:"
    },
    {
      type: "list",
      items: [
        "a shipment occupies a significant amount of LTL capacity",
        "freight is fragile or particularly sensitive to handling",
        "delivery timing is important",
        "multiple terminal transfers create unnecessary risk",
        "the shipment doesn't economically justify a full truckload",
        "dedicated transportation provides operational value beyond price alone"
      ]
    },
    {
      type: "companies",
      title: "Companies mentioned in this article",
      companies: [
        {
          id: "expedite-all",
          name: "Expedite All",
          category: "Small Truck Load · Carrier Network",
          description: "STL-focused provider offering dedicated transportation through a network of small vehicles.",
          link: "/companies/expedite-all"
        },
        {
          id: "fedex-custom-critical",
          name: "FedEx Custom Critical",
          category: "Expedited Freight · Dedicated Transportation",
          description: "Provides time-sensitive and specialized transportation services.",
          link: "/companies/fedex-custom-critical"
        }
      ]
    },
    {
      type: "grid",
      items: [
        {
          id: "expedite-all-grid",
          title: "Expedite All",
          category: "Small Truck Load · Carrier Network",
          description: "Direct example of an STL-focused carrier network.",
          link: "/companies/expedite-all"
        },
        {
          id: "panther-premium",
          title: "Panther Premium Logistics",
          category: "Expedited · Premium Freight",
          description: "Overlaps with STL on time-critical, dedicated shipments.",
          link: "/companies/panther-premium"
        },
        {
          id: "bolt-express",
          title: "Bolt Express",
          category: "Expedited · Ground Transportation",
          description: "Adjacent ground network used for comparable freight sizes.",
          link: "/companies/bolt-express"
        },
        {
          id: "landstar",
          title: "Landstar",
          category: "Asset-light Transportation Network",
          description: "Alternative model shippers weigh against dedicated STL.",
          link: "/companies/landstar"
        }
      ]
    }
  ]
};

// Map of article slugs to article data
export const articlesMap: Record<string, Article> = {
  [smallTruckLoadArticle.slug]: smallTruckLoadArticle,
};

// Get article by slug
export function getArticleBySlug(slug: string): Article | undefined {
  return articlesMap[slug];
}

// Get all articles
export function getAllArticles(): Article[] {
  return Object.values(articlesMap);
}
