<script setup lang="ts">
import { useAccount } from 'use-wagmi'
import { formatUnits } from 'viem'
import { TOKEN_DECIMALS } from '@/helpers/constants'
import { useAccountsStore } from '@/stores/accounts'
import { type Inscription } from '@/helpers/types'

const props = defineProps<{
  addressIndex: number
}>()

const accountsStore = useAccountsStore()
const { addresses } = useAccount()

const pickedAddress = computed(() => addresses.value?.[props.addressIndex])
const balanceUnits = computed({
  get: () => accountsStore.balanceUnits[props.addressIndex] || 0n,
  set: (value: bigint) => (accountsStore.balanceUnits[props.addressIndex] = value)
})
const inscriptions = computed({
  get: () => accountsStore.inscriptions[props.addressIndex] || [],
  set: (value: Inscription[]) => (accountsStore.inscriptions[props.addressIndex] = value)
})

const balance = computed(() => {
  if (!balanceUnits.value) return '0'
  return formatUnits(balanceUnits.value, TOKEN_DECIMALS)
})

watch(
  pickedAddress,
  async () => {
    if (pickedAddress.value) accountsStore.init(props.addressIndex, pickedAddress.value)
  },
  { immediate: true }
)
</script>

<template>
  <div class="p-4 border min-h-[560px]">
    <div class="border p-4 border-dashed border-opacity-50">
      <div class="flex justify-between mb-1">
        <h3 class="text-lg">Inscriptions {{ inscriptions.length }}</h3>
        <div class="text-lg flex gap-1">
          {{ balance }}
          <img src="@/../public/favicon.png" alt="fungi" class="w-6 h-6" />
        </div>
      </div>

      <input
        :value="pickedAddress"
        type="text"
        placeholder="Enter address"
        class="input input-bordered w-full"
        readonly
      />
    </div>
    <div class="mt-4">
      <div v-if="!inscriptions.length" class="flex flex-col items-center gap-2">
        <i-hi-face-frown class="text-lg" />
        No inscriptions found
      </div>
      <InscriptionList :isLoading="false" :inscriptions="inscriptions" />
    </div>

    <div></div>
    <div></div>
    <div></div>
  </div>
</template>
