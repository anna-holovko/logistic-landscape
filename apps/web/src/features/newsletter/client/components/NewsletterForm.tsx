/**
 * Newsletter Form Component
 *
 * Form for newsletter subscription.
 * Will be styled from Figma design system.
 */

"use client";

import { FormEvent, useEffect } from "react";
import { Button, Input } from "@/shared/components";
import { useNewsletterForm } from "../hooks/useNewsletterForm";

interface NewsletterFormProps {
  onSuccess?: () => void;
}

export function NewsletterForm({ onSuccess }: NewsletterFormProps) {
  const { email, isLoading, error, success, setEmail, submit, reset } = useNewsletterForm();

  useEffect(() => {
    if (success) {
      onSuccess?.();
      // Reset form after success
      const timer = setTimeout(reset, 3000);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [success, onSuccess, reset]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await submit(email);
  };

  if (success) {
    return (
      <div className="newsletter-form__success" role="status">
        <p>Thank you for subscribing! Check your email for confirmation.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="newsletter-form" noValidate>
      <div className="newsletter-form__field">
        <Input
          type="email"
          label="Email Address"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={error || undefined}
          disabled={isLoading}
          required
          autoComplete="email"
        />
      </div>

      <div className="newsletter-form__actions">
        <Button
          type="submit"
          variant="primary"
          size="md"
          isLoading={isLoading}
          disabled={isLoading || !email}
        >
          {isLoading ? "Subscribing..." : "Subscribe"}
        </Button>
      </div>
    </form>
  );
}
