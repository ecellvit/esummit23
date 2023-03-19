"use client"

import { InfinitySpin } from "react-loader-spinner";

export default function Testing(){
    return (
        <div class="flex h-full m-auto pt-[40vh]">
            <div class="m-auto">
                <InfinitySpin width="200" color="#FFFFFF" className="justify-center"/>
            </div>
        </div>
    )
}