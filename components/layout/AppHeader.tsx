"use client";

import {
  useState,
} from "react";

import Link from "next/link";

import {
  Menu,
  Home,
  UserCircle,
  Share2,
} from "lucide-react";

import AppSidebar from "./AppSidebar";



export default function AppHeader(){


  const [
    open,
    setOpen,
  ] = useState(false);



  async function shareApp(){


    const link = window.location.origin;


    try{


      if(
        navigator.share
      ){

        await navigator.share({

          title: "Brain Study",

          text:
          "Organize your learning materials with Brain Study.",

          url: link,

        });


      }
      else{


        await navigator.clipboard.writeText(
          link
        );


        alert(
          "Link copied successfully."
        );


      }


    }
    catch(error){

      console.error(error);

    }


  }





  return (

    <>


      <header

        className="
          sticky
          top-0
          z-40
          flex
          h-16
          items-center
          justify-between
          border-b
          bg-white
          px-5
        "

      >



        {/* Hamburger */}

        <button

          onClick={() => setOpen(true)}

          className="
            rounded-xl
            p-2
            hover:bg-slate-100
          "

        >

          <Menu size={24}/>

        </button>






        {/* Brain Study Logo */}

        <Link

          href="/dashboard"

          className="
            flex
            items-center
            gap-2
            font-bold
            text-blue-600
          "

        >

          <span

            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-full
              bg-blue-600
              text-white
              text-lg
            "

          >

            🧠

          </span>


          Brain Study


        </Link>






        {/* Right Actions */}

        <div

          className="
            flex
            items-center
            gap-2
          "

        >



          {/* Home */}

          <Link

            href="/dashboard"

            className="
              rounded-xl
              p-2
              hover:bg-slate-100
            "

          >

            <Home size={22}/>

          </Link>






          {/* Share */}

          <button

            onClick={shareApp}

            className="
              rounded-xl
              p-2
              hover:bg-slate-100
            "

          >

            <Share2 size={22}/>

          </button>






          {/* Profile */}

          <Link

            href="/profile"

            className="
              rounded-xl
              p-2
              hover:bg-slate-100
            "

          >

            <UserCircle size={24}/>

          </Link>




        </div>



      </header>





      <AppSidebar

        open={open}

        close={() => setOpen(false)}

      />



    </>

  );

}
