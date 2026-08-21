"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  Loader2,
  Send,
} from "lucide-react";

import api from "@/lib/api";
import MathRenderer from "@/components/ui/MathRenderer";

interface TheoryPart {
  id?: string;
  label?: string;
  question?: string;
  marks?: number;
}

interface ExamQuestion {
  id: string;
  question_number?: number;
  question_type: string;
  question?: string;
  options?: string[] | null;
  marks?: number;
  instruction?: string | null;
  instructions?: string | null;
  theory_parts?: TheoryPart[] | null;
  subquestions?: TheoryPart[] | null;
}

interface ExamSession {
  id: string;
  title?: string;
  duration_minutes?: number;
  expires_at?: string | null;
  remaining_seconds?: number | null;
  status?: string;
  total_questions?: number;
  instructions?: string | null;
}

interface AnswerPayload {
  selected_option?: string;
  text_answer?: string;
}

export default function ExamRoom() {
  const params = useParams();
  const router = useRouter();

  const sessionId = params.session_id as string;

  const [session, setSession] = useState<ExamSession | null>(null);
  const [questions, setQuestions] = useState<ExamQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [answers, setAnswers] = useState<Record<string, string>>({});

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [saving, setSaving] = useState(false);

  const [remainingSeconds, setRemainingSeconds] =
    useState<number | null>(null);

  const [error, setError] = useState("");

  const currentQuestion = questions[currentIndex];

  const progress = useMemo(() => {
    if (!questions.length) {
      return 0;
    }

    return ((currentIndex + 1) / questions.length) * 100;
  }, [currentIndex, questions.length]);

  useEffect(() => {
    loadExam();
  }, []);

  useEffect(() => {
    if (remainingSeconds === null) {
      return;
    }

    if (remainingSeconds <= 0) {
      return;
    }

    const timer = window.setInterval(() => {
      setRemainingSeconds((previous) => {
        if (previous === null) {
          return null;
        }

        return Math.max(0, previous - 1);
      });
    }, 1000);

    return () => {
      window.clearInterval(timer);
    };
  }, [remainingSeconds]);

  useEffect(() => {
    if (remainingSeconds === 0 && !submitting) {
      submitExam();
    }
  }, [remainingSeconds]);

  async function loadExam() {
    try {
      setLoading(true);
      setError("");

      const response = await api.get(`/exams/${sessionId}`);

      const data = response.data;

      setSession(data);
      setQuestions(data.questions ?? []);

      if (typeof data.remaining_seconds === "number") {
        setRemainingSeconds(data.remaining_seconds);
      } else if (data.expires_at) {
        const expires = new Date(data.expires_at).getTime();
        const now = Date.now();

        setRemainingSeconds(
          Math.max(0, Math.floor((expires - now) / 1000)),
        );
      } else if (typeof data.duration_minutes === "number") {
        setRemainingSeconds(data.duration_minutes * 60);
      }
    } catch (err: any) {
      setError(
        err?.response?.data?.detail ??
          "Unable to load exam.",
      );
    } finally {
      setLoading(false);
    }
  }

  async function saveAnswer(
    question: ExamQuestion,
    value: string,
  ) {
    setAnswers((previous) => ({
      ...previous,
      [question.id]: value,
    }));

    const payload: AnswerPayload =
      question.question_type === "objective"
        ? {
            selected_option: value,
          }
        : {
            text_answer: value,
          };

    try {
      setSaving(true);

      await api.post(
        `/exams/${sessionId}/answers/${question.id}/${
          question.question_type === "objective"
            ? "objective"
            : "theory"
        }`,
        payload,
      );
    } catch (err) {
      console.error("Failed to save answer:", err);
    } finally {
      setSaving(false);
    }
  }

  async function submitExam() {
    if (submitting) {
      return;
    }

    try {
      setSubmitting(true);
      setError("");

      await api.post(`/exams/${sessionId}/submit`);

      router.push(`/exam/${sessionId}/result`);
    } catch (err: any) {
      setError(
        err?.response?.data?.detail ??
          "Unable to submit exam.",
      );
      setSubmitting(false);
    }
  }

  function formatTime(seconds: number) {
    const minutes = Math.floor(seconds / 60);
    const secondsLeft = seconds % 60;

    return `${minutes}:${String(secondsLeft).padStart(2, "0")}`;
  }

  function getQuestionNumber(question: ExamQuestion) {
    return question.question_number ?? currentIndex + 1;
  }

  function getQuestionMarks(question: ExamQuestion) {
    return question.marks ?? 0;
  }

  function getQuestionText(question: ExamQuestion) {
    return question.question ?? "";
  }

  function getTheoryParts(question: ExamQuestion): TheoryPart[] {
    if (Array.isArray(question.theory_parts)) {
      return question.theory_parts;
    }

    if (Array.isArray(question.subquestions)) {
      return question.subquestions;
    }

    return [];
  }

  function getInstruction(question: ExamQuestion) {
    return (
      question.instruction ??
      question.instructions ??
      session?.instructions ??
      ""
    );
  }

  function getTheoryAnswer(question: ExamQuestion) {
    return answers[question.id] ?? "";
  }

  function isObjective(question: ExamQuestion) {
    return question.question_type === "objective";
  }

  function isTheory(question: ExamQuestion) {
    return question.question_type === "theory";
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center gap-3 bg-slate-50">
        <Loader2 className="h-6 w-6 animate-spin" />
        <span>Loading exam...</span>
      </div>
    );
  }

  if (error && !questions.length) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
        <div className="w-full max-w-xl rounded-2xl border border-red-200 bg-red-50 p-6 text-red-700">
          {error}
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-6">
      <section className="mx-auto max-w-4xl">

        {/* EXAM HEADER */}
        <header className="mb-6 rounded-2xl bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h1 className="text-xl font-bold text-slate-900">
                {session?.title ?? "Exam"}
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                Question {currentIndex + 1} of {questions.length}
              </p>
            </div>

            <div className="flex shrink-0 items-center gap-2 rounded-xl bg-slate-100 px-4 py-2 font-medium text-slate-700">
              <Clock className="h-5 w-5" />

              {remainingSeconds !== null
                ? formatTime(remainingSeconds)
                : "--:--"}
            </div>
          </div>

          {/* EXAM INSTRUCTION */}
          {session?.instructions && (
            <div className="mt-5 rounded-xl border border-blue-100 bg-blue-50 px-4 py-3 text-sm font-medium leading-6 text-blue-900">
              {session.instructions}
            </div>
          )}

          {/* PROGRESS */}
          <div className="mt-5 h-2 overflow-hidden rounded-full bg-slate-200">
            <div
              className="h-full rounded-full bg-blue-600 transition-all"
              style={{
                width: `${progress}%`,
              }}
            />
          </div>
        </header>

        {/* ERROR */}
        {error && (
          <div className="mb-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {error}
          </div>
        )}

        {/* CURRENT QUESTION */}
        {currentQuestion && (
          <article className="rounded-3xl bg-white p-6 shadow-sm">

            {/* QUESTION TITLE */}
            <div className="mb-6 flex items-start justify-between gap-4">
              <h2 className="text-xl font-bold text-slate-900">
                Question {getQuestionNumber(currentQuestion)}
              </h2>

              <span className="shrink-0 text-sm font-medium text-slate-500">
                {getQuestionMarks(currentQuestion)} marks
              </span>
            </div>

            {/* QUESTION INSTRUCTION */}
            {getInstruction(currentQuestion) && (
              <div className="mb-6 rounded-xl border border-blue-100 bg-blue-50 p-4 text-sm font-medium leading-6 text-blue-900">
                {getInstruction(currentQuestion)}
              </div>
            )}

            {/* MAIN QUESTION */}
            <div className="mb-7 text-lg leading-8 text-slate-900">
              <MathRenderer
                content={getQuestionText(currentQuestion)}
              />
            </div>

            {/* OBJECTIVE QUESTION */}
            {isObjective(currentQuestion) &&
              currentQuestion.options &&
              currentQuestion.options.length > 0 && (
                <div className="space-y-3">
                  {currentQuestion.options.map(
                    (value, index) => {
                      const letters = [
                        "A",
                        "B",
                        "C",
                        "D",
                        "E",
                        "F",
                      ];

                      const key =
                        letters[index] ?? String(index + 1);

                      const selected =
                        answers[currentQuestion.id] === key;

                      return (
                        <label
                          key={key}
                          className={`
                            flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition
                            ${
                              selected
                                ? "border-blue-500 bg-blue-50"
                                : "border-slate-200 hover:bg-slate-50"
                            }
                          `}
                        >
                          <input
                            type="radio"
                            name={`question-${currentQuestion.id}`}
                            className="mt-1 h-4 w-4"
                            checked={selected}
                            onChange={() =>
                              saveAnswer(
                                currentQuestion,
                                key,
                              )
                            }
                          />

                          <div className="flex-1">
                            <MathRenderer
                              content={`${key}. ${value}`}
                            />
                          </div>
                        </label>
                      );
                    },
                  )}
                </div>
              )}

            {/* THEORY QUESTION */}
            {isTheory(currentQuestion) && (
              <div className="space-y-6">

                {/* THEORY SUBQUESTIONS */}
                {getTheoryParts(currentQuestion).length > 0 ? (
                  <div className="space-y-5">
                    {getTheoryParts(currentQuestion).map(
                      (part, index) => (
                        <div
                          key={
                            part.id ??
                            `${currentQuestion.id}-${index}`
                          }
                          className="rounded-2xl border border-slate-200 bg-slate-50 p-5"
                        >
                          <div className="flex items-start gap-3">
                            <span className="font-semibold text-slate-900">
                              {part.label ??
                                String.fromCharCode(
                                  97 + index,
                                )}
                              .
                            </span>

                            <div className="flex-1 text-base leading-7 text-slate-900">
                              <MathRenderer
                                content={part.question ?? ""}
                              />
                            </div>

                            {typeof part.marks ===
                              "number" && (
                              <span className="shrink-0 text-sm text-slate-500">
                                {part.marks} marks
                              </span>
                            )}
                          </div>
                        </div>
                      ),
                    )}
                  </div>
                ) : (
                  <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-800">
                    No theory subquestions were returned for this
                    question.
                  </div>
                )}

                {/* THEORY ANSWER */}
                <div>
                  <label
                    htmlFor={`answer-${currentQuestion.id}`}
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Your answer
                  </label>

                  <textarea
                    id={`answer-${currentQuestion.id}`}
                    value={getTheoryAnswer(currentQuestion)}
                    onChange={(event) =>
                      saveAnswer(
                        currentQuestion,
                        event.target.value,
                      )
                    }
                    placeholder="Write your answer here..."
                    className="
                      min-h-64
                      w-full
                      resize-y
                      rounded-2xl
                      border
                      border-slate-300
                      bg-white
                      p-5
                      text-base
                      leading-7
                      outline-none
                      transition
                      focus:border-blue-500
                      focus:ring-2
                      focus:ring-blue-100
                    "
                  />
                </div>
              </div>
            )}

            {/* SAVE STATUS */}
            {saving && (
              <div className="mt-3 text-right text-xs text-slate-400">
                Saving...
              </div>
            )}

            {/* NAVIGATION */}
            <div className="mt-8 flex items-center justify-between gap-4">
              <button
                type="button"
                disabled={currentIndex === 0}
                onClick={() =>
                  setCurrentIndex(
                    (value) => value - 1,
                  )
                }
                className="
                  flex
                  items-center
                  gap-2
                  rounded-xl
                  border
                  border-slate-300
                  bg-white
                  px-5
                  py-3
                  font-medium
                  transition
                  hover:bg-slate-50
                  disabled:cursor-not-allowed
                  disabled:opacity-40
                "
              >
                <ChevronLeft className="h-5 w-5" />
                Previous
              </button>

              {currentIndex < questions.length - 1 ? (
                <button
                  type="button"
                  onClick={() =>
                    setCurrentIndex(
                      (value) => value + 1,
                    )
                  }
                  className="
                    flex
                    items-center
                    gap-2
                    rounded-xl
                    bg-blue-600
                    px-6
                    py-3
                    font-medium
                    text-white
                    transition
                    hover:bg-blue-700
                  "
                >
                  Next
                  <ChevronRight className="h-5 w-5" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={submitExam}
                  disabled={submitting}
                  className="
                    flex
                    items-center
                    gap-2
                    rounded-xl
                    bg-blue-600
                    px-6
                    py-3
                    font-medium
                    text-white
                    transition
                    hover:bg-blue-700
                    disabled:cursor-not-allowed
                    disabled:opacity-60
                  "
                >
                  {submitting ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      Submit Exam
                      <Send className="h-5 w-5" />
                    </>
                  )}
                </button>
              )}
            </div>
          </article>
        )}

        {!currentQuestion && (
          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6 text-amber-800">
            No questions were returned for this exam.
          </div>
        )}
      </section>
    </main>
  );
}
