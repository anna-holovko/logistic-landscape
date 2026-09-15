import { NextRequest, NextResponse } from "next/server";
import { newsletterSubscribeRequestSchema } from "@/shared/validation/newsletter";
import { NewsletterSubscribeResponse } from "@/shared/types/api";
import { createRateLimiter } from "@/services/rateLimit";
import { upsertNewsletterSubscriber } from "@/services/db";

const rateLimiter = createRateLimiter(60 * 60 * 1000, 5);

export async function POST(request: NextRequest): Promise<NextResponse<NewsletterSubscribeResponse>> {
  console.log('[Newsletter API] Incoming subscription request');
  console.log('[Newsletter API] Environment:', {
    VERCEL: process.env.VERCEL,
    VERCEL_ENV: process.env.VERCEL_ENV,
    NODE_ENV: process.env.NODE_ENV,
    DATABASE_PATH: process.env.DATABASE_PATH,
    NEWSLETTER_TABLE: process.env.NEWSLETTER_TABLE,
  });

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
    let subscriber;
    try {
      subscriber = upsertNewsletterSubscriber(email);
      console.log("✓ Newsletter subscriber saved:", { email, subscribedAt: subscriber.subscribed_at });
    } catch (dbError) {
      console.error("✗ Database error saving newsletter subscriber:", dbError);
      throw dbError;
    }

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
    const errorMessage = error instanceof Error ? error.message : String(error);
    const errorStack = error instanceof Error ? error.stack : "No stack";

    console.error("=== NEWSLETTER SUBSCRIPTION ERROR ===");
    console.error("Message:", errorMessage);
    console.error("Stack:", errorStack);
    console.error("Full error:", JSON.stringify(error, null, 2));
    console.error("===================================");

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
