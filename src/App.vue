<script setup lang="ts">
import { useAccount, useDisconnect, useConnect } from 'use-wagmi'
import { injected, coinbaseWallet, walletConnect } from '@wagmi/connectors'

const { address, isConnected } = useAccount()
const { disconnect } = useDisconnect()
const { connect, isSuccess } = useConnect()

const modalOpen = ref(false)

function handleAccountClick() {
  if (isConnected.value) {
    disconnect()
  } else {
    modalOpen.value = true
  }
}

const accountText = computed(() => {
  if (isConnected.value && address.value) {
    return `${address.value.slice(0, 6)}...${address.value.slice(-4)}`
  } else {
    return 'Connect'
  }
})

const connectors = [
  {
    name: 'Browser wallet',
    connector: injected()
  },
  {
    name: 'Coinbase Wallet',
    connector: coinbaseWallet({
      appName: 'fungible.xyz'
    })
  },
  {
    name: 'WalletConnect',
    connector: walletConnect({
      projectId: '3fcc6bba6f1de962d911bb5b5c3dba68'
    })
  }
]

watch(isSuccess, (value) => {
  if (value) {
    modalOpen.value = false
  }
})
</script>

<template>
  <header>
    <nav class="flex justify-between items-center px-4 py-3 border-b">
      <h1 class="text-lg">fungible.xyz</h1>
      <button class="btn btn-primary btn-outline text-base pl-5" @click="handleAccountClick">
        {{ accountText }}
      </button>
    </nav>
  </header>

  <RouterView />

  <BaseModal title="Connect Wallet" :open="modalOpen" @close="modalOpen = false">
    <ul class="space-y-2">
      <li v-for="connector in connectors" :key="connector.name">
        <button class="btn w-full" @click="connect({ connector: connector.connector })">
          {{ connector.name }}
        </button>
      </li>
    </ul>
  </BaseModal>
</template>
