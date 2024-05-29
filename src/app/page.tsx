"use client";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { api } from "~/trpc/react"
import CreateMovie from "./create/page";
import Link from "next/link";


const Home = () => {
  // const { data, isLoading: moviesLoading } = api.movie.getMovies.useQuery();
  // console.log("Movies: ", data);


  const ctx = api.useContext();


  return (
    <div className="flex grow flex-col mt-14 bg-palette-3 rounded-lg w-[85%] justify-center items-center mx-auto">

      <button className='px-3 py-2 border-2 bg-palette-2 rounded-xl w-[35%] text-xl font-bold text-palette-3 border-palette-1 mt-4 hover:border-palette-2 hover:bg-palette-4 hover:text-palette-1 duration-200'>
        <Link href="/create">Create a new entry</Link>
      </button>
    </div>
  );
}

export default Home; 