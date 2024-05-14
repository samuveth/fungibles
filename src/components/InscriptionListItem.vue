<script setup lang="ts">
import { type Address, parseUnits } from 'viem'
import { type Inscription } from '@/helpers/types'

const props = defineProps<{
  inscription: Inscription
  isOnlyInscription: boolean
}>()

const tokenStore = useTokenStore()
const { sendInscription, stabilizeInscription, destabilizeInscription } = useTransaction()

const sendModalOpen = ref(false)
const actionModalOpen = ref(false)
const modalOpen = ref(false)

async function handleStabilize() {
  actionModalOpen.value = false
  modalOpen.value = false
  await stabilizeInscription(props.inscription.seed.owner, props.inscription.seed.seed)
}

async function handleDestabilize() {
  actionModalOpen.value = false
  modalOpen.value = false
  await destabilizeInscription(props.inscription.seed.owner, props.inscription.seed.seed)
}

async function send(address: Address) {
  sendModalOpen.value = false
  await sendInscription(
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
    case 'destabilize':
      handleDestabilize()
      break
  }
}

function handleOpenModal() {
  if (tokenStore.tokenInfo?.key === 'truffi') {
    modalOpen.value = true
    return
  }
  actionModalOpen.value = true
}

const hover = ref(false)
</script>

<template>
  <button @click="handleOpenModal">
    <div
      @mouseenter="hover = true"
      @mouseleave="hover = false"
      class="transition-all duration-300 w-full rounded-t overflow-hidden border rounded-b"
    >
      <BaseInscription :animated="hover" :inscription="inscription" />
      <div class="px-3 py-2">
        <div class="sm:flex justify-between items-center">
          <div class="font-semibold">
            {{ inscription.seed.seed }}
            {{ tokenStore.tokenInfo?.symbol }}
          </div>
        </div>
      </div>
    </div>
  </button>
  <ModalSend :open="sendModalOpen" @send="send" @close="sendModalOpen = false" />

  <ModalActions
    v-if="actionModalOpen"
    :open="actionModalOpen"
    :inscription="inscription"
    @action="handleAction"
    @close="actionModalOpen = false"
  />
  <ModalInscription
    v-if="modalOpen"
    :inscription="inscription"
    :open="modalOpen"
    @action="handleAction"
    @close="modalOpen = false"
  />
</template>
