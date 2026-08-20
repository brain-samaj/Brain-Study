"use client";

import { motion } from "framer-motion";
import { Brain } from "lucide-react";

export default function SplashScreen() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50">
      <div className="flex flex-col items-center gap-6">

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          transition={{
            duration: 0.6,
            ease: "easeOut",
          }}
          className="flex h-24 w-24 items-center justify-center rounded-3xl bg-blue-600 shadow-lg"
        >
          <Brain
            className="h-12 w-12 text-white"
            strokeWidth={1.8}
          />
        </motion.div>


        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.3,
            duration: 0.5,
          }}
          className="text-center"
        >
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Brain Study
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Smart learning powered by AI
          </p>
        </motion.div>


        <motion.div
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
          }}
          transition={{
            delay: 0.6,
          }}
          className="flex gap-2"
        >
          {[0,1,2].map((item)=>(
            <motion.span
              key={item}
              animate={{
                y:[0,-6,0],
              }}
              transition={{
                duration:1,
                repeat:Infinity,
                delay:item * 0.15,
              }}
              className="h-2 w-2 rounded-full bg-blue-600"
            />
          ))}
        </motion.div>

      </div>
    </main>
  );
}
