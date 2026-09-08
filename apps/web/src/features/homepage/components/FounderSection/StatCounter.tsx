'use client';

import { useNumberCounter } from "@/shared/hooks/useNumberCounter";

interface StatCounterProps {
  value: number;
  label: string;
  isNumeric?: boolean;
}

export function StatCounter({ value, label, isNumeric = true }: StatCounterProps) {
  const [displayValue, ref] = useNumberCounter(isNumeric ? value : 0, 1500);

  // For non-numeric values, just display the original
  const displayText = isNumeric ? displayValue.toLocaleString() : value.toString();

  return (
    <div ref={ref} className="stat-container">
      <div className="stat-value">
        {displayText}
        {isNumeric && value > 100 ? '+' : ''}
      </div>
      <div className="stat-label">{label}</div>
    </div>
  );
}
