import { Link } from "react-router";
import type { Resume } from "~/model/resume.model";
import ScoreCircle from "./scoreCircle";
import { useState, useEffect } from "react";
import type { resumes } from "~/constant/sample_resume";
import { usePuterStore } from "~/lib/puter";

export const ResumeCard = ({ resume }: { resume: Resume }) => {
    const {fs}=usePuterStore();
    const [resumeUrl,setResumeUrl]=useState("");
    useEffect(() => {
      const loadResume = async () => {
          const blob: Blob | undefined = await fs.read(resume.imagePath);
          if (!blob)return; 
            const url = URL.createObjectURL(blob);
            setResumeUrl(url);
          
      };
      loadResume();
    },[resume.imagePath])
  return (
    <Link
      to={`/resume/${resume.id}`}
      className="resume-card animate-in fade-in duration-1000"
    >
      <div className="flex justify-between">
        <div className="flex flex-col gap-2">
          {resume.jobTitle&& <h2 className="text-black font-bold wrap-sbreak-words">
            {resume.jobTitle}
          </h2>}
         {resume.companyName && <h3 className="text-lg wrap-break-word text-gray-500">
            {resume.companyName}
          </h3>
          }
          {!resume.companyName && !resume.jobTitle && <h2>Resume</h2>}
        </div>
        <div className="flex shrink-0">
            <ScoreCircle score={resume.feedback.overallScore}></ScoreCircle>
        </div>
      </div>
      <div className="gradient-border animate-in fade-in duration-1000">
        <div className="w-full h-full">
            <img src={resumeUrl} alt="resume" className="w-full h-[350px] max-sm:h-[200px] object-cover object-top" />
        </div>
         
      </div>
    </Link>
  );
};
