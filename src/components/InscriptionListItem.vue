<script setup lang="ts">
import { type Address, parseUnits } from 'viem'
import { type InscriptionNoBigint, type Inscription } from '@/helpers/types'
import { useStorage } from '@vueuse/core'

const props = defineProps<{
  inscription: Inscription
  isOnlyInscription: boolean
}>()

const { addMessage } = useToastStore()
const inscriptionsStorage = useStorage<InscriptionNoBigint[]>('fungibles-inscriptions', [])
const { sendTokens, stabilizeInscription } = useTransaction()
const tokenStore = useTokenStore()

const sendModalOpen = ref(false)
const actionModalOpen = ref(false)

async function handleStabilize() {
  actionModalOpen.value = false
  await stabilizeInscription(props.inscription.seed.owner, props.inscription.seed.seed)
}

async function send(address: Address) {
  sendModalOpen.value = false
  await sendTokens(
    props.inscription.seed.owner,
    address,
    parseUnits(props.inscription.seed.seed.toString(), tokenStore.tokenDecimals).toString()
  )
}

function addInscriptionToStorage() {
  const storageSeeds = inscriptionsStorage.value.map((inscription) =>
    inscription.seed.seed.toString()
  )
  if (storageSeeds.includes(props.inscription.seed.seed.toString())) {
    addMessage('Inscription is already saved.')
    return
  }

  const inscriptionToString = {
    ...props.inscription,
    seed: {
      ...props.inscription.seed,
      seed: props.inscription.seed.seed.toString(),
      extra: props.inscription.seed.extra.toString()
    }
  }

  inscriptionsStorage.value = [...inscriptionsStorage.value, ...[inscriptionToString]]
  addMessage('Inscription has been saved.')
}

function handleAction(action: string) {
  switch (action) {
    case 'save':
      addInscriptionToStorage()
      break
    case 'transfer':
      sendModalOpen.value = true
      break
    case 'stabilize':
      handleStabilize()
      break
  }
}
</script>

<template>
  <button @click="actionModalOpen = true">
    <BaseInscription :inscription="inscription" />
  </button>
  <ModalSend :open="sendModalOpen" @send="send" @close="sendModalOpen = false" />

  <ModalActions
    :open="actionModalOpen"
    :inscription="inscription"
    @action="handleAction"
    @close="actionModalOpen = false"
  />
</template>
