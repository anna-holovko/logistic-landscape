/**
 * Subscribe Newsletter Use Case
 *
 * Application logic for newsletter subscription.
 * Independent of UI and HTTP concerns.
 */

import { Email } from "../model/email";
import { NewsletterRepository } from "../model/repository";
import { SubscriptionResult, NewsletterErrorCode } from "../model/types";

export interface SubscribeDTO {
  email: string;
}

export interface SubscribeResult {
  success: boolean;
  email?: string;
  subscribedAt?: string;
  message: string;
  error?: {
    code: NewsletterErrorCode;
    message: string;
  };
}

export class SubscribeNewsletterUseCase {
  constructor(private repository: NewsletterRepository) {}

  async execute(dto: SubscribeDTO): Promise<SubscribeResult> {
    try {
      let email: Email;

      try {
        email = Email.create(dto.email);
      } catch {
        return {
          success: false,
          message: "Invalid email address",
          error: {
            code: "INVALID_EMAIL",
            message: "Please enter a valid email address",
          },
        };
      }

      const result = await this.repository.subscribe(email);

      if ("code" in result && "message" in result) {
        return {
          success: false,
          message: result.message,
          error: {
            code: result.code as NewsletterErrorCode,
            message: result.message,
          },
        };
      }

      return {
        success: true,
        email: result.email.toString(),
        subscribedAt: result.subscribedAt.toISOString(),
        message: result.message,
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";
      return {
        success: false,
        message: errorMessage,
        error: {
          code: "INTERNAL_ERROR",
          message: "An unexpected error occurred. Please try again later.",
        },
      };
    }
  }
}
