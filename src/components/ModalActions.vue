<script setup lang="ts">
import { type Inscription } from '@/helpers/types'

const props = defineProps<{
  open: boolean
  inscription: Inscription
}>()

const emit = defineEmits(['close', 'action'])

const actions = computed(() => {
  const list = []

  list.push({
    label: 'Save Inscription',
    tooltip: 'The image and amount of inscription will be saved and can be viewed later.',
    action: () => {
      handleAction('save')
    }
  })

  list.push({
    label: 'Transfer Inscription',
    tooltip: 'Send this inscription to another wallet.',
    action: () => {
      handleAction('transfer')
    }
  })

  if (props.inscription.seed.isDynamic) {
    list.push({
      label: 'Stabilize Inscription',
      tooltip:
        'You can have multiple stable inscriptions in your wallet but only one dynamic inscription.',
      action: () => {
        handleAction('stabilize')
      }
    })
  }

  return list
})

function handleAction(action: string) {
  emit('action', action)
  emit('close')
}
</script>

<template>
  <BaseModal title="Choose Action" :open="open" @close="$emit('close')">
    <div class="space-y-2 mt-4">
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
    </div>
  </BaseModal>
</template>
