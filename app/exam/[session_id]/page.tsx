"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  useParams,
  useRouter,
} from "next/navigation";

import {
  ChevronLeft,
  ChevronRight,
  Clock,
  Loader2,
  Send,
} from "lucide-react";

import api from "@/lib/api";
import MathRenderer from "@/components/ui/MathRenderer";

interface ExamQuestion {

  id: string;

  question_number: number;

  question_type: string;

  question: string;

options?: string[] | null;

  marks: number;

}



interface ExamSession {

  id: string;

  title?: string;

  duration_minutes?: number;

  expires_at?: string | null;

  status?: string;

  total_questions?: number;

}



export default function ExamRoom() {


  const params = useParams();

  const router = useRouter();


  const sessionId =
    params.session_id as string;



  const [
    session,
    setSession,
  ] = useState<ExamSession | null>(null);



  const [
    questions,
    setQuestions,
  ] = useState<ExamQuestion[]>([]);



  const [
    currentIndex,
    setCurrentIndex,
  ] = useState(0);



  const [
    answers,
    setAnswers,
  ] = useState<Record<string,string>>({});



  const [
    loading,
    setLoading,
  ] = useState(true);



  const [
    submitting,
    setSubmitting,
  ] = useState(false);



  const [
    saving,
    setSaving,
  ] = useState(false);



  const [
    remainingSeconds,
    setRemainingSeconds,
  ] = useState<number | null>(null);



  const [
    error,
    setError,
  ] = useState("");





  const currentQuestion =
    questions[currentIndex];



  const progress =
    useMemo(() => {

      if (!questions.length) {
        return 0;
      }

      return (
        ((currentIndex + 1)
        /
        questions.length)
        * 100
      );

    },[
      currentIndex,
      questions.length,
    ]);





  useEffect(() => {

    loadExam();

  }, []);





  useEffect(() => {

    if (
      remainingSeconds === null ||
      remainingSeconds <= 0
    ) {
      return;
    }


    const timer =
      setInterval(() => {

        setRemainingSeconds(
          previous =>
            previous !== null
            ? previous - 1
            : null
        );

      },1000);



    return () =>
      clearInterval(timer);


  },[
    remainingSeconds,
  ]);







  async function loadExam() {


    try {


      const response =
        await api.get(
          `/exams/${sessionId}`
        );



      setSession(response.data);

      setQuestions(response.data.questions ?? []);



if (
  typeof response.data.remaining_seconds === "number"
) {

  setRemainingSeconds(
    response.data.remaining_seconds
  );

}
else if (
  response.data.expires_at
) {

  const expires = new Date(
    response.data.expires_at
  ).getTime();

  const now = Date.now();

  setRemainingSeconds(
    Math.max(
      0,
      Math.floor(
        (expires - now) / 1000
      )
    )
  );

}
else if (
  response.data.duration_minutes
) {

  setRemainingSeconds(
    response.data.duration_minutes
    * 60
  );

}



    } catch (err:any) {


      setError(
        err?.response?.data?.detail
        ??
        "Unable to load exam."
      );


    } finally {


      setLoading(false);


    }


  }







  async function saveAnswer(
    question: ExamQuestion,
    value: string
  ) {


    setAnswers(
      previous => ({
        ...previous,
        [question.id]: value,
      })
    );



    try {


      setSaving(true);



      if (
        question.question_type === "objective"
      ) {


        await api.post(
          `/exams/${sessionId}/answers/${question.id}/objective`,
          {
            selected_option:value,
          }
        );


      }
      else {


        await api.post(
          `/exams/${sessionId}/answers/${question.id}/theory`,
          {
            text_answer:value,
          }
        );


      }



    } catch(error) {


      console.error(error);


    } finally {


      setSaving(false);


    }


  }








  async function submitExam() {


    try {


      setSubmitting(true);



      await api.post(
        `/exams/${sessionId}/submit`
      );



      router.push(
        `/exam/${sessionId}/result`
      );



    } catch(error:any) {


      setError(
        error?.response?.data?.detail
        ??
        "Unable to submit exam."
      );


    } finally {


      setSubmitting(false);


    }


  }








  function formatTime(
    seconds:number
  ) {


    const minutes =
      Math.floor(seconds / 60);



    const secondsLeft =
      seconds % 60;



    return `${minutes}:${String(
      secondsLeft
    ).padStart(2,"0")}`;


  }







  if (loading) {


    return (

      <div className="
        flex
        min-h-screen
        items-center
        justify-center
        gap-3
      ">

        <Loader2
          className="
            animate-spin
          "
        />

        Loading exam...

      </div>

    );


  }







  if (error) {


    return (

      <div className="
        mx-auto
        max-w-xl
        p-6
        text-red-600
      ">

        {error}

      </div>

    );


  }








  return (


    <main className="
      min-h-screen
      bg-slate-50
      px-4
      py-6
    ">


      <section className="
        mx-auto
        max-w-4xl
      ">



        <header className="
          mb-6
          rounded-2xl
          bg-white
          p-5
          shadow-sm
        ">


          <div className="
            flex
            items-center
            justify-between
          ">


            <div>

              <h1 className="
                text-xl
                font-bold
              ">

                {session?.title ?? "Exam"}

              </h1>


              <p className="
                text-sm
                text-slate-500
              ">

                Question {currentIndex + 1}
                {" "}
                of
                {" "}
                {questions.length}

              </p>


            </div>



            <div className="
              flex
              items-center
              gap-2
              rounded-xl
              bg-slate-100
              px-4
              py-2
            ">

              <Clock
                className="
                  h-5
                  w-5
                "
              />


{
  remainingSeconds !== null
    ? formatTime(
        remainingSeconds
      )
    : "--:--"
}


            </div>


          </div>




          <div className="
            mt-4
            h-2
            overflow-hidden
            rounded-full
            bg-slate-200
          ">

            <div
              className="
                h-full
                bg-blue-600
              "
              style={{
                width:`${progress}%`
              }}
            />


          </div>


        </header>







        {
          currentQuestion && (

            <article className="
              rounded-3xl
              bg-white
              p-6
              shadow-sm
            ">



              <div className="
                mb-5
                flex
                justify-between
              ">

                <span className="
                  font-semibold
                ">

                  Question {
                    currentQuestion.question_number
                  }

                </span>


                <span className="
                  text-sm
                  text-slate-500
                ">

                  {currentQuestion.marks}
                  {" "}
                  marks

                </span>


              </div>




               <div
                 className="
                  mb-6
                   text-lg
                  leading-relaxed
                 "
                >
               <MathRenderer
                content={currentQuestion.question}
               />
              </div>





              {
                currentQuestion.question_type === "objective"
                &&
                currentQuestion.options
                &&
                (

                  <div className="
                    space-y-3
                  ">


{
  currentQuestion.options?.map((value, index) => {
    const letters = ["A", "B", "C", "D", "E", "F"];
    const key = letters[index];

    return (
      <label
        key={key}
        className="
          flex
          cursor-pointer
          gap-3
          rounded-xl
          border
          p-4
        "
      >
        <input
          type="radio"
          checked={
            answers[currentQuestion.id] === key
          }
          onChange={() =>
            saveAnswer(
              currentQuestion,
              key
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
  })
}


                  </div>

                )
              }








              {
                currentQuestion.question_type === "theory"
                &&
                (

                  <textarea

                    value={
                      answers[currentQuestion.id]
                      ??
                      ""
                    }

                    onChange={(event)=>
                      saveAnswer(
                        currentQuestion,
                        event.target.value
                      )
                    }

                    placeholder="
                      Write your answer...
                    "

                    className="
                      min-h-48
                      w-full
                      rounded-xl
                      border
                      p-4
                      outline-none
                    "

                  />

                )
              }




              <div className="
                mt-6
                flex
                items-center
                justify-between
              ">


                <button

                  disabled={
                    currentIndex === 0
                  }

                  onClick={() =>
                    setCurrentIndex(
                      value =>
                      value - 1
                    )
                  }

                  className="
                    flex
                    items-center
                    gap-2
                    rounded-xl
                    border
                    px-4
                    py-2
                  "

                >

                  <ChevronLeft/>

                  Previous

                </button>





                {
                  currentIndex
                  <
                  questions.length - 1

                  ?

                  (

                  <button

                    onClick={() =>
                      setCurrentIndex(
                        value =>
                        value + 1
                      )
                    }

                    className="
                      flex
                      items-center
                      gap-2
                      rounded-xl
                      bg-blue-600
                      px-4
                      py-2
                      text-white
                    "

                  >

                    Next

                    <ChevronRight/>

                  </button>

                  )

                  :

                  (

                  <button

                    onClick={submitExam}

                    disabled={submitting}

                    className="
                      flex
                      items-center
                      gap-2
                      rounded-xl
                      bg-blue-600
                      px-5
                      py-2
                      text-white
                    "

                  >

                    {
                      submitting
                      ?

                      <Loader2 className="
                        animate-spin
                      "/>

                      :

                      <Send/>

                    }

                    Submit

                  </button>

                  )

                }


              </div>




              {
                saving
                &&
                (

                  <p className="
                    mt-4
                    text-sm
                    text-slate-500
                  ">

                    Saving...

                  </p>

                )
              }



            </article>

          )
        }



      </section>


    </main>


  );


}
