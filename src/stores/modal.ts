import { defineStore } from 'pinia'
import { type Hash } from 'viem'

export const useModalStore = defineStore('modal', () => {
  const spendingOpen = ref(false)
  const pendingOpen = ref(false)
  const confirmOpen = ref(false)

  const pendingTransaction = ref<Hash>()

  return { spendingOpen, confirmOpen, pendingOpen, pendingTransaction }
})
