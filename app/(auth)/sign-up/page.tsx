"use client";

import {
  useState,
} from "react";

import Link from "next/link";

import {
  Eye,
  EyeOff,
  Brain,
} from "lucide-react";

import {
  useRouter,
} from "next/navigation";

import {
  registerUser,
} from "@/services/auth";

import {
  useAuth,
} from "@/hooks/useAuth";


export default function SignUpPage() {


  const router = useRouter();

  const {
    setUser,
  } = useAuth();



  const [showPassword, setShowPassword] =
    useState(false);


  const [loading, setLoading] =
    useState(false);


  const [error, setError] =
    useState("");



  const [form, setForm] =
    useState({

      first_name: "",

      last_name: "",

      email: "",

      education_level: "",

      password: "",

    });



  function updateField(
    field: string,
    value: string,
  ) {

    setForm((previous)=>({

      ...previous,

      [field]: value,

    }));

  }



  async function handleSubmit(
    event: React.FormEvent,
  ) {

    event.preventDefault();

    setError("");



    if(form.password.length < 8){

      setError(
        "Password must contain at least 8 characters.",
      );

      return;

    }



    try {

      setLoading(true);


      const response =
        await registerUser(form);



      localStorage.setItem(
        "brainstudy_token",
        response.token.access_token,
      );


      setUser(
        response.user,
      );



      router.push(
        "/dashboard",
      );


} catch (error: any) {

  const detail = error?.response?.data?.detail;

  if (typeof detail === "string") {
    setError(detail);
  } else if (Array.isArray(detail)) {
    setError(detail.map((item: any) => item.msg).join(", "));
  } else if (detail?.msg) {
    setError(detail.msg);
  } else {
    setError("Registration failed. Please try again.");
  }

} finally {

      setLoading(false);

    }

  }



  return (

    <main className="
      flex
      min-h-screen
      items-center
      justify-center
      bg-slate-50
      px-4
    ">


      <div className="
        w-full
        max-w-md
        rounded-3xl
        bg-white
        p-8
        shadow-lg
      ">


        <div className="
          mb-8
          flex
          flex-col
          items-center
        ">

          <div className="
            flex
            h-16
            w-16
            items-center
            justify-center
            rounded-2xl
            bg-blue-600
          ">

            <Brain
              className="
                h-8
                w-8
                text-white
              "
            />

          </div>


          <h1 className="
            mt-4
            text-2xl
            font-bold
            text-slate-900
          ">

            Create your account

          </h1>


          <p className="
            mt-2
            text-sm
            text-slate-500
          ">

            Build your knowledge. Achieve more.

          </p>


        </div>



        {error && (

          <div className="
            mb-4
            rounded-xl
            bg-red-50
            p-3
            text-sm
            text-red-600
          ">

            {error}

          </div>

        )}



        <form
          onSubmit={handleSubmit}
          className="
            space-y-4
          "
        >


          <input

            required

            placeholder="First name"

            value={form.first_name}

            onChange={(e)=>
              updateField(
                "first_name",
                e.target.value,
              )
            }

            className="
              w-full
              rounded-xl
              border
              px-4
              py-3
              outline-none
              focus:border-blue-600
            "

          />



          <input

            required

            placeholder="Last name"

            value={form.last_name}

            onChange={(e)=>
              updateField(
                "last_name",
                e.target.value,
              )
            }

            className="
              w-full
              rounded-xl
              border
              px-4
              py-3
              outline-none
              focus:border-blue-600
            "

          />



          <input

            required

            type="email"

            placeholder="Email address"

            value={form.email}

            onChange={(e)=>
              updateField(
                "email",
                e.target.value,
              )
            }

            className="
              w-full
              rounded-xl
              border
              px-4
              py-3
              outline-none
              focus:border-blue-600
            "

          />



          <input

            required

            placeholder="Education level"

            value={form.education_level}

            onChange={(e)=>
              updateField(
                "education_level",
                e.target.value,
              )
            }

            className="
              w-full
              rounded-xl
              border
              px-4
              py-3
              outline-none
              focus:border-blue-600
            "

          />



          <div className="
            relative
          ">


            <input

              required

              type={
                showPassword
                ? "text"
                : "password"
              }

              placeholder="Password"

              value={form.password}

              onChange={(e)=>
                updateField(
                  "password",
                  e.target.value,
                )
              }

              className="
                w-full
                rounded-xl
                border
                px-4
                py-3
                pr-12
                outline-none
                focus:border-blue-600
              "

            />


            <button

              type="button"

              onClick={()=>
                setShowPassword(
                  !showPassword,
                )
              }

              className="
                absolute
                right-3
                top-3
                text-slate-500
              "

              aria-label="Toggle password visibility"

            >

              {
                showPassword
                ?
                <EyeOff size={20}/>
                :
                <Eye size={20}/>
              }


            </button>


          </div>



          <button

            disabled={loading}

            className="
              w-full
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
              loading
              ?
              "Creating account..."
              :
              "Create Account"
            }


          </button>


        </form>



        <p className="
          mt-6
          text-center
          text-sm
          text-slate-500
        ">

          Already have an account?

          {" "}

          <Link
            href="/login"
            className="
              font-semibold
              text-blue-600
            "
          >

            Login

          </Link>


        </p>



      </div>


    </main>

  );

}
