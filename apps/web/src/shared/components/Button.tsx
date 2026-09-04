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

const ellipseImage = "https://www.figma.com/api/mcp/asset/b5b28f4d-595d-4c34-aa1f-3290d028818e.svg";

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
        {variant === "primary" && size === "lg" && !isLoading && (
          <div className="button-decoration">
            <img alt="" src={ellipseImage} />
          </div>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";
