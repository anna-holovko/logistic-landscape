/**
 * Newsletter Repository Interface
 *
 * Defines the contract for newsletter storage/provider operations.
 * Concrete implementations in infrastructure layer.
 */

import { Email } from "./email";
import { SubscriptionResult, NewsletterError } from "./types";

export interface NewsletterRepository {
  subscribe(email: Email): Promise<SubscriptionResult | NewsletterError>;
  isSubscribed(email: Email): Promise<boolean>;
}
