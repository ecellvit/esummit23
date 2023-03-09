"use client"

import { useState } from 'react';

export default function RoundOne() {

    const [file, setFile] = useState(null);
    const [warning, setWarning] = useState(null);

    // asdf(file);

    const onProgress = ({ isComputable, value }) => {
        console.log(isComputable, value)
        setProgress(Math.floor(value * 100))
    }

    function handleFormSubmit(){
        let a = document.getElementById("projDesc");
        let format = file.name.split(".")[1]
        if (!file){
            setWarning("Please upload a file")
        } else if (format!=="ppt" && format!=="pptx" && format!=="pdf" ) {
            setWarning("Please upload only ppts or pdfs")
        } else if (a.value===""){
            setWarning("Please fill the Project Description")
        } else {
            // send data to cloudinary
            const formData = new FormData();
            formData.append("file", file)
            formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
            fetch(CLOUDINARY_URL, {
                method: "POST",
                body: formData
            }).then(response => {
                return response.json();
            }).then((data) => {
                console.log(data)
                // data.public_id and data.url
            });
        }
    }

    function fileChange(event) {
        // client.uploadFile(event.target.files[0], { onProgress }).then(f=>setUploadFile(f))
        // send file to cloudinary, get public id and url.
        // send public id and url to backend.

    };

    function onFileChange(event) {
        console.log("file change", event.target.files[0]);
        setFile(event.target.files[0])
    }

    return (
        <div class="content-center m-5 px-10 w-3/4">
            <h1 class="mb-10 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Round 1</h1>

            <div class="my-5">
                <label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Describe your project breifly</label>
                <textarea id="projDesc" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Leave a comment..."></textarea>
            </div>

            {!file && <div class="my-5">
                <label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Upload your presentation. (Not more than 1MB)</label>
                <div class="flex items-center justify-center w-full">
                    <label for="dropzone-file" class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                        <div class="flex flex-col items-center justify-center pt-5 pb-6">
                            <svg aria-hidden="true" class="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                            <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span> or drag and drop</p>
                            <p class="text-xs text-gray-500 dark:text-gray-400">PDF, PPT, or PPTX (MAX. 1MB)</p>
                        </div>
                        <input id="dropzone-file" type="file" class="hidden" onChange={onFileChange} />
                    </label>
                </div>
            </div>}

            {file && <div class="mb-5">{file.name} <button onClick={()=>{setFile(null);console.log("cancel")}}><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M6.2253 4.81108C5.83477 4.42056 5.20161 4.42056 4.81108 4.81108C4.42056 5.20161 4.42056 5.83477 4.81108 6.2253L10.5858 12L4.81114 17.7747C4.42062 18.1652 4.42062 18.7984 4.81114 19.1889C5.20167 19.5794 5.83483 19.5794 6.22535 19.1889L12 13.4142L17.7747 19.1889C18.1652 19.5794 18.7984 19.5794 19.1889 19.1889C19.5794 18.7984 19.5794 18.1652 19.1889 17.7747L13.4142 12L19.189 6.2253C19.5795 5.83477 19.5795 5.20161 19.189 4.81108C18.7985 4.42056 18.1653 4.42056 17.7748 4.81108L12 10.5858L6.2253 4.81108Z"
                    fill="currentColor"
                /></svg>
                </button>
            </div>}

            {warning && <div>
                <text class="text-red-600">{warning}</text>
            </div>}

            <button onClick={handleFormSubmit} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">
                Submit
            </button>

        </div>
    )
}