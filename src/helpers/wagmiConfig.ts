import { http, createConfig } from 'use-wagmi'
import { base } from 'use-wagmi/chains'
import { injected, walletConnect } from '@wagmi/connectors'

export const connectors = [
  injected(),
  walletConnect({
    projectId: '2f8c6cb2e003455c9066dc57b74b577c'
  })
]

export const config = createConfig({
  chains: [base],
  transports: {
    [base.id]: http()
  },
  connectors
})
