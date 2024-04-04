import { http, createConfig } from 'use-wagmi'
import { base } from 'use-wagmi/chains'

export const config = createConfig({
  chains: [base],
  transports: {
    [base.id]: http()
  }
})
