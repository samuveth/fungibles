import { http, createConfig } from 'use-wagmi'
import { base } from 'use-wagmi/chains'
import { injected, coinbaseWallet, walletConnect } from '@wagmi/connectors'

export const connectors = [
  injected()
  // coinbaseWallet({
  //   appName: 'fungible.xyz'
  // }),
  // walletConnect({
  //   projectId: '3fcc6bba6f1de962d911bb5b5c3dba68'
  // })
]

export const config = createConfig({
  chains: [base],
  transports: {
    [base.id]: http()
  },
  connectors
})
