<script setup lang="ts">
import { useStorage } from '@vueuse/core'
import { type InscriptionNoBigint } from '@/helpers/types'

const modalStore = useModalStore()
const tokenStore = useTokenStore()

const inscriptionsStorage = useStorage<Record<string, InscriptionNoBigint[]>>(
  'fungibles-inscriptions',
  {}
)

const inscriptionsStorageByToken = computed(
  () => inscriptionsStorage.value[tokenStore.tokenAddress] ?? []
)
</script>

<template>
  <BaseModal
    title="Saved Inscriptions"
    :open="modalStore.savedInscriptionsOpen"
    width="lg"
    @close="modalStore.savedInscriptionsOpen = false"
  >
    <div v-if="!inscriptionsStorageByToken.length">No saved inscriptions found</div>
    <div v-else class="grid sm:grid-cols-3 gap-4">
      <BaseInscription
        v-for="(inscription, i) in inscriptionsStorageByToken"
        :key="i"
        :inscription="inscription"
      />
    </div>
  </BaseModal>
</template>
