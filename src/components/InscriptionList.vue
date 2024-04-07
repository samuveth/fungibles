<script setup lang="ts">
import { type Inscription } from '@/helpers/types'

defineProps<{
  inscriptions: Inscription[]
}>()
</script>

<template>
  <div class="grid grid-cols-2 gap-4">
    <div v-for="inscription in inscriptions" :key="inscription.seed.seed">
      <InscriptionListItem
        :inscription="inscription"
        :is-only-inscription="inscriptions.length < 2"
      />
    </div>
  </div>
</template>
