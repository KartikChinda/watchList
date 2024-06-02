"use client";
import React from 'react';

import { api } from "~/trpc/react"


interface Movie {
    id: string,
    title: string,
    details: string,
    createdAt: Date,
    done: boolean,
}

const EntryCard = ({ id, title, details, createdAt, done }: Movie) => {

    const dateToShow = new Date(createdAt).toLocaleDateString();
    const ctx = api.useUtils();



    const { mutate: deleteMutate } = api.movie.deleteMovie.useMutation({
        onSuccess: () => {
            void ctx.movie.getMoviesByUser.invalidate();
        }
    })

    const { mutate: setDoneMutate } = api.movie.setDone.useMutation({
        onSuccess: () => {
            void ctx.movie.getMoviesByUser.invalidate();
        }
    })






    return (
        <div className='p-4 border-2 border-palette-3 hover:border-palette-2 duration-150 rounded-xl' style={{ color: !done ? "#483434" : "grey", backgroundColor: !done ? "#EED6C4" : "#ccc2ba" }}>
            <div className='text-xl font-bold m-2 flex flex-col md:flex-row justify-between items-start md:items-center'>
                <p>{dateToShow}</p>
                <div >
                    <button onClick={() => setDoneMutate({ id: id, done: !done })} className='rounded-lg text-sm border-2 p-1 px-2 mr-0 md:mr-2 border-palette-2 bg-palette-4 hover:border-palette-4 hover:bg-palette-1 duration-150 hover:text-palette-3'>{done ? "Watched." : "Watched?"}</button>
                    <button onClick={() => deleteMutate(id)} className='rounded-lg text-sm border-2 p-1 px-3 border-palette-2 bg-palette-4 hover:border-palette-4 hover:bg-palette-1 duration-150 hover:text-palette-3'>X</button>

                </div>

            </div>
            <h2 className='text-2xl m-2 font-semibold'>
                {title}
            </h2>
            <div className='text-lg m-2 font-light'>
                {details?.substring(0, 250)} {details?.length > 250 ? "..." : ""}
            </div>
        </div>
    )
}

export default EntryCard