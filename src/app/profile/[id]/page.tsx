
import Link from "next/link";

export default async function UserProfile({params}: {params: {id: string}}) {
    const {id}= await params;
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Profile</h1>
            <hr />
            <p className="text-4xl">
                Profile Page {' '}
                <span className="p-1 rounded bg-orange-500">{id} </span>
             </p>
        </div>
    )
}