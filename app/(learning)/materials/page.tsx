"use client";


import {
useEffect,
useState,
} from "react";


import Link from "next/link";


import {
FileText,
Trash2,
Brain,
BookOpen,
Search,
} from "lucide-react";


import api from "@/lib/api";



interface Material {


id:string;

title:string;

description?:string;

original_filename:string;

file_extension:string;

created_at:string;


}





export default function MaterialsPage(){


const [
materials,
setMaterials,
]=useState<Material[]>([]);



const [
search,
setSearch,
]=useState("");



const [
loading,
setLoading,
]=useState(true);







useEffect(()=>{


loadMaterials();


},[]);






async function loadMaterials(){


try{


const response =
await api.get(
"/study-materials",
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







async function deleteMaterial(
id:string
){


const confirmed =
confirm(
"Delete this material?"
);



if(!confirmed)
return;



try{


await api.delete(
`/study-materials/${id}`
);



setMaterials(

prev=>

prev.filter(
item=>item.id!==id
)

);


}
catch(error){


console.error(error);


}


}







const filtered =
materials.filter(

item=>

item.title
.toLowerCase()
.includes(
search.toLowerCase()
)

);








return (

<section

className="
p-6
"

>


<div

className="
mb-8
"

>


<h1

className="
text-3xl
font-bold
"

>

Study Materials

</h1>



<p

className="
mt-2
text-slate-500
"

>

Your uploaded learning resources.

</p>


</div>







<div

className="
mb-6
flex
items-center
gap-3
rounded-xl
bg-white
p-4
shadow-sm
"

>


<Search/>


<input

placeholder="Search materials..."

className="
w-full
outline-none
"

value={search}

onChange={
e=>setSearch(
e.target.value
)
}

/>


</div>









{

loading ?

(

<p>

Loading materials...

</p>

)


:

filtered.length===0

?

(

<div

className="
rounded-3xl
bg-white
p-10
text-center
"

>


<FileText

className="
mx-auto
text-slate-400
"

size={45}

/>


<p

className="
mt-3
"

>

No materials uploaded yet.

</p>



</div>

)



:

(

<div

className="
grid
gap-5
md:grid-cols-2
"

>


{

filtered.map(

material=>(


<div

key={material.id}

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
items-start
justify-between
"

>


<div

className="
flex
gap-3
"

>


<FileText

className="
text-blue-600
"

/>


<div>

<h2

className="
font-bold
"

>

{material.title}

</h2>


<p

className="
text-sm
text-slate-500
"

>

{material.original_filename}

</p>


</div>


</div>





<button

onClick={()=>
deleteMaterial(
material.id
)
}

className="
text-red-500
"

>

<Trash2/>

</button>


</div>








<div

className="
mt-6
grid
grid-cols-2
gap-3
"

>



<Link

href={`/smart-study/${material.id}`}

className="
flex
items-center
justify-center
gap-2
rounded-xl
bg-blue-600
p-3
text-sm
text-white
"

>

<Brain size={18}/>

Smart Study

</Link>






<Link

href={`/study-guide/${material.id}`}

className="
flex
items-center
justify-center
gap-2
rounded-xl
border
p-3
text-sm
"

>

<BookOpen size={18}/>

Guide

</Link>



</div>





</div>


)

)


}


</div>


)


}





</section>

);


}
