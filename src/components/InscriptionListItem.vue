<script setup lang="ts">
import { type Address, parseUnits } from 'viem'
import { type Inscription } from '@/helpers/types'

const props = defineProps<{
  inscription: Inscription
  isOnlyInscription: boolean
}>()

const tokenStore = useTokenStore()
const { sendTokens, stabilizeInscription } = useTransaction()

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

function handleAction(action: string) {
  switch (action) {
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
