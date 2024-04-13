<script setup lang="ts">
import { useStorage } from '@vueuse/core'
import { type InscriptionNoBigint } from '@/helpers/types'

const modalStore = useModalStore()

const inscriptionsStorage = useStorage<InscriptionNoBigint[]>('fungibles-inscriptions', [])
</script>

<template>
  <BaseModal
    title="Saved Inscriptions"
    :open="modalStore.savedInscriptionsOpen"
    width="lg"
    @close="modalStore.savedInscriptionsOpen = false"
  >
    <div v-if="!inscriptionsStorage.length">No saved inscriptions found</div>
    <div v-else class="grid sm:grid-cols-3 gap-4">
      <BaseInscription
        v-for="(inscription, i) in inscriptionsStorage"
        :key="i"
        :inscription="inscription"
      />
    </div>
  </BaseModal>
</template>
