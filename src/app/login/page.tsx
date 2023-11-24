"use client";
import Link from "next/link";
import React, { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import axios from "axios";
import  toast, {Toaster} from "react-hot-toast";

export default function LoginPage() {
    const router = useRouter();
    const [user, setUser] = React.useState({
        email: "",
        password: "",
    })

    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [loading, setLoading] = useState(false);

    const onLogin = async () => {
        try {
            setLoading(true)
            const response = await axios.post("/api/users/login", user)
            toast.success("Login success");
            router.push("/profile");
        } catch (error: any) {
            toast.error("Email or password are incorrect");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user])

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <Toaster />
            <h1>{loading ? "Processing" : "Login"}</h1>
            <hr />
            <label htmlFor="email">email</label>
            <input
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
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
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
                id="password"
                type="password"
                value={user.password}
                onChange={(e) => setUser({
                    ...user,
                    password: e.target.value
                })
                }
                placeholder="password"
            />
            <button
                onClick={onLogin}
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none
focus:border-gray-600"> {buttonDisabled ? "Fill all inputs" : "Login"} </button>
            <Link href="/signup">visit signup page</Link>
        </div>
    )
}