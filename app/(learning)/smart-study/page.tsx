"use client";


import {
useEffect,
useState,
} from "react";


import {
Brain,
Loader2,
Send,
} from "lucide-react";


import api from "@/lib/api";




interface Material {

id:string;

title:string;

}




interface SmartQuestion {

question?:string;

topic?:string;

difficulty?:string;

}




export default function SmartStudyPage(){



const [materials,setMaterials]=useState<Material[]>([]);


const [selected,setSelected]=useState("");



const [session,setSession]=useState<SmartQuestion|null>(null);


const [answer,setAnswer]=useState("");



const [loading,setLoading]=useState(false);



const [progress,setProgress]=useState<any>(null);






useEffect(()=>{

loadMaterials();

},[]);







async function loadMaterials(){


try{


const response =
await api.get(
"/study-materials"
);



setMaterials(
response.data.items ?? []
);



}

catch(error){

console.error(error);

}


}









async function startStudy(){


if(!selected)
return;


try{


setLoading(true);



const response =
await api.post(

`/smart-study/${selected}/start`

);



setSession(
response.data
);



loadProgress();


}

catch(error){

console.error(error);

}

finally{


setLoading(false);


}


}










async function submitAnswer(){
  if(!session)
    return;

  console.log("Smart Study backend is not implemented yet.", {
    session,
    answer,
  });

  alert("Smart Study is coming soon. The backend is not implemented yet.");

  setAnswer("");
}

async function loadProgress(){


if(!selected)
return;



try{


const response =
await api.get(

`/smart-study/dashboard/${selected}`

);



setProgress(
response.data
);


}

catch(error){

console.error(error);

}


}









return (

<div

className="
mx-auto
max-w-5xl
p-6
"

>



<div

className="
mb-8
flex
items-center
gap-3
"

>


<Brain

className="
text-blue-600
"

size={35}

/>


<div>


<h1

className="
text-3xl
font-bold
"

>

Smart Study

</h1>


<p className="text-slate-500">

Your adaptive AI tutor

</p>


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


<h2 className="mb-3 font-semibold">

Choose Study Material

</h2>



<select

value={selected}

onChange={
e=>setSelected(e.target.value)
}

className="
w-full
rounded-xl
border
p-3
"

>


<option value="">

Select material

</option>



{

materials.map(
(material)=>(

<option

key={material.id}

value={material.id}

>

{material.title}

</option>

)

)

}



</select>






<button

onClick={startStudy}

disabled={loading}

className="
mt-4
flex
w-full
items-center
justify-center
gap-2
rounded-xl
bg-blue-600
py-3
font-semibold
text-white
"

>


{

loading ?

<Loader2 className="animate-spin"/>

:

<>

<Brain/>

Start Smart Study

</>

}


</button>


</div>









{

session &&


<div

className="
mt-6
rounded-3xl
bg-white
p-6
shadow-sm
"

>


<p className="mb-2 text-sm text-slate-500">

Topic:

{session.topic}

</p>


<h2 className="text-xl font-semibold">

{session.question}

</h2>





<textarea

className="
mt-5
min-h-40
w-full
rounded-xl
border
p-4
"

placeholder="Explain your answer..."

value={answer}

onChange={
e=>setAnswer(e.target.value)
}


/>





<button

onClick={submitAnswer}

disabled={loading}

className="
mt-4
flex
items-center
justify-center
gap-2
rounded-xl
bg-green-600
px-6
py-3
font-semibold
text-white
"

>


<Send size={18}/>

Submit Answer


</button>



</div>


}









{

progress &&


<div

className="
mt-6
rounded-3xl
bg-white
p-6
shadow-sm
"

>


<h2 className="mb-4 text-xl font-bold">

Learning Progress

</h2>



<pre

className="
overflow-auto
rounded-xl
bg-slate-100
p-4
text-sm
"

>

{
JSON.stringify(
progress,
null,
2
)

}

</pre>


</div>


}




</div>


);


}
