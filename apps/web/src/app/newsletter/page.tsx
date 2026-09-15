import { Metadata } from "next";
import { NewsletterSection } from "@/features/homepage/components/NewsletterSection";

export const metadata: Metadata = {
  title: "Newsletter | Logistic Landscape",
  description: "Subscribe to our weekly newsletter for insights on the logistics industry.",
};

export default function NewsletterPage() {
  return <NewsletterSection />;
}
