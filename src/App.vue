<script setup lang="ts">
import { useAccount, useDisconnect, useConnect } from 'use-wagmi'
import { connectors } from '@/helpers/wagmiConfig'
import { shortenAddress } from '@/helpers/utils'

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
    return shortenAddress(address.value)
  } else {
    return 'Connect'
  }
})

const connectorsList = computed(() => {
  const names = ['Browser Wallet', 'Coinbase Wallet', 'Wallet Connect']
  return connectors.map((connector, index) => {
    return {
      name: names[index],
      connector: connector
    }
  })
})

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
      <button class="btn btn-primary btn-outline text-base" @click="handleAccountClick">
        <span>
          {{ accountText }}
        </span>
      </button>
    </nav>
  </header>

  <RouterView />

  <BaseModal title="Connect Wallet" :open="modalOpen" @close="modalOpen = false">
    <ul class="space-y-2">
      <li v-for="connector in connectorsList" :key="connector.name">
        <button class="btn w-full" @click="connect({ connector: connector.connector })">
          {{ connector.name }}
        </button>
      </li>
    </ul>
  </BaseModal>
</template>
