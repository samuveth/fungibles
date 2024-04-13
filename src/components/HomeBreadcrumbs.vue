<script setup lang="ts">
const tokenStore = useTokenStore()
</script>

<template>
  <div class="text breadcrumbs">
    <ul>
      <li><RouterLink to="/"> Home </RouterLink></li>
      <li>
        {{ tokenStore.tokenInfo?.name }}
      </li>
    </ul>
  </div>
</template>
