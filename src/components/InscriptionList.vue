<script setup lang="ts">
import { type Inscription } from '@/helpers/types'

defineProps<{
  inscriptions: Inscription[]
}>()
</script>

<template>
  <div class="grid grid-cols-2 sm:grid-cols-3 gap-4">
    <div v-for="(inscription, i) in inscriptions" :key="i">
      <InscriptionListItem
        v-if="inscription.svg"
        :inscription="inscription"
        :is-only-inscription="inscriptions.length < 2"
      />
    </div>
  </div>
</template>
