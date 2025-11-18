import React from "react";
import { resumes } from "~/constant/sample_resume";
import { ResumeCard } from "./resumeCard";

export const ResumeDemo = () => {
  return (
    <>
      {resumes.length && (
        <section className="resumes-section">
          {resumes.map((value) => (
            <ResumeCard key={value.id} resume={value}></ResumeCard>
          ))}
        </section>
      )}
    </>
  );
};

export default ResumeDemo;
