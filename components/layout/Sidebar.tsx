"use client";

import Link from "next/link";

import {
  Home,
  PlusCircle,
  FileText,
  User,
  Settings,
  HelpCircle,
  Info,
  ShieldCheck,
  X,
} from "lucide-react";


interface SidebarProps {

  open: boolean;

  close: () => void;

}


const menu = [

  {
    name:"Dashboard",
    href:"/dashboard",
    icon:Home,
  },

  {
    name:"Create Study Kit",
    href:"/create-study-kit",
    icon:PlusCircle,
  },

  {
    name:"Study Material",
    href:"/materials",
    icon:FileText,
  },

  {
    name:"Profile",
    href:"/profile",
    icon:User,
  },

  {
    name:"Settings",
    href:"/settings",
    icon:Settings,
  },

  {
    name:"Help & Support",
    href:"/support",
    icon:HelpCircle,
  },

  {
    name:"About Us",
    href:"/about",
    icon:Info,
  },

  {
    name:"Privacy Policy",
    href:"/privacy",
    icon:ShieldCheck,
  },

];


export default function Sidebar({
  open,
  close,
}:SidebarProps){


  return (

    <>

      {
        open && (

          <div

            onClick={close}

            className="
              fixed
              inset-0
              z-40
              bg-black/30
            "

          />

        )
      }



      <aside

        className={`
          fixed
          left-0
          top-0
          z-50
          h-full
          w-72
          bg-white
          shadow-xl
          transition-transform
          duration-300

          ${
            open
            ?
            "translate-x-0"
            :
            "-translate-x-full"
          }

        `}

      >


        <div className="
          flex
          items-center
          justify-between
          border-b
          p-5
        ">


          <h2 className="
            text-xl
            font-bold
            text-blue-600
          ">

            Brain Study

          </h2>


          <button
            onClick={close}
          >

            <X />

          </button>


        </div>




        <nav className="
          space-y-2
          p-4
        ">


          {
            menu.map((item)=>{


              const Icon=item.icon;


              return (

                <Link

                  key={item.name}

                  href={item.href}

                  onClick={close}

                  className="
                    flex
                    items-center
                    gap-3
                    rounded-xl
                    px-4
                    py-3
                    text-slate-700
                    hover:bg-blue-50
                    hover:text-blue-600
                  "

                >

                  <Icon size={20}/>


                  <span>

                    {item.name}

                  </span>


                </Link>

              );

            })
          }


        </nav>


      </aside>


    </>

  );

}
