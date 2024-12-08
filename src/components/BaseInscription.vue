<script setup lang="ts">
import { type Inscription } from '@/helpers/types'

const tokenStore = useTokenStore()

defineProps<{
  inscription: Inscription
  animated?: boolean
}>()

const NOT_SUPPORTED_PNG = ['jelli', 'froggi', 'truffi']

const isFroggi = computed(() => tokenStore.tokenInfo?.key === 'froggi')
</script>

<template>
  <div>
    <InscriptionFroggi v-if="isFroggi" :inscription="inscription" :animated="animated" />

    <div v-else>
      <div
        v-if="NOT_SUPPORTED_PNG.includes(tokenStore.tokenInfo?.key || '')"
        v-html="animated ? inscription.animatedSvg : inscription.svg"
      />
      <ImagePng v-else :svgString="inscription.svg" />
    </div>
  </div>
</template>
