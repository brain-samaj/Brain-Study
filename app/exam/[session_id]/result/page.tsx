"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
  useRouter,
} from "next/navigation";

import {
  Award,
  CheckCircle2,
  Loader2,
  XCircle,
} from "lucide-react";

import api from "@/lib/api";

interface ExamResult {
  score?: number;
  total_marks?: number;
  percentage?: number;
  objective_score?: number;
  theory_score?: number;

  correct_answers?: number;
  incorrect_answers?: number;
  unanswered_questions?: number;

  strengths?: string[];
  weaknesses?: string[];
  recommendations?: string[];

  ai_summary?: string;
}

export default function ExamResultPage() {
  const params = useParams();
  const router = useRouter();

  const sessionId = params.session_id as string;

  const [result, setResult] =
    useState<ExamResult | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    loadResult();
  }, []);

  async function loadResult() {
    try {
      const response =
        await api.get(
          `/exams/${sessionId}/result`
        );

      setResult(response.data);
    } catch (err: any) {
      setError(
        err?.response?.data?.detail ??
        "Unable to load result."
      );
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center gap-3">
        <Loader2 className="animate-spin" />
        Loading result...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-red-600">
        {error}
      </div>
    );
  }

  if (!result) {
    return null;
  }

  const percentage =
    result.percentage ?? 0;

  const grade =
    percentage >= 70
      ? "A"
      : percentage >= 60
      ? "B"
      : percentage >= 50
      ? "C"
      : percentage >= 45
      ? "D"
      : "F";

  const passed =
    percentage >= 50;

  const answered =
    (result.correct_answers ?? 0) +
    (result.incorrect_answers ?? 0);

  return (
    <main className="min-h-screen bg-slate-50 px-5 py-8">
      <section className="mx-auto max-w-4xl">

        <div className="rounded-3xl bg-white p-8 shadow-sm">

          <div className="text-center">

            {passed ? (
              <Award
                className="mx-auto h-14 w-14 text-blue-600"
              />
            ) : (
              <XCircle
                className="mx-auto h-14 w-14 text-red-600"
              />
            )}

            <h1 className="mt-4 text-3xl font-bold">
              Exam Result
            </h1>

            <p className="mt-2 text-slate-500">
              Review your performance
            </p>

          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-4">

            <ResultCard
              title="Score"
              value={`${result.score ?? 0}/${result.total_marks ?? 0}`}
            />

            <ResultCard
              title="Percentage"
              value={`${percentage.toFixed(1)}%`}
            />

            <ResultCard
              title="Grade"
              value={grade}
            />

            <ResultCard
              title="Status"
              value={passed ? "Passed" : "Needs Review"}
            />

          </div>

          <div className="mt-8 rounded-2xl border p-5">

            <h2 className="font-semibold">
              Exam Summary
            </h2>

            <div className="mt-3 space-y-2 text-sm text-slate-600">

              <p>
                Answered: {answered}
              </p>

              <p>
                Correct: {result.correct_answers ?? 0}
              </p>

              <p>
                Incorrect: {result.incorrect_answers ?? 0}
              </p>

              <p>
                Unanswered: {result.unanswered_questions ?? 0}
              </p>

              <p>
                Objective Score: {result.objective_score ?? 0}
              </p>

              <p>
                Theory Score: {result.theory_score ?? 0}
              </p>

            </div>

          </div>

          {result.ai_summary && (
            <InfoSection
              title="AI Summary"
              items={[result.ai_summary]}
            />
          )}

          {result.strengths?.length ? (
            <InfoSection
              title="Strengths"
              items={result.strengths}
            />
          ) : null}

          {result.weaknesses?.length ? (
            <InfoSection
              title="Areas To Improve"
              items={result.weaknesses}
            />
          ) : null}

          {result.recommendations?.length ? (
            <InfoSection
              title="Recommendations"
              items={result.recommendations}
            />
          ) : null}
          <div className="mt-8 grid gap-3 md:grid-cols-2">

            <button
              onClick={() =>
                router.push(
                  `/exam/${sessionId}/review`
                )
              }
              className="rounded-xl border py-3 font-semibold"
            >
              View Review
            </button>

            <button
              onClick={() =>
                router.push("/dashboard")
              }
              className="rounded-xl bg-blue-600 py-3 font-semibold text-white"
            >
              Dashboard
            </button>

          </div>

        </div>

      </section>

    </main>
  );
}

function ResultCard({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl bg-slate-50 p-4">
      <p className="text-sm text-slate-500">
        {title}
      </p>

      <h3 className="mt-2 text-xl font-bold">
        {value}
      </h3>
    </div>
  );
}

function InfoSection({
  title,
  items,
}: {
  title: string;
  items: string[];
}) {
  return (
    <div className="mt-6 rounded-2xl border p-5">

      <h2 className="mb-3 font-semibold">
        {title}
      </h2>

      <ul className="space-y-2 text-sm text-slate-600">

        {items.map((item, index) => (
          <li
            key={index}
            className="flex gap-2"
          >
            <CheckCircle2
              className="mt-0.5 h-4 w-4"
            />

            {item}
          </li>
        ))}

      </ul>

    </div>
  );
}
