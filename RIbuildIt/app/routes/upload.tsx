import { Header } from "~/components/header";
import type { Route } from "./+types/home";
import Navbar from "~/components/navbar";
import { useEffect, useState, type FormEvent } from "react";
import { useLocation, useNavigate } from "react-router";
import { usePuterStore } from "~/lib/puter";
import FileUploader from "~/components/fileUploader";
import { convertPdfToImage } from "~/lib/pdf2image";
import { generateUUID } from "~/lib/utils";
import { resume } from "react-dom/server";
import { prepareInstructions } from "~/constant/sample_resume";
// export function meta({}: Route.MetaArgs) {
//   return [
//     { title: "RI Build It" },
//     { name: "description", content: "Smart to build and analysis your resume" },
//   ];
// }

export default function Uploader() {
  const {auth, isLoading, fs, ai, kv}=usePuterStore();
  const [isProcessed, setProcessed] = useState(false);
  const [scanStatus, setScanStatus] = useState("");
  const [file,setFile]=useState<File|null>();
  const navigate=useNavigate();
  const handleFileSelect=(file:File|null)=>{
    setFile(file);
  }
  const handleAnalysis=async(companyName:string, jobTitle:string,jobDescription:string,file:File)=>{
    setProcessed(true);

        setScanStatus('Uploading the file...');
        const uploadedFile = await fs.upload([file]);
        if(!uploadedFile) return setScanStatus('Error: Failed to upload file');

        setScanStatus('Converting to image...');
        const imageFile = await convertPdfToImage(file);
        if(!imageFile.file) return setScanStatus('Error: Failed to convert PDF to image');

        setScanStatus('Uploading the image...');
        const uploadedImage = await fs.upload([imageFile.file]);
        if(!uploadedImage) return setScanStatus('Error: Failed to upload image');

        setScanStatus('Preparing data...');
        const uuid = generateUUID();
        const data = {
            id: uuid,
            resumePath: uploadedFile.path,
            imagePath: uploadedImage.path,
            companyName, jobTitle, jobDescription,
            feedback: '',
        }
        await kv.set(`resume:${uuid}`, JSON.stringify(data));

        setScanStatus('Analyzing...');

        const feedback = await ai.feedback(
            uploadedFile.path,
            prepareInstructions({ jobTitle, jobDescription })
        )
        if (!feedback) return setScanStatus('Error: Failed to analyze resume');

        const feedbackText = typeof feedback.message.content === 'string'
            ? feedback.message.content
            : feedback.message.content[0].text;

        data.feedback = JSON.parse(feedbackText);
        await kv.set(`resume:${uuid}`, JSON.stringify(data));
        setScanStatus('Analysis complete, redirecting...');
        console.log(data);
        navigate(`/resume/${uuid}`);
    }

  const handleSubmit=(e:FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    const form:HTMLFormElement|null=e.currentTarget.closest('form');
    if(!form) return;
    const formData=new FormData(form);
    const companyName=formData.get('company') as string;
    const jobTiles=formData.get('job-title') as string;
    const jobDescription=formData.get('job-description') as string;
    if(!file) return;
    handleAnalysis(companyName,jobTiles,jobDescription,file)
  }
  return (
    <main
      className=" bg-[url('images/bg-main-light.svg')] 
     bg-cover bg-center top-0 overflow-y-auto h-full m-0 scroll-smooth"
    >
      <Navbar></Navbar>
      <section className="main-selection w-full">
        <div className="page-heading py-16">
          <h1>Smart feedback for your Job</h1>
          {isProcessed ? (
            <>
              <h2>{scanStatus}</h2>

              <img src="images/resume-scan.gif" alt="" />
            </>
          ) : (
            <h2>Drop your resume for ATS Score and improvement tips</h2>
          )}
        </div>
        {!isProcessed &&(
            <form id="upload-form" onSubmit={handleSubmit} className="flex flex-col gap-4 p-[1rem]">
                <div className="form-div">
                    <label htmlFor="company">Company Name</label>
                    <input type="text" name="company" id="company" placeholder="Company Name" />
                </div>
                 <div className="form-div">
                    <label htmlFor="job-title">Job Title</label>
                    <input type="text" name="job-title" id="job-title" placeholder="Job Title" />
                </div>
                <div className="form-div">
                    <label htmlFor="job-description">Job Description</label>
                    <textarea rows={5} name="job-description" id="job-description" placeholder="Job Description" ></textarea>
                </div>
                <div className="form-div">
                    <label htmlFor="uploader">Upload Resume</label>
                   <FileUploader onFileSelect={handleFileSelect}/>
                </div>
              <div className="flex justify-center w-full">
                  <button className="primary-button flex items-center" type="submit" >
                  Analyze Resume
                </button>
              </div>
            </form>
        )}
      </section>
    </main>
  );
}
