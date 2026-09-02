import { NextRequest, NextResponse } from "next/server";
import { newsletterSubscribeRequestSchema } from "@/shared/validation/newsletter";
import { NewsletterSubscribeResponse } from "@/shared/types/api";

const subscribers = new Set<string>();

export async function POST(request: NextRequest): Promise<NextResponse<NewsletterSubscribeResponse>> {
  try {
    const body = await request.json().catch(() => ({}));
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

    // Security: treat duplicate subscriptions as success to prevent email enumeration
    if (subscribers.has(email)) {
      return NextResponse.json(
        {
          success: true,
          message: "Thanks for subscribing! Check your email for updates.",
          data: {
            email,
            subscribedAt: new Date().toISOString(),
          },
        },
        { status: 200 }
      );
    }

    subscribers.add(email);

    return NextResponse.json(
      {
        success: true,
        message: "Thanks for subscribing! Check your email for updates.",
        data: {
          email,
          subscribedAt: new Date().toISOString(),
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
