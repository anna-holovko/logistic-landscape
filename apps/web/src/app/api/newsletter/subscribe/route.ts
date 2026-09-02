/**
 * POST /api/newsletter/subscribe
 *
 * Newsletter subscription endpoint.
 */

import { NextRequest, NextResponse } from "next/server";
import { newsletterSubscribeRequestSchema } from "@/shared/validation/newsletter";
import { NewsletterSubscribeResponse, ERROR_STATUS_CODE_MAP } from "@/shared/types/api";
import { InMemoryNewsletterRepository } from "@/features/newsletter";
import { SubscribeNewsletterUseCase } from "@/features/newsletter";

// Initialize repository and use case
const repository = new InMemoryNewsletterRepository();
const useCase = new SubscribeNewsletterUseCase(repository);

export async function POST(request: NextRequest): Promise<NextResponse<NewsletterSubscribeResponse>> {
  try {
    // Parse request body
    const body = await request.json().catch(() => ({}));

    // Validate request
    const validation = newsletterSubscribeRequestSchema.safeParse(body);
    if (!validation.success) {
      const message = validation.error.errors[0]?.message || "Invalid email format";
      return NextResponse.json(
        {
          success: false,
          message,
          error: {
            code: "INVALID_EMAIL",
            message,
          },
        },
        { status: 400 }
      );
    }

    // Execute use case
    const result = await useCase.execute(validation.data);

    if (!result.success) {
      // For security: treat duplicate subscriptions as success
      // This prevents email enumeration attacks
      if (result.error?.code === "DUPLICATE_SUBSCRIPTION") {
        return NextResponse.json(
          {
            success: true,
            message: "Thanks for subscribing! Check your email for updates.",
            data: {
              email: validation.data.email,
              subscribedAt: new Date().toISOString(),
            },
          },
          { status: 200 }
        );
      }

      const statusCode = result.error && result.error.code
        ? ERROR_STATUS_CODE_MAP[result.error.code as keyof typeof ERROR_STATUS_CODE_MAP] || 400
        : 400;

      return NextResponse.json(
        {
          success: false,
          message: result.message,
          error: result.error,
        },
        { status: statusCode }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: result.message,
        data: {
          email: result.email || "",
          subscribedAt: result.subscribedAt || new Date().toISOString(),
        },
      },
      { status: 200 }
    );
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";

    return NextResponse.json(
      {
        success: false,
        message: errorMessage,
        error: {
          code: "INTERNAL_ERROR",
          message: "An unexpected error occurred. Please try again later.",
        },
      },
      { status: 500 }
    );
  }
}
