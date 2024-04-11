<script setup lang="ts">
import { isAddress } from 'viem'

defineProps<{
  open: boolean
}>()

const emit = defineEmits(['close', 'send'])

const addressInput = ref('')

function handleSend() {
  emit('send', addressInput.value)
}
</script>

<template>
  <BaseModal title="Send Inscription" :open="open" @close="$emit('close')">
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
      <span> Send </span>
    </button>
  </BaseModal>
</template>
