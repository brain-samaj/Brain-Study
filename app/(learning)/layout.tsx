import AppHeader from "@/components/layout/AppHeader";

import LearningFooter from "@/components/layout/LearningFooter";


export default function LearningLayout({

children,

}:{

children:React.ReactNode;

}){


return (

<div className="min-h-screen">


<AppHeader/>


<main className="pb-24">

{children}

</main>



<LearningFooter/>


</div>

);


}
