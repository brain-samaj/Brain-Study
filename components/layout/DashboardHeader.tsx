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

import Sidebar from "./Sidebar";



export default function DashboardHeader(){


  const [
    sidebarOpen,
    setSidebarOpen,
  ] = useState(false);



  async function shareApp(){

    const shareData = {
      title: "Brain Study",
      text: "Explore Brain Study and organize your learning materials.",
      url: window.location.origin,
    };


    try{


      if(
        navigator.share
      ){

        await navigator.share(
          shareData
        );


      }else{


        await navigator.clipboard.writeText(
          window.location.origin
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


      <Sidebar

        open={sidebarOpen}

        close={()=>
          setSidebarOpen(false)
        }

      />



      <header

        className="
        flex
        h-16
        items-center
        justify-between
        border-b
        bg-white
        px-5
        shadow-sm
        "

      >



        {/* Hamburger */}

        <button

          onClick={()=>
            setSidebarOpen(true)
          }

          className="
          rounded-lg
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

          <div

            className="
            flex
            h-9
            w-9
            items-center
            justify-center
            rounded-full
            bg-blue-600
            text-white
            "

          >

            🧠

          </div>


          Brain Study


        </Link>






        {/* Actions */}

        <div

          className="
          flex
          items-center
          gap-3
          "

        >



          {/* Home */}

          <Link

            href="/dashboard"

            className="
            rounded-lg
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
            rounded-lg
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
            rounded-lg
            p-2
            hover:bg-slate-100
            "

          >

            <UserCircle size={24}/>

          </Link>




        </div>



      </header>


    </>

  );

}
