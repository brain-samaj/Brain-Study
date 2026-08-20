"use client";


import {
  useEffect,
} from "react";


import {
  useRouter,
} from "next/navigation";


import {
  Brain,
} from "lucide-react";



export default function Home(){


const router = useRouter();




useEffect(()=>{


const timer = setTimeout(()=>{


router.push("/sign-up");


},3000);



return ()=>clearTimeout(timer);


},[router]);





return (

<main
className="
flex
min-h-screen
items-center
justify-center
bg-gradient-to-br
from-blue-600
via-indigo-600
to-purple-700
"
>


<div
className="
text-center
text-white
"
>



<div
className="
mx-auto
flex
h-24
w-24
items-center
justify-center
rounded-3xl
bg-white/20
backdrop-blur
animate-pulse
"
>

<Brain

size={55}

/>

</div>





<h1
className="
mt-8
text-5xl
font-bold
tracking-tight
"
>

Brain Study

</h1>




<p
className="
mt-4
text-lg
text-white/80
"
>

Intelligent learning platform for students

</p>





<div
className="
mt-10
flex
justify-center
gap-2
"
>


<span
className="
h-3
w-3
rounded-full
bg-white
animate-bounce
"
/>


<span
className="
h-3
w-3
rounded-full
bg-white
animate-bounce
[animation-delay:150ms]
"
/>


<span
className="
h-3
w-3
rounded-full
bg-white
animate-bounce
[animation-delay:300ms]
"
/>


</div>




</div>


</main>

);


}
