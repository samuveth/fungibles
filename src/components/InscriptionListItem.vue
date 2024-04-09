<script setup lang="ts">
import { type Address, parseUnits } from 'viem'
import { type Inscription } from '@/helpers/types'
import { useStorage } from '@vueuse/core'
import { sendTokens, generateInscriptions, stabilizeInscription } from '@/helpers/utils'
import { TOKEN_DECIMALS } from '@/helpers/constants'
import { useAccountStore } from '@/stores/account'
import { useToastStore } from '@/stores/toast'

const props = defineProps<{
  inscription: Inscription
  isOnlyInscription: boolean
}>()

const accountStore = useAccountStore()
const { addMessage } = useToastStore()
const inscriptionsStorage = useStorage<Inscription[]>('fungibles-inscriptions', [])

const sendLoading = ref(false)
const sendModalOpen = ref(false)

const generateLoading = ref(false)
const generateModalOpen = ref(false)

const actions = computed(() => {
  const list = []

  list.push({
    label: 'Save',
    tooltip:
      'Save the inscription of this fungi. This can be used to restore the fungi in the future.',
    action: () => {
      addInscriptionToStorage()
    }
  })

  list.push({
    label: 'Transfer',
    tooltip: 'Send this fungi to another wallet.',
    action: () => {
      sendModalOpen.value = true
    }
  })
  if (props.inscription.seed.isDynamic) {
    list.push({
      label: 'Stabilize',
      tooltip: 'Stabilize this fungi by sendLoading it to another wallet.',
      action: () => {
        handleStabilize()
      }
    })
  }

  list.push({
    label: 'Generate',
    tooltip: 'Destroy this fungi and generate inscriptions it.',
    action: () => {
      generateModalOpen.value = true
    }
  })

  return list
})

async function handleStabilize() {
  await stabilizeInscription(props.inscription.seed.owner, props.inscription.seed.seed)
  accountStore.reload()
}

async function handleGenerate(amounts: string[]) {
  try {
    generateLoading.value = true
    await generateInscriptions(props.inscription.seed.owner, amounts, props.inscription.seed.seed)
    accountStore.reload()
  } catch (error) {
    console.error(error)
  } finally {
    generateLoading.value = false
  }
}

function addInscriptionToStorage() {
  const storageSeeds = inscriptionsStorage.value.map((inscription) => inscription.seed.seed)
  if (storageSeeds.includes(props.inscription.seed.seed)) return

  inscriptionsStorage.value = [...inscriptionsStorage.value, ...[props.inscription]]
  addMessage('Inscription has been saved.')
}

async function send(address: Address) {
  try {
    sendLoading.value = true
    await sendTokens(
      props.inscription.seed.owner,
      address,
      parseUnits(props.inscription.seed.seed.toString(), TOKEN_DECIMALS).toString()
    )
    accountStore.reload()
  } catch (error) {
    console.error(error)
  } finally {
    sendLoading.value = false
  }
}
</script>

<template>
  <div class="relative group">
    <div v-html="inscription.svg" />
    <div
      class="absolute bottom-10 left-0 p-4 w-full opacity-0 group-hover:opacity-100 space-y-2 transition-all duration-300 ease-in-out"
    >
      <div
        v-for="(action, i) in actions"
        :key="i"
        class="tooltip w-full"
        :data-tip="action.tooltip"
        @click="action.action"
      >
        <button class="btn btn-sm w-full !gap-0">
          {{ action.label }}
          <i-icon-info class="ml-2" />
        </button>
      </div>
    </div>

    <div class="px-3 py-2 border-x border-b">
      <div class="text-md flex items-center gap-1">
        {{ inscription.seed.isDynamic ? 'Dynamic Fungi' : 'Stable Fungi' }}
        {{ inscription.seed.seed }}
        <img src="@/../public/favicon1.png" alt="fungi" class="w-6 h-6 -mt-0.5" />
      </div>

      <ModalSend
        :open="sendModalOpen"
        :loading="sendLoading"
        @send="send"
        @close="sendModalOpen = false"
      />

      <ModalGenerate
        :open="generateModalOpen"
        :loading="generateLoading"
        :inscription="inscription"
        @close="generateModalOpen = false"
        @generate="handleGenerate"
      />
    </div>
  </div>
</template>
