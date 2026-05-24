import { Card } from "@/components/ui/Card";
import type { RoadmapStep } from "@/types";

export function RoadmapCard({ steps }: { steps: RoadmapStep[] }) {
  return (
    <Card>
      <h2 className="text-lg font-bold text-primary">Beginner Roadmap</h2>
      <div className="mt-5 grid gap-5 md:grid-cols-2">
        {steps.map((step) => (
          <div key={step.phase} className="rounded-md border border-border bg-background p-4">
            <h3 className="font-semibold text-text">{step.phase}</h3>
            <p className="mt-2 text-sm leading-6 text-text-muted">{step.description}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}
