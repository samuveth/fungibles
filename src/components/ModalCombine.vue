<script setup lang="ts">
import { type Inscription } from '@/helpers/types'

const props = defineProps<{
  open: boolean
  inscriptions: Inscription[]
}>()

const emit = defineEmits(['close', 'combine'])

const tokenStore = useTokenStore()

const selectedInscription = ref<Inscription[]>([])
const combineAll = ref(false)

const handleAddInscription = (inscription: Inscription) => {
  if (combineAll.value) {
    combineAll.value = false
  }
  if (selectedInscription.value.includes(inscription)) {
    selectedInscription.value = selectedInscription.value.filter((i) => i !== inscription)
  } else {
    selectedInscription.value = [...selectedInscription.value, inscription]
  }
}

function handleCombine() {
  const inscriptions = combineAll.value
    ? props.inscriptions.map((i) => i.seed.seed)
    : selectedInscription.value.map((i) => i.seed.seed)
  emit('combine', inscriptions)
  selectedInscription.value = []
}
</script>

<template>
  <BaseModal title="Select Inscriptions" :open="open" @close="$emit('close')">
    <div class="grid grid-cols-1 gap-2 max-h-[400px] overflow-auto mb-2">
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
            {{ inscription.seed.isDynamic ? 'Dynamic' : 'Stable' }}{{ tokenStore.tokenInfo?.name }}
            {{ inscription.seed.seed }}
          </div>
        </div>
      </button>
    </div>
    <div class="form-control">
      <label class="label cursor-pointer">
        <input v-model="combineAll" type="checkbox" class="checkbox" />
        <span class="label-text text-base">Combine all</span>
      </label>
    </div>
    <button
      class="btn btn-primary w-full"
      :disabled="!combineAll && !selectedInscription.length"
      @click="handleCombine()"
    >
      <span> Combine </span>
    </button>
  </BaseModal>
</template>
