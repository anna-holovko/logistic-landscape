import { Metadata } from "next";
import NewsletterPageClient from "./NewsletterPageClient";

export const metadata: Metadata = {
  title: "Newsletter - Logistic Landscape",
  description: "Subscribe to our monthly newsletter for logistics professionals",
};

export default function NewsletterPage() {
  return <NewsletterPageClient />;
}
