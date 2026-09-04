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
import { SubscriptionConfirmation } from "./SubscriptionConfirmation";

interface NewsletterFormProps {
  onSuccess?: () => void;
}

export function NewsletterForm({ onSuccess }: NewsletterFormProps) {
  const { email, isLoading, error, success, setEmail, submit, reset } = useNewsletterForm();
  const [agreed, setAgreed] = useState(false);
  const [agreementError, setAgreementError] = useState<string | null>(null);

  useEffect(() => {
    if (success) {
      onSuccess?.();
      // Reset form after success
      const timer = setTimeout(() => {
        reset();
        setAgreed(false);
        setAgreementError(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [success, onSuccess, reset]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!agreed) {
      setAgreementError("Please agree to the terms to continue");
      return;
    }
    setAgreementError(null);
    await submit(email);
  };

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
            onChange={(e) => {
              setAgreed(e.target.checked);
              if (e.target.checked) {
                setAgreementError(null);
              }
            }}
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
        {agreementError && <span className="input-error">{agreementError}</span>}

        <div className="newsletter-form__actions">
          <Button
            type="submit"
            variant="primary"
            size="lg"
            isLoading={isLoading}
            disabled={isLoading || !email || !agreed}
          >
            {isLoading ? "SUBSCRIBING..." : "SUBSCRIBE"}
          </Button>
        </div>
      </form>

      {success && (
        <div role="status">
          <SubscriptionConfirmation />
        </div>
      )}
    </>
  );
}
