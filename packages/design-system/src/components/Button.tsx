import React from "react";

export type ButtonVariant = "primary" | "secondary" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  children: React.ReactNode;
}

/**
 * Button Component
 *
 * Reusable button component with variants and sizes.
 * Styling will be extracted from Figma design system.
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", isLoading, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={`button button--${variant} button--${size}`}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {isLoading ? "Loading..." : children}
      </button>
    );
  }
);

Button.displayName = "Button";
