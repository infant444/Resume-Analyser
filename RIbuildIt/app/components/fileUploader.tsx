import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { formatSize } from "~/lib/utils";
interface FileUploaderProps {
  onFileSelect?: (file: File | null) => void;
}
const FileUploader = ({ onFileSelect }: FileUploaderProps) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0] || null;
    onFileSelect?.(file);
  }, []);

  const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
    useDropzone({
      onDrop,
      multiple: false,
      accept: { "application/pdf": [".pdf"] },
      maxSize: 20 * 1024 * 1024,
    });
    const file=acceptedFiles[0]||null;
  return (
    <div className="w-full gradient-border">
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <div className="space-y-4 cursor-pointer ">
          
          {file ? (
            <div className="uploader-selected-file" onClick={(e)=>e.stopPropagation()}>
                <div className="flex items-center space-x-3">
                <img src="images/pdf.png" alt="" className="size-10"/>
                <div className="">
                    <p className="text-sm text-gray-700 font-medium truncate max-w-xs">
                    {file.name}
                </p>
                <p className="text-sm text-gray-500">
                    {formatSize(file.size)}
                </p>
                </div>
            </div>
            <button className="p-2 cursor-pointer" onClick={(e)=>{
                onFileSelect?.(null);
            }}>
                <img src="icons/cross.svg" alt="" className="w-4 h-4" />
            </button>
            </div>
          ) : (
            <div className="text-center">
                <div className="mx-auto w-16 h-16 flex justify-center items-center mb-2">
            <img src="icons/info.svg" alt="" className="size-20" />
          </div>
              <p className="text-lg text-gray-500">
                <span className="font-semibold">click to upload</span> or drag
                and drop
              </p>
              <p className="text-lg text-gray-500">pdf max 20mb</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FileUploader;
