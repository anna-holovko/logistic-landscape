/**
 * Newsletter Domain Types
 */

import { Email } from "./email";

export interface SubscriptionResult {
  success: boolean;
  email: Email;
  subscribedAt: Date;
  message: string;
}

export interface NewsletterError {
  code: NewsletterErrorCode;
  message: string;
}

export type NewsletterErrorCode =
  | "INVALID_EMAIL"
  | "DUPLICATE_SUBSCRIPTION"
  | "PROVIDER_ERROR"
  | "RATE_LIMITED"
  | "INTERNAL_ERROR";
