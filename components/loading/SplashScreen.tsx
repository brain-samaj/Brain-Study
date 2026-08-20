"use client";

import {
  motion,
} from "framer-motion";

import {
  Brain,
} from "lucide-react";

import useAuthRedirect from "@/hooks/useAuthRedirect";


export default function SplashScreen(){


  useAuthRedirect();



  return (

    <main className="
      flex
      min-h-screen
      items-center
      justify-center
      bg-slate-50
    ">


      <div className="
        flex
        flex-col
        items-center
      ">


        <motion.div

          initial={{
            opacity:0,
            scale:0.7,
          }}

          animate={{
            opacity:1,
            scale:1,
          }}

          transition={{
            duration:0.6,
          }}

          className="
            flex
            h-24
            w-24
            items-center
            justify-center
            rounded-3xl
            bg-blue-600
            shadow-xl
          "

        >

          <Brain
            className="
              h-12
              w-12
              text-white
            "
          />

        </motion.div>




        <h1 className="
          mt-8
          text-3xl
          font-bold
          text-slate-900
        ">

          Brain Study

        </h1>



        <p className="
          mt-2
          text-sm
          text-slate-500
        ">

          Build your knowledge. Achieve more.

        </p>




        <div className="
          mt-8
          flex
          gap-2
        ">


          {[1,2,3].map(
            (item)=>(

              <motion.span

                key={item}

                animate={{
                  y:[
                    0,
                    -8,
                    0,
                  ],
                }}

                transition={{
                  duration:1,
                  repeat:Infinity,
                  delay:item * 0.15,
                }}

                className="
                  h-2
                  w-2
                  rounded-full
                  bg-blue-600
                "

              />

            )
          )}


        </div>


      </div>


    </main>

  );

}
