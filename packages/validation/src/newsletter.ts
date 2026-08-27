import { z } from "zod";

/**
 * Newsletter Validation Schemas
 *
 * These schemas are used for:
 * - Client-side validation (UX)
 * - API request validation (security)
 * - API response validation (contract)
 *
 * Must be consistent across frontend and backend.
 */

// Email validation pattern RFC 5322 (simplified)
const EMAIL_PATTERN =
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const emailSchema = z
  .string()
  .min(1, "Email is required")
  .email("Please enter a valid email address")
  .max(254, "Email must be less than 254 characters");

export const newsletterSubscribeRequestSchema = z.object({
  email: emailSchema,
});

export type NewsletterSubscribeRequest = z.infer<
  typeof newsletterSubscribeRequestSchema
>;

export const newsletterSubscribeResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: z.object({
    email: z.string(),
    subscribedAt: z.string().datetime(),
  }).optional(),
  error: z.object({
    code: z.string(),
    message: z.string(),
    details: z.record(z.unknown()).optional(),
  }).optional(),
});

export type NewsletterSubscribeResponse = z.infer<
  typeof newsletterSubscribeResponseSchema
>;
