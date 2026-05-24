import type { ReactNode } from "react";
import { APP_NAME } from "@/utils/constants";

export function AssessmentLayout({ children }: { children: ReactNode }) {
  return (
    <main className="soft-grid min-h-screen bg-background px-5 py-6 text-text sm:px-8">
      <div className="mx-auto flex w-full max-w-4xl flex-col">
        <header className="mb-8 flex items-center justify-between">
          <div>
            <p className="text-sm font-bold tracking-wide text-primary">{APP_NAME}</p>
            <p className="text-xs text-text-muted">Computer Science Career Aptitude Assessment</p>
          </div>
        </header>
        {children}
      </div>
    </main>
  );
}
