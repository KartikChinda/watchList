"use client";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { api } from "~/trpc/react"
import CreateMovie from "./create/page";
import Link from "next/link";
import EntryCard from "./_components/EntryCard";


const Home = () => {
  // const { data, isLoading: moviesLoading } = api.movie.getMovies.useQuery();
  // console.log("Movies: ", data);

  const { data: session } = useSession();
  const ctx = api.useUtils();

  // ?? -> nullish operator, essentially the || operator, but it also follows values when the first value is 0. It works like value 1 ?? value 2, if value 1 is true, then val1, otherwise val2. 
  const { data, isLoading: moviesLoading } = api.movie.getMoviesByUser.useQuery(session?.user.id ?? "");


  return (
    <div className="flex flex-col mt-14 bg-palette-3 rounded-lg w-[85%] justify-center items-center mx-auto gap-6">

      <button className='px-3 py-2 border-2 bg-palette-2 rounded-xl w-[35%] text-xl font-bold text-palette-3 border-palette-1 mt-4 hover:border-palette-2 hover:bg-palette-4 hover:text-palette-1 duration-200'>
        <Link href="/create">Create a new entry</Link>
      </button>
      <div className=" w-full p-2">
        {data?.map((movie) => {
          return (
            <div key={movie.id}>
              <EntryCard title={movie.title} details={movie.details} createdAt={movie.createdAt} done={movie.done} />
            </div>
          )
        })}
      </div>
    </div>
  );
}

export default Home; 