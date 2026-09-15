/**
 * Newsletter API Client Service
 *
 * Handles HTTP communication with the backend API.
 */

import { NewsletterSubscribeRequest, NewsletterSubscribeResponse } from "@/shared/types/api";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";

export class NewsletterApiClient {
  async subscribe(email: string): Promise<NewsletterSubscribeResponse> {
    const request: NewsletterSubscribeRequest = { email };

    try {
      const response = await fetch(`${API_BASE_URL}/api/newsletter/subscribe`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({
          error: { code: "INTERNAL_ERROR", message: "Failed to subscribe" },
        }));

        return {
          success: false,
          message: error.error?.message || "Failed to subscribe",
          error: error.error,
        };
      }

      return response.json();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Network error";
      return {
        success: false,
        message: errorMessage,
        error: {
          code: "INTERNAL_ERROR",
          message: "Failed to connect to the server. Please try again later.",
        },
      };
    }
  }
}

export const apiClient = new NewsletterApiClient();
