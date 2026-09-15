import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Newsletter | Logistic Landscape",
  description: "A monthly newsletter for logistics professionals navigating the U.S. & Global markets. Subscribe to understand how the logistics landscape really works.",
};

export default function NewsletterLayout({ children }: { children: React.ReactNode }) {
  return children;
}
