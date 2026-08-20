"use client";


import Link from "next/link";

import {
  X,
  Home,
  Plus,
  BookOpen,
  User,
  Settings,
  HelpCircle,
  Info,
  Shield,
} from "lucide-react";



export default function AppSidebar({

open,

close,

}:{

open:boolean;

close:()=>void;

}){


if(!open){

return null;

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
icon:Plus,
},


{
name:"Study Material",
href:"/materials",
icon:BookOpen,
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
href:"/help",
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
icon:Shield,
},

];




return (

<div
className="
fixed
inset-0
z-50
bg-black/30
"
>


<aside
className="
h-full
w-72
bg-white
p-5
shadow-xl
"
>


<div
className="
mb-6
flex
justify-between
"
>

<h2
className="
text-xl
font-bold
"
>

Brain Study

</h2>


<button
onClick={close}
>

<X/>

</button>


</div>




<nav className="space-y-2">

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
p-3
hover:bg-slate-100
"

>

<Icon size={20}/>

{item.name}


</Link>

)

})

}


</nav>


</aside>


</div>

);


}
