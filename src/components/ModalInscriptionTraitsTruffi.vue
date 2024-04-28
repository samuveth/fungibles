<script setup lang="ts">
import { type Inscription } from '@/helpers/types'

const props = defineProps<{
  inscription: Inscription
}>()

const metaStringsToEnd = computed(() => {
  const meta = props.inscription.meta
  meta.size = Number(meta.size)
  if (meta.dotsColor === meta.capColor) meta.dotsColor = 'none'
  const strings = Object.entries(meta).filter(([key, value]) => typeof value === 'string')
  const nonStrings = Object.entries(meta).filter(([key, value]) => typeof value !== 'string')
  return Object.fromEntries([...nonStrings, ...strings])
})

function getKeyText(key: string) {
  const keyNames: any = {
    skyType: 'Sky',
    midType: 'Mid',
    frontType: 'Front',
    faceType: 'Face',
    bodyType: 'Body',
    capType: 'Cap',
    size: 'Size',
    backgroundColor: 'Sky Color',
    midColor: 'Mid Color',
    frontColor: 'Front Color',
    bodyColor: 'Body Color',
    capColor: 'Cap Color',
    dotsColor: 'Dots Color'
  }
  return keyNames[key] || key
}

function getRarityText(rarity: number) {
  const rarities: any = {
    0: 'common',
    1: 'uncommon',
    2: 'rare',
    3: 'epic',
    4: 'legendary'
  }
  return rarities[rarity] || rarity
}

const rarityColors: any = {
  0: '#9e9e9e',
  1: '#0ead38',
  2: '#0248f7',
  3: '#9b21f3',
  4: '#ff9800'
}
</script>

<template>
  <table class="table-auto w-full">
    <tbody>
      <tr v-for="(value, key, i) in metaStringsToEnd" :key="i">
        <td class="font-semibold pr-3">
          {{ getKeyText(key as string) }}
        </td>
        <td>
          <div
            v-if="(typeof value === 'string' && value?.startsWith('#')) || value == 'none'"
            class="flex items-center gap-1"
          >
            <div v-if="value == 'none'">None</div>
            <span v-else>
              {{ value }}
            </span>
          </div>
          <span v-else>
            <div
              class="badge badge-outline rounded-full border-none text-white"
              :style="{
                backgroundColor: rarityColors[value]
              }"
            >
              {{ getRarityText(value) }}
            </div>
          </span>
        </td>
      </tr>
    </tbody>
  </table>
</template>
