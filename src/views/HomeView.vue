<script setup lang="ts">
import tokens from '@/helpers/tokens.json'

const tokenStore = useTokenStore()
</script>

<template>
  <main class="px-4 pb-[73px] max-w-6xl mx-auto">
    <div v-if="tokenStore.tokenAddress && tokenStore.tokenInfo">
      <HomeBreadcrumbs class="pb-2" />
      <HomeToken />
    </div>
    <div v-else class="mt-4">
      <div class="bg-base-200 rounded py-8 text-center px-4">
        <h1 class="text-4xl">fungibles</h1>
        <p class="max-w-xl mx-auto mt-4">Manage all your ERC-20i inscriptions in one place.</p>
      </div>
      <div class="mt-6">
        <h2 class="text-xl font-semibold">Discover</h2>
        <div class="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 mt-2 gap-4">
          <HomeDiscoverListItem v-for="token in tokens" :key="token.address" :token="token" />
        </div>
      </div>
    </div>
  </main>
</template>
