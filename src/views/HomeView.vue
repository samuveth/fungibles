<script setup lang="ts">
import { useAccount } from 'use-wagmi'

const { address } = useAccount()
</script>

<template>
  <main class="px-4 pt-4 pb-[73px] max-w-7xl mx-auto">
    <div v-if="address">
      <BlockManage />
    </div>
    <div v-else class="max-w-4xl mx-auto">
      <div role="alert" class="alert alert-warning mb-4">
        <i-icon-info />
        <span class="mt-0.5"
          >Currently in beta. Use with caution! Please provide any feedback you have
          <a href="https://tally.so/r/n9W0zV" target="_blank" class="underline">here</a>.</span
        >
      </div>
      Connect your wallet to manage your fungibles.
    </div>
  </main>
</template>
