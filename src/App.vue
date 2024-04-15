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
  <div class="min-h-dvh flex flex-col">
    <header>
      <nav class="flex justify-between items-center p-2 border-b">
        <RouterLink to="/">
          <button class="text-xl pl-1.5">fungibles</button>
        </RouterLink>
        <div class="flex items-center">
          <div>
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
        </div>
      </nav>
    </header>

    <RouterView class="flex-grow w-full" />

    <footer v-if="!$route.params.address" class="footer px-4 py-10 bg-base-200">
      <aside class="gap-0">
        <div class="flex items-center gap-1">
          Donate to our community Safe
          <div class="tooltip" data-tip="Todd, BLK and Sam are the signers of the Safe.">
            <i-hi-information-circle class="" />
          </div>
        </div>
        base:0xA7e80a06d0cB623A8E9B18f8675D0730Bba70089
      </aside>
      <nav>
        <h6 class="footer-title">Navigation</h6>
        <RouterLink to="/" class="link link-hover">Home</RouterLink>
        <RouterLink to="/about" class="link link-hover">About</RouterLink>
      </nav>
      <nav>
        <h6 class="footer-title">Links</h6>
        <div class="grid grid-flow-col items-center gap-4">
          <a href="https://github.com/samuveth/fungibles" target="_blank">
            <i-icon-github class="text-[25px]" />
          </a>
          <a href="https://twitter.com/samsamlantan" target="_blank">
            <i-icon-x class="text-[22px]" />
          </a>
          <a href="https://t.me/Fungi_ERC20i" target="_blank">
            <i-icon-telegram class="text-[25px]" />
          </a>
        </div>
      </nav>
    </footer>
  </div>

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
