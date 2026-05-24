"use client";

import { motion } from "framer-motion";
import { LIKERT_OPTIONS } from "@/data/scoringWeights";
import { cn } from "@/lib/helpers";

interface LikertScaleProps {
  value?: number;
  onChange: (value: number) => void;
}

export function LikertScale({ value, onChange }: LikertScaleProps) {
  return (
    <div className="mt-8">
      <div className="grid grid-cols-7 gap-2 sm:gap-3">
        {LIKERT_OPTIONS.map((option) => (
          <motion.button
            key={option.value}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.96 }}
            className={cn(
              "focus-ring flex aspect-square min-h-11 items-center justify-center rounded-full border text-sm font-bold transition",
              value === option.value
                ? "border-primary bg-primary text-white shadow-card"
                : "border-border bg-card text-secondary hover:border-primary"
            )}
            onClick={() => onChange(option.value)}
            type="button"
            aria-label={option.label}
          >
            {option.value}
          </motion.button>
        ))}
      </div>
      <div className="mt-3 flex justify-between gap-3 text-xs text-text-muted">
        <span>Strongly disagree</span>
        <span className="text-center">Neutral</span>
        <span className="text-right">Strongly agree</span>
      </div>
    </div>
  );
}
