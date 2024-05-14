<script setup lang="ts">
import { type Token } from '@/helpers/types'

const props = defineProps<{
  token: Token
}>()

const tokenPair = ref<any>(null)

async function getTokenPrice(pairAddress: string) {
  try {
    const response = await fetch(`https://api.dexscreener.com/latest/dex/pairs/base/${pairAddress}`)

    const data = await response.json()
    return data.pair
  } catch (error) {
    console.error('Error when getting price:', error)
  }
}

onMounted(async () => {
  const pair = await getTokenPrice(props.token.pairAddress)
  tokenPair.value = pair
})
</script>

<template>
  <RouterLink :to="token.address" class="rounded transition-all duration-300 overflow-hidden">
    <div
      class="h-[120px] bg-cover bg-center relative"
      :style="
        token.banner.startsWith('#')
          ? `background-color: ${token.banner}`
          : `background-image: url('${token.banner}');`
      "
    >
      <div class="w-full h-full bg-black bg-opacity-60 px-3 py-3 text-white">
        <div class="flex items-start gap-2">
          <img
            loading="lazy"
            :src="token.logo"
            alt="logo"
            class="w-[24px] h-[24px] rounded-full mt-0.5"
          />
          <h3 class="text-xl">
            <span class="font-semibold"> {{ token.name }} </span>
            <span> / {{ token.symbol }} </span>
          </h3>
        </div>

        <div
          v-if="tokenPair"
          class="absolute bottom-3 right-4 flex flex-col items-end font-semibold"
        >
          <div class="leading-4">${{ tokenPair.priceUsd }}</div>
          <div
            class="text-xs"
            :class="{
              'text-green-500': tokenPair.priceChange.h6 > 0,
              'text-red-500': tokenPair.priceChange.h6 < 0
            }"
          >
            <span v-if="tokenPair.priceChange.h6 > 0">+</span>
            {{ tokenPair.priceChange.h6 }}%
          </div>
        </div>
      </div>
    </div>
    <div class="px-4 py-3 leading-5 text-sm bg-base-200 h-full">
      {{ token.about }}
    </div>
  </RouterLink>
</template>
