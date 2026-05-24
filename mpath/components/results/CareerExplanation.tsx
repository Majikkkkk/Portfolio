import { Card } from "@/components/ui/Card";

interface CareerExplanationProps {
  summary: string;
  growthPath: string;
}

export function CareerExplanation({ summary, growthPath }: CareerExplanationProps) {
  return (
    <Card className="space-y-5">
      <div>
        <h2 className="text-lg font-bold text-primary">Why This Role Fits</h2>
        <p className="mt-3 text-sm leading-7 text-text-muted">{summary}</p>
      </div>
      <div>
        <h2 className="text-lg font-bold text-primary">Career Growth</h2>
        <p className="mt-3 text-sm leading-7 text-text-muted">{growthPath}</p>
      </div>
    </Card>
  );
}
