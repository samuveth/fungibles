<script setup lang="ts">
import tokens from '@/helpers/tokens.json'

const tokenStore = useTokenStore()
</script>

<template>
  <div class="px-4 max-w-6xl mx-auto mb-28">
    <div v-if="tokenStore.tokenAddress && tokenStore.tokenInfo">
      <HomeBreadcrumbs class="pb-2" />
      <HomeToken />
    </div>
    <template v-else>
      <div class="bg-base-200 rounded py-20 mt-16 text-center px-4">
        <h1 class="text-4xl font-semibold">Universal ERC-20 Inscription Manager</h1>
        <div class="max-w-xl mx-auto">
          <p class="mt-4">Easily stabilize and store your inscriptions</p>
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
