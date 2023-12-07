"use client"

import axios from 'axios'
import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from "next/navigation";
import toast, { Toaster } from 'react-hot-toast';
import SubmitLogic from '@/components/ui/SubmitLogic';
import Input from '@/components/ui/Input';

export default function forgotPassword() {
    const searchParams = useSearchParams();
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [newPassword, setNewPassword] = useState(false);
    const [error, setError] = useState(false);
    const router = useRouter();
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const validateForm = () => {
        if (password !== confirmPassword) {
            toast.error("Passwords do not match")
            return false;
        }
        return true;
    };

    useEffect(() => {
        if (password.length > 0 && confirmPassword.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [password, confirmPassword])

    const updatePassword = async (e: any) => {
        try {
            console.log("Password before axios.post:", password); // Add this line
            e.preventDefault();
            const token = searchParams.get('token');

            if (validateForm()) {
                console.log("URL:", window.location.href);
                console.log("Token:", token);
                const response = await axios.post('/api/users/verifypassword', { token, password })
                console.log(response.data)
                setNewPassword(true)
                toast.success("Reset successfull");
                router.push("/login");
            }
        } catch (error: any) {
            toast.error(error)
            setError(true);
            console.log("Error:", error);
            console.log("Error response:", error.response);
        }
    }

    return (
        <section className="flex items-center 
        justify-center min-h-screen py-2 bg-gray-300">
            <Toaster />
            <div className="bg-white md:w-96 flex flex-col md:rounded-2xl shadow-xl max-w-screen-xl p-3 px-16 relative">
                <h1 className="font-bold text-2xl text-center text-lime-800 pt-4">Send an email to reset your password</h1>
                <form onSubmit={updatePassword} className="flex flex-col gap-3">
                    <Input
                        id={"password"}
                        placeholder='Password'
                        type='password'
                        onChange={(e: any) => setPassword(e.target.value)}
                        value={password}
                    />
                    <Input
                        id={"confirmPassword"}
                        placeholder='Confirm your password'
                        type='password'
                        onChange={(e: any) => setConfirmPassword(e.target.value)}
                        value={confirmPassword}
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


