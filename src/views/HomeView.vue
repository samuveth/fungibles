<script setup lang="ts">
import { useAccount, useConnect } from 'use-wagmi'
import { connectors } from '@/helpers/wagmiConfig'

const { addresses } = useAccount()
const { connect } = useConnect()
</script>

<template>
  <main class="px-4 pt-4 pb-[73px] max-w-7xl mx-auto">
    <div v-if="addresses?.length" class="grid grid-cols-2 gap-4">
      <BlockManage v-for="(_, i) in addresses.length" :key="i" :addressIndex="i" />
      <div class="p-4 border">
        <div class="border p-4 border-dashed border-opacity-50 space-y-2">
          <h3 class="text-lg">Connect more accounts</h3>
          <p v-if="addresses.length < 2">
            A minimum of 2 accounts is required to send fungi back and forth between them.
          </p>
          <p>
            You can connect as many accounts as you like. Connect and select all the accounts you
            want to use in your wallet.
          </p>
          <button class="btn btn-primary mt-4" @click="connect({ connector: connectors[0] })">
            Connect
          </button>
        </div>
      </div>
    </div>
    <div v-else class="max-w-4xl mx-auto">
      <article class="space-y-3">
        <h2 class="text-2xl">Welcome to fungible.xyz</h2>
        <p>Fungible.xyz is an interface for you to generate and manage your $FUNGI.</p>

        <h3 class="text-xl pt-6">Connect Accounts</h3>
        <div class="flex gap-4">
          <img src="@/../public/metamaskaccounts.png" alt="metamaskaccounts" class="w-1/3" />
          <div class="space-y-3">
            <p>
              Connect your wallet to start generating fungi. A minimum of 2 accounts is required to
              send fungi back and forth between them.
            </p>
            <p>
              We recommend using MetaMask, as some other wallets might not support connecting
              multiple accounts at once. Connect and select all the accounts you want to use in your
              wallet.
            </p>
          </div>
        </div>
      </article>
    </div>
  </main>
</template>
