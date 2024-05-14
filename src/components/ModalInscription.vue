<script setup lang="ts">
import { type Inscription } from '@/helpers/types'

const props = defineProps<{
  open: boolean
  inscription: Inscription
}>()

const emit = defineEmits(['close', 'action'])

const actions = computed(() => {
  const list = []

  if (props.inscription.seed.isDynamic) {
    list.push({
      key: 'stabilize',
      label: 'Stabilize Inscription',
      tooltip:
        'You can have multiple stable inscriptions in your wallet but only one dynamic inscription.',
      action: () => {
        handleAction('stabilize')
      }
    })
  }

  if (!props.inscription.seed.isDynamic) {
    if (props.inscription.seed.seed > 1) {
      list.push({
        key: 'destabilize',
        label: 'Destabilize Inscription',
        tooltip: 'Destabilize this inscription to make it dynamic.',
        action: () => {
          handleAction('destabilize')
        }
      })
    }
  }

  list.push({
    key: 'transfer',
    label: 'Transfer Inscription',
    tooltip: 'Send this inscription to another wallet.',
    action: () => {
      handleAction('transfer')
    }
  })

  return list
})

function handleAction(action: string) {
  emit('action', action)
  emit('close')
}
</script>

<template>
  <BaseModal title="" :open="open" width="lg" @close="$emit('close')">
    <div class="grid lg:grid-cols-4 grid-cols-1 lg:pr-5 lg:gap-10 gap-4">
      <div class="space-y-2 hidden lg:block">
        <div v-for="(action, i) in actions" :key="i">
          <button
            class="w-full border py-2 px-3 text-left hover:border-primary"
            @click="action.action"
          >
            <div class="font-semibold">
              {{ action.label }}
            </div>
            <div class="opacity-70 leading-4 text-sm">
              {{ action.tooltip }}
            </div>
          </button>
        </div>
        <a href="https://inscriptions.market/sell" target="_blank" class="group">
          <div
            class="border py-3 rounded-xl mt-4 group-hover:scale-[102%] transition-all duration-200 flex items-center justify-center border-blue-400 text-blue-400 font-semibold"
          >
            <img
              loading="lazy"
              src="https://inscriptions.market/images/logo.png"
              class="w-6 h-6 mr-2"
              alt="Marketplace"
            />
            Sell on Marketplace
          </div>
        </a>
      </div>
      <BaseInscription :inscription="inscription" class="lg:col-span-2" />
      <div>
        <ModalInscriptionTraitsTruffi :inscription="inscription" />
      </div>

      <div class="grid-cols-3 gap-4 h-[40px] lg:hidden grid">
        <div v-for="(action, i) in actions" :key="i">
          <button
            class="border h-full w-full flex items-center justify-center hover:border-primary border-primary"
            @click="action.action"
          >
            <i-hi-paper-airplane v-if="action.key === 'transfer'" class="text-lg" />
            <i-hi-lock-open v-if="action.key === 'destabilize'" class="text-lg" />
            <i-hi-lock-closed v-if="action.key === 'stabilize'" class="text-lg" />
          </button>
        </div>
        <a href="https://inscriptions.market/sell" target="_blank" class="group">
          <div
            class="border h-full flex items-center justify-center border-blue-400 text-blue-400 font-semibold"
          >
            <img
              loading="lazy"
              src="https://inscriptions.market/images/logo.png"
              class="w-6 h-6"
              alt="Marketplace"
            />
          </div>
        </a>
      </div>
    </div>
  </BaseModal>
</template>
