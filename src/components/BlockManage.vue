<script setup lang="ts">
import { useAccount } from 'use-wagmi'
import { formatUnits } from 'viem'
import { TOKEN_DECIMALS } from '@/helpers/constants'

const accountStore = useAccountStore()
const { address } = useAccount()
const { combineInscriptions, generateInscriptions } = useTransaction()

const showCombineMultipleModal = ref(false)
const generateModalOpen = ref(false)

const balance = computed(() => {
  if (!accountStore.balanceUnits) return '0'
  return formatUnits(accountStore.balanceUnits, TOKEN_DECIMALS)
})

const dynamicInscription = computed(() => accountStore.inscriptions.find((i) => i.seed.isDynamic))

const hasLessThanOneInscription = computed(() => accountStore.inscriptions.length < 2)

const actions = computed(() => {
  const list = []

  list.push({
    label: 'Combine Inscriptions',
    tooltip: hasLessThanOneInscription.value ? 'Requires two inscriptions' : null,
    disabled: hasLessThanOneInscription.value,
    action: () => {
      showCombineMultipleModal.value = true
    }
  })

  list.push({
    label: 'Generate Inscriptions',
    tooltip: generateTooltip.value,
    action: () => {
      generateModalOpen.value = true
    },
    disabled: !dynamicInscription.value || dynamicInscription.value.seed.seed < 2n
  })

  return list
})

const generateTooltip = computed(() => {
  if (!dynamicInscription.value) return 'No dynamic inscription found'
  if (dynamicInscription.value.seed.seed < 2n) return 'Minimum dynamic 2'
  return null
})

async function handleCombine(amounts: bigint[]) {
  if (!address.value) return

  showCombineMultipleModal.value = false
  await combineInscriptions(address.value, amounts)
}

async function handleGenerate(amounts: string[]) {
  if (!dynamicInscription.value) return
  generateModalOpen.value = false
  await generateInscriptions(
    dynamicInscription.value.seed.owner,
    amounts,
    dynamicInscription.value.seed.seed
  )
}

watch(
  address,
  async () => {
    if (address.value) accountStore.init(address.value)
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
          <span class="opacity-60">BALANCE</span>
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
      <div v-if="!accountStore.initialized" class="justify-center flex">
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
      :inscriptions="accountStore.inscriptions"
      @close="showCombineMultipleModal = false"
      @combine="handleCombine"
    />
    <ModalGenerate
      v-if="dynamicInscription"
      :open="generateModalOpen"
      :inscription="dynamicInscription"
      @close="generateModalOpen = false"
      @generate="handleGenerate"
    />
  </div>
</template>
