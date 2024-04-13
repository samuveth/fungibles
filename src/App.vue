<script setup lang="ts">
import { useAccount, useDisconnect, useConnect } from 'use-wagmi'
import { useStorage } from '@vueuse/core'
import { connectors } from '@/helpers/wagmiConfig'
import { shortenAddress } from '@/helpers/utils'
import { type InscriptionNoBigint } from '@/helpers/types'

const { address, isConnected } = useAccount()
const { disconnect } = useDisconnect()
const { connect, isSuccess } = useConnect()
const inscriptionsStorage = useStorage<InscriptionNoBigint[]>('fungibles-inscriptions', [])

const modalOpen = ref(false)
const favoritesModalOpen = ref(false)

function handleAccountClick() {
  if (isConnected.value) {
    disconnect()
  } else {
    modalOpen.value = true
  }
}

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
    <nav class="flex justify-between items-center p-2 border-b">
      <RouterLink to="/">
        <button class="text-xl pl-1.5">fungibles</button>
      </RouterLink>
      <div class="flex items-center gap-2">
        <button
          v-if="!address"
          class="btn btn-primary text-base group min-w-[154px]"
          @click="handleAccountClick"
        >
          <span> Connect </span>
        </button>
        <div v-else class="dropdown dropdown-bottom dropdown-end">
          <div tabindex="0" role="button" class="btn m-1">
            {{ shortenAddress(address) }}
          </div>
          <ul
            tabindex="0"
            class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li><a @click="favoritesModalOpen = true">Saved Inscriptions</a></li>
            <li><a @click="disconnect()">Disconnect</a></li>
          </ul>
        </div>
      </div>
    </nav>
  </header>

  <RouterView />

  <footer class="fixed bottom-0 left-0 right-0 p-2 border-t bg-base-100 flex justify-between">
    <button class="btn btn-outline btn-sm border-0" @click="favoritesModalOpen = true">
      <i-hi-heart-solid class="text-md" />
    </button>
    <div class="flex gap-2">
      <RouterLink to="/about">
        <button class="btn btn-outline btn-sm border-0">
          <i-hi-information-circle class="text-[16px]" />
        </button>
      </RouterLink>
      <a
        href="https://github.com/samuveth/fungibles"
        target="_blank"
        class="btn btn-outline btn-sm border-0"
      >
        <i-icon-github class="text-lg" />
      </a>
      <a
        href="https://twitter.com/samsamlantan"
        target="_blank"
        class="btn btn-outline btn-sm border-0"
      >
        <i-icon-x class="text-md" />
      </a>
    </div>
  </footer>

  <TheToasts />

  <BaseModal title="Connect Wallet" :open="modalOpen" @close="modalOpen = false">
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
    <div v-if="!inscriptionsStorage.length">No saved inscriptions found</div>
    <ul v-else class="w-lg grid grid-cols-3 gap-4">
      <li v-for="(inscription, i) in inscriptionsStorage" :key="i">
        <div v-html="inscription.svg" />
        <div class="px-3 py-2 border-x border-b border-dashed border-opacity-50">
          <div class="text-xl flex items-center gap-1">
            <div class="mt-0.5">
              {{ inscription.seed.seed }}
            </div>
          </div>
        </div>
      </li>
    </ul>
  </BaseModal>

  <ModalTransactionSpending />
  <ModalTransactionPending />
  <ModalTransactionConfirm />
</template>
