"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import SubmitLogic from "@/components/ui/SubmitLogic";
import PassValidationText from "@/components/ui/PassValidationText";
import ShowPassBtn from "@/components/ui/ShowPassBtn";
import ForgotLoginSignup from "@/components/ui/ForgotLoginSignup";
import Input from '@/components/ui/Input';

export default function SignupPage() {
    const router = useRouter();
    const [user, setUser] = useState({
        email: "",
        password: "",
        username: "",
    })
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [loading, setLoading] = useState(false);
    const [type, setType] = useState('password');
    const [passwordInputFocused, setPasswordInputFocused] = useState(false);
    const [showValidation, setShowValidation] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    // Password requirements
    const passRequirements = [
        // Must be at least 8 characters
        user.password.length >= 8,
        user.password.length <= 20,
        // Must contain at least 1 number
        /\d/.test(user.password),
        // Must contain at least one letter
        /[A-Za-z]/.test(user.password)
    ]

    /* const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email); */
    const isPassValid = passRequirements.every(Boolean);

    const handlePasswordChange = (event: any) => {
        const newPassword = event.target.value;
        if (newPassword.length <= 25) {
            setUser((prevUser) => ({
                ...prevUser,
                password: newPassword,
            }))
        };
        setShowValidation(passwordInputFocused && !isPassValid);
    };

    const handlePasswordBlur = () => {
        setPasswordInputFocused(false);
        setShowValidation(!isPassValid);
    };

    const handlePasswordFocus = () => {
        // Set the password input as focused
        setPasswordInputFocused(true);
    };

    const onSignup = async (e: React.FormEvent) => {
        try {
            e.preventDefault();
            if (isPassValid) {
                toast.success('User registered')
                setLoading(true);
                const response = await axios.post("/api/users/signup", user);
                console.log("Signup success", response.data);
                router.push("/login");
            }
        } catch (error: any) {
            console.log("Signup failed", error.message);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0
            && user.username.length > 0 && isPassValid) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user, isPassValid]);

    return (
        <section className="flex items-center 
        justify-center min-h-screen py-2 bg-gray-300">
            <Toaster />
            <div className="bg-white md:w-96 flex flex-col md:rounded-2xl shadow-xl max-w-screen-xl p-3 px-16 relative">
                <h1 className="font-bold text-2xl text-center text-lime-800 pt-4">Create new account</h1>
                <form onSubmit={onSignup} className="flex flex-col gap-3">
                    <Input
                        id={"username"}
                        value={user.username}
                        type={"text"}
                        placeholder={"Username"}
                        onChange={(e: any) => setUser({
                            ...user,
                            username: e.target.value
                        })}
                    />
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
                            onChange={handlePasswordChange}
                            onBlur={handlePasswordBlur}
                            onFocus={handlePasswordFocus}
                            placeholder="Password"
                        />
                        <ShowPassBtn
                            showPassword={showPassword}
                            setShowPassword={setShowPassword}
                        />
                    </div>
                    <PassValidationText
                        passRequirements={passRequirements}
                        isPassValid={isPassValid}
                        showValidation={showValidation}
                    />
                    <SubmitLogic
                        text={"Register"}
                        disabled={buttonDisabled}
                    />
                </form>
                <ForgotLoginSignup
                    linkPath={"/login"}
                    text={"If you already have an account"}
                    btnName="login"
                />
            </div>
        </section>
    )
}
