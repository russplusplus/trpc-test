import { t } from '../trpc'
import { z } from 'zod'

// make sure input has a valid userId for each endpoint.
// procedures can be used across multiple endpoints.
const userProcedure = t.procedure.input(z.object({ userId: z.string() }))

export const userRouter = t.router({
    get: userProcedure
        .query((v) => {
            return 'all users'
    }),
    update: userProcedure
        // name is only required for update, so we validate it here, rather than earlier
        .input(z.object({ name: z.string() }))
        // output isn't as essential (tRPC and TypeScript will assume based on return),
        // but we can more stricly enforce it with an output method if we want
        .output(z.object({
            id: z.string(),
            name: z.string()
        }))
        .mutation((req) => {
            console.log(`Updating user ${req.input.userId}`)
            return {
                id: req.input.userId,
                name: req.input.name
            }
    })
})