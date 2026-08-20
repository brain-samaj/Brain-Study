"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { BookOpen, Loader2, AlertCircle } from "lucide-react";

import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import remarkGfm from "remark-gfm";

import api from "@/lib/api";

export default function StudyGuidePage() {
  const params = useParams();

  const studyMaterialId = params.id as string;

  const [studyGuide, setStudyGuide] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (studyMaterialId) {
      generateStudyGuide();
    }
  }, [studyMaterialId]);

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

      const content =
        data.study_guide ??
        data.content ??
        data.markdown ??
        data.lesson ??
        data.guide ??
        "";

      if (typeof content !== "string" || !content.trim()) {
        throw new Error("The Study Guide response was empty.");
      }

      setStudyGuide(content);
    } catch (error: any) {
      setError(
        error?.response?.data?.detail ??
          error?.message ??
          "Failed to generate Study Guide.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="min-h-screen px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">

        {/* Header */}
        <div className="mb-8 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100">
            <BookOpen className="h-6 w-6 text-blue-600" />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
              Study Guide
            </h1>

            <p className="text-sm text-slate-500">
              Your personalized learning material
            </p>
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex min-h-[300px] items-center justify-center rounded-3xl bg-white shadow-sm">
            <div className="flex flex-col items-center gap-4 text-center">
              <Loader2 className="h-8 w-8 animate-spin text-blue-600" />

              <div>
                <p className="font-semibold text-slate-800">
                  Generating your Study Guide
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  Preparing explanations, formulas and examples...
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="rounded-3xl border border-red-200 bg-red-50 p-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-600" />

              <div>
                <h2 className="font-semibold text-red-800">
                  Unable to generate Study Guide
                </h2>

                <p className="mt-1 text-sm text-red-700">
                  {error}
                </p>

                <button
                  onClick={generateStudyGuide}
                  className="mt-4 rounded-xl bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700"
                >
                  Try Again
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Study Guide */}
        {!loading && !error && studyGuide && (
          <article className="rounded-3xl bg-white px-5 py-7 shadow-sm sm:px-8 sm:py-10 lg:px-10">

            <div className="study-guide-content">
              <ReactMarkdown
                remarkPlugins={[
                  remarkGfm,
                  remarkMath,
                ]}
                rehypePlugins={[
                  rehypeKatex,
                ]}
                components={{
                  h1: ({ children }) => (
                    <h1 className="mb-6 mt-2 border-b border-slate-200 pb-4 text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
                      {children}
                    </h1>
                  ),

                  h2: ({ children }) => (
                    <h2 className="mb-4 mt-10 text-2xl font-bold text-slate-900 sm:text-3xl">
                      {children}
                    </h2>
                  ),

                  h3: ({ children }) => (
                    <h3 className="mb-3 mt-8 text-xl font-bold text-slate-900">
                      {children}
                    </h3>
                  ),

                  h4: ({ children }) => (
                    <h4 className="mb-2 mt-6 text-lg font-bold text-slate-800">
                      {children}
                    </h4>
                  ),

                  p: ({ children }) => (
                    <p className="mb-5 text-[16px] leading-8 text-slate-700">
                      {children}
                    </p>
                  ),

                  ul: ({ children }) => (
                    <ul className="mb-6 ml-6 list-disc space-y-2 text-slate-700">
                      {children}
                    </ul>
                  ),

                  ol: ({ children }) => (
                    <ol className="mb-6 ml-6 list-decimal space-y-3 text-slate-700">
                      {children}
                    </ol>
                  ),

                  li: ({ children }) => (
                    <li className="pl-1 leading-7">
                      {children}
                    </li>
                  ),

                  strong: ({ children }) => (
                    <strong className="font-bold text-slate-900">
                      {children}
                    </strong>
                  ),

                  blockquote: ({ children }) => (
                    <blockquote className="my-6 rounded-r-xl border-l-4 border-blue-500 bg-blue-50 px-5 py-4 text-slate-700">
                      {children}
                    </blockquote>
                  ),

                  hr: () => (
                    <hr className="my-10 border-slate-200" />
                  ),

                  table: ({ children }) => (
                    <div className="my-7 w-full overflow-x-auto rounded-xl border border-slate-200">
                      <table className="w-full min-w-[600px] border-collapse text-left text-sm">
                        {children}
                      </table>
                    </div>
                  ),

                  thead: ({ children }) => (
                    <thead className="bg-slate-100">
                      {children}
                    </thead>
                  ),

                  th: ({ children }) => (
                    <th className="border-b border-slate-200 px-4 py-3 font-bold text-slate-900">
                      {children}
                    </th>
                  ),

                  td: ({ children }) => (
                    <td className="border-b border-slate-100 px-4 py-3 align-top text-slate-700">
                      {children}
                    </td>
                  ),

                  code: ({ children, className }) => {
                    const isInline =
                      !className ||
                      !className.includes("language-");

                    if (isInline) {
                      return (
                        <code className="rounded-md bg-slate-100 px-1.5 py-0.5 font-mono text-sm text-slate-800">
                          {children}
                        </code>
                      );
                    }

                    return (
                      <code className="block overflow-x-auto rounded-xl bg-slate-950 p-5 font-mono text-sm leading-7 text-slate-100">
                        {children}
                      </code>
                    );
                  },

                  pre: ({ children }) => (
                    <pre className="my-6 overflow-x-auto rounded-xl bg-slate-950">
                      {children}
                    </pre>
                  ),

                  a: ({ children, href }) => (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-blue-600 underline underline-offset-2 hover:text-blue-800"
                    >
                      {children}
                    </a>
                  ),

                  img: ({ src, alt }) => (
                    <img
                      src={src}
                      alt={alt ?? ""}
                      className="my-6 max-w-full rounded-xl"
                    />
                  ),
                }}
              >
                {studyGuide}
              </ReactMarkdown>
            </div>

          </article>
        )}

      </div>
    </section>
  );
}
