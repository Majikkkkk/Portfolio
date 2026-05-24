"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { AssessmentLayout } from "@/components/assessment/AssessmentLayout";
import { NavigationButtons } from "@/components/assessment/NavigationButtons";
import { QuestionCard } from "@/components/assessment/QuestionCard";
import { QuestionTransition } from "@/components/assessment/QuestionTransition";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { LoadingScreen } from "@/components/ui/LoadingScreen";
import { useAssessmentStore } from "@/store/assessmentStore";
import { calculateProgress } from "@/utils/calculateProgress";

export default function AssessmentPage() {
  const router = useRouter();
  const {
    questions,
    currentIndex,
    answers,
    hasHydrated,
    result,
    resumeAssessment,
    answerCurrentQuestion,
    goBack,
    goNext,
    completeCurrentAssessment,
  } = useAssessmentStore();

  useEffect(() => {
    if (!hasHydrated) return;
    if (result) {
      router.replace("/results");
      return;
    }
    resumeAssessment();
  }, [hasHydrated, result, resumeAssessment, router]);

  if (!hasHydrated || !questions.length) {
    return <LoadingScreen label="Preparing balanced question set" />;
  }

  const question = questions[currentIndex];
  const selectedAnswer = answers[question.id];
  const isLastQuestion = currentIndex === questions.length - 1;
  const progress = calculateProgress(currentIndex, questions.length);

  function continueAssessment() {
    if (!selectedAnswer) return;

    if (isLastQuestion) {
      completeCurrentAssessment();
      router.push("/results");
      return;
    }

    goNext();
  }

  return (
    <AssessmentLayout>
      <ProgressBar value={progress} />
      <div className="mt-8">
        <QuestionTransition>
          <QuestionCard
            key={question.id}
            question={question}
            questionNumber={currentIndex + 1}
            totalQuestions={questions.length}
            value={selectedAnswer}
            onAnswer={answerCurrentQuestion}
          />
        </QuestionTransition>
      </div>
      <NavigationButtons
        canGoBack={currentIndex > 0}
        canContinue={Boolean(selectedAnswer)}
        isLastQuestion={isLastQuestion}
        onBack={goBack}
        onContinue={continueAssessment}
      />
    </AssessmentLayout>
  );
}
