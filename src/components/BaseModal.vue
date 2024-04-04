<script setup lang="ts">
defineProps<{
  title: string
  open: boolean
}>()

defineEmits(['close'])
</script>

<template>
  <dialog class="modal" :class="{ 'modal-open': open }">
    <div class="modal-box sm:max-w-96">
      <button
        class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
        @click="$emit('close')"
      >
        <i-hi-x-mark-20-solid />
      </button>
      <h3 class="font-bold text-lg">{{ title }}</h3>
      <div class="mt-6">
        <slot />
      </div>
    </div>
    <div class="modal-backdrop" @click="$emit('close')"></div>
  </dialog>
</template>
