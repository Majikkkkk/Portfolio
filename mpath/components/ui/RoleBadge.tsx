export function RoleBadge({ label }: { label: string }) {
  return (
    <span className="inline-flex rounded-full border border-border bg-background px-3 py-1 text-xs font-semibold text-secondary">
      {label}
    </span>
  );
}
