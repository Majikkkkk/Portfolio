"use client";

import { motion } from "framer-motion";

export function LoadingScreen({ label = "Analyzing assessment profile" }: { label?: string }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-lg border border-border bg-card p-8 text-center shadow-soft"
      >
        <div className="mx-auto mb-5 h-10 w-10 animate-spin rounded-full border-2 border-border border-t-primary" />
        <p className="text-sm font-semibold text-primary">{label}</p>
      </motion.div>
    </div>
  );
}
