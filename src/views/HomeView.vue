<script setup lang="ts">
import tokens from '@/helpers/tokens.json'
import { TELEGRAM_URL } from '@/helpers/constants'

const tokenStore = useTokenStore()
</script>

<template>
  <div class="px-4 max-w-6xl mx-auto py-4">
    <div v-if="tokenStore.tokenAddress && tokenStore.tokenInfo">
      <HomeBreadcrumbs class="pb-2" />
      <HomeToken />
    </div>
    <template v-else>
      <div class="bg-base-200 rounded py-20 text-center px-4">
        <a :href="TELEGRAM_URL" target="_blank" class="btn btn-outline btn-sm rounded-full">
          Join the Telegram<i-hi-arrow-top-right-on-square-20-solid class="text-xs" />
        </a>
        <h1 class="text-4xl font-semibold mt-8">Your ERC-20 Inscription Generator</h1>
        <div class="max-w-xl mx-auto">
          <p class="mt-4">Generate hundreds of inscriptions in a matter of seconds</p>
        </div>
      </div>
      <div class="mt-10">
        <h2 class="text-lg font-semibold mb-2">DISCOVER</h2>
        <div class="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4">
          <HomeDiscoverListItem v-for="token in tokens" :key="token.address" :token="token" />
        </div>
      </div>

      <HomeFaq />
    </template>
  </div>
</template>
