<script setup lang="ts">
import { type Inscription } from '@/helpers/types'

const props = defineProps<{
  open: boolean
  inscription: Inscription
}>()

const emit = defineEmits(['close', 'generate'])

const selectedStrategy = ref('single')
const range = ref(['', ''])
const singleAmount = ref('')

const generatedRange = computed(() => {
  return range.value[0] && range.value[1]
    ? Array.from(
        { length: Number(range.value[1]) - Number(range.value[0]) + 1 },
        (_, i) => i + range.value[0]
      ).map((i) => i.toString())
    : []
})

const validationMessages = computed(() => {
  if (selectedStrategy.value === 'range') {
    if (range.value[0] && range.value[1] && Number(range.value[0]) >= Number(range.value[1])) {
      return ['The second number must be greater than the first']
    }
    const rangeTotalSum = generatedRange.value.reduce((acc, curr) => acc + Number(curr), 0)
    if (Number(props.inscription.seed.seed) < rangeTotalSum) {
      return [
        `The sum of the range (${rangeTotalSum}) must be less than the seed (${props.inscription.seed.seed})`
      ]
    }
  }
  if (selectedStrategy.value === 'single') {
    if (Number(singleAmount.value) >= Number(props.inscription.seed.seed))
      return ['The amount must be less than the dynamic inscription seed']
  }
  return []
})

const amounts = computed(() => {
  if (selectedStrategy.value === 'range' && generatedRange.value.length > 0) {
    return generatedRange.value
  }
  return null
})

function handleGenerate() {
  if (selectedStrategy.value === 'single') emit('generate', [singleAmount.value.toString()])
  if (selectedStrategy.value === 'range') emit('generate', amounts.value)
}
</script>

<template>
  <BaseModal title="Generation Settings" :open="open" @close="$emit('close')">
    <div class="mb-6">
      <label class="form-control w-full">
        <div class="label">
          <span class="label-text">Select Strategy</span>
        </div>
        <select v-model="selectedStrategy" class="select select-bordered select-sm">
          <option value="single">Single</option>
          <option value="range">Range</option>
        </select>
      </label>
      <div v-if="selectedStrategy === 'single'" class="flex gap-2 mt-2">
        <input
          v-model="singleAmount"
          type="number"
          placeholder="100"
          class="input input-sm input-bordered w-full"
        />
      </div>
      <div v-if="selectedStrategy === 'range'" class="flex gap-2 mt-2">
        <input
          v-model="range[0]"
          type="number"
          placeholder="1"
          class="input input-sm input-bordered w-full"
        />
        <input
          v-model="range[1]"
          type="number"
          placeholder="10"
          class="input input-sm input-bordered w-full"
        />
      </div>
    </div>
    <div v-if="validationMessages[0]" role="alert" class="alert alert-error mb-2">
      {{ validationMessages[0] }}
    </div>
    <button
      class="btn btn-primary w-full"
      :disabled="!!validationMessages[0]"
      @click="handleGenerate()"
    >
      <span> Generate </span>
    </button>
  </BaseModal>
</template>
