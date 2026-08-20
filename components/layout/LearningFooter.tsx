"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

import {
  FileText,
  BookOpen,
  Brain,
  Layers,
 ClipboardCheck,
} from "lucide-react";

export default function LearningFooter() {
  const params = useParams();

  const materialId =
    typeof params?.id === "string"
      ? params.id
      : "";

  const links = [
    {
      name: "Materials",
      href: "/materials",
      icon: FileText,
    },
    {
      name: "Guide",
      href: materialId
        ? `/study-guide/${materialId}`
        : "/materials",
      icon: BookOpen,
    },
    {
      name: "Smart",
      href: materialId
        ? `/smart-study/${materialId}`
        : "/materials",
      icon: Brain,
    },
    {
      name: "Cards",
      href: materialId
        ? `/flashcards/${materialId}`
        : "/materials",
      icon: Layers,
    },
    {
      name: "Exam",
      href: materialId
        ? `/exam?material=${materialId}`
        : "/materials",
      icon: ClipboardCheck,
    },
  ];

  return (
    <footer
      className="
fixed
bottom-0
left-0
right-0
z-50
border-t
border-slate-200
bg-white/95
backdrop-blur
"
    >
      <div
        className="
mx-auto
flex
max-w-6xl
items-center
justify-around
px-2
py-2
"
      >
        {links.map((link) => {
          const Icon = link.icon;

          return (
            <Link
              key={link.name}
              href={link.href}
              className="
flex
flex-col
items-center
justify-center
gap-1
rounded-xl
px-3
py-2
text-slate-600
transition-all
hover:bg-blue-50
hover:text-blue-600
"
            >
              <Icon className="h-5 w-5" />

              <span
                className="
text-[11px]
font-medium
"
              >
                {link.name}
              </span>
            </Link>
          );
        })}
      </div>
    </footer>
  );
}
