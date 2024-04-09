<script setup lang="ts">
import { type Inscription } from '@/helpers/types'

defineProps<{
  open: boolean
  loading: boolean
  inscriptions: Inscription[]
}>()

const emit = defineEmits(['close', 'combine'])

const selectedInscription = ref<Inscription[]>([])

const handleAddInscription = (inscription: Inscription) => {
  if (selectedInscription.value.includes(inscription)) {
    selectedInscription.value = selectedInscription.value.filter((i) => i !== inscription)
  } else {
    selectedInscription.value = [...selectedInscription.value, inscription]
  }
}

function handleCombine() {
  emit(
    'combine',
    selectedInscription.value.map((i) => i.seed.seed)
  )
}
</script>

<template>
  <BaseModal title="Select Inscriptions" :open="open" @close="$emit('close')">
    <div class="grid grid-cols-1 gap-2 max-h-[400px] overflow-auto mb-4">
      <button
        v-for="(inscription, i) in inscriptions"
        :key="i"
        @click="handleAddInscription(inscription)"
        class="border m-[1px]"
        :class="{ 'border-2 !m-0 border-primary': selectedInscription.includes(inscription) }"
      >
        <div class="flex text-left">
          <div v-html="inscription.svg" class="w-20 shrink-0" />
          <div class="py-2 px-3 w-full">
            {{ inscription.seed.isDynamic ? 'Dynamic Fungi' : 'Stable Fungi' }}
            {{ inscription.seed.seed }}
          </div>
        </div>
      </button>
    </div>
    <button
      class="btn btn-primary w-full"
      :disabled="!selectedInscription.length"
      @click="handleCombine()"
    >
      <span v-if="loading" class="loading loading-spinner loading-sm"></span>
      <span v-else> Combine </span>
    </button>
  </BaseModal>
</template>
