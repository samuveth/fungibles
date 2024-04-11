<script setup lang="ts">
const modalStore = useModalStore()
</script>

<template>
  <BaseModal
    title="Confirm Transaction"
    :open="modalStore.confirmOpen"
    @close="modalStore.confirmOpen = false"
  >
    <div>Confirm the transaction in your wallet.</div>
  </BaseModal>
</template>
