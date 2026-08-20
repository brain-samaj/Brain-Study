"use client";

import {
  useEffect,
} from "react";

import {
  useRouter,
} from "next/navigation";

import {
  useAuth,
} from "@/hooks/useAuth";


export default function useAuthRedirect() {


  const router = useRouter();


  const {
    user,
    loading,
  } = useAuth();



  useEffect(()=>{


    if(loading){

      return;

    }



    if(user){

      router.replace(
        "/dashboard",
      );

    }
    else{

      router.replace(
        "/sign-up",
      );

    }


  },[
    user,
    loading,
    router,
  ]);

}
