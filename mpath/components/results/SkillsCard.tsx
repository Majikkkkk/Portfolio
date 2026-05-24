import { Card } from "@/components/ui/Card";

export function SkillsCard({ title, items }: { title: string; items: string[] }) {
  return (
    <Card>
      <h2 className="text-lg font-bold text-primary">{title}</h2>
      <div className="mt-4 flex flex-wrap gap-2">
        {items.map((item) => (
          <span key={item} className="rounded-full border border-border bg-background px-3 py-2 text-sm text-secondary">
            {item}
          </span>
        ))}
      </div>
    </Card>
  );
}
