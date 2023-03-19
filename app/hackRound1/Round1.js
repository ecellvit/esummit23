"use client";

import { useEffect, useState } from "react";

export default function RoundOne({ accessTokenBackend }) {
  const [file, setFile] = useState(null);
  const [warning, setWarning] = useState(null);
  const [upFile, setUpFile] = useState(null);
  const [progress, setProgress] = useState(null);
  const [desc, setDesc] = useState();
  const [done, setDone] = useState();

  useEffect(() => {
    let descrip = document.getElementById("projDesc");
    descrip.value = desc;
  }, [desc]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_SERVER}/api/ehack/roundOne`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessTokenBackend}`,
        "Access-Control-Allow-Origin": "*",
      },
      cache: "no-store",
    })
      .then((resp) => resp.json())
      .then((data) => {
        if (data.fileUrl) {
          setUpFile(data.fileUrl);
          setDesc(data.desc);
        }
      });
    //   {message: 'File fetched successfully', desc: 'asdf', fileUrl: 'http://res.cloudinary.com/dz1lxpkck/image/upload/v1678380901/wtr4ok91pafcfx2bpuq1.pdf', fileId: 'wtr4ok91pafcfx2bpuq1'}
  }, []);

  const onProgress = ({ isComputable, value }) => {
    setProgress(Math.floor(value * 100));
  };

  function handleFormSubmit() {
    let desc = document.getElementById("projDesc");
    let format = file.name.split(".")[1];
    if (!file) {
      setWarning("Please upload a file");
    } else if (format !== "ppt" && format !== "pptx" && format !== "pdf") {
      setWarning("Please upload only ppts or pdfs");
    } else if (desc.value === "") {
      setWarning("Please fill the Project Description");
    } else {
      setWarning();
      // send data to cloudinary
      const formData = new FormData();
      formData.append("file", file);
      formData.append(
        "upload_preset",
        process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
      );

      let request = new XMLHttpRequest();
      request.open("POST", process.env.NEXT_PUBLIC_CLOUDINARY_URL);
      // upload progress event
      request.upload.addEventListener("progress", function (e) {
        // upload progress as percentage
        let percent_completed = Math.floor((e.loaded / e.total) * 100);
        setProgress(percent_completed);
      });
      // request finished event
      request.addEventListener("load", function (e) {
        const data = JSON.parse(request.response);
        fetch(`${process.env.NEXT_PUBLIC_SERVER}/api/ehack/roundOne`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessTokenBackend}`,
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify({
            desc: desc.value,
            fileUrl: data.url,
            fileId: data.public_id,
          }),
          cache: "no-store",
        })
          .then((resp) => resp.json())
          .then((data) => {
            setDone(true);
          });
      });
      // send POST request to server
      request.send(formData);
    }
  }

  function handleDescChange(event) {
    let descrip = document.getElementById("projDesc");
    fetch(`${process.env.NEXT_PUBLIC_SERVER}/api/ehack/roundOne`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessTokenBackend}`,
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        desc: descrip.value,
        fileUrl: upFile,
        fileId: upFile.split("/")[7],
      }),
      cache: "no-store",
    })
      .then((resp) => resp.json())
      .then((data) => console.log(data));
  }

  return (
    <div className="content-center m-5 px-10 w-3/4">
      <h1 className="mb-10 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
        Round 1
      </h1>

      <div className="my-5">
        <label
          for="message"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Describe your project breifly
        </label>
        <textarea
          id="projDesc"
          rows="4"
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Leave a comment..."
        ></textarea>
      </div>
      {upFile && (
        <button
          onClick={handleDescChange}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
        >
          Save Changes
        </button>
      )}

      {!file && (
        <div className="my-5">
          <label
            for="message"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Upload your presentation. (Not more than 1MB)
          </label>
          <div className="flex items-center justify-center w-full">
            <label
              for="dropzone-file"
              className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  aria-hidden="true"
                  className="w-10 h-10 mb-3 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  ></path>
                </svg>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  PDF, PPT, or PPTX (MAX. 1MB)
                </p>
              </div>
              <input
                id="dropzone-file"
                type="file"
                className="hidden"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </label>
          </div>
        </div>
      )}

      {file && (
        <div className="mb-5">
          {file.name}{" "}
          <button
            onClick={() => {
              setFile(null);
            }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.2253 4.81108C5.83477 4.42056 5.20161 4.42056 4.81108 4.81108C4.42056 5.20161 4.42056 5.83477 4.81108 6.2253L10.5858 12L4.81114 17.7747C4.42062 18.1652 4.42062 18.7984 4.81114 19.1889C5.20167 19.5794 5.83483 19.5794 6.22535 19.1889L12 13.4142L17.7747 19.1889C18.1652 19.5794 18.7984 19.5794 19.1889 19.1889C19.5794 18.7984 19.5794 18.1652 19.1889 17.7747L13.4142 12L19.189 6.2253C19.5795 5.83477 19.5795 5.20161 19.189 4.81108C18.7985 4.42056 18.1653 4.42056 17.7748 4.81108L12 10.5858L6.2253 4.81108Z"
                fill="currentColor"
              />
            </svg>
          </button>
        </div>
      )}

      {upFile && (
        <div className="mb-5">
          {" "}
          Previously Uploaded :{" "}
          <a className="text-blue-500" href={upFile}>
            {upFile.split("/")[7]}
          </a>{" "}
        </div>
      )}

      {warning && (
        <div>
          <text className="text-red-600">{warning}</text>
        </div>
      )}

      {progress ? (
        <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700">
          <div
            className="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
            style={{ width: `${progress}%` }}
          >
            {" "}
            {`${progress}%`}
          </div>
        </div>
      ) : (
        <button
          onClick={handleFormSubmit}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
        >
          Submit
        </button>
      )}

      {done && <div className="mb-5 text-green-500">Done!</div>}
    </div>
  );
}
