import { Header } from "~/components/header";
import type { Route } from "./+types/home";
import Navbar from "~/components/navbar";
import ResumeDemo from "~/components/resumeDemo";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { usePuterStore } from "~/lib/puter";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "RI Score" },
    { name: "description", content: "Smart to build and analysis your resume" },
  ];
}
//  dark:bg-[url('images/bg-main.svg')]

export default function Home() {
   const {  auth } = usePuterStore();;
  const navigate=useNavigate();
  useEffect(()=>{
    if(!auth.isAuthenticated){
      navigate('/auth?next=/');
    }
  },[auth.isAuthenticated])
  return (
   <main
      className=" bg-[url('images/bg-main-light.svg')] 
     bg-cover bg-center top-0 overflow-y-auto h-full m-0 scroll-smooth"
    >
      <section className="main-selection w-full">
        <Navbar></Navbar>
        <Header></Header>
      </section>
      <ResumeDemo></ResumeDemo>
    </main>
  );
}
