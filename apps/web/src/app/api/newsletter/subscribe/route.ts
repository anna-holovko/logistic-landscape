import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { newsletterSubscribeRequestSchema } from "@/shared/validation/newsletter";
import { NewsletterSubscribeResponse } from "@/shared/types/api";
import { getNewsletterTable } from "@/services/newsletter";
import { createRateLimiter } from "@/services/rateLimit";

// Created lazily inside the handler (not at module scope) so a missing env
// var surfaces as a normal request-time error instead of failing the whole
// route's build/static analysis.
//
// Uses the service role key, not the public anon key: this route is the
// only writer this table needs, so RLS can deny all public access and this
// key (server-only, never sent to the client) bypasses RLS entirely.
function getSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error("Missing Supabase environment variables");
  }

  return createClient(supabaseUrl, serviceRoleKey);
}

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
    const table = getNewsletterTable();
    const supabase = getSupabaseClient();

    // Upsert subscriber - if exists, update the status; if not, insert
    const { data, error } = await supabase
      .from(table)
      .upsert(
        {
          email,
          status: "subscribed",
          agreed_to_terms: true,
          subscribed_at: new Date().toISOString(),
        },
        { onConflict: "email" }
      )
      .select()
      .single();

    if (error) {
      console.error("Supabase error:", error);
      console.error("Error details:", {
        message: error.message,
        code: error.code,
        details: error.details,
      });
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
  } catch (error: unknown) {
    console.error("Subscription error:", error);
    console.error("Error stack:", error instanceof Error ? error.stack : "No stack");

    return NextResponse.json(
      {
        success: false,
        message: "An unexpected error occurred. Please try again later.",
        error: {
          code: "INTERNAL_ERROR",
          message: "An unexpected error occurred. Please try again later.",
        },
      },
      { status: 500 }
    );
  }
}
