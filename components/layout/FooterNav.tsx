"use client";

import Link from "next/link";

import {
  FileText,
  BookOpen,
  Brain,
  Layers,
  ClipboardCheck,
} from "lucide-react";


const navigation = [

  {
    name:"Material",
    href:"/materials",
    icon:FileText,
  },

  {
    name:"Study Guide",
    href:"/study-guide",
    icon:BookOpen,
  },

  {
    name:"Smart Study",
    href:"/smart-study",
    icon:Brain,
  },

  {
    name:"Flashcard",
    href:"/flashcards",
    icon:Layers,
  },

  {
    name:"Exam",
    href:"/exam",
    icon:ClipboardCheck,
  },

];



export default function FooterNav(){


  return (

    <footer className="
      fixed
      bottom-0
      left-0
      right-0
      z-30
      border-t
      bg-white
      px-2
      py-3
    ">


      <nav className="
        flex
        justify-around
      ">


        {
          navigation.map((item)=>{


            const Icon=item.icon;


            return (

              <Link

                key={item.name}

                href={item.href}

                className="
                  flex
                  flex-col
                  items-center
                  gap-1
                  text-xs
                  text-slate-500
                  hover:text-blue-600
                "

              >

                <Icon
                  size={20}
                />


                <span>

                  {item.name}

                </span>


              </Link>

            );


          })
        }


      </nav>


    </footer>

  );

}
