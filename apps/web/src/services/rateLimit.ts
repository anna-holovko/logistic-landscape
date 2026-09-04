import { NextRequest, NextResponse } from 'next/server';
import type { NewsletterSubscribeResponse } from '@/shared/types/api';

interface RateLimitStore {
  [key: string]: { count: number; resetTime: number };
}

const store: RateLimitStore = {};

export function createRateLimiter(windowMs: number = 60 * 60 * 1000, maxRequests: number = 5) {
  return async (request: NextRequest): Promise<NextResponse<NewsletterSubscribeResponse> | null> => {
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
    const key = `${ip}:${request.nextUrl.pathname}`;
    const now = Date.now();

    if (!store[key]) {
      store[key] = { count: 1, resetTime: now + windowMs };
      return null;
    }

    if (now > store[key].resetTime) {
      store[key] = { count: 1, resetTime: now + windowMs };
      return null;
    }

    store[key].count++;

    if (store[key].count > maxRequests) {
      const response: NewsletterSubscribeResponse = {
        success: false,
        message: 'Too many requests. Please try again later.',
        error: {
          code: 'RATE_LIMITED',
          message: 'Rate limit exceeded',
        },
      };
      return NextResponse.json(response, { status: 429 });
    }

    return null;
  };
}
