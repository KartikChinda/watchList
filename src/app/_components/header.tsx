"use client";
import { signIn, signOut, useSession } from "next-auth/react";


export const Header = () => {
    const { data: session } = useSession();

    return (
        <div className="flex flex-col justify-center items-center px-2 py-4 ">
            <div className='m-4 p-4 bg-palette-1 w-[70%] rounded-xl text-center text-5xl font-black text-palette-3 border-2 border-palette-1 hover:border-palette-2 hover:bg-palette-3 hover:text-palette-1 duration-150 mt-10 mb-5'>
                My Watchlist
            </div>
            <div className=" ">
                {session?.user ? (
                    <div className="flex justify-around gap-[200px] items-center  text-md md:text-lg font-semibold rounded-xl border-2 py-2 px-3 border-palette-3 bg-palette-3 hover:border-palette-1 hover:bg-palette-1 duration-150 hover:text-palette-3 text-palette-1">
                        <p>Welcome, <span className="text-lg md:text-2xl font-bold">{session.user.name}</span></p>
                        <button className="border-2 border-palette-3 rounded-xl px-3 py-2 bg-palette-4 text-palette-2  hover:bg-palette-3 hover:text-palette-4 hover:border-palette-3 hover:text-[18px] duration-150" onClick={() => signOut()}>Sign Out</button>
                    </div>
                ) : (
                    <button className="border-2 rounded-xl px-3 py-2 border-palette-3 bg-palette-1 text-palette-4 font-bold text-xl hover:text-[22px] hover:bg-palette-3 hover:text-palette-1 hover:border-palette-1 duration-150" onClick={() => signIn()}>Sign In </button>
                )}
            </div>

        </div>
    )
}