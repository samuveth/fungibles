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
            <li><a @click="disconnect()">Disconnect</a></li>
          </ul>
        </div>
      </div>
    </nav>
  </header>

  <RouterView />

  <!-- <footer class="fixed bottom-0 left-0 right-0 p-2 border-t bg-base-100 flex justify-between">
    <button
      class="btn btn-outline btn-sm border-0"
      @click="modalStore.savedInscriptionsOpen = true"
    >
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
  </footer> -->

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
</template>
