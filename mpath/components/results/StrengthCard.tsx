import { Card } from "@/components/ui/Card";

export function StrengthCard({ title, items }: { title: string; items: string[] }) {
  return (
    <Card>
      <h2 className="text-lg font-bold text-primary">{title}</h2>
      <ul className="mt-4 space-y-3">
        {items.map((item) => (
          <li key={item} className="border-l-2 border-accent pl-3 text-sm leading-6 text-text-muted">
            {item}
          </li>
        ))}
      </ul>
    </Card>
  );
}
