"use client";
import Link from "next/link";  
import React from "react";
import { useRouter } from "next/navigation";
import  axios from "axios";
import { set } from "mongoose";
import {Toaster, toast} from "react-hot-toast";

export default function LoginPage() {

    const router = useRouter();
    const [loading, setLoading] = React.useState(false);
    const [buttonDisabled, setbuttonDisabled]= React.useState(false);
    const [user, setUser] = React.useState({
        email: "",
        password: "",
    });

    const onLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await axios.post("/api/users/login", user);
            router.push("/profile");
            toast.success("User loggedin successfully");
        }
        catch (error: any) {
            const errorMessage = error.response?.data?.error || "Something went wrong";
            alert(errorMessage);
        }
        finally {
            setLoading(false);
        }
    }

     React.useEffect(() => {
    
        if(user.email.length> 0 && user.password.length > 0 ){
            setbuttonDisabled(false);
        }
        else{ 
            setbuttonDisabled(true);
        }
    
      }, [user]);

    return(
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>{ loading ? "Processing" : "Login" }</h1>

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
             >{buttonDisabled ? "No Login" : "Login"}</button>
             <Link href="/signup" className="text-blue-500">Dont have an account yet? Signup</Link>
        <Link href="/" className="text-blue-500">Back to Home</Link>
        <Toaster />

        </div>
    )
}