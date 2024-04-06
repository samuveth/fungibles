<script setup lang="ts">
import { type Address } from 'viem'
import { shortenAddress } from '@/helpers/utils'

defineProps<{
  open: boolean
  filteredAddresses: Address[]
  sending: boolean
}>()

defineEmits(['close', 'send'])
</script>

<template>
  <BaseModal title="Select address" :open="open" @close="$emit('close')">
    <div v-if="filteredAddresses && filteredAddresses.length" class="space-y-3">
      <div
        v-for="address in filteredAddresses"
        :key="address"
        class="flex justify-between items-center border border-dashed p-2"
      >
        {{ shortenAddress(address) }}
        <div>
          <button class="btn btn-sm min-w-20" @click="$emit('send', address)">
            <span v-if="sending" class="loading loading-spinner loading-xs"></span>
            <span v-else> Send </span>
          </button>
        </div>
      </div>
    </div>
    <div v-else>Connect another account to send this fungi.</div>
  </BaseModal>
</template>
