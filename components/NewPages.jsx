"use client"

import "../styles/landing.css";
import { useRouter } from "next/navigation";

export default function NewPages(){

    const router = useRouter()

    return (
        <div className="flex items-center justify-center space-x-5 py-5">
            <button
                onClick={(e) => {
                    router.push(`/manage/ehack/timeline`);
                }}
                className="navigation_card_btn w-button"
                >
                View Timeline
            </button>
            <button
                onClick={(e) => {
                    router.push(`/manage/ehack/tracks`);
                }}
                className="navigation_card_btn w-button"
                >
                View Tracks
            </button>
            <button
                onClick={(e) => {
                    router.push(`/manage/ehack/upload`);
                }}
                className="navigation_card_btn w-button"
                >
                View Submission
            </button>
        </div>
    )
}