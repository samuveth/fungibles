<script setup lang="ts">
import { useAccount, useDisconnect, useConnect } from 'use-wagmi'
import { useStorage } from '@vueuse/core'
import { connectors } from '@/helpers/wagmiConfig'
import { shortenAddress } from '@/helpers/utils'
import { type Inscription } from '@/helpers/types'

const { address, isConnected } = useAccount()
const { disconnect } = useDisconnect()
const { connect, isSuccess } = useConnect()
const inscriptionsStorage = useStorage<Inscription[]>('fungible-inscriptions', [])

const modalOpen = ref(false)
const favoritesModalOpen = ref(false)

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

function isMobile() {
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    return true
  } else {
    return false
  }
}
</script>

<template>
  <template v-if="!isMobile()">
    <header>
      <nav class="flex justify-between items-center px-4 py-3 border-b">
        <h1 class="text-lg">fungible.xyz</h1>
        <div class="flex items-center gap-2">
          <button v-if="address" class="btn btn-outline" @click="favoritesModalOpen = true">
            <i-icon-heart class="text-md" />
          </button>
          <button class="btn btn-primary btn-outline text-base" @click="handleAccountClick">
            <span>
              {{ accountText }}
            </span>
          </button>
        </div>
      </nav>
    </header>

    <RouterView />

    <BaseModal title="Connect Wallet" :open="modalOpen" @close="modalOpen = false">
      <div role="alert" class="alert alert-info">
        <span
          >Currently only support for wallets like Metamask that have the ability to connect
          multiple accounts at once.</span
        >
      </div>
      <ul class="space-y-2 mt-4">
        <li v-for="connector in connectorsList" :key="connector.name">
          <button class="btn w-full" @click="connect({ connector: connector.connector })">
            {{ connector.name }}
          </button>
        </li>
      </ul>
    </BaseModal>
    <BaseModal
      title="Saved Inscriptions"
      :open="favoritesModalOpen"
      width="lg"
      @close="favoritesModalOpen = false"
    >
      <ul class="w-lg grid grid-cols-3 gap-4">
        <div v-if="!inscriptionsStorage.length">No saved inscriptions found</div>
        <div v-else>
          <li v-for="(inscription, i) in inscriptionsStorage" :key="i">
            <div v-html="inscription.svg" />
            <div class="px-3 py-2 border-x border-b border-dashed border-opacity-50">
              <div class="text-xl flex items-center gap-1">
                <div class="mt-0.5">
                  <span class="opacity-60"> Amount: </span>
                  {{ inscription.seed.seed }}
                </div>
                <img src="@/../public/favicon1.png" alt="fungi" class="w-6 h-6" />
              </div>
              <div class="text-xl">
                <span class="opacity-60"> Addresss: </span>
                {{ shortenAddress(inscription.seed.owner) }}
              </div>
            </div>
          </li>
        </div>
      </ul>
    </BaseModal>
  </template>
  <div v-else class="p-4">
    Mobile is currently not supported, please use a desktop browser with Metamask wallet.
  </div>
</template>
