"use client";
import React from 'react'
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '~/trpc/react';

const CreateMovie = () => {

    const [inputmovie, setinputmovie] = useState({
        title: "",
        details: "",
    })
    const router = useRouter();

    // setting up the submit 
    const { data: session } = useSession();
    const ctx = api.useUtils();

    const { mutate } = api.movie.createMovie.useMutation({
        onSuccess: () => {
            console.log("Success!")
            setinputmovie({
                title: "",
                details: "",
            })
            void ctx.movie.getMoviesByUser.invalidate();
            router.push("/")
        }
    })

    const handlePostSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        mutate({
            userId: session?.user.id ?? "",
            title: inputmovie.title,
            details: inputmovie.details,
            done: false,
        })
    }




    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setinputmovie({ ...inputmovie, title: e.target.value })
    }

    const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setinputmovie({ ...inputmovie, details: e.target.value })
    }

    const handleCancel = () => {
        router.push("/");
    }


    return (
        <section className='md:mt-20 flex justify-center items-center w-[110%] mb-5 '>

            <div className='flex-col mx-auto md:w-[80%]'>

                <form id="postCreation" onSubmit={(e) => handlePostSubmit(e)} className="flex flex-col p-4 gap-10 bg-palette-3 w-[90%]  rounded-xl border-2 border-palette-2 text-xl mt-4 ">

                    <label htmlFor="title" className="flex flex-col font-semibold gap-1" >
                        Title
                        <input id="title" placeholder="What are you watching next?" className="rounded-md p-2 font-normal border-2 border-palette-4" onChange={(e) => handleTitleChange(e)} value={inputmovie.title} />

                    </label>

                    <label htmlFor="content" className="flex flex-col font-semibold gap-1" >
                        Description
                        <textarea id="content" placeholder="Add more information" className=" h-[200px] rounded-md p-2 font-normal border-2 border-palette-4" onChange={(e) => handleContentChange(e)} value={inputmovie.details} />

                    </label>

                </form>
                <div className="flex justify-end items-center w-[90%] gap-4 mt-4">
                    <button onClick={handleCancel} className="border-2 border-palette-3 rounded-xl px-3 py-2 bg-palette-4 text-palette-2 text-xl hover:bg-palette-3 hover:text-palette-4 hover:border-palette-3 hover:text-[18px] duration-150">
                        Cancel
                    </button>
                    <button type="submit" form="postCreation" className="border-2 rounded-xl px-3 py-2 border-palette-3 bg-palette-1 text-palette-4 font-bold text-xl hover:text-[22px] hover:bg-palette-3 hover:text-palette-1 hover:border-palette-1 duration-150">
                        Submit
                    </button>
                </div>

            </div>
        </section>
    )
}

export default CreateMovie