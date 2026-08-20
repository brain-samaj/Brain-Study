"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
} from "next/navigation";

import Link from "next/link";

import {
  FileText,
  Pencil,
  Upload,
  Trash2,
} from "lucide-react";

import api from "@/lib/api";

import LearningFooter from "@/components/layout/LearningFooter";


interface Material {
    id: string;
    owner_id: string;
    title: string;
    description?: string;

    original_filename: string;
    stored_filename: string;
    storage_path: string;

    file_type: string;
    mime_type: string;
    file_size: number;

    extracted_text: string;
    page_count?: number;
    word_count: number;

    processing_status: string;
    extraction_error?: string;

    is_archived: boolean;

    created_at: string;
    updated_at: string;
}



export default function MaterialPage(){


const params = useParams();

const id = params.id as string;



const [
material,
setMaterial,
] = useState<Material | null>(null);



const [
loading,
setLoading,
] = useState(true);





useEffect(() => {
    if (id) {
        loadMaterial();
    }
}, [id]);






async function loadMaterial(){


try{


const response = await api.get(
`/study-materials/${id}`
);


setMaterial(
response.data
);


}

catch(error){

console.error(error);

}

finally{

setLoading(false);

}


}






if(loading){

return (

<div className="p-6">

Loading material...

</div>

);

}





if(!material){

return (

<div className="p-6">

Material not found.

</div>

);

}





return (

<section

className="
p-6
space-y-8
pb-24
"

>



{/* Material Header */}

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

<FileText
className="text-blue-600"
/>


<h1

className="
text-3xl
font-bold
"

>

{material.title}

</h1>


</div>



<p

className="
mt-3
text-slate-500
"

>

{material.original_filename}

</p>



{

material.description &&

<p

className="
mt-4
text-slate-700
"

>

{material.description}

</p>

}



<div

className="
mt-5
text-sm
text-slate-500
"

>

Added:

{new Date(
material.created_at
).toLocaleDateString()}

</div>



</div>







{/* Management Actions */}


<div

className="
grid
gap-4
md:grid-cols-3
"

>



<Link

href={`/materials/${material.id}/edit`}

className="
rounded-2xl
bg-white
p-5
shadow-sm
transition
hover:shadow-md
"

>


<Pencil
className="text-blue-600"
/>


<h2

className="
mt-3
font-semibold
"

>

Edit Material

</h2>


<p

className="
mt-1
text-sm
text-slate-500
"

>

Update title or description.

</p>


</Link>







<button

className="
rounded-2xl
bg-white
p-5
text-left
shadow-sm
transition
hover:shadow-md
"

>


<Upload
className="text-green-600"
/>


<h2

className="
mt-3
font-semibold
"

>

Add Material

</h2>


<p

className="
mt-1
text-sm
text-slate-500
"

>

Add more content to this material.

</p>


</button>








<button

className="
rounded-2xl
bg-white
p-5
text-left
shadow-sm
transition
hover:shadow-md
"

>


<Trash2
className="text-red-600"
/>


<h2

className="
mt-3
font-semibold
"

>

Delete Material

</h2>


<p

className="
mt-1
text-sm
text-slate-500
"

>

Remove this material.

</p>


</button>





</div>





<LearningFooter materialId={material.id} />


</section>

);


}
