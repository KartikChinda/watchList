import { createTRPCRouter, publicProcedure } from "../trpc";
import { z } from "zod";

// these right here will be the ZOD objects 
const addMovieInput = z.object({
    userId: z.string(),
    title: z.string(),
    details: z.string(),
    done: z.boolean(),
})

const setDoneInput = z.object({
    id: z.string(),
    done: z.boolean(),
})


export const movieRouter = createTRPCRouter({
    getMovies: publicProcedure.query(async ({ ctx }) => {
        return await ctx.db.movie.findMany();
    }),

    getMoviesByUser: publicProcedure.input(z.string()).query(async ({ ctx, input }) => {
        const movies = await ctx.db.movie.findMany({
            where: {
                userId: input
            }
        })
        return movies;
    }),

    createMovie: publicProcedure.input(addMovieInput).mutation(async ({ ctx, input }) => {
        const movie = await ctx.db.movie.create({
            data: {
                userId: input.userId,
                title: input.title,
                details: input.details,
                done: input.done
            }
        })

        return movie;
    }),

    deleteMovie: publicProcedure.input(z.string()).mutation(async ({ ctx, input }) => {
        return await ctx.db.movie.delete({
            where: {
                id: input,
            }
        })
    }),

    setDone: publicProcedure.input(setDoneInput).mutation(async ({ ctx, input }) => {
        return await ctx.db.movie.update({
            where: {
                id: input.id
            }, data: {
                done: input.done,
            }
        })
    })

})