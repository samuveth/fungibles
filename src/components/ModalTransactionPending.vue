<script setup lang="ts">
const modalStore = useModalStore()
</script>

<template>
  <BaseModal
    title=" Approving Transaction"
    :open="modalStore.pendingOpen"
    @close="modalStore.pendingOpen = false"
  >
    <div>
      Please wait while the transaction is being approved.
      <div class="mt-2">
        <a
          :href="`https://basescan.org/tx/${modalStore.pendingTransaction}`"
          target="_blank"
          class="underline flex items-center gap-1"
        >
          View Transaction on Basescan
          <i-hi-arrow-top-right-on-square-16-solid class="text-sm" />
        </a>
      </div>
    </div>
  </BaseModal>
</template>
