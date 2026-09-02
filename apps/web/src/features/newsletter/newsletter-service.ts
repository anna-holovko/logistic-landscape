import { NewsletterSubscribeResponse } from "@/shared/types/api";

export async function subscribeToNewsletter(
  email: string
): Promise<NewsletterSubscribeResponse> {
  try {
    const response = await fetch("/api/newsletter/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Subscription failed");
    }

    return await response.json();
  } catch (error) {
    const message = error instanceof Error ? error.message : "Subscription failed";
    throw new Error(message);
  }
}
