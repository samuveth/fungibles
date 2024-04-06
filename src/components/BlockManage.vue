<script setup lang="ts">
import { useAccount } from 'use-wagmi'
import { formatUnits, type Address } from 'viem'
import { TOKEN_DECIMALS } from '@/helpers/constants'
import { useAccountsStore } from '@/stores/accounts'
import { type Inscription } from '@/helpers/types'
import { sendTokens } from '@/helpers/utils'

const props = defineProps<{
  addressIndex: number
}>()

const accountsStore = useAccountsStore()
const { addresses } = useAccount()

const initialized = ref(false)
const sendModalOpen = ref(false)
const sending = ref(false)

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

const filteredAddresses = computed(() =>
  addresses.value?.filter((address) => address !== pickedAddress.value)
)

async function send(address: Address) {
  if (!pickedAddress.value) return
  try {
    sending.value = true
    await sendTokens(pickedAddress.value, address, balanceUnits.value.toString())
    accountsStore.reload()
    sendModalOpen.value = false
  } catch (error) {
    console.error(error)
  } finally {
    sending.value = false
  }
}

watch(
  pickedAddress,
  async () => {
    if (pickedAddress.value) await accountsStore.init(props.addressIndex, pickedAddress.value)
    initialized.value = true
  },
  { immediate: true }
)
</script>

<template>
  <div class="p-4 border">
    <div class="border p-4 border-dashed border-opacity-50">
      <div class="flex justify-between mb-1">
        <h3 class="text-md">Inscriptions {{ inscriptions.length }}</h3>
        <button
          class="text-md flex gap-1 hover:underline cursor-pointer tooltip"
          data-tip="Send fungi"
          @click="sendModalOpen = true"
        >
          {{ balance }}
          <img src="@/../public/favicon1.png" alt="fungi" class="w-6 h-6" />
        </button>
      </div>

      <input
        :value="pickedAddress"
        type="text"
        placeholder="Enter address"
        class="input input-bordered w-full input-sm"
        readonly
      />
    </div>
    <div class="mt-4">
      <div v-if="!initialized" class="justify-center flex">
        <span class="loading loading-spinner loading-sm"></span>
      </div>
      <div v-else-if="!inscriptions.length" class="flex flex-col items-center gap-2">
        <i-hi-face-frown class="text-md" />
        No inscriptions found
      </div>
      <InscriptionList v-else :inscriptions="inscriptions" />
    </div>
    <ModalSend
      v-if="filteredAddresses"
      :open="sendModalOpen"
      :filtered-addresses="filteredAddresses"
      :sending="sending"
      @send="send"
      @close="sendModalOpen = false"
    />
  </div>
</template>
