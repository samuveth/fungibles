<script setup lang="ts">
import { type Inscription } from '@/helpers/types'

defineProps<{
  inscriptions: Inscription[]
}>()
</script>

<template>
  <div class="grid grid-cols-2 gap-4">
    <div v-for="inscription in inscriptions" :key="inscription.seed.seed">
      <InscriptionListItem :inscription="inscription" />
    </div>

    <!-- <template v-if="isLoading">
      <div v-for="n in 4" :key="n" class="inscription-list__item --loading">
        <UniversalImage src="/images/fungi/logo.png" class="inscription-list__item-icon" />

        <div class="inscription-list__item-info">
          <div class="inscription-list__item-title">Fungi</div>
        </div>
      </div>
    </template> -->
  </div>
</template>
