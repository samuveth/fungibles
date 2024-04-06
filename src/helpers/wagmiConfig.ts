import { http, createConfig } from 'use-wagmi'
import { base } from 'use-wagmi/chains'
import { injected } from '@wagmi/connectors'

export const connectors = [injected()]

export const config = createConfig({
  chains: [base],
  transports: {
    [base.id]: http()
  },
  connectors
})
