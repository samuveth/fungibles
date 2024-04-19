<script setup lang="ts"></script>

<template>
  <header class="sticky top-0 z-50">
    <div class="navbar bg-base-100 px-4 shadow-sm">
      <div class="navbar-start">
        <RouterLink to="/" class="flex items-center gap-1">
          <button class="text-xl">fungibles</button>
        </RouterLink>
      </div>

      <div class="navbar-center"></div>
      <div class="navbar-end">
        <ButtonConnect />
      </div>
    </div>
  </header>
</template>
