"use client";
import Link from "next/link";  
import React from "react";
import { useRouter } from "next/navigation";
import { Axios } from "axios";

export default function SignupPage() {

    const [user, setUser] = React.useState({
        email: "",
        password: "",
        username: ""
    });

    const onSignup = async (e: React.FormEvent) => {
        e.preventDefault();
    }

    return(
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Signup</h1>

            <hr />
            <label htmlFor="username">Username</label>
            <input type="text" 
            id="username" 
            value={user.username} 
            onChange={(e) => setUser({...user, username: e.target.value})} 
            className="border-2 border-gray-300 rounded-md p-2 mb-4" 
            placeholder="Username"/>

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
             onClick={onSignup}
             className="bg-blue-500 text-white rounded-md p-2 mb-4"
             >Signup</button>
             <Link href="/login" className="text-blue-500">Already have an account? Login</Link>
        <Link href="/" className="text-blue-500">Back to Home</Link>

        </div>
    )
}