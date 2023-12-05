"use client"

import axios from "axios";
import React, { useEffect, useState } from 'react';
import { useRouter } from "next/navigation";
import toast, { Toaster } from 'react-hot-toast'
import SubmitLogic from "@/components/ui/SubmitLogic";
import Input from "@/components/ui/Input";

export default function forgotPassword() {
    const [email, setEmail] = useState("");
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(false);
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const router = useRouter();

    const verifyUserEmail = async (event: React.FormEvent) => {
        try {
            event.preventDefault();
            await axios.post('/api/users/resetpassword', { email })
            setVerified(true)
            toast.success("Email sent successfully");
            router.push('/login')
        } catch (error: any) {
            setError(true);
            console.log("Error:", error);
            console.log("Error response:", error.response);
        }
    }

    useEffect(() => {
        if (email.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [email])

    return (
        <section className="flex items-center 
        justify-center min-h-screen py-2 bg-gray-300">
            <Toaster />
            <div className="bg-white md:w-96 flex flex-col md:rounded-2xl shadow-xl max-w-screen-xl p-3 px-16 relative">
                <h1 className="font-bold text-2xl text-center text-lime-800 pt-4">Send an email to reset your password</h1>
                <form onSubmit={verifyUserEmail} className="flex flex-col gap-3">
                    <Input
                        id={"email"}
                        value={email}
                        type={"email"}
                        placeholder={"Email"}
                        onChange={(e: any) => setEmail(
                            e.target.value
                        )}
                    />
                    <SubmitLogic
                        text={"Submit"}
                        disabled={buttonDisabled}
                    />
                </form>
            </div>
        </section>
    )
}


