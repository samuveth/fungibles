<script setup lang="ts">
import { useAccount } from 'use-wagmi'
import { type Address, parseUnits } from 'viem'
import { type Inscription } from '@/helpers/types'
import { useStorage } from '@vueuse/core'
import { sendTokens } from '@/helpers/utils'
import { TOKEN_DECIMALS } from '@/helpers/constants'
import { useAccountsStore } from '@/stores/accounts'

const props = defineProps<{
  inscription: Inscription
}>()

const accountsStore = useAccountsStore()
const { addresses } = useAccount()
const inscriptionsStorage = useStorage<Inscription[]>('fungible-inscriptions', [])

const sending = ref(false)
const sendModalOpen = ref(false)

const sendingAmount = ref(false)
const sendAmountModalOpen = ref(false)

const filteredAddresses = computed(() =>
  addresses.value?.filter((address) => address !== props.inscription.seed.owner)
)

const actions = computed(() => {
  const list = []

  if (props.inscription.seed.isDynamic) {
    list.push({
      label: 'Save Inscription',
      tooltip:
        'Save the inscription of this fungi. This can be used to restore the fungi in the future.',
      action: () => {
        addInscriptionToStorage()
      }
    })

    list.push({
      label: 'Stabilize Fungi',
      tooltip: 'Stabilize this fungi by sending it to another wallet.',
      action: () => {
        sendModalOpen.value = true
      }
    })

    list.push({
      label: 'Send Amount',
      tooltip: 'Send a specific amount of this fungi to another wallet.',
      action: () => {
        sendAmountModalOpen.value = true
      }
    })
  } else {
    list.push({
      label: 'Transfer Fungi',
      tooltip: 'Send this fungi to another wallet.',
      action: () => {
        sendModalOpen.value = true
      }
    })
  }

  return list
})

function addInscriptionToStorage() {
  const storageSeeds = inscriptionsStorage.value.map((inscription) => inscription.seed.seed)
  const storageInscriptions = inscriptionsStorage.value.map((inscription) => inscription.seed.extra)
  if (
    storageSeeds.includes(props.inscription.seed.seed) &&
    storageInscriptions.includes(props.inscription.seed.extra)
  )
    return

  inscriptionsStorage.value = [...inscriptionsStorage.value, ...[props.inscription]]
}

async function send(address: Address) {
  try {
    sending.value = true
    await sendTokens(
      props.inscription.seed.owner,
      address,
      parseUnits(props.inscription.seed.seed.toString(), TOKEN_DECIMALS).toString()
    )
    accountsStore.reload()
  } catch (error) {
    console.error(error)
  } finally {
    sending.value = false
  }
}

async function sendAmount(address: Address, amount: string) {
  try {
    sendingAmount.value = true
    await sendTokens(
      props.inscription.seed.owner,
      address,
      parseUnits(amount, TOKEN_DECIMALS).toString()
    )
    accountsStore.reload()
  } catch (error) {
    console.error(error)
  } finally {
    sendingAmount.value = false
  }
}

onMounted(() => {})
</script>

<template>
  <div class="relative group">
    <div v-html="inscription.svg" />
    <div
      class="absolute top-0 left-0 p-4 w-full opacity-0 group-hover:opacity-100 space-y-2 transition-all duration-300 ease-in-out"
    >
      <div
        v-for="(action, i) in actions"
        :key="i"
        class="tooltip w-full"
        :data-tip="action.tooltip"
        @click="action.action"
      >
        <button class="btn w-full !gap-0">
          {{ action.label }}
          <i-icon-info class="ml-2" />
        </button>
      </div>
    </div>

    <div class="px-3 py-2 border-x border-b border-dashed border-opacity-50">
      <div class="text-md">
        {{ inscription.seed.isDynamic ? 'Dynamic Fungi' : 'Stable Fungi' }}
        {{ inscription.seed.seed }}
      </div>

      <ModalSend
        v-if="filteredAddresses"
        :open="sendModalOpen"
        :filtered-addresses="filteredAddresses"
        :sending="sending"
        @send="send"
        @close="sendModalOpen = false"
      />
      <ModalSend
        v-if="filteredAddresses"
        :open="sendAmountModalOpen"
        :filtered-addresses="filteredAddresses"
        :sending="sendingAmount"
        :max-amount="inscription.seed.seed.toString()"
        @send="sendAmount"
        @close="sendAmountModalOpen = false"
      />
    </div>
  </div>
</template>
