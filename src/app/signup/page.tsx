"use client";
import Link from "next/link";
import React, { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import {basic_eye} from 'react-icons-kit/linea/basic_eye'
import {basic_eye_closed} from 'react-icons-kit/linea/basic_eye_closed'
import Icon from "react-icons-kit";

export default function SignupPage() {
    const router = useRouter();
    const [user, setUser] = useState({
        email: "",
        password: "",
        username: "",
    })
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [loading, setLoading] = useState(false);
    const [type, setType] = useState('password');
    // Password requirements
    const requirements = [
        // Must be at least 8 characters
        user.password.length >= 8,
        // Must contain at least 1 uppercase letter
        /[A-Z]/.test(user.password),
        // Must contain at least 1 lowercase letter
        /[a-z]/.test(user.password),
        // Must contain at least 1 number
        /\d/.test(user.password)
    ]

    const isPassValid = requirements.every(Boolean);

    const onSignup = async () => {
        try {
            if (isPassValid) {
                toast.success('User registered')
                setLoading(true);
                const response = await axios.post("/api/users/signup", user);
                console.log("Signup success", response.data);
                router.push("/login");
            } else {
                toast.error('Password must be a least 8 characters long, must contain at least 1 upper/lower case letter and 1 number')
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
            && user.username.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user]);

    return (
        <div className="flex flex-col items-center 
        justify-center min-h-screen py-2">
            <Toaster />
            <h1>{loading ? "Processing" : "Signup"}</h1>
            <hr />
            <label htmlFor="username">username</label>
            <input
                className="p-2 border border-gray-300 rounded-lg mb-4 
                focus:outline-none focus:border-gray-600"
                id="username"
                type="text"
                value={user.username}
                onChange={(e) => setUser({
                    ...user,
                    username: e.target.value
                })
                }
                placeholder="username"
            />
            <label htmlFor="email">email</label>
            <input
                className="p-2 border border-gray-300 rounded-lg 
                mb-4 focus:outline-none focus:border-gray-600"
                id="email"
                type="text"
                value={user.email}
                onChange={(e) => setUser({
                    ...user,
                    email: e.target.value
                })
                }
                placeholder="email"
            />
            <label htmlFor="password">password</label>

            <input
                className="p-2 border border-gray-300 rounded-lg 
                mb-4 focus:outline-none focus:border-gray-600"
                id="password"
                type={type}
                value={user.password}
                onChange={(e) => setUser({
                    ...user,
                    password: e.target.value
                })
                }
                placeholder="password"
            />
            {type === 'password' ? (
                <span className='icon-span'
                    onClick={() => setType("text")}>
                    <Icon icon={basic_eye_closed} size={18} />
                </span>
            ) : (
                <span className='icon-span'
                    onClick={() => setType("password")}>
                    <Icon icon={basic_eye} size={18} />
                </span>
            )}
            <button
                onClick={onSignup}
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none
focus:border-gray-600">{buttonDisabled ? "Can't Signup" : "Signup"}</button>
            <Link href="/login">visit login page</Link>
        </div>
    )
}