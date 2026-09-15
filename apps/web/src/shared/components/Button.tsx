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
        <span style={{ position: 'relative', zIndex: 2 }}>
          {isLoading ? "Loading..." : children}
        </span>
        {variant === "primary" && size === "lg" && (
          <div className="button-decoration">
            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <circle cx="50" cy="50" r="50" fill="#c79a3e" />
            </svg>
          </div>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";
