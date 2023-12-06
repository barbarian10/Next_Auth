"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Input from "@/components/ui/Input";
import ForgotLoginSignup from "@/components/ui/ForgotLoginSignup";
import SubmitLogic from "@/components/ui/SubmitLogic";
import ShowPassBtn from "@/components/ui/ShowPassBtn";
import PassValidationText from '@/components/ui/PassValidationText';

export default function LoginPage() {
    const router = useRouter();
    const [user, setUser] = React.useState({
        email: "",
        password: "",
    })
    const [showPassword, setShowPassword] = useState(false);
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [loading, setLoading] = useState(false);
    const [showValidation, setShowValidation] = useState(false);
    const passLength = user.password.length <= 20;

    const onLogin = async (e: React.FormEvent) => {
        try {
            e.preventDefault();
            if (passLength) {
            setLoading(true)
            const response = await axios.post("/api/users/login", user)
            toast.success("Login success");
            router.push("/profile");
            }
        } catch (error: any) {
            toast.error("Email or password are incorrect");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0 && passLength) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user, passLength])

    return (
        <section className="flex items-center 
        justify-center min-h-screen py-2 bg-gray-300">
            <Toaster />
            <div className="bg-white md:w-96 flex flex-col md:rounded-2xl shadow-xl max-w-screen-xl p-3 px-16 relative">
                <h1 className="font-bold text-2xl text-center text-lime-800 pt-4">Login to your account</h1>
                <form onSubmit={onLogin} className="flex flex-col gap-3">
                    <Input
                        id={"email"}
                        value={user.email}
                        type={"email"}
                        placeholder={"Email"}
                        onChange={(e: any) => setUser({
                            ...user,
                            email: e.target.value
                        })}
                    />
                    <div className="flex flex-row items-center">
                        <input
                            className="p-2 border border-gray-300 rounded-lg mt-4 focus:outline-none focus:border-gray-600 w-full flex-grow pr-10"
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            value={user.password}
                            onChange={(e) => setUser({
                                ...user, password: e.target.value
                            })
                            }
                            placeholder="Password"
                        />
                        <ShowPassBtn
                            showPassword={showPassword}
                            setShowPassword={setShowPassword}
                        />
                    </div>
                    <p className="text-red-500 text-xs">
                        {passLength ?
                            null : "Password should contain less than 20 characters"
                        }
                    </p>
                    <SubmitLogic
                        text={"Login"}
                        disabled={buttonDisabled}
                    />
                </form>
                <ForgotLoginSignup
                    linkPath={"/signup"}
                    text={"If you do not have an account"}
                    btnName="Register"
                />
            </div>
        </section>
    )
}