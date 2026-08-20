"use client";

import {
  createContext,
  useEffect,
  useState,
} from "react";

import type { User } from "@/types/auth";


interface AuthContextType {

  user: User | null;

  loading: boolean;

  setUser: (user: User) => void;

  logout: () => void;

}


export const AuthContext =
  createContext<AuthContextType | null>(null);



export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {


  const [user, setUserState] =
    useState<User | null>(null);


  const [loading, setLoading] =
    useState(true);



  useEffect(() => {

    const savedUser =
      localStorage.getItem(
        "brainstudy_user",
      );


    if (savedUser) {

      setUserState(
        JSON.parse(savedUser),
      );

    }


    setLoading(false);

  }, []);



  function setUser(
    newUser: User,
  ) {

    setUserState(newUser);


    localStorage.setItem(
      "brainstudy_user",
      JSON.stringify(newUser),
    );

  }



  function logout() {

    localStorage.removeItem(
      "brainstudy_token",
    );


    localStorage.removeItem(
      "brainstudy_user",
    );


    setUserState(null);

  }



  return (

    <AuthContext.Provider

      value={{
        user,
        loading,
        setUser,
        logout,
      }}

    >

      {children}

    </AuthContext.Provider>

  );

}
