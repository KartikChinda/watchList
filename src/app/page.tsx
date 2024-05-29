"use client";
import { api } from "~/trpc/react"
import { Header } from "./_components/header";

const Home = () => {
  const { data, isLoading: moviesLoading } = api.movie.getMovies.useQuery();
  console.log("Movies: ", data);

  return (
    <div className="flex grow flex-col">
      <Header />
      {data?.map((movie) => (
        <div>{movie.title}</div>
      ))}
    </div>
  );
}

export default Home; 