"use client";
import { api } from "~/trpc/react"


const Home = () => {
  const { data, isLoading: moviesLoading } = api.movie.getMovies.useQuery();
  console.log("Movies: ", data);

  return (
    <div className="flex grow flex-col">

      {data?.map((movie) => (
        <div>{movie.title}</div>
      ))}
    </div>
  );
}

export default Home; 