"use client"

import axios from "axios";
import React, { useEffect, useState } from 'react';
import User from "@/models/userModel";
import { useRouter } from "next/navigation";
import toast, {Toaster} from 'react-hot-toast'

export default function forgotPassword() {
    const [email, setEmail] = useState("");
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(false);
    const router = useRouter();
    const verifyUserEmail = async () => {
        try {
            console.log("Email before axios.post:", email); // Add this line
            await axios.post('/api/users/resetpassword', { email })
            setVerified(true)
            toast.success('Message sent')
            router.push('/login')
        } catch (error: any) {
            setError(true);
            console.log("Error:", error);
            console.log("Error response:", error.response);
        }
    }


    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <Toaster />
            <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
            />
            <br />
            <h2>Send an Email to reset the password</h2>
            <button onClick={verifyUserEmail}>
                Submit
            </button>
        </div>
    )
}


