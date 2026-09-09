"use client";

import { useState } from "react";
import { SubscribeModal } from "./SubscribeModal";

interface SubscribeButtonProps {
  children: React.ReactNode;
  className?: string;
  onSuccess?: () => void;
}

export function SubscribeButton({
  children,
  className,
  onSuccess,
}: SubscribeButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  return (
    <>
      <button
        onClick={handleOpenModal}
        className={className}
        type="button"
      >
        {children}
      </button>
      <SubscribeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={onSuccess}
      />
    </>
  );
}
