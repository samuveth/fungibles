import { createWeb3Modal } from '@web3modal/wagmi/vue'
import { http, createConfig } from 'use-wagmi'
import { base } from 'use-wagmi/chains'
import { injected, walletConnect, coinbaseWallet } from '@wagmi/connectors'
import { Buffer } from 'buffer'

if (!window.Buffer) {
  window.Buffer = Buffer
}

export const WC_PROJECT_ID = '2f8c6cb2e003455c9066dc57b74b577c'

export const connectors = [
  injected(),
  walletConnect({
    projectId: WC_PROJECT_ID
  }),
  coinbaseWallet({
    appName: 'fungibles.art',
    chainId: base.id
  })
]

export const config = createConfig({
  chains: [base],
  transports: {
    [base.id]: http()
  },
  connectors
})

createWeb3Modal({
  wagmiConfig: config,
  projectId: WC_PROJECT_ID
})
