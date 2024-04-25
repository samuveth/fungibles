<script setup lang="ts">
import { type Inscription } from '@/helpers/types'

defineProps<{
  open: boolean
  inscriptions: Inscription[]
}>()

const emit = defineEmits(['close', 'sendMultiple'])

const tokenStore = useTokenStore()

const addressInput = ref('')
const selectedInscription = ref<Inscription[]>([])

const handleAddInscription = (inscription: Inscription) => {
  if (selectedInscription.value.includes(inscription)) {
    selectedInscription.value = selectedInscription.value.filter((i) => i !== inscription)
  } else {
    selectedInscription.value = [...selectedInscription.value, inscription]
  }
}

function handleSendMultiple() {
  emit(
    'sendMultiple',
    addressInput.value,
    selectedInscription.value.map((i) => i.seed.seed)
  )
  selectedInscription.value = []
  addressInput.value = ''
}
</script>

<template>
  <BaseModal title="Select Inscriptions" :open="open" @close="$emit('close')">
    <div class="grid grid-cols-2 gap-2 max-h-[400px] overflow-auto mb-2">
      <button
        v-for="(inscription, i) in inscriptions"
        :key="i"
        @click="handleAddInscription(inscription)"
        class="border m-[1px]"
        :class="{ 'border-2 !m-0 border-primary': selectedInscription.includes(inscription) }"
      >
        <div>
          <div v-html="inscription.svg" class="w-full shrink-0" />
          <div class="py-2 px-3 w-full">
            {{ tokenStore.tokenInfo?.name }}
            {{ inscription.seed.seed }}
          </div>
        </div>
      </button>
    </div>
    <div class="mb-2 mt-4">
      <input
        v-model="addressInput"
        type="string"
        placeholder="Recipient address"
        class="input input-bordered w-full"
      />
    </div>
    <button
      class="btn btn-primary w-full"
      :disabled="selectedInscription.length < 2 || !addressInput"
      @click="handleSendMultiple()"
    >
      <span> Send </span>
    </button>
  </BaseModal>
</template>
