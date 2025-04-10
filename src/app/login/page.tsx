"use client";
import Link from "next/link";  
import React from "react";
import { useRouter } from "next/navigation";
import { Axios } from "axios";

export default function LoginPage() {

    const [user, setUser] = React.useState({
        email: "",
        password: "",
    });

    const onLogin = async (e: React.FormEvent) => {
        e.preventDefault();
    }

    return(
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Login</h1>

            <hr />
            <label htmlFor="email">Email</label>
            <input type="text" 
            id="email" 
            value={user.email} 
            onChange={(e) => setUser({...user, email: e.target.value})} 
            className="border-2 border-gray-300 rounded-md p-2 mb-4" 
            placeholder="email"/>

            <hr />
            <label htmlFor="password">password</label>
            <input type="password" 
            id="password" 
            value={user.password} 
            onChange={(e) => setUser({...user, password: e.target.value})} 
            className="border-2 border-gray-300 rounded-md p-2 mb-4" 
            placeholder="password"/>

            <hr />
            <button
             onClick={onLogin}
             className="bg-blue-500 text-white rounded-md p-2 mb-4"
             >Login</button>
             <Link href="/signup" className="text-blue-500">Dont have an account yet? Signup</Link>
        <Link href="/" className="text-blue-500">Back to Home</Link>

        </div>
    )
}