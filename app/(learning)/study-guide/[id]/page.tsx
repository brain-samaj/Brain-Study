"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { BookOpen, Loader2 } from "lucide-react";

import api from "@/lib/api";

export default function StudyGuidePage() {
  const params = useParams();

  const studyMaterialId = params.id as string;

  const [studyGuide, setStudyGuide] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    generateStudyGuide();
  }, []);

  async function generateStudyGuide() {
    try {
      setLoading(true);
      setError("");

      const response = await api.post(
        "/study-guide/generate",
        {
          study_material_id: studyMaterialId,
        },
      );

      const data = response.data;

      setStudyGuide(
        data.study_guide ??
        data.content ??
        data.markdown ??
        data.lesson ??
        data.guide ??
        "",
      );
    } catch (error: any) {
      setError(
        error?.response?.data?.detail ??
          "Failed to generate Study Guide.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="p-6">
      <div className="mx-auto max-w-5xl">

        <div className="flex items-center gap-3">
          <BookOpen className="text-blue-600" />

          <h1 className="text-3xl font-bold">
            Study Guide
          </h1>
        </div>

        {loading && (
          <div className="mt-10 flex items-center gap-3">
            <Loader2 className="animate-spin" />
            <span>Generating your personal study guide...</span>
          </div>
        )}

        {error && (
          <div className="mt-10 rounded-2xl border border-red-200 bg-red-50 p-4 text-red-700">
            {error}
          </div>
        )}

        {!loading && !error && (
          <article
            className="
              prose
              prose-slate
              mt-8
              max-w-none
              rounded-3xl
              bg-white
              p-8
              shadow-sm
              whitespace-pre-wrap
            "
          >
            {studyGuide}
          </article>
        )}

      </div>
    </section>
  );
}
