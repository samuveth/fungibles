<script setup lang="ts">
import { useAccount } from 'use-wagmi'
import { formatUnits } from 'viem'
import { TOKEN_DECIMALS } from '@/helpers/constants'
import { useAccountStore } from '@/stores/account'
import { combineInscriptions, stabilizeInscription } from '@/helpers/utils'

const accountStore = useAccountStore()
const { address } = useAccount()

const initialized = ref(false)
const loading = ref(false)
const showCombineMultipleModal = ref(false)

const balance = computed(() => {
  if (!accountStore.balanceUnits) return '0'
  return formatUnits(accountStore.balanceUnits, TOKEN_DECIMALS)
})

const hasLessThanOneInscription = computed(() => accountStore.inscriptions.length < 2)

const actions = computed(() => {
  const list = []

  list.push({
    label: 'Combine All',
    tooltip: hasLessThanOneInscription.value
      ? 'Requires two inscriptions'
      : 'Combine all inscriptions into one',
    disabled: hasLessThanOneInscription.value,
    action: () => {
      combineAll(accountStore.inscriptions.reduce((acc, i) => acc + Number(i.seed.seed), 0))
    }
  })

  list.push({
    label: 'Combine Multiple',
    tooltip: hasLessThanOneInscription.value ? 'Requires two inscriptions' : null,
    disabled: hasLessThanOneInscription.value,
    action: () => {
      showCombineMultipleModal.value = true
    }
  })

  return list
})

async function combine(amounts: string[]) {
  if (!address.value) return
  try {
    loading.value = true
    await combineInscriptions(address.value, amounts)
    accountStore.reload()
  } catch (error) {
    console.error(error)
  } finally {
    showCombineMultipleModal.value = false
    loading.value = false
  }
}

async function combineAll(amount: number) {
  if (!address.value) return
  try {
    loading.value = true
    await stabilizeInscription(address.value, amount.toString())
    accountStore.reload()
  } catch (error) {
    console.error(error)
  } finally {
    loading.value = false
  }
}

watch(
  address,
  async () => {
    if (address.value) await accountStore.init(address.value)
    initialized.value = true
  },
  { immediate: true }
)
</script>

<template>
  <div>
    <div class="border border-primary sm:flex justify-between p-4 border-dashed">
      <div class="flex sm:block justify-between">
        <div class="text-md">
          <span class="opacity-60">INSCRIPTIONS</span>
          {{ accountStore.inscriptions.length }}
        </div>
        <div class="text-md">
          <span class="opacity-60">$FUNGI</span>
          {{ balance }}
        </div>
      </div>

      <div class="sm:flex gap-2 space-y-2 mt-2 sm:mt-0 sm:space-y-0">
        <div
          v-for="(action, i) in actions"
          :key="i"
          class="tooltip w-full sm:w-auto"
          :data-tip="action.tooltip"
        >
          <button
            class="btn btn-primary w-full sm:w-auto"
            :disabled="action.disabled"
            @click="action.action()"
          >
            {{ action.label }}
          </button>
        </div>
      </div>
    </div>
    <div class="mt-4">
      <div v-if="!initialized" class="justify-center flex">
        <span class="loading loading-spinner loading-sm"></span>
      </div>
      <div v-else-if="!accountStore.inscriptions.length" class="flex flex-col items-center gap-2">
        <i-hi-face-frown class="text-md" />
        No inscriptions found
      </div>
      <InscriptionList v-else :inscriptions="accountStore.inscriptions" />
    </div>

    <ModalCombine
      :open="showCombineMultipleModal"
      :loading="loading"
      :inscriptions="accountStore.inscriptions"
      @close="showCombineMultipleModal = false"
      @combine="combine"
    />
  </div>
</template>
