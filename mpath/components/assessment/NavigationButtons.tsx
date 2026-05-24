"use client";

import { Button } from "@/components/ui/Button";

interface NavigationButtonsProps {
  canGoBack: boolean;
  canContinue: boolean;
  isLastQuestion: boolean;
  onBack: () => void;
  onContinue: () => void;
}

export function NavigationButtons({
  canGoBack,
  canContinue,
  isLastQuestion,
  onBack,
  onContinue,
}: NavigationButtonsProps) {
  return (
    <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
      <Button variant="secondary" onClick={onBack} disabled={!canGoBack} className="disabled:cursor-not-allowed disabled:opacity-40">
        Back
      </Button>
      <Button onClick={onContinue} disabled={!canContinue} className="disabled:cursor-not-allowed disabled:opacity-40">
        {isLastQuestion ? "Finish Assessment" : "Continue"}
      </Button>
    </div>
  );
}
