import './style.css'
import typescriptLogo from './typescript.svg'
import viteLogo from '/vite.svg'

import { createTRPCProxyClient, httpBatchLink } from "@trpc/client"
import { AppRouter } from "../../server/api"

const client = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: "http://localhost:3000/trpc"
    })
  ]
})

async function main() {
  const res = await client.sayHi.query()
  console.log(res)

  const res2 = await client.logToServer.mutate('hello from client')
  console.log(res2)

  const res3 = await client.users.get.query({ userId: 'hello' })
  console.log(res3)

  const res4 = await client.users.update.mutate({ userId: 'tzatzikiFreaky94', name: 'Russ' })
  console.log(res4)

}

main()










document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://www.typescriptlang.org/" target="_blank">
      <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
    </a>
    <h1>Vite + TypeScript</h1>
  </div>
`