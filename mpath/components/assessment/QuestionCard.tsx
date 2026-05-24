"use client";

import { motion } from "framer-motion";
import type { Question } from "@/types";
import { Card } from "@/components/ui/Card";
import { LikertScale } from "./LikertScale";

interface QuestionCardProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  value?: number;
  onAnswer: (value: number) => void;
}

export function QuestionCard({ question, questionNumber, totalQuestions, value, onAnswer }: QuestionCardProps) {
  return (
    <motion.div
      key={question.id}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -14 }}
      transition={{ duration: 0.25 }}
    >
      <Card className="p-6 sm:p-8">
        <p className="text-sm font-semibold uppercase tracking-wide text-secondary">
          Question {questionNumber} of {totalQuestions}
        </p>
        <h1 className="mt-5 text-2xl font-semibold leading-tight text-text sm:text-3xl">{question.text}</h1>
        <LikertScale value={value} onChange={onAnswer} />
      </Card>
    </motion.div>
  );
}
