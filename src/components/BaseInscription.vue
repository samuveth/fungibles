<script setup lang="ts">
import { type Inscription } from '@/helpers/types'
const tokenStore = useTokenStore()

defineProps<{
  inscription: Inscription
}>()

const notSupportedPng = ['jelli', 'froggi']
</script>

<template>
  <div class="hover:scale-[102%] transition-all duration-300 w-full rounded-t overflow-hidden">
    <div
      v-if="notSupportedPng.includes(tokenStore.tokenInfo?.key || '')"
      v-html="inscription.svg"
    />
    <ImagePng v-else :svgString="inscription.svg" />

    <div class="px-3 py-2 border-x border-b rounded-b">
      <div class="sm:flex justify-between items-center">
        <div class="font-semibold">
          {{ inscription.seed.seed }}
          {{ tokenStore.tokenInfo?.symbol }}
        </div>
      </div>
    </div>
  </div>
</template>
