import { defineStore } from 'pinia'
import { useTimeoutFn } from '@vueuse/core'

interface ToastMessage {
  id: number
  message: string
}

export const useToastStore = defineStore('toast', () => {
  const messages = ref<ToastMessage[]>([])
  let nextId = 0

  function addMessage(message: string, duration = 3000) {
    const id = nextId++
    messages.value.push({ id, message })

    useTimeoutFn(() => {
      messages.value = messages.value.filter((msg) => msg.id !== id)
    }, duration)
  }

  return { messages, addMessage }
})
