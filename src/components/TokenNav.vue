<script setup lang="ts">
import tokens from '@/helpers/tokens.json'

const tokenStore = useTokenStore()
</script>

<template>
  <div class="flex flex-wrap gap-2 pt-2 rounded-lg">
    <RouterLink
      v-for="token in tokens"
      :to="`/${token.address}`"
      :key="token.address"
      class="btn gap-2 sm:min-w-[120px] justify-start"
      :class="{
        'btn-ghost': token.address.toLowerCase() !== tokenStore.tokenAddress,
        'btn-primary': token.address.toLowerCase() === tokenStore.tokenAddress
      }"
    >
      <img :src="token.logo" :alt="token.name" class="w-6 h-6 rounded-full" />
      <span class="hidden sm:inline">{{ token.name }}</span>
    </RouterLink>
  </div>
</template>
