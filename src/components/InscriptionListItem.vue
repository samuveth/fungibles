<script setup lang="ts">
import { useAccount } from 'use-wagmi'
import { type Address } from 'viem'
import { type Inscription } from '@/helpers/types'
import { sendTokens } from '@/helpers/utils'
import { useAccountsStore } from '@/stores/accounts'
import { shortenAddress } from '@/helpers/utils'

const props = defineProps<{
  inscription: Inscription
}>()

const accountsStore = useAccountsStore()
const { addresses } = useAccount()

const sending = ref(false)
const sendModalOpen = ref(false)

const filteredAddresses = computed(() =>
  addresses.value?.filter((address) => address !== props.inscription.seed.owner)
)

const actions = computed(() => {
  const list = [
    {
      label: 'Save',
      tooltip:
        'Save the inscription of this fungi. This can be used to restore the fungi in the future.',
      action: () => {
        console.log(props.inscription)
      }
    }
  ]

  if (props.inscription.seed.isDynamic) {
    list.push({
      label: 'Stabilize',
      tooltip: 'Stabilize the fungi by sending it to your other wallet.',
      action: () => {
        sendModalOpen.value = true
      }
    })
  } else {
    list.push({
      label: 'Send',
      tooltip: 'Send the fungi to your other wallet.',
      action: () => {
        sendModalOpen.value = true
      }
    })
  }

  return list
})

async function send(address: Address) {
  try {
    sending.value = true
    await sendTokens(props.inscription.seed.owner, address, props.inscription.seed.seed)
    accountsStore.reload()
  } catch (error) {
    console.error(error)
  } finally {
    sending.value = false
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
          <i-hi-information-circle class="ml-2 text-base" />
        </button>
      </div>
    </div>

    <div class="px-3 py-2 border-x border-b border-dashed border-opacity-50">
      <div class="text-xl">
        {{ inscription.seed.isDynamic ? 'Dynamic Fungi' : 'Stable Fungi' }}
        {{ inscription.seed.seed }}
      </div>

      <BaseModal title="Select address" :open="sendModalOpen" @close="sendModalOpen = false">
        <div class="space-y-3">
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
      </BaseModal>
    </div>
  </div>
</template>
