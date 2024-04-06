<script setup lang="ts">
import { type Address } from 'viem'
import { shortenAddress } from '@/helpers/utils'

const props = defineProps<{
  open: boolean
  filteredAddresses: Address[]
  sending: boolean
  maxAmount?: string
}>()

const emit = defineEmits(['close', 'send'])

const amount = ref('')

const isGreaterThanMaxAmount = computed(() => {
  if (!props.maxAmount) return false
  return amount.value && Number(amount.value) > Number(props.maxAmount)
})

function send(address: Address) {
  if (!props.maxAmount) emit('send', address)
  if (!amount.value || isGreaterThanMaxAmount.value) return
  emit('send', address, amount.value.toString())
}
</script>

<template>
  <BaseModal title="Select address" :open="open" @close="$emit('close')">
    <div v-if="maxAmount" class="mb-4">
      <input
        v-model="amount"
        type="number"
        placeholder="Enter amount"
        class="input input-bordered w-full input-sm mb-1"
        :class="{ 'input-error': isGreaterThanMaxAmount }"
      />
      <div v-if="isGreaterThanMaxAmount" class="text-sm text-red-400">
        Enter amount less or equal to dynamic fungi amount
      </div>
    </div>

    <div v-if="filteredAddresses && filteredAddresses.length" class="space-y-3">
      <div
        v-for="address in filteredAddresses"
        :key="address"
        class="flex justify-between items-center border border-dashed p-2"
      >
        {{ shortenAddress(address) }}
        <div>
          <button class="btn btn-sm min-w-20" @click="send(address)">
            <span v-if="sending" class="loading loading-spinner loading-xs"></span>
            <span v-else> Send </span>
          </button>
        </div>
      </div>
    </div>
    <div v-else>Connect another account to send this fungi.</div>
  </BaseModal>
</template>
