"use client";
import { useSession } from "next-auth/react";
import { api } from "~/trpc/react"
import Link from "next/link";
import EntryCard from "./_components/EntryCard";
import { useEffect, useState } from "react";

interface Movie {
  id: string;
  title: string;
  details: string;
  done: boolean;
  createdAt: Date;
  userId: string;
}


const Home = () => {
  // const { data, isLoading: moviesLoading } = api.movie.getMovies.useQuery();
  // console.log("Movies: ", data);

  const { data: session } = useSession();
  // const [movies, setmovies] = useState<Movie[] | undefined>([])




  // ?? -> nullish operator, essentially the || operator, but it also follows values when the first value is 0. It works like value 1 ?? value 2, if value 1 is true, then val1, otherwise val2.
  const { data, isLoading: moviesLoading } = api.movie.getMoviesByUser.useQuery(session?.user.id ?? "");



  // useEffect(() => {




  // }, [deleteClicked])





  return (
    <div className="flex flex-col mt-14 bg-palette-3 rounded-lg w-[85%] justify-center items-center mx-auto gap-6 mb-10 pb-5">

      <button className='px-3 py-2 border-2 bg-palette-2 rounded-xl w-[35%] text-xl font-bold text-palette-3 border-palette-1 mt-4 hover:border-palette-2 hover:bg-palette-4 hover:text-palette-1 duration-200'>
        <Link href="/create">Create a new entry</Link>
      </button>
      <div className=" w-[90%] px-4 py-2 bg-palette-4 m-2 rounded-lg pb-6">
        <h2 className=' font-serif text-palette-1 text-5xl mt-10'>
          Your Entries.
        </h2>
        {data?.map((movie) => {
          return (
            <div key={movie.id} className="mt-4">
              <EntryCard id={movie.id} title={movie.title} details={movie.details} createdAt={movie.createdAt} done={movie.done} />
            </div>
          )
        })}
      </div>
    </div>
  );
}

export default Home; 