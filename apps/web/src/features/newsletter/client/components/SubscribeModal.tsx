"use client";

import { useState } from "react";
import { AnimatePresence } from "motion/react";
import { NewsletterForm } from "./NewsletterForm";
import { SubscriptionConfirmation } from "./SubscriptionConfirmation";
import "./subscribe-modal.css";

interface SubscribeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export function SubscribeModal({
  isOpen,
  onClose,
  onSuccess,
}: SubscribeModalProps) {
  const handleSuccess = () => {
    onSuccess?.();
    // Auto-close after 3 seconds
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="subscribe-modal-backdrop" onClick={handleBackdropClick}>
          <div className="subscribe-modal-content">
            <NewsletterForm onSuccess={handleSuccess} />
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
