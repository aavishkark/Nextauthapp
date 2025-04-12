"use client";
import Link from "next/link";  
import React from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import {Toaster, toast} from "react-hot-toast";

export default function SignupPage() {

    const router= useRouter();

   const [user,setuser]= React.useState({
    email:"",
    password:"",
    username:"",
  });

  const [buttonDisabled, setbuttonDisabled]= React.useState(false);

  const [loading, setloading]= React.useState(false);

  const onSignup = async () => {
    try{
        setloading(true);
        const res= await axios.post("/api/users/signup", user);
        router.push("/login");
        toast.success("User created successfully, please login to continue.");
    }
    catch (error: any) {
        const errorMessage = error.response?.data?.error || "Something went wrong";
        toast.error(errorMessage);
    }
    finally {
        setloading(false);
    }

  }
  
  React.useEffect(() => {

    if(user.email.length> 0 && user.password.length > 0 && user.username.length > 0){
        setbuttonDisabled(false);
    }
    else{ 
        setbuttonDisabled(true);
    }

  }, [user]);

    return(
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>{ loading ? "Processing" : "Signup" }</h1>

            <hr />
            <label htmlFor="username">Username</label>
            <input type="text" 
            id="username" 
            value={user.username} 
            onChange={(e) => setuser({...user, username: e.target.value})} 
            className="border-2 border-gray-300 rounded-md p-2 mb-4" 
            placeholder="Username"/>

            <hr />
            <label htmlFor="email">Email</label>
            <input type="text" 
            id="email" 
            value={user.email} 
            onChange={(e) => setuser({...user, email: e.target.value})} 
            className="border-2 border-gray-300 rounded-md p-2 mb-4" 
            placeholder="email"/>

            <hr />
            <label htmlFor="password">password</label>
            <input type="password" 
            id="password" 
            value={user.password} 
            onChange={(e) => setuser({...user, password: e.target.value})} 
            className="border-2 border-gray-300 rounded-md p-2 mb-4" 
            placeholder="password"/>

            <hr />
            <button
             onClick={onSignup}
             className="bg-blue-500 text-white rounded-md p-2 mb-4"
             >{buttonDisabled ? "No SignUp" : "Signup"}</button>
             <Link href="/login" className="text-blue-500">Already have an account? Login</Link>
            <Link href="/" className="text-blue-500">Back to Home</Link>
            <Toaster />

        </div>
    )
}