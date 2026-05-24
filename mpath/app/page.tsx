"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { useAssessmentStore } from "@/store/assessmentStore";
import { APP_NAME, APP_TAGLINE } from "@/utils/constants";

const signals = [
  "Technical aptitude",
  "Problem-solving behavior",
  "Career compatibility",
  "Workplace tendencies",
];

export default function HomePage() {
  const router = useRouter();
  const { questions, result, startAssessment, resumeAssessment } = useAssessmentStore();
  const hasProgress = questions.length > 0 && !result;

  function start() {
    startAssessment();
    router.push("/assessment");
  }

  function resume() {
    resumeAssessment();
    router.push(result ? "/results" : "/assessment");
  }

  return (
    <main className="soft-grid min-h-screen bg-background text-text">
      <section className="mx-auto grid min-h-screen w-full max-w-6xl items-center gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[1.1fr_0.9fr]">
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
          <p className="text-sm font-bold uppercase tracking-[0.28em] text-secondary">{APP_NAME}</p>
          <h1 className="mt-5 text-4xl font-bold leading-tight text-primary sm:text-6xl">{APP_TAGLINE}</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-text-muted">
            A premium Computer Science aptitude assessment built to identify one best-fit technology career path through structured psychometric scoring.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button onClick={start}>Start Assessment</Button>
            {hasProgress ? (
              <Button variant="secondary" onClick={resume}>
                Resume Assessment
              </Button>
            ) : null}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.12 }}
        >
          <Card className="p-7">
            <div className="mb-7 border-b border-border pb-5">
              <p className="text-sm font-semibold text-secondary">Assessment Model</p>
              <h2 className="mt-2 text-2xl font-bold text-primary">One final career match</h2>
            </div>
            <div className="grid gap-3">
              {signals.map((signal) => (
                <div key={signal} className="rounded-md border border-border bg-background px-4 py-3 text-sm font-medium">
                  {signal}
                </div>
              ))}
            </div>
            <div className="mt-7 rounded-md bg-primary px-4 py-4 text-sm leading-6 text-white">
              Weighted scoring: 70% primary aptitude, 20% supporting traits, 10% consistency pattern.
            </div>
          </Card>
        </motion.div>
      </section>
    </main>
  );
}
