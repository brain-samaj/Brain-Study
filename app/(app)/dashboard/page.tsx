"use client";

import {
  useEffect,
  useState,
} from "react";

import Link from "next/link";

import {
  Plus,
  Search,
  FileText,
  Upload,
  BookOpen,
} from "lucide-react";

import api from "@/lib/api";


interface Material {

  id: string;

  title: string;

  description?: string;

  original_filename: string;

  created_at: string;

}



export default function DashboardPage(){


const [
  materials,
  setMaterials,
]=useState<Material[]>([]);



const [
  loading,
  setLoading,
]=useState(true);



const [
  search,
  setSearch,
]=useState("");



useEffect(()=>{

  loadMaterials();

},[]);





async function loadMaterials(){


try{


const response = await api.get(
    "/study-materials/",
);



setMaterials(

  response.data.items
  ??
  []

);



}
catch(error){


console.error(error);


}
finally{


setLoading(false);


}


}






const filtered =
materials.filter(
(material)=>

material.title
.toLowerCase()
.includes(
search.toLowerCase()
)

);





return (

<section

className="
p-6
space-y-8
"

>



<div>

<h1

className="
text-3xl
font-bold
"

>

Dashboard

</h1>



<p

className="
mt-2
text-slate-500
"

>

Manage your study materials, track your progress, and grow your knowledge.

</p>


</div>






<div

className="
grid
gap-5
md:grid-cols-2
"

>




<Link

href="/create-study-kit"

className="
rounded-3xl
bg-blue-600
p-6
text-white
shadow
hover:scale-[1.02]
transition
"

>


<div

className="
flex
items-center
gap-3
"

>

<Plus/>


<h2

className="
text-xl
font-bold
"

>

Create Study Kit

</h2>


</div>



<p

className="
mt-3
text-white/80
"

>

Add your study materials and organize your learning in one place.

</p>


</Link>







<div

className="
rounded-3xl
bg-white
p-6
shadow-sm
"

>


<div

className="
flex
items-center
gap-3
"

>


<Search/>


<h2

className="
font-bold
"

>

Search Space

</h2>


</div>




<input


placeholder="Search materials..."

value={search}

onChange={
e=>setSearch(
e.target.value
)
}


className="
mt-4
w-full
rounded-xl
border
p-3
"


/>


</div>





</div>








<div

className="
rounded-3xl
bg-white
p-6
shadow-sm
"

>


<div

className="
mb-5
flex
items-center
justify-between
"

>


<h2

className="
flex
items-center
gap-2
text-xl
font-bold
"

>


<BookOpen/>


Study Materials


</h2>


</div>







{

loading

?

(

<p className="text-slate-500">

Loading materials...

</p>

)

:

filtered.length===0

?

(

<div

className="
rounded-2xl
bg-slate-50
p-8
text-center
"

>


<Upload

className="
mx-auto
mb-3
text-slate-400
"

/>



<p>

No study materials yet.

</p>




<Link

href="/create-study-kit"

className="
mt-4
inline-block
text-blue-600
"

>

Upload your first material

</Link>



</div>

)


:


(

<div

className="
space-y-3
"

>


{

filtered.map(
(material)=>(


<Link

key={material.id}

href={`/materials/${material.id}`}

className="
flex
items-center
gap-4
rounded-2xl
border
p-4
hover:bg-slate-50
transition
cursor-pointer
"

>


<FileText/>


<div>


<h3

className="
font-semibold
"

>

{material.title}

</h3>


<p

className="
text-sm
text-slate-500
"

>

{material.original_filename}

</p>


</div>



</Link>


)

)

}



</div>

)


}



</div>





</section>

);


}

