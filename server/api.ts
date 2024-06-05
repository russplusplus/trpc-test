import express from "express"
import cors from "cors"

import { appRouter } from './routers'
import { createContext } from './context'
import { createExpressMiddleware } from "@trpc/server/adapters/express"

const app = express()

app.use(cors({ origin: "http://localhost:5174" }))

// route could also just be "/"
app.use("/trpc", createExpressMiddleware({ router: appRouter, createContext
    // context is optional, and typically used for auth tokens
    // return below will be on req.ctx in routers
}))
console.log("Hello via Bun!");

app.listen(3000)

export type AppRouter = typeof appRouter