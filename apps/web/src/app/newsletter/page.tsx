import { Metadata } from "next";
import { NewsletterForm } from "@/features/newsletter/client/components/NewsletterForm";
import styles from "./newsletter.module.css";

export const metadata: Metadata = {
  title: "Newsletter | Logistic Landscape",
  description: "Subscribe to our weekly newsletter for insights on the logistics industry.",
};

export default function NewsletterPage() {
  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h1 className={styles.heading}>Keep reading the landscape.</h1>
          <p className={styles.description}>
            One email a week — new companies, useful explanations, market shifts, and the context behind them.
          </p>
          <NewsletterForm />
        </div>
      </div>
    </main>
  );
}
