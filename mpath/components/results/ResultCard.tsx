import { Card } from "@/components/ui/Card";
import { RoleBadge } from "@/components/ui/RoleBadge";
import type { AssessmentResult, RoleResult } from "@/types";

interface ResultCardProps {
  result: AssessmentResult;
  roleResult: RoleResult;
}

export function ResultCard({ result, roleResult }: ResultCardProps) {
  return (
    <Card className="p-7 sm:p-9">
      <p className="text-sm font-semibold uppercase tracking-wide text-secondary">Your Best Fit Career</p>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <span className="text-4xl" aria-hidden="true">
          {roleResult.icon}
        </span>
        <h1 className="text-3xl font-bold text-primary sm:text-5xl">{result.finalRole}</h1>
      </div>
      <div className="mt-5">
        <RoleBadge label={`${Math.round(result.confidence)}% confidence signal`} />
      </div>
      <p className="mt-6 text-base leading-8 text-text-muted">{result.explanation}</p>
    </Card>
  );
}
