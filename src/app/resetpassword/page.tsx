"use client"

import axios from 'axios'
import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from "next/navigation";
import toast, {Toaster} from 'react-hot-toast';

export default function forgotPassword() {
    const searchParams = useSearchParams();
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [newPassword, setNewPassword] = useState(false);
    const [error, setError] = useState(false);
    const router = useRouter();
    const validateForm = () => {
        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return false;
        }
        return true;
    };

    const updatePassword = async (e: any) => {
        try {
            console.log("Password before axios.post:", password); // Add this line
            e.preventDefault();
            const token = searchParams.get('token');
        
            if (validateForm()) {
                console.log("URL:", window.location.href);
                console.log("Token:", token);
                const response = await axios.post('/api/users/verifypassword', {token, password})
                console.log(response.data)
            }
            setNewPassword(true)
            toast.success("Reset successfull");
            router.push("/login");
        } catch (error: any) {
            setError(true);
            console.log("Error:", error);
            console.log("Error response:", error.response);
        }
    }


    return (
            <div className="flex flex-col items-center justify-center min-h-screen py-2 ">
                <Toaster />
                <h2>Reset your password</h2>
                <input
                    className="mt-10"
                    type="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="password"
                />
                <input
                    className="mt-10"
                    name="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="confirm your password"
                />
                <br />

                <button onClick={updatePassword}>
                    Submit
                </button>
            </div>

        
    )
}


