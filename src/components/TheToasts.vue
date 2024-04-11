<script setup lang="ts">
const toastsStore = useToastStore()
</script>

<template>
  <div>
    <div class="toast">
      <div v-for="(message, i) in toastsStore.messages" :key="i" class="alert alert-info">
        <span>{{ message.message }}</span>
      </div>
    </div>
  </div>
</template>
