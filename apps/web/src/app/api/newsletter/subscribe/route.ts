import { NextRequest, NextResponse } from "next/server";
import { newsletterSubscribeRequestSchema } from "@/shared/validation/newsletter";
import { NewsletterSubscribeResponse } from "@/shared/types/api";
import { createRateLimiter } from "@/services/rateLimit";
import { upsertNewsletterSubscriber } from "@/services/db";

const rateLimiter = createRateLimiter(60 * 60 * 1000, 5);

export async function POST(request: NextRequest): Promise<NextResponse<NewsletterSubscribeResponse>> {
  const rateLimitResponse = await rateLimiter(request);
  if (rateLimitResponse) return rateLimitResponse;

  try {
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid JSON in request body",
          error: {
            code: "INVALID_EMAIL",
            message: "Request body must be valid JSON",
          },
        },
        { status: 400 }
      );
    }

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

    const email = validation.data.email.toLowerCase().trim();

    // Upsert subscriber - if exists, update the status; if not, insert
    const subscriber = upsertNewsletterSubscriber(email);

    return NextResponse.json(
      {
        success: true,
        message: "Thanks for subscribing! Check your email for updates.",
        data: {
          email,
          subscribedAt: subscriber.subscribed_at,
        },
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error("Subscription error:", error);
    console.error("Error stack:", error instanceof Error ? error.stack : "No stack");
    const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";

    return NextResponse.json(
      {
        success: false,
        message: errorMessage,
        error: {
          code: "INTERNAL_ERROR",
          message: errorMessage || "An unexpected error occurred. Please try again later.",
        },
      },
      { status: 500 }
    );
  }
}
