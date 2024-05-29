"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

export const Header = () => {
    const { data: session } = useSession();

    return (
        <div className="flex justify-between px-2 py-4 border-b">
            <div>My Watchlist</div>
            <div>
                {session?.user ? (
                    <div>
                        <p>{session.user.name}</p>
                        <button onClick={() => signOut()}>Sign Out</button>
                    </div>
                ) : (
                    <button onClick={() => signIn()}>Sign In </button>
                )}
            </div>

        </div>
    )
}