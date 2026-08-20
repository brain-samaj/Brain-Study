"use client";

import { useState } from "react";
import {
  UploadCloud,
  FileText,
  Loader2,
  BookOpen,
} from "lucide-react";

import { useRouter } from "next/navigation";
import api from "@/lib/api";

type Mode = "topic" | "files";

export default function CreateStudyKitPage() {
  const router = useRouter();

  const [mode, setMode] = useState<Mode>("topic");

  const [description, setDescription] = useState("");
  const [files, setFiles] = useState<File[]>([]);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  function handleFiles(
    event: React.ChangeEvent<HTMLInputElement>,
  ) {
    const selected = Array.from(
      event.target.files || [],
    );

    setFiles(selected);
  }

async function submit(
  event: React.FormEvent,
) {
  event.preventDefault();

  setMessage("");

  try {
    setLoading(true);

    if (mode === "topic") {
      if (!description.trim()) {
        setMessage("Please describe what you want to study.");
        return;
      }

      const form = new FormData();

form.append("title", description.substring(0, 60));
form.append("description", description);

      const response = await api.post(
        "/study-materials/topic",
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      router.push(
        `/materials/${response.data.id}`,
      );

      return;
    }

    if (files.length === 0) {
      setMessage("Please choose a file.");
      return;
    }

    const file = files[0];

    const form = new FormData();

    form.append(
      "title",
      file.name.replace(/\.[^/.]+$/, ""),
    );

    form.append(
      "description",
      description,
    );

    form.append(
      "file",
      file,
    );

    const response = await api.post(
      "/study-materials/upload",
      form,
      {
        headers: {
          "Content-Type":
            "multipart/form-data",
        },
      },
    );

    router.push(
      `/materials/${response.data.id}`,
    );

  } catch (error: any) {
    setMessage(
      error?.response?.data?.detail ??
      "Something went wrong.",
    );
  } finally {
    setLoading(false);
  }
}


  return (
    <section className="p-6">

      <div className="mx-auto max-w-3xl rounded-3xl bg-white p-8 shadow-sm">

        <div className="flex items-center gap-3">

          <BookOpen
            size={38}
            className="text-blue-600"
          />

          <h1 className="text-3xl font-bold">
            Create Study Kit
          </h1>

        </div>


        <p className="mt-3 text-slate-500">
          Turn your topics and materials into a complete study experience.
        </p>



        <div className="mt-8 grid gap-4 md:grid-cols-2">


          <button
            type="button"
            onClick={() =>
              setMode("topic")
            }
            className={`rounded-2xl border p-5 text-left ${
              mode === "topic"
                ? "border-blue-600 bg-blue-50"
                : "border-slate-200"
            }`}
          >

            <h2 className="font-semibold">
              Describe what you are studying
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Example: "I'm studying Physics and I have an exam on Kinematics."
            </p>

          </button>



          <button
            type="button"
            onClick={() =>
              setMode("files")
            }
            className={`rounded-2xl border p-5 text-left ${
              mode === "files"
                ? "border-blue-600 bg-blue-50"
                : "border-slate-200"
            }`}
          >

            <h2 className="font-semibold">
              Upload study materials
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              PDF, DOCX, PPTX, TXT and handwritten notes.
            </p>

          </button>


        </div>



        <form
          onSubmit={submit}
          className="mt-8 space-y-6"
        >


          {mode === "topic" && (

            <textarea
              className="input min-h-40"
              placeholder="Describe your topic..."
              value={description}
              onChange={(e) =>
                setDescription(
                  e.target.value,
                )
              }
            />

          )}



          {mode === "files" && (

            <label className="flex cursor-pointer flex-col items-center justify-center rounded-3xl border-2 border-dashed p-10 hover:bg-slate-50">

              <UploadCloud size={45} />

              <p className="mt-3 font-medium">
                Choose materials
              </p>

              <p className="text-sm text-slate-500">
                You can upload multiple files
              </p>


              <input
                type="file"
                multiple
                accept=".pdf,.docx,.pptx,.txt,image/*"
                className="hidden"
                onChange={handleFiles}
              />

            </label>

          )}




          {files.length > 0 && (

            <div className="space-y-2">

              {files.map(
                (file) => (

                  <div
                    key={file.name}
                    className="flex items-center gap-3 rounded-xl bg-slate-50 p-3"
                  >

                    <FileText />

                    <span>
                      {file.name}
                    </span>

                  </div>

                ),
              )}

            </div>

          )}




          <button
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 font-semibold text-white disabled:opacity-50"
          >

            {loading ? (
              <>
                <Loader2
                  className="animate-spin"
                />

                Creating...

              </>
            ) : (
              "Create Study Kit"
            )}

          </button>



          {message && (

            <p className="text-center text-sm text-slate-600">
              {message}
            </p>

          )}


        </form>


      </div>

    </section>
  );
}
