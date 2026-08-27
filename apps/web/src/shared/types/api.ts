/**
 * API Contract Types
 *
 * These types define the contract between frontend and backend.
 * Both must validate against these same structures.
 */

// Newsletter Domain
export interface NewsletterSubscribeRequest {
  email: string;
}

export interface NewsletterSubscribeResponse {
  success: boolean;
  message: string;
  data?: {
    email: string;
    subscribedAt: string;
  };
  error?: NewsletterErrorResponse;
}

export interface NewsletterErrorResponse {
  code: NewsletterErrorCode;
  message: string;
  details?: Record<string, unknown>;
}

export type NewsletterErrorCode =
  | "INVALID_EMAIL"
  | "DUPLICATE_SUBSCRIPTION"
  | "PROVIDER_ERROR"
  | "RATE_LIMITED"
  | "INTERNAL_ERROR";

// API Response Envelope
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: ApiErrorResponse;
  meta?: {
    timestamp: string;
    requestId?: string;
  };
}

export interface ApiErrorResponse {
  code: string;
  message: string;
  details?: Record<string, unknown>;
}

// HTTP Status Mapping
export const ERROR_STATUS_CODE_MAP: Record<NewsletterErrorCode, number> = {
  INVALID_EMAIL: 400,
  DUPLICATE_SUBSCRIPTION: 409,
  PROVIDER_ERROR: 500,
  RATE_LIMITED: 429,
  INTERNAL_ERROR: 500,
};
