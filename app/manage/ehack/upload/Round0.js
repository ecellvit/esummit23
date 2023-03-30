"use client";

import "../../../../styles/landing.css";

import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function RoundZero({ accessTokenBackend }) {
  const [file, setFile] = useState(null);
  const [warning, setWarning] = useState(null);
  const [upFile, setUpFile] = useState(null);
  const [progress, setProgress] = useState(null);
  const [done, setDone] = useState();
  const [video, setVideo] = useState();
  const [name, setName] = useState();
  const [git, setGit] = useState();
  const [stack, setStack] = useState();
  const [final, setFinal] = useState();

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
          setFinal(true);
          setUpFile(data.fileUrl);
          setName(data.projectName);
          // setStack(data.techStack);
          setVideo(data.youtubeUrl);
          setGit(data.desc);
        }
      });
    //   {message: 'File fetched successfully', desc: 'asdf', fileUrl: 'http://res.cloudinary.com/dz1lxpkck/image/upload/v1678380901/wtr4ok91pafcfx2bpuq1.pdf', fileId: 'wtr4ok91pafcfx2bpuq1'}
  }, []);

  const onProgress = ({ isComputable, value }) => {
    setProgress(Math.floor(value * 100));
  };

  function handleFormSubmit() {
    // let desc = document.getElementById("projDesc");
    let video = document.getElementById("video");
    let name = document.getElementById("name");
    let gith = document.getElementById("github");
    let file = document.getElementById("file");
    // let format = file?.name.split(".")[1];
    console.log(name);

    // if (!file) {
    //   setWarning("Please upload a file");
    // } else if (format !== "ppt" && format !== "pptx" && format !== "pdf") {
    //   setWarning("Please upload only ppts or pdfs");
    if (name.value === "") {
      setWarning("Please Enter Project Name");
    // } else if (video.value === "") {
    //   setWarning("Please Enter Video URL");
    } else if (gith.value === "") {
      setWarning("Please Enter Project Github Organization");
    } else if (file.value === "") {
      setWarning("Please Enter your presentation");
    } else {
      setWarning();
      // send data to cloudinary
      // const formData = new FormData();
      // formData.append("file", file);
      // formData.append(
      //   "upload_preset",
      //   process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
      // );

      // let request = new XMLHttpRequest();
      // request.open("POST", process.env.NEXT_PUBLIC_CLOUDINARY_URL);
      // // upload progress event
      // request.upload.addEventListener("progress", function (e) {
      //   // upload progress as percentage
      //   let percent_completed = Math.floor((e.loaded / e.total) * 100);
      //   setProgress(percent_completed);
      // });
      // // request finished event
      // request.addEventListener("load", function (e) {
      // const data = JSON.parse(request.response);
      fetch(`${process.env.NEXT_PUBLIC_SERVER}/api/ehack/roundOne`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessTokenBackend}`,
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          desc: gith.value,
          fileUrl: file.value,
          fileId: "",
          youtubeUrl: video.value,
          projectName: name.value,
          techStack: [],
        }),
        cache: "no-store",
      })
        .then((resp) => {
          return resp.json();
        })
        .then((data) => {
          if (data.status == "fail") {
            console.log(data.message);
            toast.error(`${data.message}`, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          } else {
            toast.success(`${data.message}`, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            setDone(true);
          }
        });
      // });
      // send POST request to server
      // request.send(formData);
    }
  }

  // function handleDescChange(event) {
  //   let descrip = document.getElementById("projDesc");
  //   fetch(`${process.env.NEXT_PUBLIC_SERVER}/api/ehack/roundOne`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${accessTokenBackend}`,
  //       "Access-Control-Allow-Origin": "*",
  //     },
  //     body: JSON.stringify({
  //       desc: gith.value,
  //       fileUrl: file.value,
  //       fileId: "",
  //       youtubeUrl: video.value,
  //       projectName: name.value,
  //       techStack: [],
  //     }),
  //     cache: "no-store",
  //   })
  //     .then((resp) => resp.json())
  //     .then((data) => console.log(data));
  // }

  console.log(final);
  if (final) {
    return (
      <div className="content-center m-5 px-10 w-3/4">
        <ToastContainer />
        <h1 className="mb-10 text-4xl font-extrabold leading-none tracking-tight md:text-5xl lg:text-6xl text-white">
          Round Zero
        </h1>

        {/* <div className="my-5">
        <label
          htmlFor="message"
          className="block mb-2 text-sm font-medium text-white"
        >
          Describe your project breifly
        </label>
        <textarea
          id="projDesc"
          rows="4"
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300"
          placeholder="Leave a comment..."
        ></textarea>
      </div> */}

        <div id="nameDiv" class="mb-6">
          <label for="nameL" class="block mb-2 text-sm font-medium text-white">
            Name of your Project
          </label>
          <input
            id="name"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
            required
            value={name}
          ></input>
        </div>

        <div id="videoDiv" class="mb-6">
          <label for="videoL" class="block mb-2 text-sm font-medium text-white">
            Link to your Video Presentation (Optional)
          </label>
          <input
            id="video"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
            placeholder="https://www.youtube.com/"
            required
            value={video}
          ></input>
        </div>

        <div id="githubDiv" class="mb-6">
          <label
            for="githubL"
            class="block mb-2 text-sm font-medium text-white"
          >
            Link to the projects GitHub organization (please make one with and
            put all your projects code in it)
          </label>
          <input
            id="github"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
            placeholder="https://github.com/"
            required
            value={git}
          ></input>
        </div>

        <div id="fileDiv" class="mb-6">
          <label for="fileL" class="block mb-2 text-sm font-medium text-white">
            Link to your presentation (Please upload your presentation and
            provide the link)
          </label>
          <input
            id="file"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
            placeholder="https://github.com/"
            required
            value={upFile}
          ></input>
        </div>

        {/* <div id="tech">
        <div class="row col-5">
          <h4 class="fw-bold text-center mt-3"></h4>
          <form class="px-4" action="">
            <p class="fw-bold text-white">Tech Stack <br/> Choose all the technologies you will be implementing</p>
            <div class="form-check">
              <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
              <label class="form-check-label text-white px-2" for="flexCheckDefault">
                Web App
              </label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
              <label class="form-check-label text-white px-2" for="flexCheckDefault">
                Mobile App
              </label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault2" />
              <label class="form-check-label text-white px-2" for="flexCheckDefault2">
                ML/AI
              </label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault3" />
              <label class="form-check-label text-white px-2" for="flexCheckDefault3">
                Web3/Blockchain
              </label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault3" />
              <label class="form-check-label text-white px-2" for="flexCheckDefault3">
                IoT/Hardware
              </label>
            </div>
          </form>
        </div>
      </div> */}

        {/* {upFile && (
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
            htmlFor="message"
            className="block mb-2 text-sm font-medium text-white"
          >
            Upload your presentation. (Not more than 1MB)
          </label>
          <div className="flex items-center justify-center w-full">
            <label
              htmlFor="dropzone-file"
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
      )} */}

        {warning && (
          <div>
            <text className="text-red-600">{warning}</text>
          </div>
        )}

        {/* {progress ? (
        <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700">
          <div
            className="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
            style={{ width: `${progress}%` }}
          >
            {" "}
            {`${progress}%`}
          </div>
        </div>
      ) : ( */}
        <button
          // onClick={handleFormSubmit}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
        >
          Already Submitted
        </button>
        {/* )} */}

        {done && <div className="mb-5 text-green-500">Done!</div>}
      </div>
    );
  } else {
    return (
      <div className="content-center m-5 px-10 w-3/4">
        <ToastContainer />

        <h1 className="mb-10 text-4xl font-extrabold leading-none tracking-tight md:text-5xl lg:text-6xl text-white">
          Round Zero
        </h1>

        {/* <div className="my-5">
            <label
              htmlFor="message"
              className="block mb-2 text-sm font-medium text-white"
            >
              Describe your project breifly
            </label>
            <textarea
              id="projDesc"
              rows="4"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300"
              placeholder="Leave a comment..."
            ></textarea>
          </div> */}

        <div id="nameDiv" class="mb-6">
          <label for="nameL" class="block mb-2 text-sm font-medium text-white">
            Name of your Project
          </label>
          <input
            id="name"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
            required
            placeholder="Enter Your Project Name"
          ></input>
        </div>

        <div id="videoDiv" class="mb-6">
          <label for="videoL" class="block mb-2 text-sm font-medium text-white">
            Link to your Video Presentation
          </label>
          <input
            id="video"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
            placeholder="https://www.youtube.com/"
            required
          ></input>
        </div>

        <div id="githubDiv" class="mb-6">
          <label
            for="githubL"
            class="block mb-2 text-sm font-medium text-white"
          >
            Link to the projects GitHub organization (please make one with and
            put all your projects code in it)
          </label>
          <input
            id="github"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
            placeholder="https://github.com/"
            required
          ></input>
        </div>

        <div id="fileDiv" class="mb-6">
          <label for="fileL" class="block mb-2 text-sm font-medium text-white">
            Link to your presentation (Please upload your presentation and
            provide the link)
          </label>
          <input
            id="file"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
            placeholder="https://github.com/"
            required
          ></input>
        </div>

        {/* <div id="tech">
            <div class="row col-5">
              <h4 class="fw-bold text-center mt-3"></h4>
              <form class="px-4" action="">
                <p class="fw-bold text-white">Tech Stack <br/> Choose all the technologies you will be implementing</p>
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                  <label class="form-check-label text-white px-2" for="flexCheckDefault">
                    Web App
                  </label>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                  <label class="form-check-label text-white px-2" for="flexCheckDefault">
                    Mobile App
                  </label>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault2" />
                  <label class="form-check-label text-white px-2" for="flexCheckDefault2">
                    ML/AI
                  </label>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault3" />
                  <label class="form-check-label text-white px-2" for="flexCheckDefault3">
                    Web3/Blockchain
                  </label>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault3" />
                  <label class="form-check-label text-white px-2" for="flexCheckDefault3">
                    IoT/Hardware
                  </label>
                </div>
              </form>
            </div>
          </div> */}

        {/* {upFile && (
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
                htmlFor="message"
                className="block mb-2 text-sm font-medium text-white"
              >
                Upload your presentation. (Not more than 1MB)
              </label>
              <div className="flex items-center justify-center w-full">
                <label
                  htmlFor="dropzone-file"
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
          )} */}

        {warning && (
          <div>
            <text className="text-red-600">{warning}</text>
          </div>
        )}

        {/* {progress ? (
            <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700">
              <div
                className="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
                style={{ width: `${progress}%` }}
              >
                {" "}
                {`${progress}%`}
              </div>
            </div>
          ) : ( */}
        <button
          onClick={handleFormSubmit}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
        >
          Submit
        </button>
        {/* )} */}

        {done && <div className="mb-5 text-green-500">Done!</div>}
      </div>
    );
  }
}
