import React from "react";
import Link from "next/link";

interface LinkText {
    linkPath: any,
    text: string,
    btnName: string
}


const ForgotLoginSignup = ({linkPath, text, btnName}: LinkText) => {
    return (
        <div>
            <div className="text-xs flex gap-2 items-center justify-between py-4 border-b border-gray-400">
                Forgot your password?
                <button className="py-2 px-5 bg-gray-300 border rounded-lg"><Link href="/forgotpassword">Reset</Link></button>
            </div>
            <div className="text-xs flex gap-2 items-center justify-between mt-3 mb-5">
                <p>{text}</p>
                <button className="py-2 px-5 bg-gray-300 border rounded-lg"><Link href={linkPath}>{btnName}</Link></button>
            </div>
        </div>
    )
}

export default ForgotLoginSignup;