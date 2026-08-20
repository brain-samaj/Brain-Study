"use client";

import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeRaw from "rehype-raw";

import "katex/dist/katex.min.css";

interface Props {
  content: string;
}

export default function MathRenderer({
  content,
}: Props) {
  return (
    <div className="prose prose-slate max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkMath]}
        rehypePlugins={[
          rehypeRaw,
          rehypeKatex,
        ]}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}

