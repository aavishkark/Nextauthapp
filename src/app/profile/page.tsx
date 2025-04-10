"use client"
import Link from "next/link";

export default function ProfilePage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Profile</h1>
            <p>This is the profile page.</p>
            <Link href="/" className="text-blue-500">Back to Home</Link>
        </div>
    )
}