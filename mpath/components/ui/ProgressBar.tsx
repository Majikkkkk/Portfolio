import { formatPercent } from "@/lib/helpers";

export function ProgressBar({ value }: { value: number }) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between text-sm text-text-muted">
        <span>Progress</span>
        <span>{formatPercent(value)}</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-border">
        <div className="h-full rounded-full bg-accent transition-all duration-500" style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}
