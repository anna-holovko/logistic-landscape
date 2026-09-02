"use client";

import { useState, useCallback } from "react";
import { emailSchema } from "@/shared/validation/newsletter";
import { subscribeToNewsletter } from "../../newsletter-service";

interface FormState {
  email: string;
  isLoading: boolean;
  error: string | null;
  success: boolean;
}

interface UseNewsletterFormReturn {
  email: string;
  isLoading: boolean;
  error: string | null;
  success: boolean;
  setEmail: (email: string) => void;
  submit: (email: string) => Promise<void>;
  reset: () => void;
}

export function useNewsletterForm(): UseNewsletterFormReturn {
  const [state, setState] = useState<FormState>({
    email: "",
    isLoading: false,
    error: null,
    success: false,
  });

  const validateEmail = useCallback((email: string): string | null => {
    const result = emailSchema.safeParse(email);
    if (!result.success) {
      return result.error.errors[0]?.message || "Invalid email";
    }
    return null;
  }, []);

  const submit = useCallback(async (email: string) => {
    const validationError = validateEmail(email);
    if (validationError) {
      setState((prev) => ({
        ...prev,
        error: validationError,
        success: false,
      }));
      return;
    }

    setState((prev) => ({
      ...prev,
      isLoading: true,
      error: null,
      success: false,
    }));

    try {
      const response = await subscribeToNewsletter(email);

      if (response.success) {
        setState({
          email: "",
          isLoading: false,
          error: null,
          success: true,
        });
      } else {
        setState((prev) => ({
          ...prev,
          isLoading: false,
          error: response.error?.message || response.message,
          success: false,
        }));
      }
    } catch {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: "An unexpected error occurred. Please try again.",
        success: false,
      }));
    }
  }, [validateEmail]);

  const setEmail = useCallback((email: string) => {
    setState((prev) => ({
      ...prev,
      email,
      error: null,
    }));
  }, []);

  const reset = useCallback(() => {
    setState({
      email: "",
      isLoading: false,
      error: null,
      success: false,
    });
  }, []);

  return {
    email: state.email,
    isLoading: state.isLoading,
    error: state.error,
    success: state.success,
    setEmail,
    submit,
    reset,
  };
}
