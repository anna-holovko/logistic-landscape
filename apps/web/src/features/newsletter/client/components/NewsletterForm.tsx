/**
 * Newsletter Form Component
 *
 * Form for newsletter subscription.
 * Styled from Logistic Landscape Figma design.
 */

"use client";

import { FormEvent, useEffect, useState } from "react";
import { Button, Input } from "@/shared/components";
import { useNewsletterForm } from "../hooks/useNewsletterForm";

interface NewsletterFormProps {
  onSuccess?: () => void;
}

export function NewsletterForm({ onSuccess }: NewsletterFormProps) {
  const { email, isLoading, error, success, setEmail, submit, reset } = useNewsletterForm();
  const [agreed, setAgreed] = useState(false);

  useEffect(() => {
    if (success) {
      onSuccess?.();
      // Reset form after success
      const timer = setTimeout(() => {
        reset();
        setAgreed(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [success, onSuccess, reset]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!agreed) {
      alert("Please agree to the terms to continue");
      return;
    }
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
    <>
      <form onSubmit={handleSubmit} className="newsletter-form" noValidate>
        <div className="newsletter-form__field">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={error || undefined}
            disabled={isLoading}
            required
            autoComplete="email"
          />
        </div>

        <div className="newsletter-form__agreement">
          <input
            type="checkbox"
            id="agree-terms"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            disabled={isLoading}
            required
          />
          <label htmlFor="agree-terms">
            By signing up, you agree to receiving marketing emails from us. Your information is stored
            securely and used in accordance with our{" "}
            <a href="/privacy" target="_blank" rel="noopener noreferrer">
              Privacy Policy
            </a>
            .
          </label>
        </div>
      </form>

      <div className="newsletter-form__actions">
        <Button
          type="button"
          variant="primary"
          size="lg"
          isLoading={isLoading}
          disabled={isLoading || !email || !agreed}
          onClick={() => handleSubmit({ preventDefault: () => {} } as any)}
        >
          {isLoading ? "SUBSCRIBING..." : "SUBSCRIBE"}
        </Button>
      </div>
    </>
  );
}
