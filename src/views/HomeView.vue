<script setup lang="ts">
const tokenStore = useTokenStore()
</script>

<template>
  <main class="px-4 pb-[73px] max-w-6xl mx-auto">
    <HomeBreadcrumbs class="pb-2" />
    <div v-if="tokenStore.tokenAddress && tokenStore.tokenInfo">
      <HomeToken />
    </div>
  </main>
</template>
