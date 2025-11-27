import React, { useEffect, useState } from "react";
import { ResumeCard } from "./resumeCard";
import { usePuterStore } from "~/lib/puter";
import type { Resume } from "~/model/resume.model";
import { Link } from "react-router";

export const ResumeDemo = () => {
const {kv} =usePuterStore();
const [resume,setResume]=useState<Resume[]>([]);
const [loadingResume,setLoadingResume]=useState(false);

useEffect(()=>{
  const loadResume=async()=>{
    setLoadingResume(true);
    const resume= (await kv.list('resume:*',true))as KVItem[];
    const parsedResumes=resume?.map((resume)=>(
      JSON.parse(resume.value) as Resume
    ));
    setResume(parsedResumes||[]);
    setLoadingResume(false)

  }
  loadResume();
},[])
  return (
    <>
      {resume.length && (
        <section className="resumes-section">
          {resume.map((value) => (
            <ResumeCard key={value.id} resume={value}></ResumeCard>
          ))}
        </section>
      )}
      { loadingResume &&(
        <section className="resumes-section flex flex-col justify-center items-center ">
          <img src="/images/resume-scan-2.gif" alt="" />
        </section>
      )}
      {!loadingResume && resume.length==0 &&(
        <div className="flex flex-col items-center justify-center mt-10 gap-4">
          <Link to="/upload" className="primary-button w-fit text-xl font-semibold"></Link>
        </div>
      )}
    </>
  );
};

export default ResumeDemo;
