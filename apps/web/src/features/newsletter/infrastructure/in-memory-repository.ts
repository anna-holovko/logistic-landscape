/**
 * In-Memory Newsletter Repository
 *
 * Stub implementation for development/testing.
 * Replace with real provider (Brevo, Mailchimp, etc) in production.
 */

import { Email } from "../model/email";
import { SubscriptionResult, NewsletterErrorCode } from "../model/types";
import { NewsletterRepository } from "../model/repository";

export class InMemoryNewsletterRepository implements NewsletterRepository {
  private subscribers = new Set<string>();

  async subscribe(email: Email): Promise<SubscriptionResult | { code: NewsletterErrorCode; message: string }> {
    const emailStr = email.toString();

    if (this.subscribers.has(emailStr)) {
      return {
        code: "DUPLICATE_SUBSCRIPTION",
        message: "This email is already subscribed to our newsletter",
      };
    }

    this.subscribers.add(emailStr);

    return {
      success: true,
      email,
      subscribedAt: new Date(),
      message: "Successfully subscribed to the newsletter!",
    };
  }

  async isSubscribed(email: Email): Promise<boolean> {
    return this.subscribers.has(email.toString());
  }
}
