<script setup lang="ts">
import { useAccount } from 'use-wagmi'

const { addresses } = useAccount()
</script>

<template>
  <main>
    <div v-if="addresses?.length" class="px-4 py-4 grid grid-cols-2 gap-4">
      <BlockManage v-for="(_, i) in addresses.length" :key="i" :addressIndex="i" />
    </div>
  </main>
</template>
