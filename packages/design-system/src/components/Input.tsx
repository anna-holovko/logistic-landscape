import React from "react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helpText?: string;
}

/**
 * Input Component
 *
 * Reusable input field with label, error, and help text.
 * Styling will be extracted from Figma design system.
 */
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helpText, ...props }, ref) => {
    const inputId = props.id || `input-${Math.random().toString(36).substr(2, 9)}`;

    return (
      <div className="input-wrapper">
        {label && (
          <label htmlFor={inputId} className="input-label">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={`input ${error ? "input--error" : ""}`}
          {...props}
        />
        {error && <span className="input-error">{error}</span>}
        {helpText && !error && (
          <span className="input-help-text">{helpText}</span>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
