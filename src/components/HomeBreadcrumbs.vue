<script setup lang="ts">
const tokenStore = useTokenStore()
</script>

<template>
  <div v-if="tokenStore.tokenInfo?.name" class="text breadcrumbs">
    <ul>
      <li><RouterLink to="/"> Home </RouterLink></li>
      <li>
        {{ tokenStore.tokenInfo?.name }}
      </li>
    </ul>
  </div>
</template>
