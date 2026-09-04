export function getNewsletterTable(): string {
  const env = process.env.VERCEL_ENV || 'production';

  if (env === 'preview') {
    return 'newsletter_subscribers_preview';
  }

  return 'newsletter_subscribers';
}
