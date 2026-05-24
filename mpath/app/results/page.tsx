"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { LoadingScreen } from "@/components/ui/LoadingScreen";
import { CareerExplanation } from "@/components/results/CareerExplanation";
import { ResultCard } from "@/components/results/ResultCard";
import { RoadmapCard } from "@/components/results/RoadmapCard";
import { SkillsCard } from "@/components/results/SkillsCard";
import { StrengthCard } from "@/components/results/StrengthCard";
import { ROLE_RESULTS } from "@/data/roleResults";
import { useAssessmentStore } from "@/store/assessmentStore";

export default function ResultsPage() {
  const router = useRouter();
  const { result, hasHydrated, restartAssessment } = useAssessmentStore();

  useEffect(() => {
    if (hasHydrated && !result) router.replace("/");
  }, [hasHydrated, result, router]);

  if (!hasHydrated || !result) {
    return <LoadingScreen />;
  }

  const roleResult = ROLE_RESULTS[result.finalRole];

  function retake() {
    restartAssessment();
    router.push("/assessment");
  }

  return (
    <main className="soft-grid min-h-screen bg-background px-5 py-8 text-text sm:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm font-bold tracking-wide text-primary">MPath</p>
            <p className="text-xs text-text-muted">Final psychometric career match</p>
          </div>
          <Button variant="secondary" onClick={retake}>
            Retake Assessment
          </Button>
        </div>

        <div className="grid gap-6">
          <ResultCard result={result} roleResult={roleResult} />
          <CareerExplanation summary={roleResult.summary} growthPath={roleResult.growthPath} />
          <div className="grid gap-6 md:grid-cols-2">
            <StrengthCard title="Strongest Strengths Detected" items={[...result.detectedStrengths, ...roleResult.strengths.slice(0, 3)]} />
            <StrengthCard title="Areas for Improvement" items={[...result.improvementFocus, ...roleResult.areasToImprove.slice(0, 3)]} />
            <StrengthCard title="Example Responsibilities" items={roleResult.responsibilities} />
            <SkillsCard title="Recommended Skills" items={roleResult.skills} />
            <SkillsCard title="Technologies and Tools" items={roleResult.tools} />
          </div>
          <RoadmapCard steps={roleResult.roadmap} />
        </div>
      </div>
    </main>
  );
}
