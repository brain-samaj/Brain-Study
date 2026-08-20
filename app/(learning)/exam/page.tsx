"use client";

import {
  useState,
} from "react";

import {
  useRouter,
  useSearchParams,
} from "next/navigation";

import {
  Clock,
  FileQuestion,
  Loader2,
  Layers,
} from "lucide-react";

import api from "@/lib/api";


type ExamType =
  | "objective"
  | "theory"
  | "mixed";


type Difficulty =
  | "easy"
  | "medium"
  | "hard";


export default function ExamPage() {

  const router = useRouter();

  const searchParams = useSearchParams();


  const materialId =
    searchParams.get("material");



  const [
    examType,
    setExamType,
  ] = useState<ExamType>(
    "mixed"
  );


  const [
    difficulty,
    setDifficulty,
  ] = useState<Difficulty>(
    "medium"
  );


  const [
    questionCount,
    setQuestionCount,
  ] = useState(
    20
  );


  const [
    duration,
    setDuration,
  ] = useState(
    60
  );


  const [
    loading,
    setLoading,
  ] = useState(
    false
  );


  const [
    error,
    setError,
  ] = useState(
    ""
  );


async function createExam(){

  if (!materialId) {

    setError(
      "Study material was not found."
    );

    return;

  }


  try {

    setLoading(true);
    setError("");


    const response =
      await api.post(
        `/exams?material_id=${materialId}`,
       {
         exam_type: examType.toLowerCase(),

         difficulty: difficulty.toLowerCase(),

         question_count: Number(questionCount),

         duration_minutes: Number(duration),
       }
      );


    const sessionId =
      response.data.session_id ??
      response.data.id;


    if (!sessionId) {

      throw new Error(
        "Invalid server response."
      );

    }


    router.push(
      `/exam/${sessionId}`
    );


} catch (error: any) {

  const detail = error?.response?.data?.detail;

  if (Array.isArray(detail)) {
    setError(
      detail.map((e: any) => e.msg).join(", ")
    );
  } else {
    setError(
      detail || "Unable to start exam."
    );
  }

} finally {

    setLoading(false);

  }

}




  return (

    <main className="
      min-h-screen
      px-5
      py-10
    ">

      <section className="
        mx-auto
        max-w-xl
      ">


        <div className="
          rounded-3xl
          border
          bg-white
          p-8
          shadow-sm
        ">


          <div className="
            mb-8
            flex
            items-center
            gap-3
          ">

            <div className="
              rounded-2xl
              bg-blue-50
              p-3
            ">

              <FileQuestion
                className="
                  h-7
                  w-7
                  text-blue-600
                "
              />

            </div>


            <div>

              <h1 className="
                text-2xl
                font-bold
                text-slate-900
              ">
                Exam Settings
              </h1>


              <p className="
                text-sm
                text-slate-500
              ">
                Choose your exam preferences
              </p>

            </div>

          </div>




          <div className="
            space-y-5
          ">


            <div>

              <label className="
                mb-2
                block
                text-sm
                font-medium
              ">
                Exam Type
              </label>


              <select

                value={examType}

                onChange={(e)=>
                  setExamType(
                    e.target.value as ExamType
                  )
                }

                className="
                  w-full
                  rounded-xl
                  border
                  px-4
                  py-3
                  outline-none
                "
              >

                <option value="objective">
                  Objective
                </option>

                <option value="theory">
                  Theory
                </option>

                <option value="mixed">
                  Mixed
                </option>

              </select>

            </div>




            <div>

              <label className="
                mb-2
                block
                text-sm
                font-medium
              ">
                Difficulty
              </label>


              <select

                value={difficulty}

                onChange={(e)=>
                  setDifficulty(
                    e.target.value as Difficulty
                  )
                }

                className="
                  w-full
                  rounded-xl
                  border
                  px-4
                  py-3
                "
              >

                <option value="easy">
                  Easy
                </option>

                <option value="medium">
                  Medium
                </option>

                <option value="hard">
                  Hard
                </option>

              </select>

            </div>





            <div className="
              grid
              grid-cols-2
              gap-4
            ">


              <div>

                <label className="
                  mb-2
                  block
                  text-sm
                  font-medium
                ">
                  Questions
                </label>


                <input

                  type="number"

                  min={1}

                  max={100}

                  value={questionCount}

                  onChange={(e)=>
                    setQuestionCount(
                      Number(
                        e.target.value
                      )
                    )
                  }

                  className="
                    w-full
                    rounded-xl
                    border
                    px-4
                    py-3
                  "
                />

              </div>




              <div>

                <label className="
                  mb-2
                  block
                  text-sm
                  font-medium
                ">
                  Minutes
                </label>


                <input

                  type="number"

                  min={1}

                  max={300}

                  value={duration}

                  onChange={(e)=>
                    setDuration(
                      Number(
                        e.target.value
                      )
                    )
                  }

                  className="
                    w-full
                    rounded-xl
                    border
                    px-4
                    py-3
                  "
                />

              </div>


            </div>





            {error && (

              <div className="
                rounded-xl
                bg-red-50
                p-3
                text-sm
                text-red-600
              ">

                {error}

              </div>

            )}






            <button

              onClick={createExam}

              disabled={loading}

              className="
                flex
                w-full
                items-center
                justify-center
                gap-2
                rounded-xl
                bg-blue-600
                py-3
                font-semibold
                text-white
                transition
                hover:bg-blue-700
                disabled:opacity-50
              "
            >

              {
                loading ? (

                  <Loader2
                    className="
                      h-5
                      w-5
                      animate-spin
                    "
                  />

                ) : (

                  <Layers
                    className="
                      h-5
                      w-5
                    "
                  />

                )
              }


              Start Exam


            </button>


          </div>


        </div>


      </section>


    </main>

  );

}
