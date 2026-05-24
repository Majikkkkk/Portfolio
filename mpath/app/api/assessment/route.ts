import { NextResponse } from "next/server";
import { completeAssessment, createAssessmentQuestions } from "@/lib/assessmentEngine";
import type { AnswerMap, Question } from "@/types";

export async function GET() {
  return NextResponse.json({ questions: createAssessmentQuestions() });
}

export async function POST(request: Request) {
  const body = (await request.json()) as { questions: Question[]; answers: AnswerMap };
  return NextResponse.json({ result: completeAssessment(body.questions, body.answers) });
}
