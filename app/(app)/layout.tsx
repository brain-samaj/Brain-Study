import AppHeader from "@/components/layout/AppHeader";


export default function AppLayout({

children,

}:{

children:React.ReactNode;

}){


return (

<div className="min-h-screen">


<AppHeader/>


<main className="pb-20">

{children}

</main>


</div>

);


}
