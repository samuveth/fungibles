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
  <RouterLink
    :to="token.address"
    class="border rounded hover:scale-[102%] transition-all duration-300 overflow-hidden"
  >
    <div class="h-[120px] bg-cover bg-center" :style="`background-image: url('${token.banner}');`">
      <div class="w-full h-full bg-black bg-opacity-60 p-4 text-white">
        <div class="flex items-center gap-2">
          <img :src="token.logo" class="w-[24px] h-[24px] rounded-full" />
          <h3 class="text-xl">
            <span class="font-semibold"> {{ token.name }} </span>
            <span> / {{ token.symbol }} </span>
          </h3>
        </div>

        <div v-if="tokenPair" class="mt-7 flex flex-col items-end font-semibold">
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
    <div class="px-4 py-3">
      {{ token.about }}
    </div>
  </RouterLink>
</template>
