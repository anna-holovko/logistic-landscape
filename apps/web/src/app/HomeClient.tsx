"use client";

import { Header } from "@/features/homepage/components/Header";
import { Hero } from "@/features/homepage/components/Hero";
import { LogisticsVisualization } from "@/features/homepage/components/LogisticsVisualization";
import { FounderSection } from "@/features/homepage/components/FounderSection";
import { CompaniesSection } from "@/features/homepage/components/CompaniesSection";
import { ArticlesSection } from "@/features/homepage/components/ArticlesSection";
import { TopicsSection } from "@/features/homepage/components/TopicsSection";
import { NewsletterSection } from "@/features/homepage/components/NewsletterSection";
import { Footer } from "@/features/homepage/components/Footer";
import "./homepage.css";

export default function HomeClient() {
  return (
    <div className="homepage">
      <Header menuItems={["Company", "Articles", "Newsletter"]} />
      <Hero />
      <LogisticsVisualization />
      <FounderSection />
      <CompaniesSection />
      <ArticlesSection />
      <TopicsSection />
      <NewsletterSection />
      <Footer />
    </div>
  );
}
