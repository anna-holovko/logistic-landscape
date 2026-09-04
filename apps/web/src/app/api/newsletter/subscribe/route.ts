import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { newsletterSubscribeRequestSchema } from "@/shared/validation/newsletter";
import { NewsletterSubscribeResponse } from "@/shared/types/api";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error("Missing Supabase environment variables");
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

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

    // Upsert subscriber - if exists, update the timestamp; if not, insert
    const { data, error } = await supabase
      .from("newsletters")
      .upsert({ email, agreed_to_terms: true, subscribed_at: new Date().toISOString() }, { onConflict: "email" })
      .select()
      .single();

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json(
        {
          success: false,
          message: "Failed to process subscription",
          error: {
            code: "PROVIDER_ERROR",
            message: "An unexpected error occurred. Please try again later.",
          },
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Thanks for subscribing! Check your email for updates.",
        data: {
          email,
          subscribedAt: data.subscribed_at,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Subscription error:", error);
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
