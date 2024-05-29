import React from 'react';

interface Movie {
    title: string,
    details: string,
    createdAt: Date,
    done: boolean,
}

const EntryCard = ({ title, details, createdAt, done }: Movie) => {

    const dateToShow = new Date(createdAt).toLocaleDateString();


    return (
        <div className=' bg-palette-3 text-palette-1 p-4 border-2 border-palette-3 hover:border-palette-2 duration-150 rounded-xl'>
            <h3 className='text-xl font-bold m-2'>
                {dateToShow}
            </h3>
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