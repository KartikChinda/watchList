import { createTRPCRouter, publicProcedure } from "../trpc";

export const movieRouter = createTRPCRouter({
    getMovies: publicProcedure.query(async ({ ctx }) => {
        return await ctx.db.movie.findMany();
    })
})