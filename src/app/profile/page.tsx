"use client";
import Link from "next/link";
import axios from "axios";
import {Toaster, toast} from "react-hot-toast";
import { useRouter } from "next/navigation";
import React from "react";


export default function ProfilePage() {
    const router = useRouter();
    const [data, setdata] = React.useState("nothing");
    const logout = async () => {
        try {
            const response = await axios.get("/api/users/logout");
            toast.success("Logout successfull");
            router.push("/login");
        }
        catch(err:any){
            toast.error(err.message || "Something went wrong");
        }
    }

    const getUserDetails = async () => {
        try {
            const response = await axios.get("/api/users/me");
            setdata(response.data.data._id);
        }
        catch (err:any){
            toast.error(err.message || "Something went wrong");
        }
    }
    return (
        <>
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Profile</h1>
            <h2 className="bg-green-500">{data === 'nothing' ? "Nothing here" : <Link href={`/profile/${data}`}>{data}</Link> }</h2>
            <p>This is the profile page.</p>
            <Link href="/" className="text-blue-500">Back to Home</Link>
            <button className="bg-blue-500 text-white rounded-md p-2 mb-4" onClick={logout}>Logout</button>
            <button className="bg-green-500 text-white rounded-md p-2 mb-4" onClick={getUserDetails}>Get User Details</button>
            <Toaster></Toaster>
        </div>
        </>
    )
}