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
  ArrowLeft,
  CheckCircle2,
  Loader2,
  XCircle,
} from "lucide-react";

import api from "@/lib/api";


interface ReviewItem {

  question_id:string;

  question_number:number;

  question:string;

  question_type:string;

  student_answer?:string | null;

  correct_answer?:string | null;

  marks:number;

  obtained_marks:number;

  explanation?:string | null;

}



export default function ExamReviewPage(){


  const params =
    useParams();


  const router =
    useRouter();


  const sessionId =
    params.session_id as string;



  const [
    review,
    setReview,
  ] = useState<ReviewItem[]>([]);



  const [
    loading,
    setLoading,
  ] = useState(true);



  const [
    error,
    setError,
  ] = useState("");





  useEffect(()=>{

    loadReview();

  },[]);





  async function loadReview(){


    try{


      const response =
        await api.get(
          `/exams/${sessionId}/review`
        );


      setReview(
        response.data
        ??
        []
      );


    }catch(error:any){


      setError(
        error?.response?.data?.detail
        ??
        "Unable to load review."
      );


    }finally{


      setLoading(false);


    }


  }






  if(loading){

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

        Loading review...

      </div>

    );

  }







  return (

    <main className="
      min-h-screen
      bg-slate-50
      px-5
      py-8
    ">


      <section className="
        mx-auto
        max-w-4xl
      ">


        <button

          onClick={()=>
            router.back()
          }

          className="
            mb-5
            flex
            items-center
            gap-2
            text-sm
          "

        >

          <ArrowLeft
            className="
              h-4
              w-4
            "
          />

          Back

        </button>





        <div className="
          space-y-5
        ">


        {
          error && (

            <div className="
              rounded-xl
              bg-red-50
              p-4
              text-red-600
            ">

              {error}

            </div>

          )
        }







        {
          review.map(
            (item)=>(

              <article

                key={
                  item.question_id
                }

                className="
                  rounded-3xl
                  bg-white
                  p-6
                  shadow-sm
                "

              >


                <div className="
                  flex
                  justify-between
                ">


                  <h2 className="
                    font-semibold
                  ">

                    Question {
                      item.question_number
                    }

                  </h2>


                  <span className="
                    text-sm
                    text-slate-500
                  ">

                    {
                      item.obtained_marks
                    }
                    /
                    {
                      item.marks
                    }

                  </span>


                </div>





                <p className="
                  mt-4
                ">

                  {
                    item.question
                  }

                </p>







                <div className="
                  mt-5
                  rounded-xl
                  bg-slate-50
                  p-4
                ">


                  <p className="
                    text-sm
                    font-medium
                  ">

                    Your Answer

                  </p>


                  <p className="
                    mt-2
                    text-slate-600
                  ">

                    {
                      item.student_answer
                      ??
                      "No answer"
                    }

                  </p>


                </div>








                {
                  item.correct_answer && (

                    <div className="
                      mt-4
                      rounded-xl
                      bg-green-50
                      p-4
                    ">


                      <p className="
                        flex
                        items-center
                        gap-2
                        text-sm
                        font-medium
                      ">

                        <CheckCircle2
                          className="
                            h-4
                            w-4
                          "
                        />

                        Correct Answer

                      </p>


                      <p className="
                        mt-2
                      ">

                        {
                          item.correct_answer
                        }

                      </p>


                    </div>

                  )
                }







                {
                  item.explanation && (

                    <div className="
                      mt-4
                      rounded-xl
                      border
                      p-4
                    ">

                      <p className="
                        text-sm
                        font-medium
                      ">

                        Explanation

                      </p>


                      <p className="
                        mt-2
                        text-slate-600
                      ">

                        {
                          item.explanation
                        }

                      </p>


                    </div>

                  )
                }



              </article>


            )
          )
        }


        </div>


      </section>


    </main>

  );


}
