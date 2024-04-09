<script setup lang="ts">
import { isAddress } from 'viem'

defineProps<{
  open: boolean
  loading: boolean
}>()

const emit = defineEmits(['close', 'send'])

const addressInput = ref('')

function handleSend() {
  emit('send', addressInput.value)
}
</script>

<template>
  <BaseModal title="Generation Settings" :open="open" @close="$emit('close')">
    <div class="mb-4">
      <input
        v-model="addressInput"
        type="string"
        placeholder="Recipient address"
        class="input input-bordered w-full"
      />
    </div>

    <button
      class="btn btn-primary w-full"
      :disabled="!isAddress(addressInput.toLowerCase())"
      @click="handleSend()"
    >
      <span v-if="loading" class="loading loading-spinner loading-sm"></span>
      <span v-else> Send </span>
    </button>
  </BaseModal>
</template>
